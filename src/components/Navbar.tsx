import React, { useState, useEffect } from 'react';
import { AppView } from '../types';
import { Flower2, Sparkles, Menu, X, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { soundscape } from '../utils/soundscape';

interface NavbarProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  gardenCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView, gardenCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(soundscape.getPlaying());

  useEffect(() => {
    const unsubscribe = soundscape.subscribe((playing) => {
      setIsPlayingAudio(playing);
    });
    return () => unsubscribe();
  }, []);

  const handleNavClick = (view: AppView) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  const handleToggleSoundscape = () => {
    soundscape.toggle();
  };

  return (
    <header className="sticky top-0 z-50 bg-[#F9F9ED]/95 backdrop-blur-md border-b border-[#D9D9CE] px-4 sm:px-10 py-4 sm:py-5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
        >
          <motion.span 
            whileHover={{ rotate: 15 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="w-7 h-7 bg-[#111111] text-[#F9F9ED] rounded-full flex items-center justify-center shadow-xs"
          >
            <Flower2 className="w-3.5 h-3.5" />
          </motion.span>
          <div>
            <span className="font-serif text-xl sm:text-2xl font-normal italic tracking-tighter text-[#111111] group-hover:opacity-80 transition-opacity block leading-none">
              DigiBouquet
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#6F6F6F] font-sans pt-0.5 block">
              Digital Studio
            </span>
          </div>
        </button>

        {/* Desktop Navigation with Smooth Shared Layout Indicator */}
        <div className="hidden sm:flex items-center gap-8 md:gap-10">
          <nav className="flex items-center gap-8 md:gap-10 text-[10px] uppercase tracking-[0.2em] font-sans font-medium text-[#6F6F6F]">
            <button
              onClick={() => handleNavClick('home')}
              className={`hover:text-[#111111] transition-colors cursor-pointer py-2 relative ${
                currentView === 'home' ? 'text-[#111111] font-bold' : ''
              }`}
            >
              <span>Home</span>
              {currentView === 'home' && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#111111]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            <button
              onClick={() => handleNavClick('botanical-guide')}
              className={`hover:text-[#111111] transition-colors cursor-pointer py-2 relative ${
                currentView === 'botanical-guide' ? 'text-[#111111] font-bold' : ''
              }`}
            >
              <span>Botanical Library</span>
              {currentView === 'botanical-guide' && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#111111]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            <button
              onClick={() => handleNavClick('garden')}
              className={`hover:text-[#111111] transition-colors cursor-pointer py-2 relative ${
                currentView === 'garden' ? 'text-[#111111] font-bold' : ''
              }`}
            >
              <span>Garden {gardenCount > 0 && `(${gardenCount})`}</span>
              {currentView === 'garden' && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#111111]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>

            <button
              onClick={() => handleNavClick('builder')}
              className={`hover:text-[#111111] transition-colors cursor-pointer py-2 relative ${
                currentView === 'builder' ? 'text-[#111111] font-bold' : ''
              }`}
            >
              <span>Builder</span>
              {currentView === 'builder' && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#111111]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          </nav>

          {/* Ambient Garden Soundscape Button */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleToggleSoundscape}
            className={`flex items-center gap-2 px-3 py-1.5 border transition-all text-[9px] font-sans uppercase tracking-widest cursor-pointer shadow-2xs ${
              isPlayingAudio 
                ? 'bg-[#111111] text-[#F9F9ED] border-[#111111]' 
                : 'bg-[#FAFAF2] text-[#6F6F6F] border-[#D9D9CE] hover:text-[#111111] hover:border-[#85857D]'
            }`}
            title={isPlayingAudio ? 'Mute Garden Soundscape' : 'Play Ambient Garden Soundscape (Birds & Wind)'}
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span className="hidden md:inline">Soundscape On</span>
                {/* Visual EQ Audio Bars */}
                <div className="flex items-end gap-0.5 h-2.5">
                  <span className="w-0.5 bg-emerald-400 animate-ping" style={{ height: '60%', animationDuration: '0.8s' }} />
                  <span className="w-0.5 bg-emerald-400 animate-pulse" style={{ height: '100%', animationDuration: '0.6s' }} />
                  <span className="w-0.5 bg-emerald-400 animate-ping" style={{ height: '75%', animationDuration: '0.9s' }} />
                </div>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-[#85857D]" />
                <span className="hidden md:inline">Soundscape</span>
              </>
            )}
          </motion.button>
        </div>

        {/* Mobile Action & Menu Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          {/* Soundscape button on mobile header */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleToggleSoundscape}
            className={`p-2 border transition-colors cursor-pointer ${
              isPlayingAudio ? 'bg-[#111111] text-[#F9F9ED] border-[#111111]' : 'bg-[#FAFAF2] text-[#6F6F6F] border-[#D9D9CE]'
            }`}
            title="Toggle Garden Ambient Sound"
          >
            {isPlayingAudio ? <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> : <VolumeX className="w-3.5 h-3.5" />}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavClick('builder')}
            className="text-[9px] uppercase tracking-widest bg-[#111111] text-[#F9F9ED] px-3.5 py-2 font-sans font-medium active:scale-95 transition-all cursor-pointer shadow-2xs"
          >
            Builder
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 text-[#111111] hover:bg-[#F5F5E9] transition-colors cursor-pointer border border-[#D9D9CE]"
            title="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Dropdown Menu with Spring Animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="sm:hidden absolute top-full left-0 right-0 bg-[#FAFAF2] border-b border-[#D9D9CE] py-4 px-6 space-y-3 shadow-md font-sans overflow-hidden"
          >
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left py-2.5 text-xs uppercase tracking-widest border-b border-[#D9D9CE]/60 flex items-center justify-between ${
                currentView === 'home' ? 'font-bold text-[#111111]' : 'text-[#6F6F6F]'
              }`}
            >
              <span>Home</span>
              <span className="text-[10px] text-[#85857D]">Studio</span>
            </button>

            <button
              onClick={() => handleNavClick('botanical-guide')}
              className={`w-full text-left py-2.5 text-xs uppercase tracking-widest border-b border-[#D9D9CE]/60 flex items-center justify-between ${
                currentView === 'botanical-guide' ? 'font-bold text-[#111111]' : 'text-[#6F6F6F]'
              }`}
            >
              <span>Botanical Library</span>
              <span className="text-[10px] text-[#85857D]">12 Meanings</span>
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
              className={`w-full text-left py-2.5 text-xs uppercase tracking-widest border-b border-[#D9D9CE]/60 flex items-center justify-between ${
                currentView === 'builder' ? 'font-bold text-[#111111]' : 'text-[#6F6F6F]'
              }`}
            >
              <span>Bouquet Builder</span>
              <Sparkles className="w-3.5 h-3.5 text-[#111111]" />
            </button>

            <button
              onClick={handleToggleSoundscape}
              className={`w-full text-left py-2.5 text-xs uppercase tracking-widest flex items-center justify-between ${
                isPlayingAudio ? 'font-bold text-emerald-700' : 'text-[#6F6F6F]'
              }`}
            >
              <span className="flex items-center gap-2">
                {isPlayingAudio ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4" />}
                <span>Garden Soundscape</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider">{isPlayingAudio ? 'Playing' : 'Muted'}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
