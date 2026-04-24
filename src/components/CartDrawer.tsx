import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/utils';
import { Link } from 'react-router-dom';

export function CartDrawer() {
  const { cart, removeFromCart, updateQuantity, totalPrice, isCartOpen, setIsCartOpen } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 z-[100] backdrop-blur-[2px]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full md:w-[450px] bg-cream z-[101] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-black/5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-gold" />
                <h2 className="text-xl font-serif font-bold italic text-black">Your Collection</h2>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-black/5 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-black" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-grow overflow-y-auto custom-scrollbar p-8">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center space-y-6 text-center">
                  <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 text-black/20" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-black font-serif text-xl italic font-bold">Your collection is empty</p>
                    <p className="text-gray-500 text-sm">Every masterpiece starts with a single piece.</p>
                  </div>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="px-8 py-3 bg-black text-white text-[11px] font-bold uppercase tracking-widest hover:bg-gold transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.selectedSize}`} className="flex gap-6 group">
                      <div className="w-24 h-32 bg-[#F3F2F0] flex-shrink-0 relative overflow-hidden">
                        <img 
                          src={item.images[0]} 
                          alt={item.name} 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-grow flex flex-col justify-between py-1">
                        <div className="space-y-1">
                          <div className="flex justify-between items-start">
                            <h3 className="text-[13px] font-bold uppercase tracking-widest text-black line-clamp-1">{item.name}</h3>
                            <button 
                              onClick={() => removeFromCart(item.id, item.selectedSize)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-[10px] uppercase tracking-widest text-gold font-bold">Size: {item.selectedSize}</p>
                          <p className="text-[12px] font-medium text-gray-500">{formatPrice(item.price)}</p>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center border border-black/5 bg-white">
                            <button 
                              disabled={item.quantity <= 1}
                              onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                              className="p-1.5 hover:bg-black/5 disabled:opacity-20 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-[12px] font-bold">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                              className="p-1.5 hover:bg-black/5 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-[12px] font-bold text-black ml-auto">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 bg-white border-t border-black/5 space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[11px] uppercase tracking-[0.2em] text-gray-400">
                    <span>Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] uppercase tracking-[0.2em] text-gray-400">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 mt-2 border-t border-black/5">
                    <span className="text-[13px] font-bold uppercase tracking-widest text-black">Total</span>
                    <span className="text-xl font-serif font-bold italic text-gold">{formatPrice(totalPrice)}</span>
                  </div>
                </div>
                
                <Link 
                  to="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-6 bg-black text-white text-[13px] font-bold uppercase tracking-[0.3em] hover:bg-gold transition-all active:scale-[0.98] shadow-2xl shadow-black/10 flex items-center justify-center text-center"
                >
                  Checkout Now
                </Link>
                
                <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest">
                  Secure Payment Gateway • Premium Packaging
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
