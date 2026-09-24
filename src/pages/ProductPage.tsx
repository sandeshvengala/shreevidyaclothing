import { Heart, Minus, Plus, Share2, ShieldCheck, Star, Truck } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ImageGallery from '../components/product/ImageGallery';
import { useProducts } from '../data/ProductStore';

const images = [
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=80',
];

function ProductPage() {
  const { slug } = useParams();
  const { products } = useProducts();
  const { addToCart, toggleWishlist, wishlist } = useProducts();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const product = products.find((item) => item.slug === slug) ?? products[0];

  if (!product) return <div className="container-shell py-16">Product unavailable.</div>;

  return (
    <div className="container-shell py-16">
      <div className="grid gap-10 lg:grid-cols-2">
        <ImageGallery images={images} />

        <div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-[0.7rem] uppercase tracking-[0.2em] text-gold">{product.category}</p>
            <button onClick={() => toggleWishlist(product.id)} className="inline-flex items-center gap-2 border border-[#e5d7c7] p-2 text-deepBrown" aria-label="Wishlist">
              <Heart size={16} className={wishlist.includes(product.id) ? 'fill-gold text-gold' : ''} />
            </button>
          </div>

          <h1 className="mt-4 font-serif text-5xl text-deepBrown">{product.name}</h1>
          <div className="mt-5 flex items-center gap-4 text-sm text-mutedBrown">
            <div className="flex items-center gap-1 text-gold">
              <Star size={14} className="fill-gold" />
              <span>{product.rating}</span>
            </div>
            <span>{product.reviews} reviews</span>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <span className="text-3xl font-medium text-deepBrown">₹{product.price.toLocaleString('en-IN')}</span>
            {product.compareAtPrice && (
              <>
                <span className="text-lg text-mutedBrown line-through">₹{product.compareAtPrice.toLocaleString('en-IN')}</span>
                <span className="text-xs uppercase tracking-[0.18em] text-maroon">{product.discountPercent}% off</span>
              </>
            )}
          </div>
          <p className="mt-6 max-w-xl text-lg leading-8 text-mutedBrown">{product.description}</p>

          <div className="mt-8 space-y-6">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-deepBrown">Color</p>
              <div className="flex gap-3">
                <button className="h-8 w-8 rounded-full border-2 border-gold bg-[#7B3F35]" aria-label="Maroon" />
                <button className="h-8 w-8 rounded-full border border-[#d9cab3] bg-[#E9D8C3]" aria-label="Beige" />
                <button className="h-8 w-8 rounded-full border border-[#d9cab3] bg-[#f4eedf]" aria-label="Ivory" />
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-deepBrown">Size</p>
              <div className="flex flex-wrap gap-2">
                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                  <button key={size} className="border border-[#d6c5b1] px-4 py-2 text-xs uppercase tracking-[0.16em] text-deepBrown">
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-deepBrown">Quantity</p>
              <div className="inline-flex items-center border border-[#d6c5b1]">
                <button onClick={() => setQuantity((current) => Math.max(1, current - 1))} className="p-3 text-deepBrown"><Minus size={14} /></button>
                <span className="min-w-10 px-4 text-center text-sm">{quantity}</span>
                <button onClick={() => setQuantity((current) => current + 1)} className="p-3 text-deepBrown"><Plus size={14} /></button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <button onClick={() => Array.from({ length: quantity }).forEach(() => addToCart(product))} className="button-primary">Add to cart</button>
            <button onClick={() => { Array.from({ length: quantity }).forEach(() => addToCart(product)); navigate('/cart'); }} className="button-secondary">Buy now</button>
            <button onClick={() => navigator.clipboard?.writeText(window.location.href)} className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-deepBrown">
              <Share2 size={14} />
              Share
            </button>
          </div>

          <div className="mt-10 grid gap-3 border-t border-[#eadbc7] pt-6 text-sm text-mutedBrown md:grid-cols-3">
            <div className="flex items-center gap-2"><Truck size={16} className="text-gold" /> Free delivery over ₹4,999</div>
            <div className="flex items-center gap-2"><ShieldCheck size={16} className="text-gold" /> Secure checkout</div>
            <div className="flex items-center gap-2"><Star size={16} className="text-gold" /> Easy returns</div>
          </div>
        </div>
      </div>

      <div className="mt-20 border-t border-[#eadbc7] pt-10">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-serif text-4xl text-deepBrown">Product Details</h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-mutedBrown">
              Designed to move beautifully with you, this edit blends graceful structure with a softly luminous finish. Each detail has been envisioned to feel graceful, effortless and distinctly modern.
            </p>
          </div>
          <div className="space-y-4 text-sm text-mutedBrown">
            <p><span className="font-medium text-deepBrown">Fabric:</span> {product.fabric}</p>
            <p><span className="font-medium text-deepBrown">Occasion:</span> {product.occasion}</p>
            <p><span className="font-medium text-deepBrown">Delivery:</span> 4-6 business days</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
