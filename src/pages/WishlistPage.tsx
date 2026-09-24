import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProducts } from '../data/ProductStore';

function WishlistPage() {
  const { products, wishlist, toggleWishlist, addToCart } = useProducts();
  const savedProducts = products.filter((product) => wishlist.includes(product.id));
  return <div className="container-shell py-16"><h1 className="section-heading">Wishlist</h1>{savedProducts.length === 0 ? <div className="mt-8 border border-[#eadbc7] bg-white p-10 text-center"><Heart className="mx-auto text-gold" /><p className="mt-4 font-serif text-3xl text-deepBrown">Nothing saved yet</p><Link to="/#new-arrivals" className="button-primary mt-6">Explore products</Link></div> : <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{savedProducts.map((product) => <div key={product.id} className="border border-[#eadcc8] bg-white p-4"><img src={product.image} alt={product.name} className="h-80 w-full object-cover" /><Link to={`/product/${product.slug}`} className="mt-4 block font-serif text-3xl text-deepBrown">{product.name}</Link><p className="mt-2 text-mutedBrown">₹{product.price.toLocaleString('en-IN')}</p><div className="mt-4 flex gap-2"><button onClick={() => addToCart(product)} className="button-primary flex-1"><ShoppingBag size={14} /> Add to cart</button><button onClick={() => toggleWishlist(product.id)} className="border border-[#d9c5af] p-3 text-maroon" aria-label={`Remove ${product.name}`}><Trash2 size={15} /></button></div></div>)}</div>}</div>;
}

export default WishlistPage;
