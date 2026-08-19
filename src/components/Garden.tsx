import React, { useState } from 'react';
import { Bouquet, AppView } from '../types';
import { FlowerSVG } from './FlowerSVG';
import { Trash2, Eye, Sparkles, Calendar, User, Heart } from 'lucide-react';
import { WRAPPING_OPTIONS } from '../data/flowers';

interface GardenProps {
  bouquets: Bouquet[];
  setCurrentView: (view: AppView) => void;
  onDeleteBouquet: (id: string) => void;
}

export const Garden: React.FC<GardenProps> = ({ bouquets, setCurrentView, onDeleteBouquet }) => {
  const [selectedBouquet, setSelectedBouquet] = useState<Bouquet | null>(null);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F9F9ED] text-[#111111] py-12 px-6 sm:px-10 font-serif">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#D9D9CE] pb-8 gap-6">
          <div className="space-y-3">
            <div className="text-[10px] uppercase tracking-[0.2em] font-sans font-medium text-[#6F6F6F]">
              Sanctuary of Shared Stems
            </div>
            <h1 className="text-4xl sm:text-6xl font-normal italic tracking-tighter text-[#111111]">
              The Digital Garden
            </h1>
            <p className="text-[#6F6F6F] font-serif font-light max-w-lg text-sm sm:text-base leading-relaxed">
              Arrangements planted and preserved across sessions. Explore notes, wrapping details, and sentiments.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('builder')}
            className="text-[10px] uppercase tracking-widest border border-[#000000] bg-[#000000] text-[#F9F9ED] px-8 py-3.5 hover:bg-transparent hover:text-[#111111] hover:border-[#111111] transition-all cursor-pointer shadow-xs font-sans self-start md:self-auto shrink-0"
          >
            Compose New Bouquet
          </button>
        </div>

        {/* Empty State */}
        {bouquets.length === 0 && (
          <div className="text-center py-24 bg-[#FAFAF2] border border-[#D9D9CE] p-10 max-w-xl mx-auto my-12">
            <h3 className="text-2xl font-normal italic mb-3 text-[#111111]">Your garden is empty</h3>
            <p className="text-xs text-[#6F6F6F] font-sans uppercase tracking-wider mb-8">
              No arrangements have been planted yet.
            </p>
            <button
              onClick={() => setCurrentView('builder')}
              className="text-[10px] uppercase tracking-widest border border-[#000000] bg-[#000000] text-[#F9F9ED] px-8 py-3.5 hover:bg-transparent hover:text-[#111111] hover:border-[#111111] transition-all cursor-pointer font-sans"
            >
              Enter Atelier Builder
            </button>
          </div>
        )}

        {/* Editorial Bouquet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {bouquets.map((bouquet) => {
            const wrapObj = WRAPPING_OPTIONS.find(w => w.id === bouquet.wrapping) || WRAPPING_OPTIONS[0];

            return (
              <div
                key={bouquet.id}
                className="bg-[#FAFAF2] border border-[#D9D9CE] overflow-hidden hover:border-[#111111] transition-all flex flex-col justify-between group shadow-2xs"
              >
                {/* High-Fidelity Preview Thumbnail */}
                <div className="aspect-[4/3] relative flex items-center justify-center p-6 overflow-hidden bg-[#F5F5E9] border-b border-[#D9D9CE]">
                  <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                  
                  {/* Miniature Wrapped Cone Preview */}
                  <div className="relative w-28 h-32 flex items-center justify-center">
                    <div className={`absolute bottom-0 w-20 h-24 rounded-b-2xl shadow-xs ${wrapObj.bg} border-t border-[#111111]/10 opacity-90`}></div>
                    
                    {/* Flowers Placed */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none scale-75">
                      {bouquet.flowers.map((pf) => (
                        <div
                          key={pf.instanceId}
                          style={{
                            position: 'absolute',
                            left: `${pf.x}%`,
                            top: `${pf.y - 10}%`,
                            transform: `translate(-50%, -50%) rotate(${pf.rotation}deg) scale(${pf.scale * 0.65})`,
                            zIndex: pf.zIndex
                          }}
                        >
                          <div className="w-20 h-24">
                            <FlowerSVG 
                              svgType="rose" 
                              color="#E08285" 
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stem Count Badge */}
                  <div className="absolute top-4 right-4 bg-[#FAFAF2] px-3 py-1 text-[9px] font-sans uppercase tracking-widest text-[#6F6F6F] border border-[#D9D9CE] shadow-2xs">
                    {bouquet.flowers.length} stems
                  </div>
                </div>

                {/* Editorial Card Details */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[9px] font-sans uppercase tracking-[0.2em] text-[#6F6F6F]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(bouquet.createdAt).toLocaleDateString()}
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
              </div>
            );
          })}
        </div>

      </div>

      {/* Editorial Presentation Modal */}
      {selectedBouquet && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-[#F9F9ED] text-[#111111] w-full max-w-xl border border-[#D9D9CE] shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col font-serif">
            
            <div className="p-8 border-b border-[#D9D9CE] flex items-center justify-between bg-[#FAFAF2]">
              <div>
                <span className="text-[9px] font-sans uppercase tracking-[0.2em] text-[#6F6F6F]">Digital Botanical Gift</span>
                <h3 className="text-3xl font-normal italic mt-1 text-[#111111]">{selectedBouquet.title}</h3>
              </div>
              <button
                onClick={() => setSelectedBouquet(null)}
                className="p-2 text-[#6F6F6F] hover:text-[#111111] transition-colors cursor-pointer font-sans"
              >
                ✕
              </button>
            </div>

            <div className="p-10 overflow-y-auto space-y-8 flex-1">
              <div className="text-center space-y-2">
                <p className="text-[9px] font-sans uppercase tracking-[0.2em] text-[#6F6F6F]">Dedicated To</p>
                <p className="text-4xl font-normal italic text-[#111111]">{selectedBouquet.recipientName}</p>
              </div>

              <div className="bg-[#FAFAF2] p-8 border border-[#D9D9CE] shadow-xs space-y-6 max-w-md mx-auto">
                <p className="font-serif italic text-lg leading-relaxed text-[#333333] text-center whitespace-pre-wrap">
                  "{selectedBouquet.note}"
                </p>
                <div className="text-right text-[10px] font-sans uppercase tracking-widest text-[#6F6F6F] pt-4 border-t border-[#D9D9CE]">
                  With affection, {selectedBouquet.senderName}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-[#D9D9CE] bg-[#F5F5E9] flex justify-end">
              <button
                onClick={() => setSelectedBouquet(null)}
                className="text-[10px] uppercase tracking-widest font-sans border border-[#000000] bg-[#000000] text-[#F9F9ED] px-8 py-3 hover:bg-transparent hover:text-[#111111] hover:border-[#111111] transition-all cursor-pointer"
              >
                Close Presentation
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
