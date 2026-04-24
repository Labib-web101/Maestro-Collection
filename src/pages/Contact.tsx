
import { motion } from 'motion/react';
import { Phone as WhatsApp, Mail, MapPin, Instagram, Facebook, ArrowRight } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-24 pb-40 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-10">
        <header className="mb-24 space-y-4">
          <span className="text-gold text-[10px] uppercase tracking-[0.5em] font-bold">Connect With Our Studio</span>
          <h1 className="text-7xl font-serif font-bold italic tracking-tight uppercase leading-[0.9] text-black">THE ADVISORY <br /> SERVICE.</h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="space-y-16">
            <p className="text-[#57534E] text-xl leading-relaxed max-w-md font-medium">
              We provide tailored advice on sizing, fits, and custom collection inquiries for the Maestro family.
            </p>

            <div className="space-y-10">
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 border border-black/5 flex items-center justify-center text-gold shadow-sm">
                  <WhatsApp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-2 text-[#888888]">Direct Communication</h4>
                  <p className="text-xl font-serif font-bold italic tracking-tight text-black">+880 1712 756 177</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 border border-black/5 flex items-center justify-center text-gold shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-2 text-[#888888]">Inquiry Channel</h4>
                  <p className="text-xl font-serif font-bold italic tracking-tight text-black">maestrocollection01@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="w-12 h-12 border border-black/5 flex items-center justify-center text-gold shadow-sm">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-2 text-[#888888]">Studio Locations</h4>
                  <p className="text-sm font-bold uppercase tracking-widest text-black mb-1">Savar Branch</p>
                  <address className="text-[11px] not-italic leading-relaxed text-[#57534E] uppercase tracking-widest mb-4">
                    Savar New Market, Savar, Shop #A1, Level-3, Dhaka-1340
                  </address>
                  
                  <p className="text-sm font-bold uppercase tracking-widest text-black mb-1">Dhanmondi Branch</p>
                  <address className="text-[11px] not-italic leading-relaxed text-[#57534E] uppercase tracking-widest">
                    Anam Rangs Plaza, Dhanmondi, Shop# 18,19, Level-2,3, Dhaka-1205
                  </address>
                </div>
              </div>
            </div>
          </div>

          <form className="bg-white border border-black/[0.03] p-10 md:p-16 space-y-10 relative shadow-2xl">
            <div className="space-y-4">
              <h2 className="text-2xl font-serif font-bold italic text-black">Send a Brief</h2>
              <p className="text-[11px] uppercase tracking-widest text-[#888888]">Required fields marked with an asterisk (*)</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-black opacity-60">Full Name *</label>
                <input type="text" className="w-full bg-transparent border-b border-black/5 py-4 text-sm focus:outline-none focus:border-gold transition-colors" placeholder="e.g. Arman Hossein" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-black opacity-60">Identity / Email *</label>
                <input type="email" className="w-full bg-transparent border-b border-black/5 py-4 text-sm focus:outline-none focus:border-gold transition-colors" placeholder="email@maestro.com" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-black opacity-60">Message *</label>
              <textarea rows={4} className="w-full bg-transparent border-b border-black/5 py-4 text-sm focus:outline-none focus:border-gold transition-colors resize-none" placeholder="How can our studio assist you today?"></textarea>
            </div>

            <button className="w-full bg-black text-white py-6 text-[12px] font-bold uppercase tracking-[0.4em] hover:bg-gold transition-all flex items-center justify-center group shadow-xl shadow-black/10">
              Deliver Message
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
