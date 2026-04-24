
import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="pt-24 pb-40 bg-cream">
      <div className="max-w-7xl mx-auto px-10">
        <header className="mb-24 text-center max-w-4xl mx-auto space-y-8">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold text-[10px] uppercase tracking-[0.6em] font-bold"
          >
            Since 2024
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-7xl md:text-9xl font-serif font-bold italic tracking-tight text-black leading-[0.8] transition-all"
          >
            THE ART OF <br /> <span className="text-gold">SOPHISTICATION.</span>
          </motion.h1>
          <p className="text-[#888888] text-xl md:text-2xl font-medium tracking-tight max-w-2xl mx-auto leading-relaxed">
            Elevate your style with "Maestro Collection" where fashion meets individuality.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <motion.div 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="aspect-[4/5] bg-[#F3F2F0] border border-black/5 p-4 shadow-sm"
          >
            <img 
              src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1974&auto=format&fit=crop" 
              alt="Brand Vision" 
              className="w-full h-full object-cover grayscale-[0.2]"
              referrerPolicy="no-referrer"
            />
          </motion.div>

          <div className="space-y-16">
            <section className="space-y-8">
              <h2 className="text-4xl font-serif font-bold italic tracking-tight text-black">Our Philosophy</h2>
              <div className="space-y-6 text-[#57534E] text-lg leading-relaxed font-medium">
                <p>
                  Maestro Collection was founded on the belief that clothing is more than just fabric—it's a silent ambassador of your character. In a world of fast fashion, we choose the path of enduring quality.
                </p>
                <p>
                  We source the finest linens and long-staple cottons, ensuring each piece tells a story of comfort and confidence. Our cuts are meticulously designed for the modern Bangladeshi physique.
                </p>
              </div>
            </section>

            <div className="grid grid-cols-2 gap-10 pt-12 border-t border-black/5">
              <div className="space-y-2">
                <div className="text-4xl font-serif font-bold italic text-black tracking-tighter">EXCELLENCE</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#888888] font-bold">In Every Stitch</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-serif font-bold italic text-black tracking-tighter">INTEGRITY</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#888888] font-bold">In Our Sourcing</div>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-40 bg-[#F9F8F6] p-16 md:p-32 border border-black/[0.03] text-center space-y-10 shadow-sm">
           <h2 className="text-5xl md:text-7xl font-serif font-bold italic max-w-3xl mx-auto leading-[1.1] text-black">
            "STYLE IS STABILITY IN A FAST-CHANGING WORLD."
           </h2>
           <div className="w-12 h-[1px] bg-gold mx-auto" />
           <p className="text-gold uppercase tracking-[0.4em] font-bold text-[11px]">The Maestro Creed</p>
        </section>
      </div>
    </div>
  );
}
