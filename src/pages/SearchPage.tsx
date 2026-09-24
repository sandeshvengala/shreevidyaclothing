import { Search } from 'lucide-react';
import { useState } from 'react';
import ProductCard from '../components/product/ProductCard';
import { useProducts } from '../data/ProductStore';

function SearchPage() {
  const { products } = useProducts();
  const [query, setQuery] = useState('');
  const matches = products.filter((product) => `${product.name} ${product.category} ${product.fabric} ${product.color}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="container-shell py-16"><h1 className="section-heading">Search</h1><div className="relative mt-8"><Search className="absolute left-4 top-4 text-mutedBrown" size={18} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search by product, category or fabric" className="h-14 w-full border border-[#e4d8cb] bg-white pl-12 pr-4" /></div>{query ? <><p className="mt-8 text-sm text-mutedBrown">{matches.length} result(s) for &quot;{query}&quot;</p><div className="mt-5 grid gap-6 md:grid-cols-2 xl:grid-cols-4">{matches.map((product) => <ProductCard key={product.id} product={product} />)}</div></> : <div className="mt-10 grid gap-4 md:grid-cols-3">{['Sarees', 'Festive Wear', 'Wedding Collection'].map((item) => <button key={item} onClick={() => setQuery(item)} className="border border-[#eadbc7] bg-white p-5 text-center text-sm uppercase tracking-[0.16em] text-deepBrown">{item}</button>)}</div>}</div>;
}

export default SearchPage;
