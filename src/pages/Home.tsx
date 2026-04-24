
import { motion } from 'motion/react';
import { ArrowRight, Star, Shield, Clock, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data';
import { formatPrice } from '../lib/utils';
import { useState, useEffect } from 'react';

import { ProductCard } from '../components/ProductCard';

export default function Home() {
  const newArrivals = PRODUCTS.slice(0, 4);

  const CATEGORY_IMAGES: Record<string, string> = {
    'T-Shirts': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop',
    'Shirts': 'https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?q=80&w=800&auto=format&fit=crop',
    'Formal Pants': 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop',
    'Jeans': 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop',
    'Panjabi': 'https://images.unsplash.com/photo-1583391733958-d25e07fac662?q=80&w=800&auto=format&fit=crop',
    'Blazer': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
    'Accessories': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop',
  };

  return (
    <div className="flex-grow flex flex-col h-full bg-cream overflow-y-auto overflow-x-hidden custom-scrollbar">
      {/* Hero Header Area - Premium Split Layout */}
      <section className="relative min-h-[85vh] flex items-center border-b border-black/5">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-20 py-16 pb-20 md:py-20 md:pb-32 flex justify-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-12 z-10 flex flex-col items-center"
          >
            <div className="space-y-6">
              <span className="inline-block text-[10px] uppercase tracking-[0.5em] font-bold text-gold border-b border-gold/30 pb-2">The New Standard</span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[6rem] font-serif font-bold italic tracking-tighter leading-[0.9] text-black uppercase">
                Maestro <br /> Collection.
              </h1>
            </div>
            <p className="text-[#57534E] text-lg max-w-md leading-relaxed font-medium">
              Redefining the modern Bangladeshi silhouette. Where heritage craftsmanship meets minimal sophistication in every thread.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-8 pt-4">
              <Link to="/category/T-Shirts" className="w-full sm:w-auto px-12 py-6 bg-black text-white font-bold uppercase tracking-[0.3em] text-[11px] transition-all hover:bg-gold hover:shadow-xl hover:-translate-y-1">
                Explore Shop
              </Link>
              <Link to="/about" className="text-[11px] font-bold uppercase tracking-[0.2em] text-black border-b border-black/20 pb-1 hover:border-gold transition-colors">
                Our Vision
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee Divider */}
      <div className="overflow-hidden whitespace-nowrap bg-black text-white py-4 flex items-center border-y border-gold/20">
        <motion.div
           animate={{ x: [0, -1000] }}
           transition={{ ease: "linear", duration: 20, repeat: Infinity }}
           className="flex gap-10 text-[10px] uppercase tracking-[0.4em] font-bold items-center"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex gap-10 items-center">
              <span>Premium Craftsmanship</span>
              <span className="w-1.5 h-1.5 bg-gold rounded-full" />
              <span>Modern Silhouette</span>
              <span className="w-1.5 h-1.5 bg-gold rounded-full" />
              <span>Timeless Elegance</span>
              <span className="w-1.5 h-1.5 bg-gold rounded-full" />
            </div>
          ))}
        </motion.div>
      </div>

      <section className="max-w-7xl mx-auto w-full flex flex-col px-4 py-16 md:p-20 space-y-24 md:space-y-32">
        {/* Shop by Category Section - Editorial */}
        <div className="space-y-16">
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <span className="text-gold text-[10px] uppercase tracking-[0.4em] font-black">Browse Studio</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold italic text-black">Collections</h2>
            <p className="text-xs uppercase tracking-widest text-[#888888]">Curated essentials for the discerning gentleman</p>
          </div>
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 lg:gap-2 h-auto lg:h-96">
            {Object.entries(CATEGORY_IMAGES).map(([cat, imgUrl]) => (
              <Link 
                key={cat}
                to={`/category/${cat}`}
                className="group relative h-64 md:h-48 lg:h-full flex items-end justify-center overflow-hidden transition-all duration-500 hover:flex-[1.5]"
              >
                <img src={imgUrl} alt={cat} referrerPolicy="no-referrer" className="absolute inset-0 w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 p-6 flex flex-col items-center transform translate-y-2 group-hover:translate-y-0 transition-transform">
                   <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white text-center">{cat}</span>
                   <div className="w-0 h-[1px] bg-gold mt-3 group-hover:w-full transition-all duration-500 delay-100" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-black/5" />

        {/* New Arrivals Section */}
        <div className="space-y-16">
          <div className="flex flex-col md:flex-row justify-between items-end border-b border-black/5 pb-8 gap-6">
            <div className="space-y-2">
              <span className="text-gold text-[10px] uppercase tracking-[0.4em] font-black">Just In</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold italic text-black">New Arrivals</h2>
            </div>
            <Link to="/category/Blazer" className="group text-[10px] font-bold uppercase tracking-widest text-black flex items-center hover:text-gold transition-colors">
              Discover More 
              <span className="w-8 h-[1px] bg-black group-hover:bg-gold ml-4 transition-colors" />
              <ArrowRight className="w-3 h-3 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}
