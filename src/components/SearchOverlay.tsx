import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS, Product } from '../data';
import { formatPrice } from '../lib/utils';

export function SearchOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (query.trim().length > 0) {
      const lowerQuery = query.toLowerCase();
      const filtered = PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery)
      );
      setResults(filtered.slice(0, 6)); // Top 6 results
    } else {
      setResults([]);
    }
  }, [query]);

  // Handle escape key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when overlay is open
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-cream flex flex-col"
        >
          {/* Header */}
          <div className="h-[100px] border-b border-black/5 flex items-center px-4 md:px-10">
            <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
              <div className="flex-grow flex items-center">
                <Search className="w-5 h-5 md:w-6 md:h-6 text-black/40 mr-4 md:mr-6 flex-shrink-0" />
                <input 
                  type="text"
                  autoFocus
                  placeholder="Search collections..."
                  className="w-full bg-transparent text-xl md:text-4xl font-serif italic text-black placeholder:text-black/20 outline-none truncate"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <button onClick={onClose} className="ml-4 md:ml-10 text-black hover:rotate-90 transition-transform duration-300">
                <X className="w-8 h-8 md:w-10 md:h-10" />
              </button>
            </div>
          </div>

          {/* Results Area */}
          <div className="flex-grow overflow-y-auto px-4 md:px-10 py-12 custom-scrollbar">
            <div className="max-w-7xl mx-auto w-full space-y-10">
              {query.trim().length > 0 ? (
                <>
                  <div className="flex justify-between items-end border-b border-black/5 pb-4">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/40">
                      FOUND {results.length} RESULT{results.length !== 1 && 'S'}
                    </span>
                  </div>

                  {results.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                      {results.map(product => (
                        <Link 
                          key={product.id} 
                          to={`/product/${product.id}`} 
                          onClick={onClose}
                          className="group space-y-4"
                        >
                          <div className="aspect-[3/4] bg-[#F3F2F0] overflow-hidden">
                            <img 
                              src={product.images[0]} 
                              alt={product.name}
                              className="w-full h-full object-cover grayscale brightness-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div>
                            <h3 className="text-[9px] font-bold tracking-[0.2em] uppercase text-black/40 truncate">{product.category}</h3>
                            <h3 className="text-[10px] font-bold tracking-widest uppercase text-black line-clamp-2 mt-1">{product.name}</h3>
                            <p className="text-gold text-[10px] font-bold mt-2">{formatPrice(product.price)}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="py-20 text-center space-y-6">
                      <p className="text-2xl font-serif italic text-black/40">No pieces match your search.</p>
                      <button onClick={() => setQuery('')} className="text-[10px] font-bold uppercase tracking-[0.2em] text-black border-b border-black/20 pb-1 hover:border-gold transition-colors">
                        Clear Search
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="py-20">
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-black/40 border-b border-black/5 pb-4 block mb-8">SUGGESTED</span>
                  <div className="flex flex-wrap gap-4">
                    {['Summer Breeze Panjabi', 'Midnight Black', 'Raw Selvedge', 'Oxford', 'Blazer'].map(suggestion => (
                      <button 
                        key={suggestion}
                        onClick={() => setQuery(suggestion)}
                        className="px-6 py-3 border border-black/10 text-[11px] font-bold uppercase tracking-[0.2em] text-black hover:border-black transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
