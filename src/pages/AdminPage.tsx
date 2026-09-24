import { ArrowUpRight, BadgeDollarSign, Check, Edit3, LogOut, Package, Plus, RotateCcw, Trash2, Users, Zap } from 'lucide-react';
import { useState } from 'react';
import { useProducts } from '../data/ProductStore';
import type { Product } from '../data/products';
import { defaultOfferCampaign, type OfferCampaign } from '../data/OfferCampaign';
import { adminCredentials } from '../data/admin';

const ADMIN_SESSION_KEY = 'shree-vidya-admin-session';

const stats = [
  { label: 'Revenue', value: '₹4.8L', icon: BadgeDollarSign },
  { label: 'Orders', value: '124', icon: Package },
  { label: 'Customers', value: '436', icon: Users },
  { label: 'Conversion', value: '3.8%', icon: Zap },
];

const recentOrders = [
  { id: '#1001', customer: 'Aarohi S.', total: '₹8,990', status: 'Processing' },
  { id: '#1002', customer: 'Nisha M.', total: '₹12,400', status: 'Shipped' },
  { id: '#1003', customer: 'Rhea P.', total: '₹5,680', status: 'Pending' },
];

const emptyProduct: Product = {
  id: 0, slug: '', name: '', category: 'Sarees', collection: 'Signature', price: 0,
  fabric: '', color: '', occasion: '', image: '', imageAlt: '', rating: 5, reviews: 0, description: '',
};

function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    sessionStorage.getItem(ADMIN_SESSION_KEY) === 'authenticated'
  );
  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const { products, saveProduct, deleteProduct, resetProducts, campaign, saveCampaign, resetCampaign } = useProducts();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [campaignDraft, setCampaignDraft] = useState<OfferCampaign>(campaign);
  const [saved, setSaved] = useState(false);
  const [campaignSaved, setCampaignSaved] = useState(false);
  const [saveError, setSaveError] = useState('');
  const offersCount = products.filter((product) => product.compareAtPrice || product.badge === 'SALE').length;

  const openNewProduct = () => setEditingProduct({ ...emptyProduct, id: Date.now() });
  const updateField = (field: keyof Product, value: string | number | boolean | undefined) => {
    setEditingProduct((current) => current ? { ...current, [field]: value } : current);
  };
  const updateCampaign = (field: keyof OfferCampaign, value: string | boolean) => {
    setCampaignDraft((current) => ({ ...current, [field]: value }));
  };
  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingProduct) return;
    try {
      setSaveError('');
      await saveProduct({ ...editingProduct, slug: editingProduct.slug || editingProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') });
      setSaved(true);
      window.setTimeout(() => setSaved(false), 2500);
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'Unable to save product to Supabase.');
    }
  };
  const handleCampaignSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setSaveError('');
      await saveCampaign(campaignDraft);
      setCampaignSaved(true);
      window.setTimeout(() => setCampaignSaved(false), 2500);
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'Unable to save offer to Supabase.');
    }
  };

  const handleAdminLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (adminId === adminCredentials.id && adminPassword === adminCredentials.password) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'authenticated');
      setIsAuthenticated(true);
      setLoginError('');
      return;
    }
    setLoginError('Invalid admin ID or password.');
  };

  if (!isAuthenticated) {
    return (
      <div className="container-shell flex min-h-[70vh] items-center justify-center py-16">
        <form onSubmit={handleAdminLogin} className="w-full max-w-md border border-[#eadbc7] bg-white p-8 shadow-luxury">
          <p className="section-label">Restricted area</p>
          <h1 className="section-heading mt-3 text-4xl">Admin Login</h1>
          <div className="mt-8 space-y-4">
            <input required value={adminId} onChange={(event) => setAdminId(event.target.value)} placeholder="Admin ID" autoComplete="username" />
            <input required type="password" value={adminPassword} onChange={(event) => setAdminPassword(event.target.value)} placeholder="Password" autoComplete="current-password" />
          </div>
          {loginError && <p className="mt-4 text-sm text-maroon">{loginError}</p>}
          <button type="submit" className="button-primary mt-6 w-full">Sign In</button>
        </form>
      </div>
    );
  }

  return (
    <div className="container-shell py-16">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="section-label">Admin dashboard</p>
          <h1 className="section-heading mt-3">Store Overview</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <button className="button-primary" onClick={() => { sessionStorage.removeItem(ADMIN_SESSION_KEY); setIsAuthenticated(false); }}><LogOut size={15} /> Sign out</button>
          <button className="button-primary" onClick={openNewProduct}><Plus size={15} /> Create new product</button>
        </div>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[...stats.slice(0, 3), { label: 'Offers', value: String(offersCount), icon: Zap }].map(({ label, value, icon: Icon }) => (
          <div key={label} className="border border-[#eadbc7] bg-white p-6 shadow-luxury">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.18em] text-mutedBrown">{label}</p>
              <Icon size={18} className="text-gold" />
            </div>
            <p className="mt-6 font-serif text-5xl text-deepBrown">{value}</p>
            <div className="mt-5 flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.18em] text-maroon">
              <ArrowUpRight size={12} />
              12.5% vs last month
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="border border-[#eadbc7] bg-white p-6 shadow-luxury">
          <h2 className="font-serif text-4xl text-deepBrown">Recent Orders</h2>
          <div className="mt-6 space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between border-b border-[#f1e6d8] pb-4 last:border-b-0 last:pb-0">
                <div>
                  <p className="font-medium text-deepBrown">{order.customer}</p>
                  <p className="text-sm text-mutedBrown">{order.id}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-deepBrown">{order.total}</p>
                  <p className="text-xs uppercase tracking-[0.16em] text-gold">{order.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-[#eadbc7] bg-[#f9f3ec] p-6">
          <h2 className="font-serif text-4xl text-deepBrown">Quick Actions</h2>
          <div className="mt-6 space-y-3 text-sm uppercase tracking-[0.18em] text-deepBrown">
            <button className="block w-full border border-[#e6d7c5] bg-white p-4 text-left" onClick={openNewProduct}>Add product</button>
            <button className="block w-full border border-[#e6d7c5] bg-white p-4 text-left">Manage inventory</button>
            <button className="block w-full border border-[#e6d7c5] bg-white p-4 text-left">Review coupons</button>
            <button className="block w-full border border-[#e6d7c5] bg-white p-4 text-left">Export reports</button>
          </div>
        </div>
      </div>

      <section className="mt-10 border border-[#eadbc7] bg-[#7B3F35] p-6 text-white shadow-luxury md:p-8">
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#f4dcc0]">Homepage hero control</p>
          <h2 className="mt-2 font-serif text-4xl">Offer highlighting</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">Set the sale message and active period. After the end time, the homepage automatically returns to the normal hero message.</p>
        </div>
        <form onSubmit={handleCampaignSave} className="mt-7 grid gap-4 md:grid-cols-2">
          <label className="text-xs uppercase tracking-[0.14em] text-[#f4dcc0] md:col-span-2"><span className="flex items-center gap-2"><input type="checkbox" checked={campaignDraft.enabled} onChange={(event) => updateCampaign('enabled', event.target.checked)} className="accent-gold" /> Enable offer highlighting</span></label>
          {([
            ['eyebrow', 'Small label'], ['title', 'Offer headline'], ['buttonLabel', 'Button text'],
          ] as [keyof OfferCampaign, string][]).map(([field, label]) => (
            <label key={field} className="text-xs uppercase tracking-[0.14em] text-[#f4dcc0] md:col-span-2">{label}
              <input value={campaignDraft[field] as string} onChange={(event) => updateCampaign(field, event.target.value)} className="mt-2 h-11 w-full border border-white/25 bg-white px-3 text-sm normal-case tracking-normal text-deepBrown outline-none focus:border-gold" />
            </label>
          ))}
          <label className="text-xs uppercase tracking-[0.14em] text-[#f4dcc0] md:col-span-2">Offer description
            <textarea value={campaignDraft.description} onChange={(event) => updateCampaign('description', event.target.value)} rows={3} className="mt-2 w-full border border-white/25 bg-white p-3 text-sm normal-case tracking-normal text-deepBrown outline-none focus:border-gold" />
          </label>
          <label className="text-xs uppercase tracking-[0.14em] text-[#f4dcc0]">Starts
            <input type="datetime-local" value={campaignDraft.startAt} onChange={(event) => updateCampaign('startAt', event.target.value)} className="mt-2 h-11 w-full border border-white/25 bg-white px-3 text-sm normal-case tracking-normal text-deepBrown outline-none focus:border-gold" />
          </label>
          <label className="text-xs uppercase tracking-[0.14em] text-[#f4dcc0]">Ends
            <input type="datetime-local" value={campaignDraft.endAt} onChange={(event) => updateCampaign('endAt', event.target.value)} className="mt-2 h-11 w-full border border-white/25 bg-white px-3 text-sm normal-case tracking-normal text-deepBrown outline-none focus:border-gold" />
          </label>
          <div className="flex flex-wrap items-center gap-4 md:col-span-2"><button type="submit" className="button-primary bg-gold"><Check size={15} /> Save offer settings</button><button type="button" className="border border-white/40 px-4 py-3 text-xs uppercase tracking-[0.14em] text-white" onClick={() => { resetCampaign(); setCampaignDraft({ ...defaultOfferCampaign }); }}>Reset offer</button>{campaignSaved && <span className="text-sm text-[#f4dcc0]">Offer settings saved</span>}</div>
        </form>
      </section>

      <section className="mt-10 border border-[#eadbc7] bg-white p-6 shadow-luxury md:p-8">
        <div className="flex flex-col justify-between gap-4 border-b border-[#f1e6d8] pb-6 md:flex-row md:items-end">
          <div>
            <p className="section-label">Catalog management</p>
            <h2 className="mt-2 font-serif text-4xl text-deepBrown">Products & Offers</h2>
            <p className="mt-2 text-sm text-mutedBrown">Changes are saved directly to the Supabase database and appear across the storefront.</p>
          </div>
          <button className="button-secondary" onClick={() => { resetProducts(); setEditingProduct(null); }}><RotateCcw size={14} /> Clear online products</button>
        </div>

        {editingProduct && (
          <form onSubmit={handleSave} className="mt-8 border border-[#eadbc7] bg-[#fbf7f1] p-5 md:p-7">
            <div className="flex items-center justify-between gap-4">
              <h3 className="font-serif text-3xl text-deepBrown">{products.some((product) => product.id === editingProduct.id) ? 'Edit product' : 'Add product'}</h3>
              <button type="button" className="text-xs uppercase tracking-[0.16em] text-mutedBrown" onClick={() => setEditingProduct(null)}>Cancel</button>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {([
                ['name', 'Product name', 'text'], ['slug', 'URL slug', 'text'], ['price', 'Selling price (₹)', 'number'],
                ['compareAtPrice', 'Original price (₹)', 'number'], ['discountPercent', 'Discount %', 'number'], ['image', 'Image URL', 'url'],
                ['category', 'Category', 'text'], ['collection', 'Collection', 'text'], ['fabric', 'Fabric', 'text'],
                ['color', 'Color', 'text'], ['occasion', 'Occasion', 'text'],
              ] as [keyof Product, string, string][]).map(([field, label, type]) => (
                <label key={field} className="text-xs uppercase tracking-[0.14em] text-deepBrown">
                  {label}
                  <input type={type} value={editingProduct[field] as string | number || ''} onChange={(event) => updateField(field, type === 'number' ? Number(event.target.value) : event.target.value)} className="mt-2 h-11 w-full border border-[#ddcdbb] bg-white px-3 text-sm normal-case tracking-normal outline-none focus:border-gold" />
                </label>
              ))}
              <label className="text-xs uppercase tracking-[0.14em] text-deepBrown">Badge
                <select value={editingProduct.badge || ''} onChange={(event) => updateField('badge', event.target.value as Product['badge'])} className="mt-2 h-11 w-full border border-[#ddcdbb] bg-white px-3 text-sm normal-case tracking-normal outline-none focus:border-gold">
                  <option value="">No badge</option><option>SALE</option><option>NEW</option><option>BESTSELLER</option><option>LIMITED</option>
                </select>
              </label>
            </div>
            <label className="mt-4 block text-xs uppercase tracking-[0.14em] text-deepBrown">Description
              <textarea value={editingProduct.description} onChange={(event) => updateField('description', event.target.value)} rows={4} className="mt-2 w-full border border-[#ddcdbb] bg-white p-3 text-sm normal-case tracking-normal outline-none focus:border-gold" />
            </label>
            <div className="mt-5 flex flex-wrap gap-5 text-xs uppercase tracking-[0.14em] text-deepBrown">
              {(['featured', 'newArrival', 'bestSeller'] as const).map((field) => <label key={field} className="flex items-center gap-2"><input type="checkbox" checked={Boolean(editingProduct[field])} onChange={(event) => updateField(field, event.target.checked)} className="accent-gold" /> {field === 'newArrival' ? 'New arrival' : field === 'bestSeller' ? 'Best seller' : 'Featured'}</label>)}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4"><button type="submit" className="button-primary"><Check size={15} /> Save product</button>{saved && <span className="text-sm text-maroon">Saved successfully</span>}{saveError && <span className="text-sm text-maroon">{saveError}</span>}</div>
          </form>
        )}

        <div className="mt-8 divide-y divide-[#f1e6d8]">
          {products.map((product) => <div key={product.id} className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4"><img src={product.image} alt={product.name} className="h-16 w-14 flex-none object-cover" /><div className="min-w-0"><p className="truncate font-serif text-2xl text-deepBrown">{product.name}</p><p className="text-xs uppercase tracking-[0.14em] text-mutedBrown">₹{product.price.toLocaleString('en-IN')} · {product.category}{product.badge ? ` · ${product.badge}` : ''}</p></div></div>
            <div className="flex gap-2"><button className="button-secondary px-4 py-2" onClick={() => setEditingProduct({ ...product })}><Edit3 size={14} /> Edit</button><button className="inline-flex items-center gap-2 border border-[#dfc1b7] px-4 py-2 text-xs uppercase tracking-[0.14em] text-maroon" onClick={() => deleteProduct(product.id)}><Trash2 size={14} /> Delete</button></div>
          </div>)}
        </div>
      </section>
    </div>
  );
}

export default AdminPage;
