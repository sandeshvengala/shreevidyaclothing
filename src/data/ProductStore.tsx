import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Product } from './products';
import { defaultOfferCampaign, type OfferCampaign } from './OfferCampaign';
import { supabase } from '../lib/supabase';

export type StoreUser = { name: string; email: string; phone?: string; address?: Address };
export type Address = { fullName: string; phone: string; address: string; city: string; state: string; postalCode: string; country: string };
export type CartItem = { product: Product; quantity: number };

type ProductContextValue = {
  products: Product[];
  saveProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  resetProducts: () => Promise<void>;
  campaign: OfferCampaign;
  saveCampaign: (campaign: OfferCampaign) => Promise<void>;
  resetCampaign: () => Promise<void>;
  user: StoreUser | null;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  signInWithGoogle: (redirectPath?: string) => Promise<{ error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  updateCartQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  wishlist: number[];
  toggleWishlist: (id: number) => void;
  saveAddress: (address: Address) => void;
};

const ProductContext = createContext<ProductContextValue | null>(null);

function mapProductRow(value: Record<string, unknown>): Product {
  return {
    id: Number(value.id),
    slug: String(value.slug ?? ''),
    name: String(value.name ?? ''),
    category: String(value.category ?? ''),
    collection: String(value.collection ?? ''),
    price: Number(value.price ?? 0),
    compareAtPrice: value.compare_at_price == null ? undefined : Number(value.compare_at_price),
    discountPercent: value.discount_percent == null ? undefined : Number(value.discount_percent),
    fabric: String(value.fabric ?? ''),
    color: String(value.color ?? ''),
    occasion: String(value.occasion ?? ''),
    image: String(value.image ?? ''),
    imageAlt: String(value.image_alt ?? ''),
    hoverImage: value.hover_image == null ? undefined : String(value.hover_image),
    featured: Boolean(value.featured),
    newArrival: Boolean(value.new_arrival),
    bestSeller: Boolean(value.best_seller),
    badge: value.badge as Product['badge'],
    rating: Number(value.rating ?? 0),
    reviews: Number(value.reviews ?? 0),
    description: String(value.description ?? ''),
  };
}

function productToRow(product: Product) {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    category: product.category,
    collection: product.collection,
    price: product.price,
    compare_at_price: product.compareAtPrice ?? null,
    discount_percent: product.discountPercent ?? null,
    fabric: product.fabric,
    color: product.color,
    occasion: product.occasion,
    image: product.image,
    image_alt: product.imageAlt,
    hover_image: product.hoverImage ?? null,
    featured: product.featured ?? false,
    new_arrival: product.newArrival ?? false,
    best_seller: product.bestSeller ?? false,
    badge: product.badge ?? null,
    rating: product.rating,
    reviews: product.reviews,
    description: product.description,
  };
}

function mapCampaignRow(value: Record<string, unknown>): OfferCampaign {
  return {
    enabled: Boolean(value.enabled),
    eyebrow: String(value.eyebrow ?? ''),
    title: String(value.title ?? ''),
    description: String(value.description ?? ''),
    buttonLabel: String(value.button_label ?? ''),
    startAt: String(value.start_at ?? ''),
    endAt: String(value.end_at ?? ''),
  };
}

function campaignToRow(campaignValue: OfferCampaign) {
  return {
    id: 1,
    enabled: campaignValue.enabled,
    eyebrow: campaignValue.eyebrow,
    title: campaignValue.title,
    description: campaignValue.description,
    button_label: campaignValue.buttonLabel,
    start_at: campaignValue.startAt,
    end_at: campaignValue.endAt,
  };
}

const apiUrl = import.meta.env.VITE_API_URL;
const adminHeaders = {
  'Content-Type': 'application/json',
  'X-Admin-ID': import.meta.env.VITE_ADMIN_ID || '',
  'X-Admin-Password': import.meta.env.VITE_ADMIN_PASSWORD || '',
};

async function adminRequest(path: string, options: RequestInit = {}) {
  if (!apiUrl) throw new Error('Admin API is not configured.');
  const response = await fetch(`${apiUrl}${path}`, {
    ...options,
    headers: { ...adminHeaders, ...options.headers },
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || `Admin request failed (${response.status}).`);
  }
}

function isProduct(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== 'object') return false;
  const product = value as Record<string, unknown>;
  return typeof product.id === 'number' && typeof product.slug === 'string' && typeof product.name === 'string';
}

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [campaign, setCampaign] = useState<OfferCampaign>(defaultOfferCampaign);
  const [user, setUser] = useState<StoreUser | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    ['shree-vidya-products', 'shree-vidya-offer-campaign', 'shree-vidya-user', 'shree-vidya-cart', 'shree-vidya-wishlist']
      .forEach((key) => window.localStorage.removeItem(key));
  }, []);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) setUser({ name: data.session.user.user_metadata.name || data.session.user.email?.split('@')[0] || 'Customer', email: data.session.user.email || '' });
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? { name: session.user.user_metadata.name || session.user.email?.split('@')[0] || 'Customer', email: session.user.email || '' } : null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!supabase) return;
    let active = true;

    supabase.from('products').select('*').then(({ data, error }) => {
      const remoteProducts = data?.filter(isProduct).map(mapProductRow) ?? [];
      if (!error && active && remoteProducts.length === data?.length) {
        setProducts(remoteProducts);
      }
    });

    supabase.from('offer_campaigns').select('*').eq('id', 1).maybeSingle().then(({ data, error }) => {
      if (!error && active && data) setCampaign(mapCampaignRow(data));
    });

    return () => { active = false; };
  }, []);

  const value = useMemo<ProductContextValue>(() => ({
    products,
    saveProduct: async (product) => {
      await adminRequest('/api/admin/products', { method: 'POST', body: JSON.stringify(productToRow(product)) });
      setProducts((current) => {
        const exists = current.some((item) => item.id === product.id);
        return exists ? current.map((item) => item.id === product.id ? product : item) : [product, ...current];
      });
    },
    deleteProduct: async (id) => {
      await adminRequest(`/api/admin/products/${id}`, { method: 'DELETE' });
      setProducts((current) => current.filter((product) => product.id !== id));
    },
    resetProducts: async () => {
      await adminRequest('/api/admin/products', { method: 'DELETE' });
      setProducts([]);
    },
    campaign,
    saveCampaign: async (nextCampaign) => {
      await adminRequest('/api/admin/campaign', { method: 'POST', body: JSON.stringify(campaignToRow(nextCampaign)) });
      setCampaign(nextCampaign);
    },
    resetCampaign: async () => {
      await adminRequest('/api/admin/campaign', { method: 'DELETE' });
      setCampaign(defaultOfferCampaign);
    },
    user,
    login: async (email, password) => {
      if (!supabase) return { error: 'Supabase is not configured. Add the VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY environment variables.' };
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return error ? { error: error.message } : {};
    },
    signInWithGoogle: async (redirectPath = '/account') => {
      if (!supabase) return { error: 'Supabase is not configured. Add the VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY environment variables.' };
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}${redirectPath}` },
      });
      return error ? { error: error.message } : {};
    },
    register: async (name, email, password) => {
      if (!supabase) return { error: 'Supabase is not configured. Add the VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY environment variables.' };
      const { error } = await supabase.auth.signUp({ email, password, options: { data: { name } } });
      return error ? { error: error.message } : {};
    },
    logout: async () => { if (supabase) await supabase.auth.signOut(); setUser(null); },
    cart,
    addToCart: (product) => setCart((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      return existing
        ? current.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { product, quantity: 1 }];
    }),
    updateCartQuantity: (id, quantity) => setCart((current) => quantity > 0 ? current.map((item) => item.product.id === id ? { ...item, quantity } : item) : current.filter((item) => item.product.id !== id)),
    removeFromCart: (id) => setCart((current) => current.filter((item) => item.product.id !== id)),
    clearCart: () => setCart([]),
    wishlist,
    toggleWishlist: (id) => setWishlist((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]),
    saveAddress: (address) => setUser((current) => current ? { ...current, address } : current),
  }), [products, campaign, user, cart, wishlist]);

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used inside ProductProvider');
  return context;
}
