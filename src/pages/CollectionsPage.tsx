import { Link } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import { useProducts } from '../data/ProductStore';

function CollectionsPage() {
  const { products } = useProducts();
  const collections = [...new Set(products.map((product) => product.collection).filter(Boolean))];

  return (
    <div className="container-shell py-16 md:py-24">
      <p className="section-label">The edit</p>
      <h1 className="section-heading mt-3">Collections</h1>
      <p className="mt-5 max-w-2xl text-mutedBrown">Explore the complete Shree Vidya Clothing collection, arranged by our latest edits.</p>
      {collections.length ? (
        <div className="mt-12 space-y-16">
          {collections.map((collection) => (
            <section key={collection}>
              <div className="flex items-end justify-between gap-4 border-b border-[#eadbc7] pb-4">
                <h2 className="font-serif text-4xl text-deepBrown">{collection}</h2>
                <span className="text-xs uppercase tracking-[0.16em] text-mutedBrown">{products.filter((product) => product.collection === collection).length} pieces</span>
              </div>
              <div className="mt-8 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                {products.filter((product) => product.collection === collection).map((product) => <ProductCard key={product.id} product={product} />)}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="mt-12 border border-[#eadbc7] bg-white p-10 text-center shadow-luxury">
          <p className="font-serif text-3xl text-deepBrown">Collections are being prepared.</p>
          <Link to="/" className="button-secondary mt-6">Return home</Link>
        </div>
      )}
    </div>
  );
}

export default CollectionsPage;
