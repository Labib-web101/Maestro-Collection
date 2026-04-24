/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Menu, X, Instagram, Facebook, Phone as WhatsApp, Mail, Search, ArrowRight, Home as HomeIcon, Heart, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn, formatPrice } from './lib/utils';
import { CartProvider, useCart } from './context/CartContext';
import { WishlistProvider, useWishlist } from './context/WishlistContext';
import { CartDrawer } from './components/CartDrawer';
import { SearchOverlay } from './components/SearchOverlay';
import { Preloader } from './components/Preloader';

// --- Pages ---
import Home from './pages/Home';
import CategoryPage from './pages/Category';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import TrackOrder from './pages/TrackOrder';
import Auth from './pages/Auth';
import Terms from './pages/Terms';

function UrgencyBar() {
  return (
    <div className="h-10 bg-gold text-black flex items-center justify-center text-[11px] font-bold uppercase tracking-[0.2em] relative z-[60]">
      Flash Sale: 20% OFF Today Only — Ends in 04:59:12
    </div>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  return (
    <>
      <nav className="h-[70px] border-b border-black/5 bg-cream flex items-center relative z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-10 w-full flex justify-between items-center">
          <Link to="/" className="text-2xl font-serif font-bold tracking-[0.2em] text-black uppercase transition-opacity hover:opacity-80">
            MAESTRO COLLECTION
          </Link>

          <div className="flex items-center space-x-6">
            <Link to="/auth" className="relative group cursor-pointer flex items-center">
              <User className="w-5 h-5 text-black hover:text-gold transition-colors" />
            </Link>
            <Link to="/wishlist" className="relative group cursor-pointer flex items-center">
              <Heart className="w-5 h-5 text-black hover:text-gold transition-colors" />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <div className="relative group cursor-pointer flex items-center" onClick={() => setIsSearchOpen(true)}>
              <Search className="w-4 h-4 text-black opacity-40 hover:opacity-100 transition-opacity" />
            </div>
            <div className="relative group cursor-pointer flex items-center" onClick={() => setIsCartOpen(true)}>
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-black group-hover:text-gold transition-colors" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                    {totalItems}
                  </span>
                )}
              </div>
            </div>
            <button className="text-black hover:text-gold transition-colors" onClick={() => setIsOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 bg-cream z-50 p-10 flex flex-col pt-20"
            >
              <div className="absolute top-10 right-10">
                <button onClick={() => setIsOpen(false)} className="text-black"><X className="w-8 h-8" /></button>
              </div>
              <div className="mt-10 flex flex-col space-y-6 font-serif text-2xl md:text-3xl italic text-black overflow-y-auto">
                <Link to="/category/T-Shirts" onClick={() => setIsOpen(false)}>T-Shirts</Link>
                <Link to="/category/Shirts" onClick={() => setIsOpen(false)}>Shirts</Link>
                <Link to="/category/Formal Pants" onClick={() => setIsOpen(false)}>Formal Pants</Link>
                <Link to="/category/Jeans" onClick={() => setIsOpen(false)}>Jeans</Link>
                <Link to="/category/Panjabi" onClick={() => setIsOpen(false)}>Panjabi</Link>
                <Link to="/category/Blazer" onClick={() => setIsOpen(false)}>Blazer</Link>
                <Link to="/category/Accessories" onClick={() => setIsOpen(false)}>Accessories</Link>
                <Link to="/about" onClick={() => setIsOpen(false)} className="text-base md:text-lg font-sans not-italic uppercase tracking-widest pt-10 border-t border-black/5">About Us</Link>
                <Link to="/contact" onClick={() => setIsOpen(false)} className="text-base md:text-lg font-sans not-italic uppercase tracking-widest">Contact Us</Link>
                <Link to="/track" onClick={() => setIsOpen(false)} className="text-base md:text-lg font-sans not-italic uppercase tracking-widest">Track Order</Link>
                <Link to="/auth" onClick={() => setIsOpen(false)} className="text-base md:text-lg font-sans not-italic uppercase tracking-widest text-gold text-bold">Sign In / Register</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}

function Footer() {
  return (
    <footer className="py-12 md:py-16 bg-[#F9F8F6] border-t border-black/5 relative z-10 text-black/60">
      <div className="max-w-7xl mx-auto px-4 md:px-10 w-full space-y-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 border-b border-black/5 pb-10">
          <div className="space-y-4 md:col-span-1">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black">Maestro Collection</h4>
            <p className="text-[12px] leading-relaxed text-gray-500">
              Redefining modern wardrobe for the style-conscious men in Bangladesh. Crafting excellence since 2024. Your premier destination for timeless sophistication and contemporary designs.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black">Visit Us</h4>
            <address className="text-[11px] not-italic leading-relaxed text-gray-500 uppercase tracking-widest">
              Savar New Market, Savar, Shop #A1, Level-3, Dhaka-1340<br/>
              Anam Rangs Plaza, Dhanmondi, Shop# 18,19, Level-2,3, Dhaka-1205
            </address>
          </div>
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black">Contact</h4>
            <div className="flex flex-col space-y-2 text-[11px] uppercase tracking-widest text-gray-500">
              <a href="tel:+8801712756177" className="hover:text-black transition-colors">01712756177</a>
              <a href="mailto:maestrocollection01@gmail.com" className="hover:text-black transition-colors lowercase tracking-normal">maestrocollection01@gmail.com</a>
            </div>
            <div className="flex gap-4 pt-2">
              <WhatsApp className="w-4 h-4 hover:text-gold transition-colors cursor-pointer text-black" />
              <Facebook className="w-4 h-4 hover:text-gold transition-colors cursor-pointer text-black" />
              <Instagram className="w-4 h-4 hover:text-gold transition-colors cursor-pointer text-black" />
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black">Explore</h4>
            <div className="flex flex-col space-y-2 text-[11px] uppercase tracking-widest text-gray-500 underline-offset-4 decoration-black/10">
              <Link to="/about" className="hover:text-black transition-colors">Story</Link>
              <Link to="/track" className="hover:text-black transition-colors">Track Order</Link>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-widest font-medium opacity-60">
          <p>© 2026 Maestro Collection. All rights Reserved.</p>
          <div className="flex flex-wrap items-center gap-4 text-[9px] font-bold">
            <span>Payment Methods:</span>
            <span className="border border-black/10 px-2 py-1">Visa</span>
            <span className="border border-black/10 px-2 py-1">Amex</span>
            <span className="border border-black/10 px-2 py-1">bKash</span>
            <span className="border border-black/10 px-2 py-1">Nagad</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppFloating() {
  return (
    <a 
      href="https://wa.me/8801712756177" 
      target="_blank" 
      rel="noreferrer"
      className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] bg-green-500 text-white p-3 md:p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group"
    >
      <WhatsApp className="w-5 h-5 md:w-6 md:h-6 fill-white" />
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black text-white text-[10px] py-1 px-3 rounded uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
        Chat with us
      </span>
    </a>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Router>
      <WishlistProvider>
        <CartProvider>
          <Preloader onLoadingComplete={() => setIsLoading(false)} />
          
          <div className={cn(
            "min-h-screen flex flex-col bg-cream overflow-x-hidden selection:bg-gold selection:text-white transition-opacity duration-1000",
            isLoading ? "opacity-0" : "opacity-100"
          )}>
            <UrgencyBar />
            <Navbar />
            <main className="flex-grow flex flex-col">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/category/:category" element={<CategoryPage />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/track" element={<TrackOrder />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/terms" element={<Terms />} />
              </Routes>
            </main>
            <Footer />
            <WhatsAppFloating />
            <CartDrawer />
          </div>
        </CartProvider>
      </WishlistProvider>
    </Router>
  );
}
