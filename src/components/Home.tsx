import React from 'react';
import { AppView } from '../types';
import { FlowerSVG } from './FlowerSVG';
import { WrappingPaperSVG } from './WrappingPaperSVG';
import { RibbonSVG } from './RibbonSVG';
import { motion } from 'motion/react';

interface HomeProps {
  setCurrentView: (view: AppView) => void;
  gardenCount: number;
}

export const Home: React.FC<HomeProps> = ({ setCurrentView, gardenCount }) => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F9F9ED] text-[#111111] flex flex-col justify-between font-serif">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 pt-12 sm:pt-20 pb-20 sm:pb-28 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
        <div className="md:col-span-7 space-y-6 sm:space-y-8">
          <div className="text-[10px] uppercase tracking-[0.2em] font-sans font-medium text-[#6F6F6F]">
            Ephemeral Expressions • Digitally Preserved
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-normal italic tracking-tighter leading-[1.05] text-[#111111]">
            Send flowers that never fade.
          </h1>

          <p className="text-base sm:text-lg text-[#6F6F6F] font-serif font-light leading-relaxed max-w-lg">
            Compose bespoke botanical arrangements stem by stem, wrap them in textured papers, attach a heartfelt verse, and plant them in the digital garden.
          </p>

          <div className="flex flex-wrap items-center gap-5 pt-4 font-sans">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setCurrentView('builder')}
              className="text-[10px] uppercase tracking-widest border border-[#000000] bg-[#000000] text-[#F9F9ED] px-8 py-3.5 hover:bg-transparent hover:text-[#111111] hover:border-[#111111] transition-all cursor-pointer shadow-xs"
            >
              Build a Bouquet
            </motion.button>

            {gardenCount > 0 && (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setCurrentView('garden')}
                className="text-[10px] uppercase tracking-widest text-[#6F6F6F] hover:text-[#111111] transition-colors cursor-pointer flex items-center gap-2 px-4 py-3.5 border border-transparent hover:border-[#D9D9CE]"
              >
                <span>View Garden ({gardenCount})</span>
              </motion.button>
            )}
          </div>
        </div>

        {/* High-Fidelity Editorial Visual Preview */}
        <div className="md:col-span-5 relative flex justify-center items-center">
          <motion.div 
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-[290px] h-[380px] sm:w-[350px] sm:h-[450px] bg-[#FAFAF2] border border-[#D9D9CE] p-6 sm:p-8 relative shadow-sm overflow-hidden flex flex-col items-center justify-center group"
          >
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            
            {/* Visual Arrangement */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Back Wrap */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-48 h-44 pointer-events-none z-0 opacity-90">
                <WrappingPaperSVG styleId="kraft" layer="back" className="w-full h-full" />
              </div>

              {/* Flowers */}
              <div className="absolute top-2 sm:top-4 w-28 sm:w-32 h-36 sm:h-40 z-10">
                <FlowerSVG svgType="peony" color="#F9E0E3" />
              </div>
              <div className="absolute top-8 sm:top-10 -left-6 sm:-left-8 w-24 sm:w-28 h-32 sm:h-36 -rotate-12 z-15">
                <FlowerSVG svgType="rose" color="#F4C2C2" />
              </div>
              <div className="absolute top-8 sm:top-10 -right-6 sm:-right-8 w-24 sm:w-28 h-32 sm:h-36 rotate-12 z-15">
                <FlowerSVG svgType="tulip" color="#FFEDD5" />
              </div>

              {/* Front Wrap */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-36 sm:w-42 h-26 sm:h-30 pointer-events-none z-20">
                <WrappingPaperSVG styleId="kraft" layer="front" className="w-full h-full" />
              </div>

              {/* Ribbon */}
              <div className="absolute bottom-16 sm:bottom-18 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-14 pointer-events-none z-30 filter drop-shadow-xs">
                <RibbonSVG styleId="raw-silk" className="w-full h-full" />
              </div>
            </div>

            <div className="absolute bottom-4 text-center z-35">
              <p className="font-serif italic text-xs text-[#6F6F6F]">"To plant a garden is to believe in tomorrow."</p>
            </div>
          </motion.div>
        </div>
      </div>

      <footer className="border-t border-[#D9D9CE] py-6 sm:py-8 px-6 sm:px-10 text-[9px] uppercase tracking-[0.2em] font-sans text-[#6F6F6F] flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>&copy; 2026 DigiBouquet Studio. All rights reserved.</p>
        <div className="flex gap-6 sm:gap-8">
          <button onClick={() => setCurrentView('home')} className="hover:text-[#111111] transition-colors cursor-pointer">Home</button>
          <button onClick={() => setCurrentView('builder')} className="hover:text-[#111111] transition-colors cursor-pointer">Builder</button>
          <button onClick={() => setCurrentView('garden')} className="hover:text-[#111111] transition-colors cursor-pointer">Garden</button>
        </div>
      </footer>
    </div>
  );
};
