
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { ShoppingBag, Star, ShieldCheck, Truck, RotateCcw, Plus, Minus, Check, Clock, TrendingUp, Heart } from 'lucide-react';
import { PRODUCTS, Product } from '../data';
import { formatPrice, cn } from '../lib/utils';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { SizeGuideModal } from '../components/SizeGuideModal';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart, setIsCartOpen } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const product = PRODUCTS.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const isWished = product ? isInWishlist(product.id) : false;

  if (!product) return <div className="pt-40 text-center">Product not found.</div>;

  const handleAddToCart = () => {
    if (!selectedSize) {
      // Trigger a visual shake or highlight on sizes instead of alert for better UX
      const sizeContainer = document.getElementById('size-selection');
      sizeContainer?.classList.add('animate-shake');
      setTimeout(() => sizeContainer?.classList.remove('animate-shake'), 500);
      return;
    }
    
    // In a real app, you might want to handle quantity here too
    // But our current context context addToCart adds 1 at a time.
    // I'll update context to handle quantity or just call it multiple times (hacky)
    // Better: let's update context's addToCart to accept quantity.
    
    addToCart(product, selectedSize, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="pt-24 pb-40 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.4em] text-[#57534E] mb-12">
          <Link to="/" className="hover:text-gold transition-colors">Studio</Link>
          <span>/</span>
          <Link to={`/category/${product.category}`} className="hover:text-gold transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-black font-bold">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Gallery */}
          <div className="space-y-6">
            <div className="relative aspect-[3/4] bg-[#F3F2F0] border border-black/[0.03] overflow-hidden group shadow-sm">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  src={product.images[activeImage]} 
                  alt={product.name}
                  className="w-full h-full object-cover grayscale-[0.1]"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              {product.originalPrice && (
                <div className="absolute top-6 left-6 bg-black text-white text-[10px] font-bold px-4 py-2 uppercase tracking-[0.2em] z-10">
                  Limited Edition
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-4 gap-6">
              {product.images.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    "aspect-square border transition-all relative overflow-hidden",
                    activeImage === i 
                      ? "border-gold scale-105 shadow-lg" 
                      : "border-black/[0.05] opacity-50 hover:opacity-100"
                  )}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={cn("w-3 h-3 fill-gold text-gold", i === 4 && "text-gray-200 fill-gray-200")} />
                  ))}
                </div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#888888] font-semibold">Verified Purchase Feedback</span>
              </div>
              <h1 className="text-6xl md:text-7xl font-serif font-bold italic tracking-tight text-black leading-[0.9] uppercase">{product.name}</h1>
              <div className="flex items-center space-x-8 pt-2">
                <span className="text-4xl md:text-5xl font-bold text-gold tracking-tighter">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-xl md:text-2xl text-[#888888] line-through uppercase font-medium opacity-40 tracking-tighter">{formatPrice(product.originalPrice)}</span>
                )}
              </div>
            </div>

            <p className="text-[#57534E] leading-relaxed text-lg max-w-lg font-medium">
              {product.description}
            </p>

            {/* Scarcity Elements */}
            <div className="flex gap-10 py-8 border-y border-black/5">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-gold">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Popular Choice</span>
                </div>
                <p className="text-[11px] text-[#888888] uppercase tracking-widest">{product.soldToday} men bought this today</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-black/40">
                  <Clock className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Limited Stock</span>
                </div>
                <p className="text-[11px] text-[#888888] uppercase tracking-widest">Only {product.inStock} items remaining</p>
              </div>
            </div>

            {/* Sizes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10" id="size-selection">
              <div className="space-y-6">
                <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-[0.2em] text-[#888888]">
                  <span>Select Your Fit</span>
                  <button 
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-black border-b border-black/20 hover:border-gold transition-colors"
                  >
                    Size Advisor
                  </button>
                </div>
                <div className="flex flex-wrap gap-4">
                  {product.sizes.map(size => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "w-14 h-14 border flex items-center justify-center text-[12px] font-bold uppercase tracking-widest transition-all",
                        selectedSize === size 
                          ? "bg-black border-black text-white shadow-xl shadow-black/20 scale-110" 
                          : "border-black/5 text-black hover:border-gold"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-[0.2em] text-[#888888]">
                  <span>Quantity</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-black/5 bg-white shadow-sm">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-14 h-14 flex items-center justify-center hover:bg-black/5 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-14 text-center font-bold font-serif italic text-lg">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-14 h-14 flex items-center justify-center hover:bg-black/5 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Interaction */}
            <div className="space-y-4 pt-4">
              <div className="flex space-x-4">
                 <button 
                    onClick={handleAddToCart}
                    className="flex-grow h-20 bg-black text-white text-[13px] font-bold uppercase tracking-[0.4em] flex items-center justify-center hover:bg-gold transition-all shadow-2xl shadow-black/10"
                  >
                    {addedToCart ? "Selection Confirmed" : "Add to Wardrobe"}
                  </button>
                  <button 
                    onClick={() => isWished ? removeFromWishlist(product.id) : addToWishlist(product)}
                    className={cn(
                      "w-20 h-20 border flex items-center justify-center transition-all",
                      isWished ? "border-gold bg-gold/5" : "border-black hover:bg-black/5"
                    )}
                  >
                    <Heart className={cn("w-6 h-6 transition-colors", isWished ? "fill-gold text-gold" : "text-black")} />
                  </button>
              </div>
              <Link
                to="/checkout"
                className="w-full h-20 border border-black text-black text-[13px] font-bold uppercase tracking-[0.4em] flex items-center justify-center hover:bg-black hover:text-white transition-all"
              >
                Checkout Now
              </Link>
            </div>

            {/* Info Tabs / Badges */}
            <div className="pt-10 border-t border-white/10 grid grid-cols-1 xs:grid-cols-2 gap-8">
              <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center group-hover:border-gold transition-colors">
                  <Truck className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold mb-1">Fast Delivery</h4>
                  <p className="text-[10px] text-gray-500 tracking-wide">Inside Dhaka: 24-48h <br /> Outside Dhaka: 3-5 days</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center group-hover:border-gold transition-colors">
                  <RotateCcw className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold mb-1">7 Days Return</h4>
                  <p className="text-[10px] text-gray-500 tracking-wide">Hassle-free exchange & <br /> return policy.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center group-hover:border-gold transition-colors">
                  <ShieldCheck className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold mb-1">Authentic Quality</h4>
                  <p className="text-[10px] text-gray-500 tracking-wide">100% Genuine Materials <br /> Premium Craftsmanship</p>
                </div>
              </div>
               <div className="flex items-start space-x-3 group">
                <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center group-hover:border-gold transition-colors">
                  <span className="text-gold font-bold text-[10px]">bKash</span>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-bold mb-1">Secure Payment</h4>
                  <p className="text-[10px] text-gray-500 tracking-wide">bKash, Nagad, Visa <br /> & Cash on Delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mt-40 border-t border-white/10 pt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-6 md:space-y-0">
            <div>
              <span className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold">Feedback</span>
              <h2 className="text-4xl font-bold uppercase tracking-tighter">Verified Reviews</h2>
            </div>
            <button className="bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest py-3 px-8 hover:bg-white hover:text-black transition-all">
              Write a Review
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {product.reviews.length > 0 ? (
              product.reviews.map(review => (
                <div key={review.id} className="p-8 border border-white/5 bg-neutral-900/30">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center font-bold text-gold text-xs">
                        {review.user[0]}
                      </div>
                      <div>
                        <div className="text-sm font-bold uppercase tracking-widest">{review.user}</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest">{review.date}</div>
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => <Star key={i} className={cn("w-3 h-3 fill-gold text-gold", i >= review.rating && "text-gray-700 fill-gray-700")} />)}
                    </div>
                  </div>
                  <p className="text-gray-400 leading-relaxed italic">"{review.comment}"</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic uppercase text-xs tracking-widest">No reviews yet for this masterpiece.</p>
            )}
          </div>
        </section>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-black/80 backdrop-blur-lg border-t border-gold/20 z-[90] flex items-center space-x-4">
         <button 
            onClick={handleAddToCart}
            className="flex-grow h-14 bg-gold text-black text-center font-bold uppercase tracking-widest text-[11px] px-4"
          >
            Quick Buy — {formatPrice(product.price)}
         </button>
      </div>

      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
    </div>
  );
}
