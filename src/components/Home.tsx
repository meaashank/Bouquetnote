import React from 'react';
import { AppView } from '../types';
import { motion } from 'motion/react';
import defaultRoseImg from '../assets/images/botanical_red_rose_1787378453708.png';
import { getHomeFeaturedFlower } from '../data/flowers';

interface HomeProps {
  setCurrentView: (view: AppView) => void;
  gardenCount: number;
}

export const Home: React.FC<HomeProps> = ({ setCurrentView, gardenCount }) => {
  const handleStartBuilder = () => {
    setCurrentView('builder');
  };

  const featured = getHomeFeaturedFlower();
  const heroImageSrc = featured.flower.imageUrl || defaultRoseImg;

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F8F7EB] text-[#111111] flex flex-col justify-center items-center px-6 py-8 sm:py-12 selection:bg-[#EAE8D8]">
      {/* Centered Editorial Canvas */}
      <div className="max-w-md w-full mx-auto flex flex-col items-center text-center my-auto space-y-6 sm:space-y-8">
        
        {/* 1. Botanical Blossom Emblem (Flower of the Day / Month / Seasonal / Placeholder Rose) */}
        <div className="flex flex-col items-center">
          {featured.badgeLabel && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="mb-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#EAE8D8] border border-[#D0CEBF] text-[8.5px] font-mono uppercase tracking-[0.2em] text-[#444440]"
            >
              <span>★ {featured.badgeLabel}</span>
              <span className="text-[#888880]">·</span>
              <span className="italic font-serif normal-case text-[10px] text-[#111111]">{featured.flower.name}</span>
            </motion.div>
          )}

          <motion.div 
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-48 h-48 sm:w-60 sm:h-60 flex items-center justify-center cursor-pointer group"
            onClick={handleStartBuilder}
            title={`Start bouquet with ${featured.flower.name}`}
          >
            <motion.img 
              src={heroImageSrc}
              alt={`Hand-illustrated botanical ${featured.flower.name}`}
              referrerPolicy="no-referrer"
              whileHover={{ scale: 1.05, rotate: 1.5 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-contain mix-blend-multiply select-none pointer-events-none drop-shadow-xs"
            />
          </motion.div>
        </div>

        {/* 2. Flourished Script Brand Wordmark & Tagline */}
        <div className="space-y-3">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex justify-center items-center"
          >
            {/* Script Stylized Logo */}
            <h1 className="font-serif italic font-normal text-5xl sm:text-6xl md:text-7xl tracking-[-0.03em] text-[#111111] leading-none select-none">
              Digibouquet
            </h1>
          </motion.div>

          {/* Strict Sole Text Requirement */}
          <motion.h2 
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.26em] text-[#222222] font-medium max-w-sm mx-auto"
          >
            Send flowers that never fade.
          </motion.h2>
        </div>

        {/* 3. Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full max-w-xs sm:max-w-sm space-y-3 pt-1"
        >
          {/* Primary Action: Solid Black Brutalist Box */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStartBuilder}
            className="w-full py-3.5 px-6 bg-[#000000] text-[#F8F7EB] border border-[#000000] text-xs sm:text-[12.5px] font-mono font-semibold uppercase tracking-[0.22em] shadow-xs hover:bg-[#1A1A1A] transition-all cursor-pointer block"
          >
            Build a Bouquet
          </motion.button>

          {/* Secondary Actions */}
          <div className="flex items-center justify-center gap-6 pt-2">
            <button
              onClick={() => setCurrentView('botanical-guide')}
              className="text-[11px] font-mono font-medium uppercase tracking-[0.18em] text-[#111111] underline underline-offset-4 hover:text-[#555555] transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>12 Flower Meanings</span>
            </button>
            <span className="text-[#C0BEB0]">·</span>
            <button
              onClick={() => setCurrentView('garden')}
              className="text-[11px] font-mono font-medium uppercase tracking-[0.18em] text-[#111111] underline underline-offset-4 hover:text-[#555555] transition-colors cursor-pointer"
            >
              Garden {gardenCount > 0 && `(${gardenCount})`}
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
