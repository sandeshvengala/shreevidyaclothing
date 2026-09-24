import { Link } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import { useProducts } from '../data/ProductStore';

function OffersPage() {
  const { products } = useProducts();
  const offers = products.filter((product) => product.compareAtPrice || product.badge === 'SALE');

  return (
    <div className="container-shell py-16 md:py-24">
      <p className="section-label">Limited edits</p>
      <h1 className="section-heading mt-3">Offers</h1>
      <p className="mt-5 max-w-2xl text-mutedBrown">Discover current pieces with considered pricing, available while stock lasts.</p>
      {offers.length ? (
        <div className="mt-12 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {offers.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : (
        <div className="mt-12 border border-[#eadbc7] bg-white p-10 text-center shadow-luxury">
          <p className="font-serif text-3xl text-deepBrown">No active offers yet.</p>
          <Link to="/collections" className="button-secondary mt-6">Browse collections</Link>
        </div>
      )}
    </div>
  );
}

export default OffersPage;
