import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { products as initialProducts, type Product } from './products';
import { defaultOfferCampaign, type OfferCampaign } from './OfferCampaign';
import { supabase } from '../lib/supabase';

const STORAGE_KEY = 'shree-vidya-products';
const CAMPAIGN_STORAGE_KEY = 'shree-vidya-offer-campaign';
const USER_STORAGE_KEY = 'shree-vidya-user';
const CART_STORAGE_KEY = 'shree-vidya-cart';
const WISHLIST_STORAGE_KEY = 'shree-vidya-wishlist';

export type StoreUser = { name: string; email: string; phone?: string; address?: Address };
export type Address = { fullName: string; phone: string; address: string; city: string; state: string; postalCode: string; country: string };
export type CartItem = { product: Product; quantity: number };

type ProductContextValue = {
  products: Product[];
  saveProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
  resetProducts: () => void;
  campaign: OfferCampaign;
  saveCampaign: (campaign: OfferCampaign) => void;
  resetCampaign: () => void;
  user: StoreUser | null;
  login: (email: string, password: string) => Promise<{ error?: string }>;
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

function readProducts(): Product[] {
  if (typeof window === 'undefined') return initialProducts;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialProducts;
  } catch {
    return initialProducts;
  }
}

function readCampaign(): OfferCampaign {
  if (typeof window === 'undefined') return defaultOfferCampaign;

  try {
    const stored = window.localStorage.getItem(CAMPAIGN_STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultOfferCampaign;
  } catch {
    return defaultOfferCampaign;
  }
}

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function isProduct(value: unknown): value is Product {
  if (!value || typeof value !== 'object') return false;
  const product = value as Partial<Product>;
  return typeof product.id === 'number'
    && typeof product.slug === 'string'
    && typeof product.name === 'string'
    && typeof product.category === 'string'
    && typeof product.collection === 'string'
    && typeof product.price === 'number'
    && typeof product.fabric === 'string'
    && typeof product.color === 'string'
    && typeof product.occasion === 'string'
    && typeof product.image === 'string'
    && typeof product.imageAlt === 'string'
    && typeof product.rating === 'number'
    && typeof product.reviews === 'number';
}

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(readProducts);
  const [campaign, setCampaign] = useState<OfferCampaign>(readCampaign);
  const [user, setUser] = useState<StoreUser | null>(() => supabase ? null : readStorage(USER_STORAGE_KEY, null));
  const [cart, setCart] = useState<CartItem[]>(() => readStorage(CART_STORAGE_KEY, []));
  const [wishlist, setWishlist] = useState<number[]>(() => readStorage(WISHLIST_STORAGE_KEY, []));

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
      const remoteProducts = data?.filter(isProduct) ?? [];
      if (!error && active && data?.length && remoteProducts.length === data.length) {
        setProducts(remoteProducts);
      }
    });

    return () => { active = false; };
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    window.localStorage.setItem(CAMPAIGN_STORAGE_KEY, JSON.stringify(campaign));
  }, [campaign]);

  useEffect(() => { window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user)); }, [user]);
  useEffect(() => { window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart)); }, [cart]);
  useEffect(() => { window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist)); }, [wishlist]);

  const value = useMemo<ProductContextValue>(() => ({
    products,
    saveProduct: (product) => setProducts((current) => {
      const exists = current.some((item) => item.id === product.id);
      return exists ? current.map((item) => item.id === product.id ? product : item) : [product, ...current];
    }),
    deleteProduct: (id) => setProducts((current) => current.filter((product) => product.id !== id)),
    resetProducts: () => setProducts(initialProducts),
    campaign,
    saveCampaign: (nextCampaign) => setCampaign(nextCampaign),
    resetCampaign: () => setCampaign(defaultOfferCampaign),
    user,
    login: async (email, password) => {
      if (!supabase) return { error: 'Supabase is not configured. Add the VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY environment variables.' };
      const { error } = await supabase.auth.signInWithPassword({ email, password });
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
