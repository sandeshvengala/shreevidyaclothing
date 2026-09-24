import { ArrowRight, Heart, Sparkles, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { categories, testimonials } from '../data/products';
import { useProducts } from '../data/ProductStore';
import { isOfferCampaignActive } from '../data/OfferCampaign';
import ProductCard from '../components/product/ProductCard';

function HomePage() {
  const { products, campaign } = useProducts();
  const offerIsActive = isOfferCampaignActive(campaign);
  const offers = products.filter((product) => product.compareAtPrice || product.badge === 'SALE').slice(0, 4);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterJoined, setNewsletterJoined] = useState(false);

  return (
    <div>
      <section className="relative isolate overflow-hidden border-b border-[#e8dcc8]">
        <img
          src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=80"
          alt="Elegant woman in ethnic wear"
          className="h-[72vh] w-full object-cover md:h-[82vh]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(36,26,21,0.68),rgba(36,26,21,0.34),rgba(36,26,21,0.18))]" />
        <div className="container-shell absolute inset-0 flex items-center">
          <div className="max-w-xl text-white">
            {offerIsActive ? (
              <>
                <p className="text-[0.7rem] uppercase tracking-[0.36em] text-[#f4dcc0]">{campaign.eyebrow}</p>
                <h1 className="mt-5 font-serif text-5xl leading-[0.9] md:text-7xl">{campaign.title}</h1>
                <p className="mt-6 max-w-lg text-base text-white/80 md:text-lg">{campaign.description}</p>
              </>
            ) : (
              <>
                <p className="text-[0.7rem] uppercase tracking-[0.36em] text-[#f4dcc0]">WEAR YOUR STORY</p>
                <h1 className="mt-5 font-serif text-5xl leading-[0.9] md:text-7xl">Timeless Indian elegance for the modern woman.</h1>
                <p className="mt-6 max-w-lg text-base text-white/80 md:text-lg">Thoughtfully curated silhouettes, rich fabrics and timeless details for gracious occasions and everyday moments alike.</p>
              </>
            )}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to={offerIsActive ? '/#offers' : '/#new-arrivals'} className="button-primary bg-gold text-white">{offerIsActive ? campaign.buttonLabel : 'Explore Collection'}</Link>
              <Link to="/about" className="button-secondary border-white/50 bg-white/10 text-white hover:text-white">
                Explore The Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-20 md:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="overflow-hidden border border-[#e6d7c3] bg-white p-3 shadow-luxury">
            <img
              src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80"
              alt="Brand lifestyle"
              className="h-[560px] w-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <p className="section-label">Our story</p>
            <h2 className="section-heading mt-3">Elegance, Woven With Meaning</h2>
            <p className="max-w-xl text-lg leading-8 text-mutedBrown">
              Shree Vidya Clothing celebrates the beauty of Indian craftsmanship through thoughtfully curated silhouettes, rich fabrics and timeless details.
            </p>
            <div className="flex items-center gap-4 text-[0.68rem] uppercase tracking-[0.24em] text-deepBrown">
              <span className="inline-block h-px w-10 bg-gold" />
              Modern luxury, gently rooted in tradition
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="border border-[#eadcc8] bg-[#f9f2ea] p-5">
                <Sparkles size={18} className="text-gold" />
                <p className="mt-4 font-serif text-3xl text-deepBrown">Thoughtful curation</p>
              </div>
              <div className="border border-[#eadcc8] bg-white p-5">
                <Heart size={18} className="text-gold" />
                <p className="mt-4 font-serif text-3xl text-deepBrown">Designed for you</p>
              </div>
            </div>
            <Link to="/about" className="button-secondary inline-flex mt-2">
              Our Story
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f0ea] py-20">
        <div className="container-shell">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="section-label">Shop by category</p>
              <h2 className="section-heading mt-3">Curated For Every Moment</h2>
            </div>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {categories.map((category) => (
              <Link key={category.name} to="/#new-arrivals" className="group relative overflow-hidden border border-[#e7daca] bg-white">
                <img src={category.image} alt={category.name} className="h-[360px] w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1d130f]/70 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <h3 className="font-serif text-3xl leading-none">{category.name}</h3>
                  <div className="mt-3 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#f4e0bb]">
                    Explore <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="new-arrivals" className="container-shell py-20 md:py-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="section-label">New arrivals</p>
            <h2 className="section-heading mt-3">Fresh Arrivals</h2>
          </div>
          <Link to="/#new-arrivals" className="hidden text-xs uppercase tracking-[0.2em] text-deepBrown md:inline-flex">
            View all
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section id="offers" className="border-y border-[#6f2f28] bg-[#7B3F35] py-12 text-white">
        <div className="container-shell">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#f4dcc0]">Limited-time edits</p>
              <h2 className="mt-2 font-serif text-4xl md:text-5xl">Today&apos;s Offers</h2>
            </div>
            <Link to="/#offers" className="text-xs uppercase tracking-[0.2em] text-[#f4dcc0]">View all offers <ArrowRight className="ml-2 inline" size={14} /></Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {offers.map((product) => (
              <Link key={product.id} to={`/product/${product.slug}`} className="group grid grid-cols-[96px_1fr] gap-4 border border-white/20 bg-white/10 p-3 transition hover:bg-white/20">
                <img src={product.image} alt={product.name} className="h-28 w-24 object-cover" />
                <div className="flex min-w-0 flex-col justify-between py-1">
                  <div>
                    <p className="text-[0.62rem] uppercase tracking-[0.16em] text-[#f4dcc0]">{product.discountPercent ? `${product.discountPercent}% off` : 'Special price'}</p>
                    <h3 className="mt-2 font-serif text-2xl leading-none">{product.name}</h3>
                  </div>
                  <p className="text-sm">From ₹{product.price.toLocaleString('en-IN')}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f3e8dc] py-20">
        <div className="container-shell grid items-center gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="overflow-hidden border border-[#e4d7c5]">
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=80"
              alt="Featured collection"
              className="h-[520px] w-full object-cover"
            />
          </div>
          <div>
            <p className="section-label">Featured collection</p>
            <h2 className="section-heading mt-3">The Signature Collection</h2>
            <p className="mt-6 text-lg leading-8 text-mutedBrown">
              Graceful silhouettes, rich textures and details designed to become part of your story.
            </p>
            <Link to="/#new-arrivals" className="button-primary mt-8">Explore Collection</Link>
          </div>
        </div>
      </section>

      <section className="container-shell py-20">
        <div className="text-center">
          <p className="section-label">Why Shree Vidya</p>
          <h2 className="section-heading mt-3">Thoughtfully Curated, Always Timeless</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            ['Thoughtfully Curated', 'Handpicked pieces designed for real life, celebrations and everyday elegance.'],
            ['Quality Fabrics', 'A considered selection of textures that feel beautiful and lasting.'],
            ['Timeless Designs', 'Modern silhouettes shaped by classic Indian sensibility.'],
            ['Made for Your Moments', 'Every piece is designed to accompany life’s most meaningful memories.'],
          ].map(([title, text]) => (
            <div key={title} className="border border-[#eadcc8] bg-white p-7 text-center shadow-luxury transition duration-300 hover:-translate-y-1 hover:border-gold">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center border border-gold text-gold">✦</div>
              <h3 className="font-serif text-3xl text-deepBrown">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-mutedBrown">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#f8f2ec] py-20">
        <div className="container-shell">
          <p className="section-label">Collection editorial</p>
          <h2 className="section-heading mt-3">For Moments That Matter</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {['Weddings', 'Festivals', 'Celebrations', 'Everyday'].map((item, index) => (
              <div key={item} className="overflow-hidden border border-[#e6d7c4] bg-white transition duration-300 hover:-translate-y-1">
                <img
                  src={['https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80'][index]}
                  alt={item}
                  className="h-[420px] w-full object-cover"
                />
                <div className="p-5">
                  <p className="text-[0.7rem] uppercase tracking-[0.2em] text-gold">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="section-label">Follow the story</p>
            <h2 className="section-heading mt-3">@shreevidyaclotthing</h2>
          </div>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <img
              key={index}
              src={['https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=700&q=80', 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=700&q=80', 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=80', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=700&q=80'][index]}
              alt="Instagram gallery"
              className="h-64 w-full object-cover transition duration-500 hover:scale-[1.02]"
            />
          ))}
        </div>
      </section>

      <section className="bg-[#f6f0ea] py-20">
        <div className="container-shell">
          <div className="text-center">
            <p className="section-label">Testimonials</p>
            <h2 className="section-heading mt-3">Loved By Our Community</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((item) => (
              <figure key={item.name} className="border border-[#eadccd] bg-white p-7 shadow-luxury transition duration-300 hover:-translate-y-1 hover:border-gold">
                <div className="flex gap-1 text-gold">
                  {Array.from({ length: item.rating }).map((_, idx) => (
                    <Star key={idx} size={16} className="fill-gold" />
                  ))}
                </div>
                <blockquote className="mt-6 font-serif text-3xl leading-tight text-deepBrown">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-6 text-sm uppercase tracking-[0.2em] text-mutedBrown">
                  {item.name} • {item.city}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-20">
        <div className="border border-[#eadcc8] bg-[#f7f0e8] p-8 text-center md:p-12">
          <p className="section-label">Stay in the story</p>
          <h2 className="section-heading mt-3">Stay in the Story</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-mutedBrown">
            Be the first to discover new collections, special edits and stories from Shree Vidya Clothing.
          </p>
          <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(event) => setNewsletterEmail(event.target.value)}
              placeholder="Email address"
              className="h-14 flex-1 border border-[#d8c7b7] bg-white px-4 text-deepBrown outline-none ring-0 focus:border-gold"
            />
            <button onClick={() => newsletterEmail && setNewsletterJoined(true)} className="button-primary h-14">{newsletterJoined ? 'Subscribed' : 'Join Us'}</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
