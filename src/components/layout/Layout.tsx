import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout() {
  return (
    <div className="site-shell min-h-screen bg-ivory text-deepBrown">
      <img
        src="/assets/logo.png"
        alt=""
        aria-hidden="true"
        className="brand-watermark"
      />
      <div className="announcement-bar">
        <div className="container-shell flex items-center justify-center gap-3 px-4 py-2 text-center text-[0.64rem] uppercase tracking-[0.3em] text-[#f6ebdd]">
          <span>Crafted with love</span>
          <span className="text-[#d9bb8a]">•</span>
          <span>Designed to be remembered</span>
        </div>
      </div>
      <div className="relative z-10">
        <Navbar />
      </div>
      <main className="relative z-10">
        <Outlet />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
