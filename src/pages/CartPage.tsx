import { Heart, Minus, Plus, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../data/ProductStore';

function CartPage() {
  const { cart, updateCartQuantity, removeFromCart, toggleWishlist, user } = useProducts();
  const navigate = useNavigate();
  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const shipping = subtotal > 4999 || subtotal === 0 ? 0 : 199;
  const goToCheckout = () => navigate(user ? '/checkout' : '/login', user ? undefined : { state: { from: '/checkout' } });

  return (
    <div className="container-shell py-16">
      <div className="flex items-end justify-between gap-4"><h1 className="section-heading">Your Bag</h1><p className="text-sm text-mutedBrown">{cart.reduce((total, item) => total + item.quantity, 0)} items</p></div>
      {cart.length === 0 ? <div className="mt-10 border border-[#eadbc7] bg-white p-10 text-center"><p className="font-serif text-4xl text-deepBrown">Your bag is waiting</p><p className="mt-3 text-mutedBrown">Add something beautiful from the new arrivals.</p><Link to="/#new-arrivals" className="button-primary mt-6">Explore products</Link></div> : <div className="mt-8 grid gap-8 lg:grid-cols-[1.45fr_0.55fr]">
        <div className="space-y-6">{cart.map(({ product, quantity }) => <div key={product.id} className="flex flex-col gap-4 border border-[#ebdcc8] bg-white p-4 md:flex-row md:items-center"><img src={product.image} alt={product.name} className="h-32 w-24 object-cover md:h-36 md:w-28" /><div className="flex-1"><Link to={`/product/${product.slug}`} className="font-serif text-3xl text-deepBrown">{product.name}</Link><p className="mt-2 text-sm text-mutedBrown">{product.color} · {product.category}</p><div className="mt-4 flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-mutedBrown"><button onClick={() => toggleWishlist(product.id)} className="inline-flex items-center gap-2 hover:text-gold"><Heart size={14} /> Wishlist</button><button onClick={() => removeFromCart(product.id)} className="inline-flex items-center gap-2 hover:text-maroon"><Trash2 size={14} /> Remove</button></div></div><div className="flex items-center gap-3"><button onClick={() => updateCartQuantity(product.id, quantity - 1)} className="h-8 w-8 border border-[#d9c5af]"><Minus size={14} className="m-auto" /></button><span>{quantity}</span><button onClick={() => updateCartQuantity(product.id, quantity + 1)} className="h-8 w-8 border border-[#d9c5af]"><Plus size={14} className="m-auto" /></button></div><div className="text-lg font-medium text-deepBrown md:min-w-[110px] md:text-right">₹{(product.price * quantity).toLocaleString('en-IN')}</div></div>)}</div>
        <aside className="h-fit border border-[#eadac4] bg-white p-6 shadow-luxury"><h2 className="text-xs uppercase tracking-[0.2em] text-gold">Order summary</h2><div className="mt-6 space-y-4 text-sm text-mutedBrown"><div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span></div><div className="flex justify-between"><span>Shipping</span><span>{shipping ? `₹${shipping}` : 'Free'}</span></div><div className="flex justify-between border-t border-[#eadac4] pt-4 text-base font-medium text-deepBrown"><span>Total</span><span>₹{(subtotal + shipping).toLocaleString('en-IN')}</span></div></div><button onClick={goToCheckout} className="button-primary mt-6 w-full">{user ? 'Proceed to checkout' : 'Login to checkout'}</button>{!user && <p className="mt-3 text-center text-xs text-mutedBrown">Login is required before address and payment.</p>}</aside>
      </div>}
    </div>
  );
}

export default CartPage;
