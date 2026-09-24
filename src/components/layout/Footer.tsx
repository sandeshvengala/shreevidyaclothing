import { Facebook, Heart, Instagram, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="border-t border-[#e4d5c2] bg-[#f5efe8] pt-16">
      <div className="container-shell grid gap-10 pb-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src="/assets/logo.png" alt="Shree Vidya Clothing" className="h-16 w-auto object-contain" />
          <p className="mt-5 max-w-xs text-sm leading-7 text-mutedBrown">
            Thoughtfully curated Indian ethnic wear for the moments that matter most.
          </p>
        </div>

        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.2em] text-gold">Explore</p>
          <ul className="mt-5 space-y-3 text-sm text-mutedBrown">
            <li><Link to="/#new-arrivals">New Arrivals</Link></li>
            <li><Link to="/#offers">Offers</Link></li>
            <li><Link to="/#new-arrivals">Collections</Link></li>
            <li><Link to="/#new-arrivals">Best Sellers</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.2em] text-gold">Help</p>
          <ul className="mt-5 space-y-3 text-sm text-mutedBrown">
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/shipping-policy">Shipping</Link></li>
            <li><Link to="/returns-policy">Returns</Link></li>
            <li><Link to="/faq">FAQs</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.2em] text-gold">Company</p>
          <ul className="mt-5 space-y-3 text-sm text-mutedBrown">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/about">Our Story</Link></li>
            <li><Link to="/privacy-policy">Privacy</Link></li>
            <li><Link to="/terms">Terms</Link></li>
          </ul>
        </div>
      </div>

      <div className="container-shell flex flex-col gap-5 border-t border-[#e4d5c2] py-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3 text-mutedBrown">
          <a href="#" aria-label="Instagram" className="hover:text-gold"><Instagram size={16} /></a>
          <a href="#" aria-label="Facebook" className="hover:text-gold"><Facebook size={16} /></a>
          <a href="#" aria-label="Pinterest" className="hover:text-gold"><Heart size={16} /></a>
          <a href="#" aria-label="WhatsApp" className="hover:text-gold"><MessageCircle size={16} /></a>
        </div>
        <p className="text-xs uppercase tracking-[0.18em] text-mutedBrown">© 2026 Shree Vidya Clothing. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
