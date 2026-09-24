import { Menu, Search, ShoppingBag, User, Heart } from 'lucide-react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useProducts } from '../../data/ProductStore';

const navItems = [
  { label: 'Offers', to: '/offers' },
  { label: 'Collections', to: '/collections' },
  { label: 'About', to: '/about' },
];

function Navbar() {
  const { cart, wishlist, user } = useProducts();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <header className="sticky top-0 z-50 border-b border-[#ebdcc6] bg-[#FDFBF7]/85 backdrop-blur-md shadow-[0_10px_30px_rgba(36,26,21,0.03)]">
      <div className="container-shell flex items-center justify-between gap-4 py-3">
        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-[0.7rem] uppercase tracking-[0.22em] transition ${
                  isActive ? 'text-gold' : 'text-deepBrown hover:text-gold'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center md:hidden">
          <button onClick={() => setMenuOpen((open) => !open)} aria-label="Open menu" className="rounded-full border border-[#ead9c8] p-2 text-deepBrown transition hover:border-gold hover:text-gold">
            <Menu size={20} />
          </button>
        </div>

        <Link to="/" className="flex flex-1 items-center justify-center">
          <img
            src="/assets/logo.png"
            alt="Shree Vidya Clothing logo"
            className="h-12 w-auto object-contain md:h-16"
          />
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          <Link to="/search" aria-label="Search" className="hidden rounded-full border border-[#ead9c8] p-2 text-deepBrown transition hover:border-gold hover:text-gold md:inline-flex">
            <Search size={17} />
          </Link>
          <Link to="/account" aria-label={user ? `Account for ${user.name}` : 'Account'} className="hidden rounded-full border border-[#ead9c8] p-2 text-deepBrown transition hover:border-gold hover:text-gold md:inline-flex">
            <User size={17} />
          </Link>
          <Link to="/wishlist" aria-label="Wishlist" className="hidden rounded-full border border-[#ead9c8] p-2 text-deepBrown transition hover:border-gold hover:text-gold md:inline-flex">
            <Heart size={17} />
          </Link>
          <Link to="/cart" aria-label="Cart" className="relative inline-flex rounded-full border border-[#ead9c8] p-2 text-deepBrown transition hover:border-gold hover:text-gold">
            <ShoppingBag size={17} />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] text-white">
              {itemCount}
            </span>
          </Link>
          <button onClick={() => navigate('/search')} aria-label="Search mobile" className="inline-flex rounded-full border border-[#ead9c8] p-2 text-deepBrown transition hover:border-gold hover:text-gold md:hidden">
            <Search size={17} />
          </button>
        </div>
      </div>
      {menuOpen && <nav className="border-t border-[#ebdcc6] bg-[#FDFBF7] px-4 py-4 md:hidden"><div className="container-shell flex flex-col gap-4">{navItems.map((item) => <Link key={item.to} onClick={() => setMenuOpen(false)} to={item.to} className="text-xs uppercase tracking-[0.2em] text-deepBrown">{item.label}</Link>)}<Link onClick={() => setMenuOpen(false)} to="/account" className="text-xs uppercase tracking-[0.2em] text-deepBrown">{user ? 'My account' : 'Sign in'}</Link><Link onClick={() => setMenuOpen(false)} to="/wishlist" className="text-xs uppercase tracking-[0.2em] text-deepBrown">Wishlist ({wishlist.length})</Link></div></nav>}
    </header>
  );
}

export default Navbar;
