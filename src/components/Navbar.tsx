import React, { useState } from 'react';
import { AppView } from '../types';
import { Flower2, Sparkles, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  gardenCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView, gardenCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: AppView) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#F9F9ED]/95 backdrop-blur-md border-b border-[#D9D9CE] px-4 sm:px-10 py-4 sm:py-5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
        >
          <span className="w-7 h-7 bg-[#111111] text-[#F9F9ED] rounded-full flex items-center justify-center shadow-xs">
            <Flower2 className="w-3.5 h-3.5" />
          </span>
          <div>
            <span className="font-serif text-xl sm:text-2xl font-normal italic tracking-tighter text-[#111111] group-hover:opacity-80 transition-opacity block leading-none">
              DigiBouquet
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#6F6F6F] font-sans pt-0.5 block">
              Digital Studio
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center gap-8 md:gap-10 text-[10px] uppercase tracking-[0.2em] font-sans font-medium text-[#6F6F6F]">
          <button
            onClick={() => handleNavClick('garden')}
            className={`hover:text-[#111111] transition-colors cursor-pointer py-2 ${
              currentView === 'garden' ? 'text-[#111111] border-b border-[#111111] font-bold' : ''
            }`}
          >
            Garden {gardenCount > 0 && `(${gardenCount})`}
          </button>

          <button
            onClick={() => handleNavClick('builder')}
            className={`hover:text-[#111111] transition-colors cursor-pointer py-2 ${
              currentView === 'builder' ? 'text-[#111111] border-b border-[#111111] font-bold' : ''
            }`}
          >
            Builder
          </button>
        </nav>

        {/* Mobile Action & Menu Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => handleNavClick('builder')}
            className="text-[9px] uppercase tracking-widest bg-[#111111] text-[#F9F9ED] px-3.5 py-2 font-sans font-medium active:scale-95 transition-all cursor-pointer"
          >
            Builder
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 text-[#111111] hover:bg-[#F5F5E9] transition-colors cursor-pointer border border-[#D9D9CE]"
            title="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden absolute top-full left-0 right-0 bg-[#FAFAF2] border-b border-[#D9D9CE] py-4 px-6 space-y-3 shadow-md animate-fade-in font-sans">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left py-2.5 text-xs uppercase tracking-widest border-b border-[#D9D9CE]/60 flex items-center justify-between ${
              currentView === 'home' ? 'font-bold text-[#111111]' : 'text-[#6F6F6F]'
            }`}
          >
            <span>Home</span>
            <span className="text-[10px] text-[#85857D]">St Studio</span>
          </button>

          <button
            onClick={() => handleNavClick('garden')}
            className={`w-full text-left py-2.5 text-xs uppercase tracking-widest border-b border-[#D9D9CE]/60 flex items-center justify-between ${
              currentView === 'garden' ? 'font-bold text-[#111111]' : 'text-[#6F6F6F]'
            }`}
          >
            <span>Digital Garden</span>
            {gardenCount > 0 && <span className="bg-[#111111] text-[#F9F9ED] text-[9px] px-2 py-0.5 rounded-full">{gardenCount}</span>}
          </button>

          <button
            onClick={() => handleNavClick('builder')}
            className={`w-full text-left py-2.5 text-xs uppercase tracking-widest flex items-center justify-between ${
              currentView === 'builder' ? 'font-bold text-[#111111]' : 'text-[#6F6F6F]'
            }`}
          >
            <span>Bouquet Builder</span>
            <Sparkles className="w-3.5 h-3.5 text-[#111111]" />
          </button>
        </div>
      )}
    </header>
  );
};
