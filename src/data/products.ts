export type Product = {
  id: number;
  slug: string;
  name: string;
  category: string;
  collection: string;
  price: number;
  compareAtPrice?: number;
  discountPercent?: number;
  fabric: string;
  color: string;
  occasion: string;
  image: string;
  imageAlt: string;
  hoverImage?: string;
  featured?: boolean;
  newArrival?: boolean;
  bestSeller?: boolean;
  badge?: 'NEW' | 'BESTSELLER' | 'SALE' | 'LIMITED';
  rating: number;
  reviews: number;
  description: string;
};

export const products: Product[] = [
  {
    id: 1,
    slug: 'mehroon-grace-saree',
    name: 'Mehroon Grace Saree',
    category: 'Sarees',
    collection: 'Signature',
    price: 8990,
    compareAtPrice: 11990,
    discountPercent: 25,
    fabric: 'Silk Blend',
    color: 'Maroon',
    occasion: 'Festive',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Mehroon Grace Saree',
    hoverImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    badge: 'SALE',
    featured: true,
    rating: 4.8,
    reviews: 128,
    description: 'A graceful drape with refined detailing and an heirloom-inspired silhouette crafted for elevated celebrations.'
  },
  {
    id: 2,
    slug: 'vidya-silk-edit',
    name: 'Vidya Silk Edit',
    category: 'Sarees',
    collection: 'Modern Classic',
    price: 7490,
    compareAtPrice: 9990,
    discountPercent: 25,
    fabric: 'Silk Cotton',
    color: 'Champagne',
    occasion: 'Everyday',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Vidya Silk Edit',
    hoverImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
    badge: 'NEW',
    newArrival: true,
    rating: 4.7,
    reviews: 92,
    description: 'Soft drape, luminous texture and subtle elegance designed to move effortlessly from day to evening.'
  },
  {
    id: 3,
    slug: 'ananya-festive-saree',
    name: 'Ananya Festive Saree',
    category: 'Festive Wear',
    collection: 'Festive Edit',
    price: 10990,
    compareAtPrice: 14990,
    discountPercent: 27,
    fabric: 'Georgette',
    color: 'Rose',
    occasion: 'Festive',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Ananya Festive Saree',
    hoverImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    badge: 'BESTSELLER',
    bestSeller: true,
    rating: 4.9,
    reviews: 204,
    description: 'Rich, fluid movement with delicate detailing that brings a celebratory presence to every gathering.'
  },
  {
    id: 4,
    slug: 'heritage-gold-saree',
    name: 'Heritage Gold Saree',
    category: 'Wedding Collection',
    collection: 'Celebration',
    price: 12990,
    fabric: 'Tissue',
    color: 'Gold',
    occasion: 'Wedding',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Heritage Gold Saree',
    hoverImage: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
    badge: 'LIMITED',
    featured: true,
    rating: 4.9,
    reviews: 151,
    description: 'Luminous surfaces and exquisite detailing for milestone moments, evening soirées and wedding festivities.'
  },
  {
    id: 5,
    slug: 'raga-handloom-edit',
    name: 'Raga Handloom Edit',
    category: 'Everyday Elegance',
    collection: 'Everyday',
    price: 6890,
    compareAtPrice: 8790,
    discountPercent: 22,
    fabric: 'Cotton Blend',
    color: 'Terracotta',
    occasion: 'Everyday',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Raga Handloom Edit',
    hoverImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    rating: 4.6,
    reviews: 68,
    description: 'A softly structured drape with a modern hand-feel that transitions beautifully across daily plans.'
  },
  {
    id: 6,
    slug: 'rosewood-celebration-saree',
    name: 'Rosewood Celebration Saree',
    category: 'Wedding Collection',
    collection: 'Celebration',
    price: 11990,
    compareAtPrice: 15990,
    discountPercent: 25,
    fabric: 'Chiffon',
    color: 'Burgundy',
    occasion: 'Celebration',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Rosewood Celebration Saree',
    hoverImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    badge: 'SALE',
    rating: 4.8,
    reviews: 119,
    description: 'Subtle texture, elegant silhouette and a polished finish that creates a confident presence on any occasion.'
  },
  {
    id: 7,
    slug: 'lotus-ivory-drape',
    name: 'Lotus Ivory Drape',
    category: 'Sarees',
    collection: 'Signature',
    price: 8390,
    fabric: 'Textured Cotton',
    color: 'Ivory',
    occasion: 'Festive',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Lotus Ivory Drape',
    hoverImage: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80',
    newArrival: true,
    rating: 4.7,
    reviews: 76,
    description: 'A soft ivory statement with an airy fall and timeless elegance for layered celebrations.'
  },
  {
    id: 8,
    slug: 'cinder-velvet-occasion',
    name: 'Cinder Velvet Occasion',
    category: 'Festive Wear',
    collection: 'Evening',
    price: 10190,
    compareAtPrice: 12990,
    discountPercent: 21,
    fabric: 'Velvet',
    color: 'Plum',
    occasion: 'Festive',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Cinder Velvet Occasion',
    hoverImage: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
    badge: 'BESTSELLER',
    bestSeller: true,
    rating: 4.8,
    reviews: 141,
    description: 'Velvety richness, softly tailored structure and a refined silhouette designed for evening occasions.'
  }
];

export const categories = [
  { name: 'Sarees', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80' },
  { name: 'Festive Wear', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80' },
  { name: 'Wedding Collection', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80' },
  { name: 'Everyday Elegance', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80' },
  { name: 'New Arrivals', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80' }
];

export const testimonials = [
  {
    quote: 'Beautiful fabric, graceful design and such a lovely shopping experience.',
    name: 'Aarohi S.',
    city: 'Mumbai',
    rating: 5,
  },
  {
    quote: 'The finish feels luxurious and the fit is effortlessly elegant.',
    name: 'Nisha M.',
    city: 'Bengaluru',
    rating: 5,
  },
  {
    quote: 'Every detail feels curated for a modern Indian wardrobe.',
    name: 'Rhea P.',
    city: 'Delhi',
    rating: 5,
  }
];
