import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Auth() {
  const [step, setStep] = useState<'auth' | 'verify'>('auth');
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (step === 'verify') {
      if (otp.length < 6) {
        setError('Please enter a valid 6-digit code.');
        return;
      }
      // Simulate verification
      setTimeout(() => {
        navigate('/');
      }, 1000);
      return;
    }

    if (!email || !password || (!isLogin && !name)) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!isLogin && !termsAccepted) {
      setError('You must accept the Terms and Conditions to register.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    // Simulate authentication process
    if (isLogin) {
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      // For signups, proceed to verification step
      setTimeout(() => {
        setStep('verify');
        setOtp('');
      }, 800);
    }
  };

  return (
    <div className="pt-24 pb-20 md:pt-32 md:pb-40 bg-cream min-h-[90vh] flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full px-4 md:px-10">
        <Link to="/" className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.3em] text-black/40 hover:text-black mb-12 transition-colors">
          <ChevronLeft className="w-3 h-3 mr-2" /> back to studio
        </Link>
        
        <div className="bg-white border border-black/5 p-8 md:p-12 shadow-2xl shadow-black/5 relative overflow-hidden">
          {/* Decorative side accent */}
          <div className="absolute top-0 left-0 w-1 h-full bg-gold" />

          <div className="text-center mb-10">
            <span className="text-gold text-[10px] uppercase tracking-[0.4em] font-black">
              {step === 'verify' ? 'Authentication' : isLogin ? 'Welcome Back' : 'Join Us'}
            </span>
            <h1 className="text-4xl font-serif font-bold italic tracking-tighter text-black uppercase mt-2">
              {step === 'verify' ? 'Verify Email' : isLogin ? 'Sign In' : 'Create Account'}
            </h1>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-3 bg-red-50 border border-red-100 text-red-600 text-[10px] font-bold uppercase tracking-wider text-center"
            >
              {error}
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {step === 'verify' ? (
              <motion.form 
                key="verify"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                <div className="text-center space-y-4 mb-8">
                  <p className="text-[12px] text-gray-600 font-medium leading-relaxed">
                    We've sent a 6-digit confirmation code to <br/>
                    <span className="font-bold text-black border-b border-black/10 pb-1 inline-block mt-2">{email}</span>
                  </p>
                </div>

                <div className="space-y-2 relative">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Verification Code</label>
                  <input 
                    type="text" 
                    placeholder="XXXXXX"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                    className="w-full text-center bg-[#f9f9f9] border border-black/10 p-4 text-2xl focus:border-gold outline-none tracking-[0.5em] transition-colors"
                  />
                </div>

                <div className="pt-4 space-y-4">
                  <button 
                    type="submit" 
                    className="w-full py-5 bg-black text-white text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-gold transition-colors block text-center"
                  >
                    Verify Account
                  </button>
                  <button 
                    type="button" 
                    onClick={() => {
                      setStep('auth');
                      setError('');
                    }}
                    className="w-full py-4 bg-transparent text-gray-500 hover:text-black text-[11px] font-bold uppercase tracking-widest transition-colors block text-center"
                  >
                    Back to Signup
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.form 
                key={isLogin ? 'login' : 'signup'}
                initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                
                {!isLogin && (
                  <div className="space-y-2 relative">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#f9f9f9] border border-black/10 p-4 pl-12 text-sm focus:border-gold outline-none tracking-wide transition-colors"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2 relative">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="email" 
                      placeholder="mail@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#f9f9f9] border border-black/10 p-4 pl-12 text-sm focus:border-gold outline-none tracking-wide transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2 relative">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Password</label>
                    {isLogin && <button type="button" className="text-[10px] text-gray-500 hover:text-black uppercase tracking-wider font-bold">Forgot?</button>}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#f9f9f9] border border-black/10 p-4 pl-12 pr-12 text-sm focus:border-gold outline-none tracking-wide transition-colors"
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div className="flex items-start space-x-3 pt-2 pb-2">
                    <input 
                      type="checkbox" 
                      id="terms" 
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded-sm border-black/20 text-black focus:ring-black accent-black cursor-pointer"
                    />
                    <label htmlFor="terms" className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed cursor-pointer select-none">
                      I agree to the <Link to="/terms" onClick={(e) => e.stopPropagation()} className="text-black font-bold border-b border-black/20 hover:border-gold transition-colors">Terms and Conditions</Link>
                    </label>
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={!isLogin && !termsAccepted}
                  className={`w-full py-5 mt-4 bg-black text-white text-[11px] font-bold uppercase tracking-[0.3em] transition-all block text-center ${!isLogin && !termsAccepted ? 'opacity-30 cursor-not-allowed bg-black/60' : 'hover:bg-gold'}`}
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                </button>

              </motion.form>
            )}
          </AnimatePresence>

          {step === 'auth' && (
            <div className="mt-8 pt-6 border-t border-black/5 text-center">
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </p>
              <button 
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setPassword('');
                }}
                className="mt-2 text-[11px] font-bold uppercase tracking-widest text-black hover:text-gold transition-colors"
              >
                {isLogin ? 'Create one now' : 'Sign in instead'}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
