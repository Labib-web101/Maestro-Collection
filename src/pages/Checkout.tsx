import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/utils';
import { CheckCircle2, ChevronLeft, CreditCard, Truck, ShieldCheck, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PaymentGatewayOverlay } from '../components/PaymentGateway';

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const [isOrdered, setIsOrdered] = useState(false);
  const [isGatewayOpen, setIsGatewayOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Dhaka',
    method: 'Cash on Delivery'
  });

  if (cart.length === 0 && !isOrdered) {
    return (
      <div className="pt-40 pb-20 text-center space-y-8 bg-cream min-h-screen">
        <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8 text-black/20" />
        </div>
        <h2 className="text-3xl font-serif italic text-black font-bold uppercase tracking-tight">Your wardrobe is empty</h2>
        <Link to="/" className="inline-block px-12 py-5 bg-black text-white text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-gold transition-all">
          Explore Projects
        </Link>
      </div>
    );
  }

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.method === 'Cash on Delivery') {
      processOrderSuccess();
    } else {
      setIsGatewayOpen(true);
    }
  };

  const processOrderSuccess = () => {
    setIsGatewayOpen(false);
    setIsOrdered(true);
    clearCart();
    window.scrollTo(0, 0);
  };

  if (isOrdered) {
    return (
      <div className="pt-40 pb-40 px-10 bg-cream min-h-screen flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-8"
        >
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto text-white shadow-2xl">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-serif font-bold italic text-black uppercase tracking-tight leading-none">Order Confirmed.</h1>
            <p className="text-[#57534E] text-sm uppercase tracking-widest leading-loose">
              Thank you for choosing Maestro Collection. <br /> Our concierge will contact you shortly for confirmation.
            </p>
          </div>
          <div className="pt-8 flex flex-col space-y-4">
            <Link to="/" className="w-full py-5 bg-black text-white text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-gold transition-all">
              Return to Catalog
            </Link>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Order Reference: #MC-{Math.floor(Math.random() * 90000 + 10000)}</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 md:pt-32 md:pb-40 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <Link to="/" className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.3em] text-black/40 hover:text-black mb-12 transition-colors">
          <ChevronLeft className="w-3 h-3 mr-2" /> back to studio
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Form */}
          <div className="space-y-12">
            <div className="space-y-2">
              <span className="text-gold text-[10px] uppercase tracking-[0.4em] font-black">Final Stage</span>
              <h1 className="text-3xl md:text-5xl font-serif font-bold italic tracking-tighter text-black uppercase">Shipping Details</h1>
            </div>

            <form onSubmit={handleCheckoutSubmit} className="space-y-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Full Name</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="e.g. Adnan Mahmud"
                    className="w-full bg-white border-b border-black/10 p-4 text-sm focus:border-gold outline-none transition-colors"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Phone Number</label>
                  <input 
                    required 
                    type="tel" 
                    placeholder="+880"
                    className="w-full bg-white border-b border-black/10 p-4 text-sm focus:border-gold outline-none transition-colors"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Detailed Address</label>
                  <textarea 
                    required 
                    rows={3}
                    placeholder="House, Street, Area"
                    className="w-full bg-white border-b border-black/10 p-4 text-sm focus:border-gold outline-none transition-colors resize-none"
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-10">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">City</label>
                    <select 
                      className="w-full bg-white border-b border-black/10 p-4 text-sm focus:border-gold outline-none transition-colors"
                      value={formData.city}
                      onChange={e => setFormData({...formData, city: e.target.value})}
                    >
                      <option>Dhaka</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Payment</label>
                    <select 
                      className="w-full bg-white border-b border-black/10 p-4 text-sm focus:border-gold outline-none transition-colors"
                      value={formData.method}
                      onChange={e => setFormData({...formData, method: e.target.value})}
                    >
                      <option>Cash on Delivery</option>
                      <option>Visa</option>
                      <option>American Express</option>
                      <option>bKash</option>
                      <option>Nagad</option>
                    </select>
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-8 bg-black text-white text-[13px] font-bold uppercase tracking-[0.4em] hover:bg-gold transition-all shadow-2xl shadow-black/10"
              >
                Place Final Order
              </button>
            </form>

            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-black/5 opacity-40">
              <div className="flex flex-col items-center text-center space-y-2">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-[8px] uppercase tracking-widest font-bold">Secure</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <Truck className="w-5 h-5" />
                <span className="text-[8px] uppercase tracking-widest font-bold">Fast Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <CreditCard className="w-5 h-5" />
                <span className="text-[8px] uppercase tracking-widest font-bold">COD Available</span>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:sticky lg:top-32 bg-white border border-black/5 p-6 md:p-12 space-y-10 shadow-sm">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.4em] text-black/60 border-b border-black/5 pb-6">Wardrobe Summary</h2>
            <div className="space-y-8 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
              {cart.map(item => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                  <div className="w-16 h-20 bg-[#F3F2F0] flex-shrink-0">
                    <img src={item.images[0]} alt="" className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-grow space-y-1">
                    <div className="flex justify-between items-start">
                       <h3 className="text-[11px] font-bold uppercase tracking-widest text-black line-clamp-1">{item.name}</h3>
                       <span className="text-[11px] font-bold text-black">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                    <p className="text-[9px] uppercase tracking-widest text-[#888888]">Size: {item.selectedSize} • Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-black/5">
              <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-[#888888]">
                <span>Total Items</span>
                <span className="text-black font-bold">{cart.reduce((s, i) => s + i.quantity, 0)}</span>
              </div>
              <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-[#888888]">
                <span>Delivery</span>
                <span className="text-black font-bold">Free</span>
              </div>
              <div className="flex justify-between items-center pt-4 mt-2 border-t border-black/10">
                <span className="text-[13px] font-bold uppercase tracking-widest text-black">Order Total</span>
                <span className="text-2xl font-serif font-bold italic text-gold">{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isGatewayOpen && (
        <PaymentGatewayOverlay 
          method={formData.method}
          amount={totalPrice}
          isOpen={isGatewayOpen}
          onSuccess={processOrderSuccess}
          onCancel={() => setIsGatewayOpen(false)}
        />
      )}
    </div>
  );
}
