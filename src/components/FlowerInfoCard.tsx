import React, { useState } from 'react';
import { Flower } from '../types';
import { FlowerSVG } from './FlowerSVG';
import { Sparkles, Calendar, Heart, Gift, ChevronDown, ChevronUp, Plus, Minus, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FlowerInfoCardProps {
  flower: Flower;
  placedCount?: number;
  onAddFlower?: (flower: Flower) => void;
  onRemoveFlower?: (flower: Flower) => void;
  onClose?: () => void;
  isModal?: boolean;
}

export const FlowerInfoCard: React.FC<FlowerInfoCardProps> = ({
  flower,
  placedCount = 0,
  onAddFlower,
  onRemoveFlower,
  onClose,
  isModal = false
}) => {
  const [whyExpanded, setWhyExpanded] = useState(true);

  return (
    <div className={`bg-[#FAFAF2] border border-[#111111] text-[#111111] font-sans relative overflow-hidden shadow-md ${
      isModal ? 'max-w-md w-full p-5 sm:p-6 max-h-[90vh] overflow-y-auto' : 'p-4 w-full'
    }`}>
      {/* Close button if rendered inside a modal / sheet */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 hover:bg-[#EAE8D8] rounded-full transition-colors cursor-pointer border border-[#D9D9CE]"
          title="Close Card"
        >
          <X className="w-3.5 h-3.5 text-[#111111]" />
        </button>
      )}

      {/* Header Banner */}
      <div className="flex items-start gap-3.5 pb-4 border-b border-[#D9D9CE]">
        <div className="w-18 h-22 bg-transparent p-0.5 flex items-center justify-center shrink-0 overflow-hidden">
          {flower.imageUrl ? (
            <img 
              src={flower.imageUrl} 
              alt={flower.name} 
              className="w-full h-full object-contain mix-blend-multiply select-none hover:scale-110 transition-transform" 
              referrerPolicy="no-referrer"
            />
          ) : (
            <FlowerSVG 
              flowerId={flower.id}
              svgType={flower.svgType} 
              color={flower.color} 
              imageUrl={flower.imageUrl}
            />
          )}
        </div>
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center gap-1.5">
            <span className="text-[8px] uppercase tracking-[0.2em] font-mono text-[#85857D]">
              Botanical Stem #{flower.svgType.toUpperCase()}
            </span>
          </div>
          <h3 className="font-serif italic text-xl text-[#111111] tracking-tight leading-tight mt-0.5">
            {flower.name}
          </h3>
          <p className="text-[10px] text-[#6F6F6F] italic font-serif">
            {flower.botanicalName}
          </p>

          {/* Personality Meaning Tagline */}
          <div className="mt-1.5 flex flex-wrap gap-1 text-[9px] font-sans font-medium text-[#111111]">
            {flower.meaning.map((m, idx) => (
              <span key={idx} className="flex items-center">
                <span className="text-[#85857D] font-serif">{m}</span>
                {idx < flower.meaning.length - 1 && <span className="mx-1 text-[#C0BEB0]">·</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Core Personality Grid */}
      <div className="py-3.5 space-y-3 text-xs border-b border-[#D9D9CE]">
        {/* Birth Month & Symbolism */}
        <div className="grid grid-cols-2 gap-3">
          {flower.birthMonth && (
            <div className="bg-[#F4F3E8]/80 p-2.5 border border-[#D9D9CE]/80">
              <div className="flex items-center gap-1 text-[8.5px] uppercase tracking-widest text-[#85857D] font-mono">
                <Calendar className="w-3 h-3 text-[#111111]" />
                <span>Common Birth Month</span>
              </div>
              <div className="font-serif italic text-sm text-[#111111] font-semibold mt-0.5">
                {flower.birthMonth}
              </div>
            </div>
          )}

          <div className={`p-2.5 border border-[#D9D9CE]/80 ${flower.birthMonth ? 'bg-[#F4F3E8]/80' : 'col-span-2 bg-[#F4F3E8]/80'}`}>
            <div className="flex items-center gap-1 text-[8.5px] uppercase tracking-widest text-[#85857D] font-mono">
              <Heart className="w-3 h-3 text-[#111111]" />
              <span>Symbolizes</span>
            </div>
            <div className="font-serif italic text-sm text-[#111111] font-semibold mt-0.5">
              {flower.symbolism}
            </div>
          </div>
        </div>

        {/* Best For Tags */}
        <div>
          <div className="flex items-center gap-1 text-[8.5px] uppercase tracking-widest text-[#85857D] font-mono mb-1.5">
            <Gift className="w-3 h-3 text-[#111111]" />
            <span>Perfect For</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {flower.bestFor.map((item, i) => (
              <span 
                key={i} 
                className="px-2 py-0.5 bg-[#EAE8D8] border border-[#D0CEBF] text-[9.5px] text-[#222222] font-sans uppercase tracking-wider font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Color Meanings Breakdown */}
        {flower.colorMeanings && flower.colorMeanings.length > 0 && (
          <div className="pt-1">
            <div className="text-[8.5px] uppercase tracking-widest text-[#85857D] font-mono mb-1">
              Color Meaning
            </div>
            <ul className="space-y-1 text-[10.5px] text-[#444444] bg-[#F4F3E8]/60 p-2 border border-[#D9D9CE]/60">
              {flower.colorMeanings.map((cm, i) => (
                <li key={i} className="flex items-baseline gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#111111]/60 shrink-0 mt-1" />
                  <span className="font-medium text-[#111111]">{cm.color} —</span>
                  <span className="italic">{cm.meaning}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Expandable "Why choose this flower?" Section */}
      <div className="py-3 border-b border-[#D9D9CE]">
        <button
          type="button"
          onClick={() => setWhyExpanded(!whyExpanded)}
          className="w-full flex items-center justify-between text-left group cursor-pointer"
        >
          <div className="flex items-center gap-1.5 text-[9.5px] uppercase tracking-widest font-mono font-bold text-[#111111]">
            <Sparkles className="w-3 h-3 text-[#111111]" />
            <span>Why choose {flower.name.split(' ').pop()}?</span>
          </div>
          {whyExpanded ? (
            <ChevronUp className="w-3.5 h-3.5 text-[#85857D] group-hover:text-[#111111]" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-[#85857D] group-hover:text-[#111111]" />
          )}
        </button>

        <AnimatePresence>
          {whyExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <p className="mt-2 text-[11px] text-[#444444] leading-relaxed italic bg-[#F7F6EE] p-2.5 border-l-2 border-[#111111]">
                "{flower.whyChoose}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Footer (Add / Remove) */}
      {(onAddFlower || onRemoveFlower) && (
        <div className="pt-3.5 flex items-center gap-2">
          {onAddFlower && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onAddFlower(flower)}
              className="flex-1 py-2.5 px-4 bg-[#111111] text-[#F8F7EB] text-[10px] font-mono uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-1.5 shadow-xs hover:bg-[#222222] transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add {flower.name.split(' ').pop()} {placedCount > 0 && `(${placedCount})`}</span>
            </motion.button>
          )}

          {placedCount > 0 && onRemoveFlower && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onRemoveFlower(flower)}
              className="p-2.5 border border-[#D9D9CE] hover:border-red-600 hover:text-red-600 bg-[#FAFAF2] text-[#6F6F6F] transition-colors cursor-pointer"
              title={`Remove 1 ${flower.name}`}
            >
              <Minus className="w-3.5 h-3.5" />
            </motion.button>
          )}
        </div>
      )}
    </div>
  );
};
