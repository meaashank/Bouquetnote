import React, { useState } from 'react';
import { PlacedFlower, PlacedSticker, WrappingStyle, RibbonStyle, RibbonTexture } from '../types';
import { FLOWERS, WRAPPING_OPTIONS, RIBBON_OPTIONS, RIBBON_TEXTURES } from '../data/flowers';
import { FlowerSVG } from './FlowerSVG';
import { RibbonSVG } from './RibbonSVG';
import { WrappingPaperSVG } from './WrappingPaperSVG';
import { StickerSVG } from './StickerSVG';
import { Download, Sparkles, Eye, Maximize2, Minimize2, ChevronDown, ChevronUp, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MiniPreviewProps {
  placedFlowers: PlacedFlower[];
  placedStickers: PlacedSticker[];
  wrapping: WrappingStyle;
  ribbon: RibbonStyle;
  ribbonColor?: string;
  ribbonTexture?: RibbonTexture;
  ribbonText?: string;
  ribbonTextColor?: string;
  bouquetTitle?: string;
  recipientName?: string;
  senderName?: string;
  onExportPNG: () => void;
  isExporting: boolean;
}

export const MiniPreview: React.FC<MiniPreviewProps> = ({
  placedFlowers,
  placedStickers,
  wrapping,
  ribbon,
  ribbonColor = '#F7F4EF',
  ribbonTexture = 'silk',
  ribbonText = '',
  ribbonTextColor = '#D4AF37',
  bouquetTitle = 'Bespoke Arrangement',
  recipientName = '',
  senderName = '',
  onExportPNG,
  isExporting
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isLargeSize, setIsLargeSize] = useState(false);

  const currentWrappingObj = WRAPPING_OPTIONS.find(w => w.id === wrapping) || WRAPPING_OPTIONS[0];
  const currentRibbonObj = RIBBON_OPTIONS.find(r => r.id === ribbon) || RIBBON_OPTIONS[0];
  const currentTextureObj = RIBBON_TEXTURES.find(t => t.id === ribbonTexture) || RIBBON_TEXTURES[0];

  return (
    <aside 
      aria-label="Bouquet mini-preview"
      className="absolute top-16 right-3 sm:right-6 z-30 font-sans pointer-events-auto select-none"
    >
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          /* Minimized Floating Pill Button */
          <motion.button
            key="minimized-pill"
            initial={{ scale: 0.85, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setIsExpanded(true)}
            className="flex items-center gap-2 bg-[#FAFAF2]/95 backdrop-blur-md border border-[#D9D9CE] px-3.5 py-2 shadow-md hover:border-[#111111] transition-all text-[#111111] cursor-pointer"
            title="Open real-time PNG export mini-preview"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <Eye className="w-3.5 h-3.5 text-[#111111]" />
            <span className="text-[10px] font-sans uppercase tracking-widest font-semibold">Mini-Preview</span>
            <span className="text-[9px] font-mono px-1.5 py-0.2 bg-[#111111]/5 border border-[#111111]/10 text-[#6F6F6F]">
              {placedFlowers.length}
            </span>
          </motion.button>
        ) : (
          /* Expanded Mini-Preview Card */
          <motion.div
            key="expanded-preview"
            initial={{ scale: 0.92, opacity: 0, y: -8 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: -8 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className={`bg-[#FAFAF2]/95 backdrop-blur-md border border-[#D9D9CE] shadow-lg flex flex-col transition-all duration-200 ${
              isLargeSize ? 'w-64 sm:w-72' : 'w-48 sm:w-56'
            }`}
          >
            {/* Header */}
            <div className="px-3 py-2 border-b border-[#D9D9CE] flex items-center justify-between bg-[#F5F5E9]/80">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[9px] uppercase tracking-[0.16em] font-bold text-[#111111]">
                  Mini-Preview
                </span>
              </div>

              <div className="flex items-center gap-1">
                {/* Size toggle */}
                <button
                  type="button"
                  onClick={() => setIsLargeSize(!isLargeSize)}
                  className="p-1 text-[#6F6F6F] hover:text-[#111111] transition-colors cursor-pointer"
                  title={isLargeSize ? 'Standard view' : 'Enlarge preview'}
                >
                  {isLargeSize ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
                </button>

                {/* Minimize button */}
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="p-1 text-[#6F6F6F] hover:text-[#111111] transition-colors cursor-pointer"
                  title="Collapse preview"
                >
                  <ChevronUp className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Rendered Live Miniature Bouquet Canvas (Clean Export Look) */}
            <div 
              className={`relative overflow-hidden bg-[#F9F9ED] flex items-center justify-center p-2 border-b border-[#D9D9CE] transition-all duration-200 ${
                isLargeSize ? 'h-52 sm:h-58' : 'h-40 sm:h-44'
              }`}
            >
              {/* Subtle background radial dot pattern mimicking clean print paper */}
              <div 
                className="absolute inset-0 opacity-[0.025] pointer-events-none" 
                style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '16px 16px' }}
              />

              {/* Resolution Tag */}
              <div className="absolute top-1.5 left-2 text-[7.5px] uppercase tracking-wider font-mono text-[#85857D] pointer-events-none z-40 bg-[#FAFAF2]/80 px-1 py-0.5 border border-[#D9D9CE]/50">
                PNG 1:1
              </div>

              {placedFlowers.length === 0 ? (
                <div className="text-center p-4">
                  <p className="text-xs font-serif italic text-[#85857D] mb-1">Awaiting Stems</p>
                  <p className="text-[8px] uppercase tracking-wider text-[#A0A096]">Pick flowers to preview</p>
                </div>
              ) : (
                /* Miniature Composition Scale Frame */
                <div 
                  className={`relative flex items-center justify-center aspect-[4/5] mx-auto transition-transform ${
                    isLargeSize ? 'w-48 h-60' : 'w-36 h-45'
                  }`}
                >
                  {/* 1. Back Wrapping Wings */}
                  <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-[74%] h-[64%] pointer-events-none z-0 opacity-90">
                    <WrappingPaperSVG styleId={wrapping} layer="back" className="w-full h-full" />
                  </div>

                  {/* 2. Placed Stems (Synchronized Clean Render) */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    {placedFlowers.map((pf) => {
                      const flowerDef = FLOWERS.find(f => f.id === pf.flowerId) || FLOWERS[0];
                      return (
                        <div
                          key={`mini-${pf.instanceId}`}
                          style={{
                            position: 'absolute',
                            left: `${pf.x}%`,
                            top: `${pf.y}%`,
                            transform: `translate(-50%, -50%) rotate(${pf.rotation}deg) scale(${pf.scale * 0.72})`,
                            zIndex: pf.zIndex
                          }}
                        >
                          <div className="w-20 h-26">
                            <FlowerSVG 
                              svgType={flowerDef.svgType} 
                              color={flowerDef.color} 
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* 3. Front Wrapping Cone & 4. Personalized Botanical Ribbon */}
                  <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none w-[58%] h-[48%]">
                    <div className="w-full h-full relative">
                      <WrappingPaperSVG styleId={wrapping} layer="front" className="w-full h-full" />
                    </div>

                    <div className="absolute top-[26%] left-1/2 -translate-x-1/2 w-[52%] h-[32%] pointer-events-none z-30 filter drop-shadow-xs">
                      <RibbonSVG 
                        styleId={ribbon} 
                        color={ribbonColor}
                        texture={ribbonTexture}
                        customText={ribbonText}
                        textColor={ribbonTextColor}
                        className="w-full h-full" 
                      />
                    </div>
                  </div>

                  {/* 5. Placed Stickers Overlay */}
                  {placedStickers.length > 0 && (
                    <div className="absolute inset-0 pointer-events-none z-35">
                      {placedStickers.map((ps) => (
                        <div
                          key={`mini-stk-${ps.instanceId}`}
                          style={{
                            position: 'absolute',
                            left: `${ps.x}%`,
                            top: `${ps.y}%`,
                            transform: `translate(-50%, -50%) rotate(${ps.rotation}deg) scale(${ps.scale * 0.72})`,
                            zIndex: ps.zIndex
                          }}
                        >
                          <div className="w-10 h-10">
                            <StickerSVG stickerId={ps.stickerId} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer Details & Instant Export */}
            <div className="p-2.5 space-y-2 bg-[#FAFAF2]">
              <div className="flex items-center justify-between text-[8px] uppercase tracking-wider text-[#6F6F6F]">
                <span className="truncate max-w-[110px]" title={currentWrappingObj.name}>
                  {currentWrappingObj.name}
                </span>
                <span className="font-mono text-[#111111]">
                  {currentTextureObj.name}
                </span>
              </div>

              {ribbonText.trim() && (
                <div className="text-[8.5px] font-serif italic text-[#6F6F6F] bg-[#F5F5E9] px-2 py-1 border border-[#D9D9CE]/70 truncate" title={ribbonText}>
                  "{ribbonText}"
                </div>
              )}

              {/* Quick Save PNG Action Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={onExportPNG}
                disabled={isExporting || placedFlowers.length === 0}
                className={`w-full py-1.5 px-2.5 text-[9px] uppercase tracking-[0.14em] font-semibold border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isExporting
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-[#111111] text-[#F9F9ED] border-[#111111] hover:bg-transparent hover:text-[#111111]'
                }`}
                title="Download high-resolution PNG image"
              >
                <Download className="w-3 h-3" />
                <span>{isExporting ? 'Exporting...' : 'Save PNG'}</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
};
