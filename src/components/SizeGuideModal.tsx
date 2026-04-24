import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SIZE_CHARTS = {
  'Shirts': {
    headers: ['Size', 'Chest (in)', 'Waist (in)', 'Shoulder (in)', 'Length (in)'],
    rows: [
      ['S', '38', '36', '17', '28'],
      ['M', '40', '38', '17.5', '29'],
      ['L', '42', '40', '18.5', '30'],
      ['XL', '44', '42', '19.5', '31'],
      ['XXL', '46', '44', '20.5', '32'],
    ]
  },
  'T-Shirts': {
    headers: ['Size', 'Chest (in)', 'Shoulder (in)', 'Length (in)'],
    rows: [
      ['S', '36', '16', '26.5'],
      ['M', '38', '17', '27.5'],
      ['L', '40', '18', '28.5'],
      ['XL', '42', '19', '29.5'],
      ['XXL', '44', '20', '30.5'],
    ]
  },
  'Pants & Jeans': {
    headers: ['Waist Size', 'Hips (in)', 'Thigh (in)', 'Length (in)'],
    rows: [
      ['30', '38', '22', '39'],
      ['32', '40', '23', '40'],
      ['34', '42', '24', '41'],
      ['36', '44', '25', '42'],
      ['38', '46', '26', '43'],
    ]
  },
  'Blazer': {
    headers: ['Size', 'Chest (in)', 'Waist (in)', 'Shoulder (in)', 'Sleeve (in)'],
    rows: [
      ['36', '38', '34', '17.5', '24.5'],
      ['38', '40', '36', '18', '25'],
      ['40', '42', '38', '18.5', '25.5'],
      ['42', '44', '40', '19.5', '26'],
      ['44', '46', '42', '20.5', '26.5'],
    ]
  },
  'Panjabi': {
    headers: ['Size', 'Chest (in)', 'Length (in)', 'Shoulder (in)', 'Sleeve (in)'],
    rows: [
      ['38', '40', '40', '17.5', '24'],
      ['40', '42', '42', '18', '24.5'],
      ['42', '44', '44', '18.5', '25'],
      ['44', '46', '46', '19.5', '25.5'],
      ['46', '48', '48', '20.5', '26'],
    ]
  }
};

export function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  const [activeTab, setActiveTab] = React.useState<keyof typeof SIZE_CHARTS>('Shirts');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] cursor-pointer"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-x-auto md:inset-y-20 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-3xl bg-white z-[101] overflow-hidden flex flex-col shadow-2xl"
          >
            <div className="flex justify-between items-center p-8 border-b border-black/5">
              <div className="space-y-1">
                <span className="text-gold text-[10px] uppercase tracking-[0.4em] font-black">Advisory Service</span>
                <h2 className="text-3xl font-serif font-bold italic tracking-tight text-black uppercase">Size Guide.</h2>
              </div>
              <button 
                onClick={onClose}
                className="w-12 h-12 border border-black/5 flex items-center justify-center text-black hover:bg-black/5 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex overflow-x-auto bg-[#F9F8F6] border-b border-black/5 scrollbar-hide">
              {(Object.keys(SIZE_CHARTS) as Array<keyof typeof SIZE_CHARTS>).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-5 text-[11px] font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all border-b-2 ${
                    activeTab === tab 
                      ? "text-black border-gold bg-white" 
                      : "text-gray-400 border-transparent hover:text-black"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex-grow overflow-y-auto p-8 custom-scrollbar">
              <div className="space-y-8">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-black/10">
                        {SIZE_CHARTS[activeTab].headers.map((header) => (
                          <th key={header} className="py-4 text-[10px] uppercase tracking-widest font-bold text-gray-400">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/[0.03]">
                      {SIZE_CHARTS[activeTab].rows.map((row, i) => (
                        <tr key={i} className="hover:bg-black/[0.01] transition-colors">
                          {row.map((cell, j) => (
                            <td key={j} className={`py-5 text-sm ${j === 0 ? "font-bold text-black" : "text-gray-500 font-medium"}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-6 bg-cream border border-black/5 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-black">How to measure?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[11px] leading-relaxed text-gray-500">
                    <p>
                      <strong className="text-black block mb-1">CHEST:</strong>
                      Measure around the fullest part of your chest, keeping the tape horizontal.
                    </p>
                    <p>
                      <strong className="text-black block mb-1">WAIST:</strong>
                      Measure around the narrowest part (typically where your body bends side to side), keeping the tape horizontal.
                    </p>
                    <p>
                      <strong className="text-black block mb-1">SHOULDER:</strong>
                      Measure from the edge of one shoulder across your back to the edge of the other shoulder.
                    </p>
                    <p>
                      <strong className="text-black block mb-1">SLEEVE:</strong>
                      Measure from the shoulder seam down to your wrist.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-black/5 bg-[#F9F8F6] text-center">
              <p className="text-[11px] text-gray-500 uppercase tracking-widest leading-relaxed">
                Fits may vary by style or personal preference. <br/>
                For custom sizing, please contact our <Link to="/contact" onClick={onClose} className="text-black font-bold border-b border-black/20">Studio Registry</Link>.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
