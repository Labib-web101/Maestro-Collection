import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { formatPrice } from '../lib/utils';
import { X, Smartphone, CreditCard as CardIcon, CheckCircle2, Lock } from 'lucide-react';

interface PaymentGatewayProps {
  method: string;
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
  isOpen: boolean;
}

export function PaymentGatewayOverlay({ method, amount, onSuccess, onCancel, isOpen }: PaymentGatewayProps) {
  const [step, setStep] = useState<'details' | 'otp' | 'pin' | 'processing'>('details');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [pin, setPin] = useState('');
  
  // Card specific state
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardName, setCardName] = useState('');

  const [error, setError] = useState('');

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setStep('details');
      setPhone('');
      setOtp('');
      setPin('');
      setCardNumber('');
      setExpiry('');
      setCvc('');
      setCardName('');
      setError('');
    }
  }, [isOpen]);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (method === 'bKash' || method === 'Nagad') {
      if (step === 'details') {
        if (phone.length < 11) return setError('Please enter a valid 11-digit mobile number');
        setStep('otp');
      } else if (step === 'otp') {
        if (otp.length < 4) return setError('Please enter valid verification code');
        setStep('pin');
      } else if (step === 'pin') {
        if (pin.length < 4) return setError('Please enter valid PIN');
        setStep('processing');
        fakeProcess();
      }
    } else if (method === 'Visa' || method === 'American Express') {
      if (cardNumber.length < 15 || !expiry || !cvc || !cardName) {
        return setError('Please fill all card details correctly');
      }
      setStep('processing');
      fakeProcess();
    }
  };

  const fakeProcess = () => {
    setTimeout(() => {
      onSuccess();
    }, 2500); // Simulate network request
  };

  if (!isOpen) return null;

  const isBkash = method === 'bKash';
  const isNagad = method === 'Nagad';

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[120] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div 
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="bg-white max-w-md w-full shadow-2xl overflow-hidden relative"
        >
          {step === 'processing' ? (
             <div className="p-16 flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 border-4 border-black/10 border-t-gold rounded-full animate-spin" />
                <h3 className="text-xl font-serif font-bold italic">Processing Payment...</h3>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Please do not close this window</p>
             </div>
          ) : isBkash || isNagad ? (
            /* MOBILE WALLET GATEWAY (bKash / Nagad) */
            <div className="w-full bg-[#fdfdfd]">
              {/* Official-looking Header */}
              <div className={`p-4 text-center text-white relative ${isBkash ? 'bg-[#E2136E]' : 'bg-[#F7931E]'}`}>
                 <button onClick={onCancel} className="absolute right-4 top-4 hover:opacity-70 transition-opacity"><X className="w-5 h-5"/></button>
                 <div className="flex items-center justify-center space-x-2">
                   <Smartphone className="w-6 h-6 opacity-90" />
                   <h2 className="text-lg font-bold tracking-widest">{method} Payment</h2>
                 </div>
              </div>

              {/* Invoice Strip */}
              <div className={`px-6 py-4 flex justify-between items-center text-white ${isBkash ? 'bg-[#b30f57]' : 'bg-[#d87c14]'}`}>
                 <div className="flex flex-col">
                   <span className="text-[11px] font-medium tracking-wide">Maestro Collection</span>
                   {isBkash && <span className="text-[10px] opacity-80 mt-0.5">Merchant: 01612756178</span>}
                 </div>
                 <div className="text-xl font-bold tracking-tight">{formatPrice(amount)}</div>
              </div>

              {/* Form Body */}
              <div className="p-8 space-y-8">
                 {error && <div className="p-3 bg-red-50 text-red-600 text-[11px] font-bold uppercase tracking-wider text-center border border-red-100">{error}</div>}
                 
                 <form onSubmit={handleNext} className="space-y-6">
                   {step === 'details' && (
                     <div className="text-center space-y-4">
                       <p className="text-[12px] text-gray-600 font-medium">Your {method} Account Number</p>
                       <input 
                         autoFocus
                         type="tel"
                         value={phone}
                         onChange={e => setPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 11))}
                         placeholder="e.g 01XXXXXXXXX"
                         className={`w-full text-center text-2xl tracking-widest p-4 pb-2 border-b-2 bg-transparent outline-none transition-colors ${isBkash ? 'focus:border-[#E2136E] border-gray-200' : 'focus:border-[#F7931E] border-gray-200'}`}
                       />
                       <p className="text-[10px] text-gray-400">By continuing, you agree to the Terms and Conditions.</p>
                     </div>
                   )}

                   {step === 'otp' && (
                     <div className="text-center space-y-4">
                       <p className="text-[12px] text-gray-600 font-medium">Verification Code sent to <span className="font-bold">{phone}</span></p>
                       <input 
                         autoFocus
                         type="text"
                         value={otp}
                         onChange={e => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                         placeholder="XXXXXX"
                         className={`w-full text-center text-2xl tracking-[0.5em] p-4 pb-2 border-b-2 bg-transparent outline-none transition-colors ${isBkash ? 'focus:border-[#E2136E] border-gray-200' : 'focus:border-[#F7931E] border-gray-200'}`}
                       />
                     </div>
                   )}

                   {step === 'pin' && (
                     <div className="text-center space-y-4">
                       <p className="text-[12px] text-gray-600 font-medium">Enter your {method} PIN</p>
                       <input 
                         autoFocus
                         type="password"
                         value={pin}
                         onChange={e => setPin(e.target.value.replace(/[^0-9]/g, '').slice(0, 5))}
                         placeholder="••••"
                         className={`w-full text-center text-3xl tracking-[0.5em] p-4 pb-2 border-b-2 bg-transparent outline-none transition-colors ${isBkash ? 'focus:border-[#E2136E] border-gray-200' : 'focus:border-[#F7931E] border-gray-200'}`}
                       />
                     </div>
                   )}

                   <div className="flex justify-between gap-4 pt-6">
                     <button type="button" onClick={onCancel} className="w-1/2 py-4 bg-gray-100 text-gray-600 text-[11px] font-bold uppercase tracking-widest transition-colors hover:bg-gray-200 rounded-sm">
                       Cancel
                     </button>
                     <button type="submit" className={`w-1/2 py-4 text-white text-[11px] font-bold uppercase tracking-widest transition-opacity hover:opacity-90 rounded-sm ${isBkash ? 'bg-[#E2136E]' : 'bg-[#F7931E]'}`}>
                       {step === 'pin' ? 'Pay Now' : 'Proceed'}
                     </button>
                   </div>
                 </form>
                 
                 <div className="text-center pt-2 opacity-50 flex items-center justify-center space-x-1.5">
                   <Lock className="w-3 h-3" />
                   <span className="text-[9px] uppercase tracking-widest font-bold">Encrypted via Secure Gateway</span>
                 </div>
              </div>
            </div>
          ) : (
            /* DEBIT / CREDIT CARD GATEWAY (Stripe-like) */
            <div className="w-full bg-[#fdfdfd]">
              <div className="p-6 border-b border-black/5 flex justify-between items-center bg-white">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded bg-blue-50 flex items-center justify-center">
                    <CardIcon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-gray-900">Pay with Card</span>
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">Maestro Collection</span>
                  </div>
                </div>
                <button onClick={onCancel} className="text-gray-400 hover:text-black transition-colors"><X className="w-5 h-5"/></button>
              </div>

              <div className="p-8 space-y-8">
                <div className="flex justify-between items-center bg-gray-50 p-4 rounded border border-gray-100">
                   <span className="text-xs font-semibold text-gray-600">Total Due</span>
                   <span className="text-xl font-bold text-gray-900">{formatPrice(amount)}</span>
                </div>

                {error && <div className="p-3 bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-wider border border-red-100 rounded text-center">{error}</div>}

                <form onSubmit={handleNext} className="space-y-6">
                  {/* Stripe-like grouped inputs */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-semibold text-gray-700">Card Information</label>
                    <div className="border border-gray-200 rounded bg-white overflow-hidden shadow-sm focus-within:ring-1 focus-within:ring-black focus-within:border-black transition-all">
                      <input 
                        autoFocus
                        type="text" 
                        maxLength={19}
                        placeholder="0000 0000 0000 0000"
                        className="w-full p-4 text-sm outline-none tracking-widest text-gray-900 placeholder-gray-400 border-b border-gray-100"
                        value={cardNumber}
                        onChange={e => {
                          const val = e.target.value.replace(/\D/g, '');
                          const formatted = val.replace(/(\d{4})/g, '$1 ').trim();
                          setCardNumber(formatted);
                        }}
                      />
                      <div className="flex">
                        <input 
                          type="text" 
                          maxLength={5}
                          placeholder="MM / YY"
                          className="w-1/2 p-4 text-sm outline-none tracking-wider text-gray-900 placeholder-gray-400 border-r border-gray-100"
                          value={expiry}
                          onChange={e => {
                            let val = e.target.value.replace(/\D/g, '');
                            if (val.length >= 2) val = val.substring(0, 2) + ' / ' + val.substring(2, 4);
                            setExpiry(val);
                          }}
                        />
                        <input 
                          type="password" 
                          maxLength={4}
                          placeholder="CVC"
                          className="w-1/2 p-4 text-sm outline-none tracking-wider text-gray-900 placeholder-gray-400"
                          value={cvc}
                          onChange={e => setCvc(e.target.value.replace(/\D/g, ''))}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="text-[11px] font-semibold text-gray-700">Name on Card</label>
                    <input 
                      type="text" 
                      placeholder="e.g. John Doe"
                      className="w-full border border-gray-200 shadow-sm rounded bg-white p-4 text-sm outline-none text-gray-900 placeholder-gray-400 focus:border-black focus:ring-1 focus:ring-black transition-all uppercase tracking-wider"
                      value={cardName}
                      onChange={e => setCardName(e.target.value.toUpperCase())}
                    />
                  </div>

                  <button type="submit" className="w-full mt-8 py-4 bg-black text-white text-[12px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors rounded shadow-lg shadow-black/10 flex items-center justify-center space-x-2">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Pay {formatPrice(amount)}</span>
                  </button>
                </form>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
