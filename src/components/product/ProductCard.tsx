import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '../../data/products';
import { useProducts } from '../../data/ProductStore';

function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, wishlist } = useProducts();
  const isSaved = wishlist.includes(product.id);
  return (
    <article className="group overflow-hidden border border-[#eaded0] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(36,26,21,0.08)]">
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-[390px] w-full object-cover transition duration-700 group-hover:scale-105"
          />
        </Link>
        {product.badge && (
          <span className="absolute left-4 top-4 border border-white/80 bg-white/80 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-deepBrown">
            {product.badge}
          </span>
        )}
        <button onClick={() => toggleWishlist(product.id)} className={`absolute right-4 top-4 rounded-full border border-white bg-white/80 p-2 transition hover:bg-gold hover:text-white ${isSaved ? 'bg-gold text-white' : 'text-deepBrown'}`} aria-label={`${isSaved ? 'Remove' : 'Save'} ${product.name}`}>
          <Heart size={15} className={isSaved ? 'fill-current' : ''} />
        </button>
        <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button onClick={() => addToCart(product)} className="flex w-full items-center justify-center gap-2 border border-gold bg-gold px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-white">
            <ShoppingBag size={14} />
            Add to cart
          </button>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <Link to={`/product/${product.slug}`} className="font-serif text-3xl leading-none text-deepBrown">
            {product.name}
          </Link>
          <span className="text-[0.65rem] uppercase tracking-[0.18em] text-gold">Quick view</span>
        </div>

        <div className="mt-4 flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.18em] text-mutedBrown">
          <Star size={12} className="fill-gold text-gold" />
          {product.rating} ({product.reviews})
        </div>

        <div className="mt-4 flex items-center gap-3">
          <span className="text-xl font-medium text-deepBrown">₹{product.price.toLocaleString('en-IN')}</span>
          {product.compareAtPrice && (
            <>
              <span className="text-sm text-mutedBrown line-through">₹{product.compareAtPrice.toLocaleString('en-IN')}</span>
              <span className="text-[0.6rem] uppercase tracking-[0.12em] text-maroon">{product.discountPercent}% off</span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
