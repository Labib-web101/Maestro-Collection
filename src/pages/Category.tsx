
import { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { PRODUCTS } from '../data';
import { formatPrice, cn } from '../lib/utils';
import { Star, ArrowRight, Filter, X } from 'lucide-react';

import { ProductCard } from '../components/ProductCard';

export default function CategoryPage() {
  const { category } = useParams();
  
  const [priceMax, setPriceMax] = useState<number>(10000);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'arrivals' | 'low-high' | 'high-low'>('arrivals');
  const [showFiltersMobile, setShowFiltersMobile] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3; // Kept at 3 per page to showcase the feature effectively based on our 4 items per category!

  const categoryProducts = useMemo(() => PRODUCTS.filter(p => p.category === category), [category]);
  const maxCategoryPrice = useMemo(() => Math.max(...categoryProducts.map(p => p.price), 1000), [categoryProducts]);
  const availableSizes = useMemo(() => Array.from(new Set(categoryProducts.flatMap(p => p.sizes))), [categoryProducts]);

  useEffect(() => {
    setSelectedSizes([]);
    setInStockOnly(false);
    setSortBy('arrivals');
    setPriceMax(maxCategoryPrice);
    setShowFiltersMobile(false);
    setCurrentPage(1);
  }, [category, maxCategoryPrice]);

  const filteredProducts = useMemo(() => {
    let result = categoryProducts.filter(p => {
      const matchesPrice = p.price <= priceMax;
      const matchesSize = selectedSizes.length === 0 || p.sizes.some(s => selectedSizes.includes(s));
      const matchesStock = inStockOnly ? p.inStock > 0 : true;
      return matchesPrice && matchesSize && matchesStock;
    });

    result.sort((a, b) => {
      if (sortBy === 'low-high') return a.price - b.price;
      if (sortBy === 'high-low') return b.price - a.price;
      return 0;
    });
    
    return result;
  }, [categoryProducts, priceMax, selectedSizes, inStockOnly, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [priceMax, selectedSizes, inStockOnly, sortBy]);

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
  };

  return (
    <div className="pt-24 pb-20 flex-grow bg-cream">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <header className="mb-12 space-y-6 border-b border-black/5 pb-10">
          <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.4em] text-[#57534E]">
            <Link to="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <span className="text-black font-bold">Collections</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold italic tracking-tight text-black uppercase">{category}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0 text-[10px] uppercase tracking-[0.2em] font-bold">
            <p className="text-[#888888]">Discover our curated selection of {category?.toLowerCase()}</p>
            <div className="flex space-x-6 sm:space-x-10 text-gray-400">
              <button 
                onClick={() => setSortBy('arrivals')}
                className={cn("pb-2 transition-colors", sortBy === 'arrivals' ? "border-b-2 border-gold text-black" : "hover:text-black")}
              >
                Arrivals
              </button>
              <button 
                onClick={() => setSortBy('low-high')}
                className={cn("pb-2 transition-colors", sortBy === 'low-high' ? "border-b-2 border-gold text-black" : "hover:text-black")}
              >
                Low to High
              </button>
              <button 
                onClick={() => setSortBy('high-low')}
                className={cn("pb-2 transition-colors", sortBy === 'high-low' ? "border-b-2 border-gold text-black" : "hover:text-black")}
              >
                High to Low
              </button>
            </div>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Mobile Filter Toggle */}
          <button 
            className="lg:hidden flex items-center justify-center w-full py-4 border border-black/10 text-[11px] font-bold uppercase tracking-widest text-black"
            onClick={() => setShowFiltersMobile(!showFiltersMobile)}
          >
            <Filter className="w-4 h-4 mr-2" />
            {showFiltersMobile ? 'Hide Filters' : 'Show Filters'}
          </button>

          {/* Filters Sidebar */}
          <div className={cn("lg:w-64 flex-shrink-0 space-y-10", showFiltersMobile ? "block" : "hidden lg:block")}>
            {/* Price Filter */}
            <div className="space-y-4">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-black">Maximum Price</h3>
              <div className="space-y-4">
                <input 
                  type="range" 
                  min="0" 
                  max={maxCategoryPrice} 
                  step="100"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full h-1 bg-black/10 appearance-none outline-none focus:outline-none 
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 
                    [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-black 
                    [&::-webkit-slider-thumb]:rounded-full cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-bold text-gray-500">
                  <span>{formatPrice(0)}</span>
                  <span className="text-black">{formatPrice(priceMax)}</span>
                </div>
              </div>
            </div>

            {/* Size Filter */}
            {availableSizes.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-black">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map(size => (
                     <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={cn(
                        "w-10 h-10 border flex items-center justify-center text-[10px] font-bold uppercase transition-all",
                        selectedSizes.includes(size)
                          ? "bg-black border-black text-white"
                          : "border-black/10 text-gray-500 hover:border-black/30"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Availability Filter */}
            <div className="space-y-4 border-t border-black/5 pt-8">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <div className={cn(
                  "w-4 h-4 border flex items-center justify-center transition-colors",
                  inStockOnly ? "bg-black border-black" : "border-black/30 group-hover:border-black"
                )}>
                  {inStockOnly && <X className="w-3 h-3 text-white" />}
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-black">In Stock Only</span>
                <input 
                  type="checkbox" 
                  className="hidden" 
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                />
              </label>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-grow flex flex-col">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 min-h-[400px]">
              {paginatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-16 border-t border-black/5 pt-10">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-10 h-10 flex items-center justify-center border border-black/10 text-sm hover:border-black transition-colors disabled:opacity-30 disabled:hover:border-black/10"
                >
                  &larr;
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={cn(
                      "w-10 h-10 flex items-center justify-center text-[11px] font-bold uppercase transition-all",
                      currentPage === i + 1 
                        ? "bg-black text-white" 
                        : "border border-black/10 hover:border-black text-black"
                    )}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 flex items-center justify-center border border-black/10 text-sm hover:border-black transition-colors disabled:opacity-30 disabled:hover:border-black/10"
                >
                  &rarr;
                </button>
              </div>
            )}

            {filteredProducts.length === 0 && categoryProducts.length > 0 && (
              <div className="py-20 text-center space-y-6">
                <h2 className="text-xl font-serif italic text-[#888888]">No pieces match your filters.</h2>
                <button 
                  onClick={() => {
                    setSelectedSizes([]);
                    setPriceMax(maxCategoryPrice);
                    setInStockOnly(false);
                  }}
                  className="inline-flex items-center text-[11px] font-bold uppercase tracking-[0.3em] text-black border-b border-black/20 pb-1 hover:border-gold transition-all"
                >
                  Clear Filters
                </button>
              </div>
            )}
            
            {categoryProducts.length === 0 && (
              <div className="py-20 text-center space-y-6">
                 <h2 className="text-xl font-serif italic text-[#888888]">New arrivals expected soon.</h2>
                 <Link to="/" className="inline-flex items-center text-[11px] font-bold uppercase tracking-[0.3em] text-black border-b border-black/20 pb-1 hover:border-gold transition-all">
                   Return to Studio
                 </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
