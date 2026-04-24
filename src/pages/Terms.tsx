import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <div className="pt-24 pb-40 bg-cream min-h-screen">
      <div className="max-w-3xl mx-auto px-4 md:px-10">
        <Link to="/auth" className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.3em] text-black/40 hover:text-black mb-12 transition-colors">
          <ChevronLeft className="w-3 h-3 mr-2" /> back to registration
        </Link>
        <header className="mb-16">
          <h1 className="text-4xl md:text-6xl font-serif font-bold italic tracking-tighter text-black uppercase mb-4">
            Terms & Conditions
          </h1>
          <p className="text-[#888888] text-sm uppercase tracking-widest font-bold">Last updated: April 18, 2026</p>
        </header>

        <div className="space-y-12 text-[#57534E] leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-black uppercase tracking-widest">1. Introduction</h2>
            <p>
              Welcome to Maestro Collection. By accessing our website and using our services, you agree to be bound by these Terms and Conditions. Please read them carefully before making any purchase or creating an account.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-black uppercase tracking-widest">2. Account Registration</h2>
            <p>
              When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-black uppercase tracking-widest">3. Purchases and Payment</h2>
            <p>
              All purchases made through our website are subject to product availability. We reserve the right to refuse or cancel any order for reasons including but not limited to: product availability, errors in the description or prices, or suspicion of fraudulent transactions.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-black uppercase tracking-widest">4. Intellectual Property</h2>
            <p>
              The Service and its original content, features, and functionality are and will remain the exclusive property of Maestro Collection and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Maestro Collection.
            </p>
          </section>

          <div className="w-full h-[1px] bg-black/10 mt-12 mb-8" />
          
          <p className="text-sm italic">
            For further inquiries regarding these terms, please contact us at <a href="mailto:legal@maestrocollection.com" className="text-black font-bold border-b border-black hover:border-gold transition-colors">legal@maestrocollection.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
