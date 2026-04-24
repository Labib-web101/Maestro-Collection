import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Package, Clock, Truck, CheckCircle2, ChevronLeft, Search, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TrackingState {
  id: string;
  status: 'processing' | 'shipped' | 'delivered';
  date: string;
}

export default function TrackOrder() {
  const [orderId, setOrderId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [trackingResult, setTrackingResult] = useState<TrackingState | null>(null);
  const [error, setError] = useState('');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setIsLoading(true);
    setError('');
    setTrackingResult(null);

    // Simulate network request and simple deterministic tracking logic based on the Order ID entered
    setTimeout(() => {
      setIsLoading(false);
      const normalizedId = orderId.toUpperCase().trim();
      
      if (normalizedId.replace(/[^0-9]/g, '').length < 4) {
        setError("Invalid Order ID. Please enter a valid Reference Number (e.g., #MC-12345).");
        return;
      }

      // Create a deterministic but fake status based on the chars in the ID
      const charCodeSum = normalizedId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      
      let status: TrackingState['status'] = 'processing';
      if (charCodeSum % 3 === 1) status = 'shipped';
      if (charCodeSum % 3 === 2) status = 'delivered';

      setTrackingResult({
        id: normalizedId.startsWith('#') ? normalizedId : `#${normalizedId}`,
        status,
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
      });

    }, 1200);
  };

  const currentStepIndex = trackingResult 
    ? trackingResult.status === 'processing' ? 1 
    : trackingResult.status === 'shipped' ? 2 
    : 3 
    : 0;

  return (
    <div className="pt-24 pb-20 md:pt-32 md:pb-40 bg-cream min-h-screen flex flex-col justify-center">
      <div className="max-w-3xl mx-auto w-full px-4 md:px-10">
        <Link to="/" className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.3em] text-black/40 hover:text-black mb-12 transition-colors">
          <ChevronLeft className="w-3 h-3 mr-2" /> back to studio
        </Link>
        
        <div className="space-y-4 text-center mb-12 md:mb-16">
          <span className="text-gold text-[10px] uppercase tracking-[0.4em] font-black">Concierge Services</span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold italic tracking-tighter text-black uppercase">Track Order</h1>
          <p className="text-[11px] uppercase tracking-widest text-gray-500 max-w-sm mx-auto leading-relaxed pt-4 relative">
            Enter your Order Reference Number below to trace the journey of your selection.
          </p>
        </div>

        <form onSubmit={handleTrack} className="flex relative max-w-lg mx-auto shadow-sm">
          <input 
            type="text" 
            placeholder="e.g. #MC-93481"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="flex-grow p-5 text-sm bg-white border border-r-0 border-black/10 focus:border-gold outline-none tracking-widest uppercase transition-colors"
          />
          <button 
            type="submit" 
            disabled={isLoading || !orderId.trim()}
            className="bg-black text-white px-8 flex items-center justify-center hover:bg-gold transition-colors disabled:bg-black/40 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
          </button>
        </form>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-lg mx-auto mt-6 p-4 bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-wider text-center border border-red-100"
            >
              {error}
            </motion.div>
          )}

          {trackingResult && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-lg mx-auto mt-12 md:mt-20 bg-white border border-black/5 p-6 md:p-10 space-y-8 md:space-y-12 shadow-2xl shadow-black/5"
            >
              <div className="flex justify-between items-center border-b border-black/5 pb-6">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-1">Tracking ID</div>
                  <div className="text-xl font-serif font-bold italic tracking-widest">{trackingResult.id}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 mb-1">Order Date</div>
                  <div className="text-xs font-bold uppercase tracking-widest text-[#57534E]">{trackingResult.date}</div>
                </div>
              </div>

              <div className="relative">
                {/* Connecting Line */}
                <div className="absolute left-[20px] top-[30px] bottom-[30px] w-0.5 bg-gray-100"></div>
                <div 
                  className="absolute left-[20px] top-[30px] w-0.5 bg-black transition-all duration-1000"
                  style={{ height: currentStepIndex === 1 ? '10%' : currentStepIndex === 2 ? '50%' : '100%' }}
                ></div>

                <div className="space-y-8 relative z-10">
                  {/* Step 1: Processing */}
                  <div className="flex gap-6 items-start opacity-100">
                    <div className={`w-10 h-10 rounded flex items-center justify-center flex-shrink-0 transition-colors ${currentStepIndex >= 1 ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'}`}>
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className={`text-[11px] font-bold uppercase tracking-widest ${currentStepIndex >= 1 ? 'text-black' : 'text-gray-400'}`}>Processing</h4>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Your order is being prepared and packed in our studio.</p>
                    </div>
                  </div>

                  {/* Step 2: Shipped */}
                  <div className={`flex gap-6 items-start ${currentStepIndex >= 2 ? 'opacity-100' : 'opacity-40'}`}>
                    <div className={`w-10 h-10 rounded flex items-center justify-center flex-shrink-0 transition-colors ${currentStepIndex >= 2 ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'}`}>
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className={`text-[11px] font-bold uppercase tracking-widest ${currentStepIndex >= 2 ? 'text-black' : 'text-gray-400'}`}>Shipped</h4>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">The package has left our facility and is out for delivery.</p>
                    </div>
                  </div>

                  {/* Step 3: Delivered */}
                  <div className={`flex gap-6 items-start ${currentStepIndex >= 3 ? 'opacity-100' : 'opacity-40'}`}>
                    <div className={`w-10 h-10 rounded flex items-center justify-center flex-shrink-0 transition-colors ${currentStepIndex >= 3 ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className={`text-[11px] font-bold uppercase tracking-widest ${currentStepIndex >= 3 ? 'text-green-500' : 'text-gray-400'}`}>Delivered</h4>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Order has been delivered successfully. Thank you!</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
