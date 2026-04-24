
import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Product } from '../data';
import { formatPrice, cn } from '../lib/utils';
import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: Product;
  key?: string | number;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isWished = isInWishlist(product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevents navigating to product detail
    e.stopPropagation();
    if (isWished) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-[3/4] bg-[#F3F2F0] mb-4 border border-black/[0.03] transition-colors group-hover:border-gold/20">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover grayscale brightness-105 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        {(product.originalPrice || product.inStock < 10) && (
          <div className="absolute top-2 left-2 bg-black text-white text-[9px] font-bold px-2 py-1 uppercase tracking-widest z-10">
            {product.inStock < 10 ? `LAST ${product.inStock}` : 'SALE'}
          </div>
        )}
      </Link>
      
      {/* Wishlist Button */}
      <button 
        onClick={toggleWishlist}
        className="absolute top-2 right-2 z-20 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
      >
        <Heart className={cn("w-4 h-4 transition-colors", isWished ? "fill-gold text-gold" : "text-black")} />
      </button>

      <div className="space-y-1">
        <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/40 truncate">{product.category}</h3>
        <h3 className="text-[11px] font-bold tracking-widest uppercase text-black truncate">{product.name}</h3>
        <div className="flex items-center space-x-3">
          <span className="text-gold text-xs font-bold tracking-tight">{formatPrice(product.price)}</span>
        </div>
      </div>
    </motion.div>
  );
};

