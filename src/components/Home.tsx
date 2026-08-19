import React from 'react';
import { AppView } from '../types';
import { FlowerSVG } from './FlowerSVG';

interface HomeProps {
  setCurrentView: (view: AppView) => void;
  gardenCount: number;
}

export const Home: React.FC<HomeProps> = ({ setCurrentView, gardenCount }) => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F9F9ED] text-[#111111] flex flex-col justify-between font-serif">
      <div className="max-w-6xl mx-auto px-10 pt-20 pb-32 grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
        <div className="md:col-span-7 space-y-8">
          <div className="text-[10px] uppercase tracking-[0.2em] font-sans font-medium text-[#6F6F6F]">
            Ephemeral Expressions • Digitally Preserved
          </div>

          <h1 className="text-5xl sm:text-7xl font-normal italic tracking-tighter leading-[1.05] text-[#111111]">
            Send flowers that never fade.
          </h1>

          <p className="text-lg text-[#6F6F6F] font-serif font-light leading-relaxed max-w-lg">
            Compose bespoke botanical arrangements stem by stem, wrap them in textured papers, attach a heartfelt verse, and plant them in the digital garden.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-6 font-sans">
            <button
              onClick={() => setCurrentView('builder')}
              className="text-[10px] uppercase tracking-widest border border-black bg-[#000000] text-[#F9F9ED] px-8 py-3.5 hover:bg-transparent hover:text-[#111111] hover:border-[#111111] transition-all cursor-pointer shadow-xs"
            >
              Build a Bouquet
            </button>

            {gardenCount > 0 && (
              <button
                onClick={() => setCurrentView('garden')}
                className="text-[10px] uppercase tracking-widest text-[#6F6F6F] hover:text-[#111111] transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>View Garden ({gardenCount})</span>
              </button>
            )}
          </div>
        </div>

        {/* Visual Preview */}
        <div className="md:col-span-5 relative flex justify-center items-center">
          <div className="w-[320px] h-[400px] sm:w-[380px] sm:h-[480px] bg-[#FAFAF2] border border-[#D9D9CE] p-8 relative shadow-sm overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute bottom-16 w-32 h-24 bg-[#F5F5E9] rounded-t-xl opacity-80" />
              <div className="absolute top-4 w-32 h-40">
                <FlowerSVG svgType="peony" color="#F9E0E3" />
              </div>
              <div className="absolute top-12 -left-12 w-28 h-36 -rotate-12">
                <FlowerSVG svgType="rose" color="#F4C2C2" />
              </div>
              <div className="absolute top-12 -right-12 w-28 h-36 rotate-12">
                <FlowerSVG svgType="tulip" color="#FFEDD5" />
              </div>
            </div>

            <div className="absolute bottom-6 text-center z-10">
              <p className="font-serif italic text-xs text-[#6F6F6F]">"To plant a garden is to believe in tomorrow."</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-[#D9D9CE] py-8 px-10 text-[9px] uppercase tracking-[0.2em] font-sans text-[#6F6F6F] flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>&copy; 2026 Digital Flora Studio. All rights reserved.</p>
        <div className="flex gap-8">
          <button onClick={() => setCurrentView('builder')} className="hover:text-[#111111] transition-colors cursor-pointer">Builder</button>
          <button onClick={() => setCurrentView('garden')} className="hover:text-[#111111] transition-colors cursor-pointer">Garden</button>
        </div>
      </footer>
    </div>
  );
};
