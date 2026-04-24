import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/ProductCard';
import { Heart, ChevronLeft } from 'lucide-react';

export default function Wishlist() {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="pt-40 pb-20 text-center space-y-8 bg-cream min-h-screen">
        <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center mx-auto">
          <Heart className="w-8 h-8 text-black/20" />
        </div>
        <h2 className="text-3xl font-serif italic text-black font-bold uppercase tracking-tight">Your wishlist is empty</h2>
        <Link to="/" className="inline-block px-12 py-5 bg-black text-white text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-gold transition-all">
          Explore Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-40 bg-cream min-h-screen flex-grow">
      <div className="max-w-7xl mx-auto px-10">
        <Link to="/" className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.3em] text-black/40 hover:text-black mb-12 transition-colors">
          <ChevronLeft className="w-3 h-3 mr-2" /> back to studio
        </Link>

        <header className="mb-20 space-y-6 border-b border-black/5 pb-10">
          <h1 className="text-5xl lg:text-7xl font-serif font-bold italic tracking-tight text-black uppercase">Wishlist</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#888888]">
            {wishlist.length} {wishlist.length === 1 ? 'Piece' : 'Pieces'} Saved
          </p>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {wishlist.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
