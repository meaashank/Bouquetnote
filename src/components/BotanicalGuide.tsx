import React, { useState } from 'react';
import { Flower, AppView } from '../types';
import { FLOWERS, MOOD_FILTERS, MoodFilter, getFlowerOfTheDay } from '../data/flowers';
import { FlowerSVG } from './FlowerSVG';
import { FlowerInfoCard } from './FlowerInfoCard';
import { Sparkles, Calendar, Heart, Gift, ArrowRight, Search, BookOpen, Filter, Flower2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BotanicalGuideProps {
  setCurrentView: (view: AppView) => void;
  onSelectFlowerToBuild?: (flower: Flower) => void;
}

export const BotanicalGuide: React.FC<BotanicalGuideProps> = ({
  setCurrentView,
  onSelectFlowerToBuild
}) => {
  const [selectedMood, setSelectedMood] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inspectFlower, setInspectFlower] = useState<Flower | null>(null);

  const flowerOfTheDay = getFlowerOfTheDay();

  const filteredFlowers = FLOWERS.filter((flower) => {
    // Mood Filter
    if (selectedMood !== 'all' && !flower.moods?.includes(selectedMood)) {
      return false;
    }
    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = flower.name.toLowerCase().includes(q);
      const matchBot = flower.botanicalName.toLowerCase().includes(q);
      const matchMeaning = flower.meaning.some(m => m.toLowerCase().includes(q));
      const matchMonth = flower.birthMonth?.toLowerCase().includes(q);
      const matchSymbol = flower.symbolism.toLowerCase().includes(q);
      return matchName || matchBot || matchMeaning || matchMonth || matchSymbol;
    }
    return true;
  });

  const handleStartWithFlower = (flower: Flower) => {
    if (onSelectFlowerToBuild) {
      onSelectFlowerToBuild(flower);
    }
    setCurrentView('builder');
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F8F7EB] text-[#111111] px-4 sm:px-10 py-8 sm:py-12 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EAE8D8] border border-[#D0CEBF] text-[9px] uppercase tracking-[0.2em] font-mono font-semibold text-[#111111]">
          <BookOpen className="w-3 h-3 text-[#111111]" />
          <span>The Language of Flowers • Floriography</span>
        </div>
        <h1 className="font-serif italic text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#111111]">
          Botanical Library & Meanings
        </h1>
        <p className="text-xs sm:text-sm text-[#6F6F6F] font-sans leading-relaxed max-w-xl mx-auto">
          Every bloom carries centuries of sentiment, symbolism, and secret poetry. Explore our 12 signature stems to craft meaningful bouquets with intention.
        </p>
      </div>

      {/* Hero: Flower of the Day Card */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 bg-[#FAFAF2] border border-[#111111] p-6 sm:p-8 max-w-4xl mx-auto shadow-sm flex flex-col md:flex-row items-center gap-6 sm:gap-10"
      >
        <div className="w-40 h-48 sm:w-48 sm:h-56 bg-transparent flex items-center justify-center shrink-0">
          {flowerOfTheDay.imageUrl ? (
            <img 
              src={flowerOfTheDay.imageUrl} 
              alt={flowerOfTheDay.name} 
              className="w-full h-full object-contain mix-blend-multiply select-none hover:scale-105 transition-transform" 
              referrerPolicy="no-referrer"
            />
          ) : (
            <FlowerSVG svgType={flowerOfTheDay.svgType} color={flowerOfTheDay.color} />
          )}
        </div>
        <div className="flex-1 text-center md:text-left space-y-3">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className="px-2.5 py-0.5 bg-[#111111] text-[#F8F7EB] text-[8.5px] uppercase tracking-[0.2em] font-mono font-bold">
              ★ Flower of the Day
            </span>
            {flowerOfTheDay.birthMonth && (
              <span className="px-2.5 py-0.5 bg-[#EAE8D8] text-[#111111] border border-[#D0CEBF] text-[8.5px] uppercase tracking-widest font-mono">
                Month: {flowerOfTheDay.birthMonth}
              </span>
            )}
          </div>
          <h2 className="font-serif italic text-3xl sm:text-4xl text-[#111111]">
            {flowerOfTheDay.name}
          </h2>
          <p className="text-xs sm:text-sm text-[#555555] italic font-serif">
            {flowerOfTheDay.botanicalName} — {flowerOfTheDay.symbolism}
          </p>
          <p className="text-xs text-[#6F6F6F] leading-relaxed line-clamp-2">
            "{flowerOfTheDay.whyChoose}"
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
            <button
              onClick={() => handleStartWithFlower(flowerOfTheDay)}
              className="px-5 py-2.5 bg-[#111111] text-[#F8F7EB] text-[10px] font-mono uppercase tracking-[0.2em] font-bold flex items-center gap-2 hover:bg-[#222222] transition-all cursor-pointer shadow-xs"
            >
              <span>Build with {flowerOfTheDay.name.split(' ').pop()}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setInspectFlower(flowerOfTheDay)}
              className="px-4 py-2.5 border border-[#111111] bg-transparent text-[#111111] text-[10px] font-mono uppercase tracking-[0.2em] font-medium hover:bg-[#EAE8D8] transition-all cursor-pointer"
            >
              Inspect Full Profile
            </button>
          </div>
        </div>
      </motion.div>

      {/* Filter Section: "What are you trying to say?" */}
      <div className="space-y-4 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D9D9CE] pb-3">
          <div>
            <span className="text-[9px] uppercase tracking-[0.2em] font-mono text-[#85857D] block">
              Floriography Filter
            </span>
            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#111111]">
              What are you trying to say?
            </h3>
          </div>

          {/* Search Input */}
          <div className="relative max-w-xs w-full">
            <Search className="w-3.5 h-3.5 text-[#85857D] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search flower, month, meaning..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-[#FAFAF2] border border-[#D9D9CE] text-xs font-sans placeholder:text-[#85857D] text-[#111111] focus:outline-none focus:border-[#111111]"
            />
          </div>
        </div>

        {/* Mood Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {MOOD_FILTERS.map((mood) => {
            const isSelected = selectedMood === mood.id;
            return (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className={`px-3 py-1.5 border text-[10px] uppercase tracking-wider font-mono shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected 
                    ? 'bg-[#111111] text-[#F8F7EB] border-[#111111] font-bold shadow-xs' 
                    : 'bg-[#FAFAF2] text-[#6F6F6F] border-[#D9D9CE] hover:border-[#85857D] hover:text-[#111111]'
                }`}
                title={mood.description}
              >
                <span>{mood.emoji}</span>
                <span>{mood.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 12 Flowers Botanical Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredFlowers.map((flower) => (
          <motion.div
            key={flower.id}
            layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#FAFAF2] border border-[#D9D9CE] hover:border-[#111111] transition-all p-5 flex flex-col justify-between shadow-2xs group"
          >
            {/* Top Badge & Artwork */}
            <div>
              <div className="flex items-center justify-between text-[8px] uppercase tracking-widest font-mono text-[#85857D] mb-3">
                <span>{flower.birthMonth ? `Month: ${flower.birthMonth}` : 'Botanical Heritage'}</span>
                <span className="font-bold text-[#111111]">#{flower.svgType.toUpperCase()}</span>
              </div>

              {/* Centered Flower Artwork */}
              <div 
                onClick={() => setInspectFlower(flower)}
                className="w-full h-44 bg-transparent flex items-center justify-center p-1 cursor-pointer group-hover:scale-[1.04] transition-transform mb-3 overflow-hidden"
              >
                {flower.imageUrl ? (
                  <img 
                    src={flower.imageUrl} 
                    alt={flower.name} 
                    className="w-full h-full object-contain mix-blend-multiply select-none" 
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-20 h-28">
                    <FlowerSVG svgType={flower.svgType} color={flower.color} />
                  </div>
                )}
              </div>

              {/* Title & Meaning */}
              <h3 
                onClick={() => setInspectFlower(flower)}
                className="font-serif italic text-xl text-[#111111] group-hover:text-amber-900 transition-colors cursor-pointer"
              >
                {flower.name}
              </h3>
              <p className="text-[10px] text-[#6F6F6F] italic font-serif mb-2">
                {flower.botanicalName}
              </p>

              {/* Personality Keywords */}
              <div className="flex flex-wrap gap-1 text-[9px] font-sans font-medium text-[#111111] mb-2">
                {flower.meaning.map((m, idx) => (
                  <span key={idx} className="flex items-center">
                    <span className="text-[#85857D]">{m}</span>
                    {idx < flower.meaning.length - 1 && <span className="mx-1 text-[#C0BEB0]">·</span>}
                  </span>
                ))}
              </div>

              {/* Short Symbolism */}
              <p className="text-[11px] text-[#555555] leading-relaxed line-clamp-2 mb-3">
                {flower.symbolism}
              </p>

              {/* Best For Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {flower.bestFor.slice(0, 3).map((bf, i) => (
                  <span key={i} className="px-1.5 py-0.5 bg-[#EAE8D8] text-[8.5px] font-mono uppercase tracking-wider text-[#333333]">
                    {bf}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-[#D9D9CE] flex items-center gap-2">
              <button
                onClick={() => handleStartWithFlower(flower)}
                className="flex-1 py-2 bg-[#111111] text-[#F8F7EB] text-[9.5px] font-mono uppercase tracking-widest font-semibold hover:bg-[#222222] transition-colors cursor-pointer flex items-center justify-center gap-1"
              >
                <span>Build Bouquet</span>
                <ArrowRight className="w-3 h-3" />
              </button>
              <button
                onClick={() => setInspectFlower(flower)}
                className="p-2 border border-[#D9D9CE] hover:border-[#111111] bg-[#FAFAF2] text-[#111111] text-[9.5px] font-mono uppercase tracking-wider cursor-pointer"
                title="Inspect Details"
              >
                Inspect
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detailed Flower Inspector Modal */}
      <AnimatePresence>
        {inspectFlower && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="max-w-md w-full"
            >
              <FlowerInfoCard
                flower={inspectFlower}
                onClose={() => setInspectFlower(null)}
                onAddFlower={(f) => {
                  handleStartWithFlower(f);
                  setInspectFlower(null);
                }}
                isModal={true}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
