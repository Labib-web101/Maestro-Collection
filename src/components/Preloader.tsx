import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onLoadingComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onLoadingComplete }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      // Wait for exit animation to complete before calling onLoadingComplete
      setTimeout(onLoadingComplete, 800);
    }, 2800);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0A0A0A] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100%', 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          {/* Background Ambient Glow */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/30 via-transparent to-transparent blur-3xl" />
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo Mark Animation */}
            <motion.div
              className="mb-12 overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-gold text-[10px] font-black uppercase tracking-[0.4em] block text-center">
                welcome to maestro collection
              </span>
            </motion.div>

            {/* Title Animation */}
            <div className="overflow-hidden py-2">
              <motion.h1
                className="text-5xl md:text-7xl font-serif font-bold italic tracking-tighter text-white uppercase leading-none"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                Maestro.
              </motion.h1>
            </div>

            {/* Subline Animation */}
            <motion.div
              className="mt-6 flex flex-col items-center space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <p className="text-white/40 text-[10px] uppercase tracking-[0.4em] font-medium">
                Standard of Sophistication
              </p>
              
              {/* Progress Line */}
              <div className="w-32 h-[1px] bg-white/10 relative overflow-hidden">
                <motion.div 
                  className="absolute inset-0 bg-gold"
                  initial={{ x: '-100%' }}
                  animate={{ x: '0%' }}
                  transition={{ duration: 1.8, delay: 1, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>
          </div>

          {/* Abstract corner accents */}
          <motion.div 
            className="absolute top-10 left-10 w-8 h-8 border-t border-l border-gold/40"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          />
          <motion.div 
            className="absolute bottom-10 right-10 w-8 h-8 border-b border-r border-gold/40"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
