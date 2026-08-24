import React, { useState, useRef, useMemo } from 'react';
import { Bouquet, AppView } from '../types';
import { FlowerSVG } from './FlowerSVG';
import { CompositionAnchor } from './CompositionAnchor';
import { StickerSVG } from './StickerSVG';
import { Trash2, Eye, Calendar, User, Download, Search, X, Tag } from 'lucide-react';
import { WRAPPING_OPTIONS, RIBBON_OPTIONS, RIBBON_TEXTURES, FLOWERS } from '../data/flowers';
import { motion, AnimatePresence } from 'motion/react';
import { toPng } from 'html-to-image';

interface GardenProps {
  bouquets: Bouquet[];
  setCurrentView: (view: AppView) => void;
  onDeleteBouquet: (id: string) => void;
}

export function formatBloomingDate(timestamp: number): string {
  if (!timestamp) return 'Blooming in Garden';
  const now = Date.now();
  const diffMs = Math.max(0, now - timestamp);
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) {
    return 'Blooming just now';
  } else if (diffMinutes < 60) {
    return `Blooming since ${diffMinutes}m ago`;
  } else if (diffHours < 24) {
    return `Blooming since ${diffHours}h ago`;
  } else if (diffDays === 1) {
    return 'Blooming since yesterday';
  } else if (diffDays < 7) {
    return `Blooming since ${diffDays} days ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `Blooming since ${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  } else {
    const date = new Date(timestamp);
    return `Blooming since ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
  }
}

export const Garden: React.FC<GardenProps> = ({ bouquets, setCurrentView, onDeleteBouquet }) => {
  const [selectedBouquet, setSelectedBouquet] = useState<Bouquet | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const presentationRef = useRef<HTMLDivElement>(null);

  const filteredBouquets = useMemo(() => {
    if (!searchQuery.trim()) return bouquets;
    const query = searchQuery.toLowerCase().trim();
    return bouquets.filter((b) => {
      const titleMatch = (b.title || '').toLowerCase().includes(query);
      const recipientMatch = (b.recipientName || '').toLowerCase().includes(query);
      const senderMatch = (b.senderName || '').toLowerCase().includes(query);
      const noteMatch = (b.note || '').toLowerCase().includes(query);
      const ribbonTextMatch = (b.ribbonText || '').toLowerCase().includes(query);
      return titleMatch || recipientMatch || senderMatch || noteMatch || ribbonTextMatch;
    });
  }, [bouquets, searchQuery]);

  const handleExportModalPNG = async () => {
    if (!presentationRef.current || !selectedBouquet) return;
    setIsExporting(true);
    try {
      await new Promise(r => setTimeout(r, 120));
      const dataUrl = await toPng(presentationRef.current, {
        quality: 0.98,
        pixelRatio: 2.5,
        backgroundColor: '#F9F9ED',
        cacheBust: true,
        fontEmbedCSS: '',
      });

      const sanitizedTitle = (selectedBouquet.title || 'Botanical_Gift')
        .replace(/[^a-z0-9]/gi, '_')
        .toLowerCase();
      
      const link = document.createElement('a');
      link.download = `${sanitizedTitle}_presentation.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error downloading presentation PNG:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F9F9ED] text-[#111111] py-6 sm:py-8 px-6 sm:px-10 font-serif">
      <div className="max-w-7xl mx-auto space-y-5 sm:space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-3xl sm:text-5xl font-normal italic tracking-tighter text-[#111111]">
            The Digital Garden
          </h1>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setCurrentView('builder')}
            className="text-[10px] uppercase tracking-widest border border-[#000000] bg-[#000000] text-[#F9F9ED] px-6 py-3 hover:bg-transparent hover:text-[#111111] hover:border-[#111111] transition-all cursor-pointer font-sans self-start sm:self-auto shrink-0"
          >
            Compose New Bouquet
          </motion.button>
        </div>

        {/* Global Search Bar */}
        {bouquets.length > 0 && (
          <div className="relative font-sans">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#85857D]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search bouquets by recipient name, title, note, or ribbon..."
              className="w-full pl-10 pr-9 py-2.5 bg-[#FAFAF2] border border-[#D9D9CE] text-xs font-sans placeholder-[#85857D] focus:outline-none focus:border-[#111111] text-[#111111] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#85857D] hover:text-[#111111] transition-colors cursor-pointer"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        {/* Empty State */}
        {bouquets.length === 0 && (
          <div className="text-center py-24 bg-[#FAFAF2] border border-[#D9D9CE] p-10 max-w-xl mx-auto my-12 shadow-xs">
            <h3 className="text-2xl font-normal italic mb-3 text-[#111111]">Your garden is empty</h3>
            <p className="text-xs text-[#6F6F6F] font-sans uppercase tracking-wider mb-8">
              No botanical arrangements have been planted yet.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setCurrentView('builder')}
              className="text-[10px] uppercase tracking-widest border border-[#000000] bg-[#000000] text-[#F9F9ED] px-8 py-3.5 hover:bg-transparent hover:text-[#111111] hover:border-[#111111] transition-all cursor-pointer font-sans"
            >
              Enter Atelier Builder
            </motion.button>
          </div>
        )}

        {/* No Search Results Found */}
        {bouquets.length > 0 && filteredBouquets.length === 0 && (
          <div className="text-center py-16 bg-[#FAFAF2] border border-[#D9D9CE] p-8 max-w-lg mx-auto my-8 shadow-xs">
            <Search className="w-8 h-8 mx-auto mb-3 text-[#85857D] opacity-60" />
            <h3 className="text-xl font-serif italic mb-2 text-[#111111]">No matching bouquets found</h3>
            <p className="text-xs text-[#6F6F6F] font-sans uppercase tracking-wider mb-6">
              No arrangements matched "{searchQuery}"
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-[10px] uppercase tracking-widest border border-[#111111] bg-[#111111] text-[#F9F9ED] px-6 py-2.5 hover:bg-transparent hover:text-[#111111] transition-all cursor-pointer font-sans"
            >
              Clear Search Filter
            </button>
          </div>
        )}

        {/* Editorial Bouquet Grid */}
        {filteredBouquets.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {filteredBouquets.map((bouquet) => {
              const wrapObj = WRAPPING_OPTIONS.find(w => w.id === bouquet.wrapping) || WRAPPING_OPTIONS[0];
              const ribbonObj = RIBBON_OPTIONS.find(r => r.id === bouquet.ribbon) || RIBBON_OPTIONS[0];
              const textureObj = RIBBON_TEXTURES.find(t => t.id === bouquet.ribbonTexture) || RIBBON_TEXTURES[0];
              const stickers = bouquet.stickers || [];

              return (
                <motion.div
                  key={bouquet.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#FAFAF2] border border-[#D9D9CE] overflow-hidden hover:border-[#111111] transition-all flex flex-col justify-between group shadow-2xs"
                >
                  {/* High-Fidelity Preview Thumbnail */}
                  <div className="aspect-[4/3] relative flex items-center justify-center p-4 overflow-hidden bg-[#F5F5E9] border-b border-[#D9D9CE]">
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                    
                    {/* Miniature Stemless Anchor & Blooms Preview */}
                    <div className="relative w-36 h-45 aspect-[4/5] flex items-center justify-center">
                      
                      {/* 1. Back Anchor */}
                      <CompositionAnchor
                        anchorType={bouquet.anchorType || 'soft-wrap'}
                        wrappingStyle={bouquet.wrapping}
                        ribbonStyle={bouquet.ribbon}
                        ribbonColor={bouquet.ribbonColor}
                        ribbonTexture={bouquet.ribbonTexture}
                        ribbonText={bouquet.ribbonText}
                        ribbonTextColor={bouquet.ribbonTextColor}
                        layer="back"
                      />

                      {/* 2. Placed Blooms */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                        {bouquet.flowers.map((pf) => {
                          const flowerDef = FLOWERS.find(f => f.id === pf.flowerId) || FLOWERS[0];
                          return (
                            <div
                              key={pf.instanceId}
                              style={{
                                position: 'absolute',
                                left: `${pf.x}%`,
                                top: `${pf.y}%`,
                                transform: `translate(-50%, -50%) rotate(${pf.rotation}deg) scale(${pf.scale * 0.65})`,
                                zIndex: pf.zIndex
                              }}
                            >
                              <div className="w-16 h-16 flex items-center justify-center">
                                <FlowerSVG 
                                  flowerId={flowerDef.id}
                                  svgType={flowerDef.svgType} 
                                  color={flowerDef.color} 
                                  imageUrl={flowerDef.imageUrl}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* 3. Front Anchor */}
                      <CompositionAnchor
                        anchorType={bouquet.anchorType || 'soft-wrap'}
                        wrappingStyle={bouquet.wrapping}
                        ribbonStyle={bouquet.ribbon}
                        ribbonColor={bouquet.ribbonColor}
                        ribbonTexture={bouquet.ribbonTexture}
                        ribbonText={bouquet.ribbonText}
                        ribbonTextColor={bouquet.ribbonTextColor}
                        layer="front"
                      />

                      {/* 4. Decorative Stickers Overlay */}
                      {stickers.length > 0 && (
                        <div className="absolute inset-0 pointer-events-none z-35">
                          {stickers.map((ps) => (
                            <div
                              key={ps.instanceId}
                              style={{
                                position: 'absolute',
                                left: `${ps.x}%`,
                                top: `${ps.y}%`,
                                transform: `translate(-50%, -50%) rotate(${ps.rotation}deg) scale(${ps.scale * 0.65})`,
                                zIndex: ps.zIndex
                              }}
                            >
                              <div className="w-8 h-8">
                                <StickerSVG stickerId={ps.stickerId} />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Stem Count & Ribbon Badge */}
                    <div className="absolute top-4 right-4 bg-[#FAFAF2] px-2.5 py-1 text-[9px] font-sans uppercase tracking-widest text-[#6F6F6F] border border-[#D9D9CE] shadow-2xs flex items-center gap-1.5">
                      <span>{bouquet.flowers.length} blooms</span>
                      <span>•</span>
                      <span>{textureObj ? textureObj.name : ribbonObj.material}</span>
                      {stickers.length > 0 && (
                        <>
                          <span>•</span>
                          <span>{stickers.length} fauna</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Editorial Card Details */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[9px] font-sans uppercase tracking-[0.2em] text-[#6F6F6F]">
                        <span className="flex items-center gap-1.5 font-medium text-[#111111]/80" title={new Date(bouquet.createdAt).toLocaleString()}>
                          <Calendar className="w-3 h-3 text-[#111111]" />
                          <span>{formatBloomingDate(bouquet.createdAt)}</span>
                        </span>
                        <span>{wrapObj.name}</span>
                      </div>

                      <h3 className="text-2xl font-normal italic text-[#111111] group-hover:opacity-80 transition-opacity">
                        {bouquet.title}
                      </h3>

                      <p className="text-[10px] text-[#6F6F6F] font-sans uppercase tracking-widest flex items-center gap-1.5 pt-1">
                        <User className="w-3 h-3 text-[#111111]" />
                        <span>For {bouquet.recipientName} • From {bouquet.senderName}</span>
                      </p>

                      {/* Inscribed Ribbon Text Badge if present */}
                      {bouquet.ribbonText && (
                        <div className="flex items-center gap-1.5 text-[9px] font-serif italic text-[#85857D] pt-1">
                          <Tag className="w-2.5 h-2.5 text-amber-700/80" />
                          <span className="truncate">Ribbon: "{bouquet.ribbonText}"</span>
                        </div>
                      )}
                    </div>

                    {/* Sentiment Box */}
                    <div className="text-xs text-[#555555] font-serif italic line-clamp-2 bg-[#F5F5E9] p-4 border border-[#D9D9CE]/80 leading-relaxed">
                      "{bouquet.note}"
                    </div>

                    {/* Action Row */}
                    <div className="flex items-center justify-between pt-4 border-t border-[#D9D9CE]">
                      <button
                        onClick={() => setSelectedBouquet(bouquet)}
                        className="text-[10px] uppercase tracking-[0.18em] font-sans font-semibold text-[#111111] hover:text-[#6F6F6F] transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Presentation</span>
                      </button>

                      <button
                        onClick={() => onDeleteBouquet(bouquet.id)}
                        className="p-2 text-red-600/70 hover:text-red-600 transition-colors cursor-pointer"
                        title="Remove from garden"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>

      {/* Editorial Presentation Modal */}
      <AnimatePresence>
        {selectedBouquet && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#F9F9ED] text-[#111111] w-full max-w-xl border border-[#D9D9CE] shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col font-serif"
            >
              <div className="p-6 sm:p-8 border-b border-[#D9D9CE] flex items-center justify-between bg-[#FAFAF2]">
                <div>
                  <div className="flex items-center gap-2 text-[9px] font-sans uppercase tracking-[0.2em] text-[#6F6F6F]">
                    <span>Digital Botanical Gift</span>
                    <span>•</span>
                    <span title={new Date(selectedBouquet.createdAt).toLocaleString()}>
                      {formatBloomingDate(selectedBouquet.createdAt)}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-normal italic mt-1 text-[#111111]">{selectedBouquet.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedBouquet(null)}
                  className="p-2 text-[#6F6F6F] hover:text-[#111111] transition-colors cursor-pointer font-sans text-lg"
                >
                  ✕
                </button>
              </div>

              {/* Printable Artboard Container */}
              <div ref={presentationRef} className="p-6 sm:p-10 overflow-y-auto space-y-8 flex-1 bg-[#F9F9ED]">
                <div className="text-center space-y-2">
                  <p className="text-[9px] font-sans uppercase tracking-[0.2em] text-[#6F6F6F]">Dedicated To</p>
                  <p className="text-3xl sm:text-4xl font-normal italic text-[#111111]">{selectedBouquet.recipientName}</p>
                </div>

                {/* Botanical Bouquet Display in Modal */}
                <div className="relative w-full max-w-[340px] aspect-[4/5] mx-auto flex items-center justify-center">
                  {/* 1. Back Anchor */}
                  <CompositionAnchor
                    anchorType={selectedBouquet.anchorType || 'soft-wrap'}
                    wrappingStyle={selectedBouquet.wrapping}
                    ribbonStyle={selectedBouquet.ribbon}
                    ribbonColor={selectedBouquet.ribbonColor}
                    ribbonTexture={selectedBouquet.ribbonTexture}
                    ribbonText={selectedBouquet.ribbonText}
                    ribbonTextColor={selectedBouquet.ribbonTextColor}
                    layer="back"
                  />

                  {/* 2. Placed Blooms */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    {selectedBouquet.flowers.map((pf) => {
                      const flowerDef = FLOWERS.find(f => f.id === pf.flowerId) || FLOWERS[0];
                      return (
                        <div
                          key={pf.instanceId}
                          style={{
                            position: 'absolute',
                            left: `${pf.x}%`,
                            top: `${pf.y}%`,
                            transform: `translate(-50%, -50%) rotate(${pf.rotation}deg) scale(${pf.scale * 0.75})`,
                            zIndex: pf.zIndex
                          }}
                        >
                          <div className="w-20 h-20 flex items-center justify-center">
                            <FlowerSVG 
                              flowerId={flowerDef.id}
                              svgType={flowerDef.svgType} 
                              color={flowerDef.color} 
                              imageUrl={flowerDef.imageUrl}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* 3. Front Anchor */}
                  <CompositionAnchor
                    anchorType={selectedBouquet.anchorType || 'soft-wrap'}
                    wrappingStyle={selectedBouquet.wrapping}
                    ribbonStyle={selectedBouquet.ribbon}
                    ribbonColor={selectedBouquet.ribbonColor}
                    ribbonTexture={selectedBouquet.ribbonTexture}
                    ribbonText={selectedBouquet.ribbonText}
                    ribbonTextColor={selectedBouquet.ribbonTextColor}
                    layer="front"
                  />

                  {/* 4. Placed Botanical Fauna Stickers */}
                  {selectedBouquet.stickers && selectedBouquet.stickers.length > 0 && (
                    <div className="absolute inset-0 pointer-events-none z-35">
                      {selectedBouquet.stickers.map((ps) => (
                        <div
                          key={ps.instanceId}
                          style={{
                            position: 'absolute',
                            left: `${ps.x}%`,
                            top: `${ps.y}%`,
                            transform: `translate(-50%, -50%) rotate(${ps.rotation}deg) scale(${ps.scale * 0.75})`,
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

                <div className="bg-[#FAFAF2] p-6 sm:p-8 border border-[#D9D9CE] shadow-xs space-y-6 max-w-md mx-auto">
                  <p className="font-serif italic text-base sm:text-lg leading-relaxed text-[#333333] text-center whitespace-pre-wrap">
                    "{selectedBouquet.note}"
                  </p>
                  
                  {selectedBouquet.ribbonText && (
                    <div className="text-center pt-2 border-t border-[#D9D9CE]/60">
                      <span className="text-[9px] uppercase tracking-widest text-[#85857D] font-sans block mb-1">
                        Inscribed Ribbon Sash
                      </span>
                      <span className="font-serif italic text-xs text-[#111111]">
                        "{selectedBouquet.ribbonText}"
                      </span>
                    </div>
                  )}

                  <div className="text-right text-[10px] font-sans uppercase tracking-widest text-[#6F6F6F] pt-4 border-t border-[#D9D9CE]">
                    With affection, {selectedBouquet.senderName}
                  </div>
                </div>
              </div>

              {/* Action Buttons in Modal Footer */}
              <div className="p-4 sm:p-6 border-t border-[#D9D9CE] bg-[#F5F5E9] flex items-center justify-between font-sans">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleExportModalPNG}
                  disabled={isExporting}
                  className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest border border-[#111111] bg-[#FAFAF2] text-[#111111] px-5 py-2.5 hover:bg-[#111111] hover:text-[#F9F9ED] transition-all cursor-pointer shadow-2xs"
                  title="Download as PNG image"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{isExporting ? 'Generating PNG...' : 'Save PNG Image'}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setSelectedBouquet(null)}
                  className="text-[10px] uppercase tracking-widest border border-[#000000] bg-[#000000] text-[#F9F9ED] px-6 py-2.5 hover:bg-transparent hover:text-[#111111] hover:border-[#111111] transition-all cursor-pointer"
                >
                  Close Presentation
                </motion.button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
