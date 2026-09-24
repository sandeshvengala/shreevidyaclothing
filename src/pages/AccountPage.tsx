import { LogOut, MapPin, Package, UserRound } from 'lucide-react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useProducts } from '../data/ProductStore';

function AccountPage() {
  const { user, logout, cart, wishlist } = useProducts();
  const navigate = useNavigate();
  if (!user) return <Navigate to="/login" replace state={{ from: '/account' }} />;

  return <div className="container-shell py-16"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="section-label">Your account</p><h1 className="section-heading mt-3">Welcome, {user.name}</h1><p className="mt-3 text-mutedBrown">{user.email}</p></div><button onClick={() => { logout(); navigate('/'); }} className="button-secondary"><LogOut size={15} /> Sign out</button></div><div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4"><div className="border border-[#eadcc8] bg-white p-6"><UserRound className="text-gold" /><p className="mt-4 font-serif text-3xl text-deepBrown">Profile</p><p className="mt-2 text-sm text-mutedBrown">{user.email}</p></div><div className="border border-[#eadcc8] bg-white p-6"><Package className="text-gold" /><p className="mt-4 font-serif text-3xl text-deepBrown">Orders</p><p className="mt-2 text-sm text-mutedBrown">Your order history will appear here.</p></div><Link to="/wishlist" className="border border-[#eadcc8] bg-white p-6"><p className="text-gold">♡</p><p className="mt-4 font-serif text-3xl text-deepBrown">Wishlist</p><p className="mt-2 text-sm text-mutedBrown">{wishlist.length} saved items</p></Link><div className="border border-[#eadcc8] bg-white p-6"><MapPin className="text-gold" /><p className="mt-4 font-serif text-3xl text-deepBrown">Address</p><p className="mt-2 text-sm text-mutedBrown">{user.address ? `${user.address.city}, ${user.address.state}` : 'Add during checkout'}</p></div></div><div className="mt-8 border border-[#eadcc8] bg-[#f9f3ec] p-6"><p className="text-sm text-mutedBrown">You have {cart.reduce((total, item) => total + item.quantity, 0)} item(s) in your bag.</p><Link to="/cart" className="button-primary mt-5">View bag</Link></div></div>;
}

export default AccountPage;
