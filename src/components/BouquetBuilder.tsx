import React, { useState, useRef, useEffect } from 'react';
import { Flower as FlowerType, PlacedFlower, Bouquet, WrappingStyle, RibbonStyle, AppView } from '../types';
import { FLOWERS, WRAPPING_OPTIONS, RIBBON_OPTIONS } from '../data/flowers';
import { FlowerSVG } from './FlowerSVG';
import { 
  Sparkles, Plus, Trash2, RefreshCcw, Check, 
  Send, Wand2, Package, Layers, ChevronRight, X, Flower2, Undo2, ArrowUp, ArrowDown, Sliders
} from 'lucide-react';

interface BouquetBuilderProps {
  onSaveBouquet: (bouquet: Bouquet) => void;
  setCurrentView: (view: AppView) => void;
}

export const BouquetBuilder: React.FC<BouquetBuilderProps> = ({ 
  onSaveBouquet, 
  setCurrentView 
}) => {
  const [placedFlowers, setPlacedFlowers] = useState<PlacedFlower[]>([
    { instanceId: 'init-1', flowerId: 'rose-blush', x: 50, y: 42, rotation: 0, scale: 1.1, zIndex: 1 },
    { instanceId: 'init-2', flowerId: 'peony-coral', x: 40, y: 48, rotation: -10, scale: 1.15, zIndex: 2 },
    { instanceId: 'init-3', flowerId: 'eucalyptus-silver', x: 32, y: 52, rotation: -18, scale: 0.95, zIndex: 3 },
    { instanceId: 'init-4', flowerId: 'eucalyptus-silver', x: 68, y: 52, rotation: 18, scale: 0.95, zIndex: 4 },
  ]);

  const [history, setHistory] = useState<PlacedFlower[][]>([]);
  const [selectedInstanceId, setSelectedInstanceId] = useState<string | null>('init-1');
  const [visibleSquareId, setVisibleSquareId] = useState<string | null>('init-1');
  const [squareTimer, setSquareTimer] = useState<NodeJS.Timeout | null>(null);

  const [wrapping, setWrapping] = useState<WrappingStyle>('kraft');
  const [ribbon, setRibbon] = useState<RibbonStyle>('ivory-silk');
  const [recipientName, setRecipientName] = useState('');
  const [senderName, setSenderName] = useState('');
  const [note, setNote] = useState('');
  const [bouquetTitle, setBouquetTitle] = useState('Bespoke Arrangement');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [activeTab, setActiveTab] = useState<'flowers' | 'wrapping' | 'card'>('flowers');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (squareTimer) clearTimeout(squareTimer);
    };
  }, [squareTimer]);

  const updateFlowersWithHistory = (newFlowers: PlacedFlower[]) => {
    setHistory(prev => [...prev, placedFlowers]);
    setPlacedFlowers(newFlowers);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const previousState = history[history.length - 1];
    setHistory(prev => prev.slice(0, prev.length - 1));
    setPlacedFlowers(previousState);
    if (previousState.length > 0) {
      handleSelectFlower(previousState[previousState.length - 1].instanceId);
    } else {
      setSelectedInstanceId(null);
      setVisibleSquareId(null);
    }
  };

  const handleSelectFlower = (instanceId: string) => {
    setSelectedInstanceId(instanceId);
    setVisibleSquareId(instanceId);

    if (squareTimer) clearTimeout(squareTimer);
    const timer = setTimeout(() => {
      setVisibleSquareId(null);
    }, 3500);
    setSquareTimer(timer);
  };

  const handleBringForward = () => {
    if (!selectedInstanceId) return;
    const maxZ = Math.max(0, ...placedFlowers.map(f => f.zIndex));
    setPlacedFlowers(placedFlowers.map(f => 
      f.instanceId === selectedInstanceId ? { ...f, zIndex: maxZ + 1 } : f
    ));
  };

  const handleSendBackward = () => {
    if (!selectedInstanceId) return;
    const minZ = Math.min(...placedFlowers.map(f => f.zIndex));
    setPlacedFlowers(placedFlowers.map(f => 
      f.instanceId === selectedInstanceId ? { ...f, zIndex: Math.max(0, minZ - 1) } : f
    ));
  };

  const handleAddFlower = (flower: FlowerType) => {
    const randomOffsetX = (Math.random() - 0.5) * 20;
    const randomOffsetY = (Math.random() - 0.5) * 20;
    const randomRotation = (Math.random() - 0.5) * 25;
    const maxZ = Math.max(0, ...placedFlowers.map(f => f.zIndex));

    const newPlaced: PlacedFlower = {
      instanceId: `flower-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      flowerId: flower.id,
      x: 50 + randomOffsetX,
      y: 44 + randomOffsetY,
      rotation: randomRotation,
      scale: flower.defaultScale || 1.0,
      zIndex: maxZ + 1
    };

    updateFlowersWithHistory([...placedFlowers, newPlaced]);
    handleSelectFlower(newPlaced.instanceId);
  };

  const handleRemoveFlower = (instanceId: string) => {
    updateFlowersWithHistory(placedFlowers.filter(f => f.instanceId !== instanceId));
    if (selectedInstanceId === instanceId) {
      setSelectedInstanceId(null);
      setVisibleSquareId(null);
    }
  };

  const handleUpdateSelected = (updates: Partial<PlacedFlower>) => {
    if (!selectedInstanceId) return;
    if (squareTimer) clearTimeout(squareTimer);
    setVisibleSquareId(selectedInstanceId);
    const timer = setTimeout(() => {
      setVisibleSquareId(null);
    }, 3500);
    setSquareTimer(timer);

    setPlacedFlowers(placedFlowers.map(f => 
      f.instanceId === selectedInstanceId ? { ...f, ...updates } : f
    ));
  };

  const handleReset = () => {
    if (placedFlowers.length === 0) return;
    updateFlowersWithHistory([]);
    setSelectedInstanceId(null);
    setVisibleSquareId(null);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !selectedInstanceId || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = Math.max(15, Math.min(85, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(20, Math.min(78, ((e.clientY - rect.top) / rect.height) * 100));

    if (squareTimer) clearTimeout(squareTimer);
    setVisibleSquareId(selectedInstanceId);
    const timer = setTimeout(() => {
      setVisibleSquareId(null);
    }, 3500);
    setSquareTimer(timer);

    setPlacedFlowers(placedFlowers.map(f => 
      f.instanceId === selectedInstanceId ? { ...f, x, y } : f
    ));
  };

  const handleGenerateAI = async () => {
    setIsGeneratingAI(true);
    try {
      const flowerNames = placedFlowers.map(pf => {
        const f = FLOWERS.find(item => item.id === pf.flowerId);
        return f ? f.name : 'Flower';
      });

      const res = await fetch('/api/generate-poem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          flowers: flowerNames,
          recipient: recipientName || 'Dear Friend',
          sender: senderName || 'Someone Special',
          occasion: 'Thought of you'
        })
      });

      const data = await res.json();
      if (data.poem) setNote(data.poem);
      if (data.title) setBouquetTitle(data.title);
    } catch (e) {
      console.error(e);
      setNote(`Dearest ${recipientName || 'Friend'},\n\nMay this digital arrangement bring quiet joy to your days.\n\nWarmly,\n${senderName || 'Anonymous'}`);
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleFinishBouquet = (e: React.FormEvent) => {
    e.preventDefault();
    if (placedFlowers.length === 0) {
      alert('Please add at least one stem to your bouquet.');
      return;
    }

    const newBouquet: Bouquet = {
      id: `bouquet-${Date.now()}`,
      title: bouquetTitle || 'Untitled Bouquet',
      flowers: placedFlowers,
      wrapping,
      ribbon,
      recipientName: recipientName || 'Someone Special',
      senderName: senderName || 'Anonymous',
      note: note || 'With heartfelt affection.',
      createdAt: Date.now()
    };

    onSaveBouquet(newBouquet);
    setCurrentView('garden');
  };

  const selectedFlowerItem = placedFlowers.find(f => f.instanceId === selectedInstanceId);
  const selectedFlowerDef = selectedFlowerItem ? FLOWERS.find(f => f.id === selectedFlowerItem.flowerId) : null;
  const currentWrappingObj = WRAPPING_OPTIONS.find(w => w.id === wrapping) || WRAPPING_OPTIONS[0];
  const currentRibbonObj = RIBBON_OPTIONS.find(r => r.id === ribbon) || RIBBON_OPTIONS[0];

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col md:flex-row overflow-hidden bg-[#F9F9ED] text-[#111111]">
      
      {/* Sidebar Library & Controls (Desktop) or Collapsible Drawer (Mobile) */}
      <aside className={`w-full md:w-[320px] lg:w-[340px] border-r border-[#D9D9CE] flex flex-col bg-[#F9F9ED]/95 backdrop-blur-md overflow-y-auto z-20 transition-all ${
        mobileDrawerOpen ? 'fixed inset-x-0 top-[73px] bottom-16 h-[calc(100vh-137px)] p-6 bg-[#FAFAF2] shadow-2xl z-40 block' : 'hidden md:flex p-6 md:p-8 max-h-[calc(100vh-80px)]'
      }`}>
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-[#D9D9CE] pb-3 mb-5 gap-6 font-sans text-[10px] uppercase tracking-[0.2em] font-medium text-[#6F6F6F]">
          <button
            onClick={() => setActiveTab('flowers')}
            className={`pb-1 transition-colors cursor-pointer active:scale-95 ${activeTab === 'flowers' ? 'text-[#111111] border-b border-[#111111] font-bold' : 'hover:text-[#111111]'}`}
          >
            Stems Library
          </button>
          <button
            onClick={() => setActiveTab('wrapping')}
            className={`pb-1 transition-colors cursor-pointer active:scale-95 ${activeTab === 'wrapping' ? 'text-[#111111] border-b border-[#111111] font-bold' : 'hover:text-[#111111]'}`}
          >
            Wrapping
          </button>
          <button
            onClick={() => setActiveTab('card')}
            className={`pb-1 transition-colors cursor-pointer active:scale-95 ${activeTab === 'card' ? 'text-[#111111] border-b border-[#111111] font-bold' : 'hover:text-[#111111]'}`}
          >
            Card & Note
          </button>
        </div>

        {activeTab === 'flowers' && (
          <div className="mb-6">
            <h2 className="text-[10px] uppercase tracking-[0.15em] font-sans font-semibold mb-3 text-[#85857D]">
              Available Stems ({FLOWERS.length})
            </h2>
            <div className="grid grid-cols-2 gap-2.5">
              {FLOWERS.map((flower) => {
                const count = placedFlowers.filter(pf => pf.flowerId === flower.id).length;

                return (
                  <button
                    key={flower.id}
                    onClick={() => {
                      handleAddFlower(flower);
                      if (window.innerWidth < 768) setMobileDrawerOpen(false);
                    }}
                    className="aspect-[4/5] bg-[#FAFAF2] border border-[#D9D9CE] flex flex-col items-center justify-center p-2.5 cursor-pointer hover:border-[#111111] active:scale-95 transition-all relative group text-left"
                  >
                    {count > 0 && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-[#000000] text-[#F9F9ED] rounded-full flex items-center justify-center text-[10px] font-sans font-medium shadow-xs z-20">
                        {count}
                      </div>
                    )}
                    <div className="w-10 h-14 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform">
                      <FlowerSVG 
                        svgType={flower.svgType} 
                        color={flower.color} 
                      />
                    </div>
                    <span className="mt-1.5 text-[9px] uppercase tracking-widest font-sans opacity-65 text-center truncate w-full text-[#111111]">
                      {flower.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'wrapping' && (
          <div className="mb-6 space-y-5 font-sans">
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.15em] font-semibold mb-2.5 text-[#85857D]">Wrapping Paper</h3>
              <div className="space-y-2 text-xs">
                {WRAPPING_OPTIONS.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => setWrapping(w.id as WrappingStyle)}
                    className={`w-full p-2.5 border text-left flex items-center justify-between transition-all active:scale-[0.98] cursor-pointer ${
                      wrapping === w.id ? 'border-[#111111] bg-[#F5F5E9] font-medium' : 'border-[#D9D9CE] hover:border-[#85857D]'
                    }`}
                  >
                    <span>{w.name}</span>
                    <span className={`w-4 h-4 rounded-full ${w.bg} border border-[#111111]/10`} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[10px] uppercase tracking-[0.15em] font-semibold mb-2.5 text-[#85857D]">Ribbon Tie</h3>
              <div className="space-y-2 text-xs">
                {RIBBON_OPTIONS.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRibbon(r.id as RibbonStyle)}
                    className={`w-full p-2.5 border text-left flex items-center justify-between transition-all active:scale-[0.98] cursor-pointer ${
                      ribbon === r.id ? 'border-[#111111] bg-[#F5F5E9] font-medium' : 'border-[#D9D9CE] hover:border-[#85857D]'
                    }`}
                  >
                    <span>{r.name}</span>
                    <span className="w-4 h-4 rounded-full border border-[#111111]/10" style={{ backgroundColor: r.color }} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'card' && (
          <div className="mb-6 space-y-4 font-sans">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-[#6F6F6F] mb-1">Bouquet Title</label>
              <input
                type="text"
                value={bouquetTitle}
                onChange={(e) => setBouquetTitle(e.target.value)}
                className="w-full p-2.5 border border-[#D9D9CE] bg-[#FAFAF2] text-xs focus:outline-none focus:border-[#111111] font-serif text-[#111111]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#6F6F6F] mb-1">Recipient</label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full p-2.5 border border-[#D9D9CE] bg-[#FAFAF2] text-xs focus:outline-none focus:border-[#111111] font-serif text-[#111111]"
                  placeholder="Clara"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[#6F6F6F] mb-1">Sender</label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full p-2.5 border border-[#D9D9CE] bg-[#FAFAF2] text-xs focus:outline-none focus:border-[#111111] font-serif text-[#111111]"
                  placeholder="Julian"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-[10px] uppercase tracking-widest text-[#6F6F6F]">Gift Note</label>
                <button
                  type="button"
                  onClick={handleGenerateAI}
                  disabled={isGeneratingAI}
                  className="text-[10px] uppercase tracking-wider text-[#111111] hover:underline flex items-center gap-1 font-semibold cursor-pointer active:scale-95"
                >
                  <Wand2 className="w-3 h-3" />
                  <span>{isGeneratingAI ? 'Composing...' : 'AI Verse'}</span>
                </button>
              </div>
              <textarea
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full p-2.5 border border-[#D9D9CE] bg-[#FAFAF2] text-xs focus:outline-none focus:border-[#111111] font-serif italic text-[#111111]"
                placeholder="Write a personal note or generate with AI..."
              />
            </div>
          </div>
        )}

        {/* Composition Engine Layer Fine-Tuning */}
        <div className="mt-auto pt-4 border-t border-[#D9D9CE]">
          <div className="flex justify-between items-center mb-3 font-sans">
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#111111] flex items-center gap-1">
              <Sliders className="w-3 h-3" />
              <span>Composition Engine</span>
            </span>
            <span className="text-[10px] text-[#6F6F6F] truncate max-w-[120px]">{selectedFlowerDef ? selectedFlowerDef.name : 'Select stem'}</span>
          </div>

          {selectedInstanceId && selectedFlowerItem ? (
            <div className="space-y-3 font-sans">
              <div>
                <div className="flex justify-between text-[10px] mb-1 text-[#6F6F6F]">
                  <span>Scale / Size</span>
                  <span>{Math.round(selectedFlowerItem.scale * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.8"
                  step="0.05"
                  value={selectedFlowerItem.scale}
                  onChange={(e) => handleUpdateSelected({ scale: parseFloat(e.target.value) })}
                  className="w-full accent-[#111111] cursor-pointer h-1 bg-[#D9D9CE]"
                />
              </div>

              <div>
                <div className="flex justify-between text-[10px] mb-1 text-[#6F6F6F]">
                  <span>Rotation</span>
                  <span>{selectedFlowerItem.rotation}°</span>
                </div>
                <input
                  type="range"
                  min="-45"
                  max="45"
                  step="1"
                  value={selectedFlowerItem.rotation}
                  onChange={(e) => handleUpdateSelected({ rotation: parseInt(e.target.value) })}
                  className="w-full accent-[#111111] cursor-pointer h-1 bg-[#D9D9CE]"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex gap-1.5">
                  <button
                    onClick={handleBringForward}
                    className="p-1.5 border border-[#D9D9CE] text-[10px] uppercase tracking-wider text-[#111111] hover:border-[#111111] cursor-pointer flex items-center gap-1 bg-[#FAFAF2]"
                    title="Bring Forward"
                  >
                    <ArrowUp className="w-3 h-3" />
                    <span>Layer +</span>
                  </button>
                  <button
                    onClick={handleSendBackward}
                    className="p-1.5 border border-[#D9D9CE] text-[10px] uppercase tracking-wider text-[#111111] hover:border-[#111111] cursor-pointer flex items-center gap-1 bg-[#FAFAF2]"
                    title="Send Backward"
                  >
                    <ArrowDown className="w-3 h-3" />
                    <span>Layer -</span>
                  </button>
                </div>

                <button
                  onClick={() => handleRemoveFlower(selectedInstanceId)}
                  className="text-[10px] uppercase tracking-widest text-red-600 hover:underline cursor-pointer active:scale-95 font-sans"
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            <p className="text-[10px] font-sans text-[#6F6F6F] italic">Click any stem on canvas to adjust layering, scale, and angle.</p>
          )}
        </div>

      </aside>

      {/* Main Canvas Area */}
      <main 
        ref={canvasRef}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        className="flex-1 relative bg-[#F9F9ED] flex flex-col items-center justify-between p-3 md:p-8 overflow-hidden select-none"
      >
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        {/* Mobile Stem Picker Bar (Top toggle for mobile) */}
        <div className="w-full flex md:hidden items-center justify-between bg-[#FAFAF2] border border-[#D9D9CE] px-4 py-2.5 mb-2 z-20">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#111111]"></span>
            <span className="text-[10px] font-sans uppercase tracking-widest font-bold text-[#111111]">
              {placedFlowers.length} Stems Placed
            </span>
          </div>
          <button
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="text-[10px] uppercase tracking-widest font-sans font-medium px-3 py-1.5 bg-[#111111] text-[#F9F9ED] active:scale-95 cursor-pointer flex items-center gap-1"
          >
            <span>{mobileDrawerOpen ? 'Close Library' : 'Add Stems & Edit'}</span>
            <ChevronRight className={`w-3 h-3 transition-transform ${mobileDrawerOpen ? 'rotate-90' : ''}`} />
          </button>
        </div>

        {/* Bouquet Composition Canvas Area */}
        <div className="relative w-full max-w-[420px] h-[360px] sm:h-[460px] md:h-[500px] flex items-center justify-center my-auto">
          
          {/* Placed Flowers Container */}
          <div className="absolute inset-0 overflow-visible pointer-events-auto z-20">
            {placedFlowers.map((pf) => {
              const flowerDef = FLOWERS.find(f => f.id === pf.flowerId);
              if (!flowerDef) return null;
              const isShowSquare = pf.instanceId === visibleSquareId;

              return (
                <div
                  key={pf.instanceId}
                  style={{
                    position: 'absolute',
                    left: `${pf.x}%`,
                    top: `${pf.y}%`,
                    transform: `translate(-50%, -50%) rotate(${pf.rotation}deg) scale(${pf.scale})`,
                    zIndex: pf.zIndex,
                  }}
                  className="pointer-events-none"
                >
                  <div 
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      handleSelectFlower(pf.instanceId);
                      setIsDragging(true);
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectFlower(pf.instanceId);
                    }}
                    className={`w-24 h-32 sm:w-28 sm:h-36 relative cursor-grab active:cursor-grabbing pointer-events-auto transition-all ${
                      isShowSquare ? 'ring-1 ring-[#111111]/60 bg-[#111111]/5 rounded-xl' : 'hover:scale-102'
                    }`}
                    title="Click to select & drag flower"
                  >
                    {isShowSquare && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFlower(pf.instanceId);
                        }}
                        className="absolute -top-3 -right-3 w-6 h-6 bg-[#000000] text-[#F9F9ED] rounded-full flex items-center justify-center text-xs shadow-md z-50 hover:scale-110 transition-transform cursor-pointer pointer-events-auto"
                        title="Delete stem"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <div className="absolute inset-0 pointer-events-auto">
                      <FlowerSVG 
                        svgType={flowerDef.svgType} 
                        color={flowerDef.color} 
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Wrapping Paper Cone & Ribbon */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center pointer-events-none">
            <div 
              className={`w-32 h-36 sm:w-40 sm:h-44 rounded-b-[3.5rem] shadow-md relative overflow-hidden transition-all duration-300 ${currentWrappingObj.bg} border-t border-[#111111]/10`}
              style={{ borderColor: currentWrappingObj.border }}
            >
              <div className="absolute inset-0 opacity-15 bg-[linear-gradient(45deg,#000_25%,transparent_25%,transparent_75%,#000_75%,#000)] [background-size:12px_12px]"></div>
              
              <div className="absolute top-3 left-0 right-0 flex justify-center items-center">
                <div 
                  className="w-12 h-6 rounded-full shadow-sm flex items-center justify-center border border-[#111111]/10"
                  style={{ backgroundColor: currentRibbonObj.color }}
                >
                  <div className="w-2 h-2 rounded-full bg-[#FAFAF2]/60"></div>
                </div>
              </div>
            </div>
          </div>

          {placedFlowers.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-[#111111]/5 rounded-2xl pointer-events-none z-10">
              <p className="font-serif text-base opacity-60 mb-1 text-[#111111]">Canvas is empty</p>
              <p className="text-[10px] font-sans opacity-40 uppercase tracking-widest text-[#6F6F6F]">Select stems from the library</p>
            </div>
          )}
        </div>

        {/* Seamlessly Integrated Editorial Bottom Control Bar */}
        <div className="w-full max-w-lg bg-[#FAFAF2] border-t border-b sm:border border-[#D9D9CE] py-2.5 px-4 sm:px-8 flex items-center justify-between shadow-xs font-sans z-30 mt-auto">
          <button
            onClick={handleUndo}
            disabled={history.length === 0}
            style={{ minWidth: '85px' }}
            className={`text-[10px] uppercase tracking-[0.2em] font-medium py-2 px-3 transition-all flex items-center justify-center gap-1.5 border border-[#D9D9CE] ${
              history.length > 0 
                ? 'bg-[#FAFAF2] text-[#111111] hover:border-[#111111] active:scale-95 cursor-pointer shadow-2xs' 
                : 'bg-[#FAFAF2]/50 text-[#85857D] border-[#D9D9CE]/50 cursor-not-allowed opacity-50'
            }`}
          >
            <Undo2 className="w-3.5 h-3.5" />
            <span>Undo</span>
          </button>

          <button
            onClick={handleFinishBouquet}
            style={{ minWidth: '130px' }}
            className="text-[10px] uppercase tracking-[0.2em] font-medium py-2 px-5 border border-[#000000] bg-[#000000] text-[#F9F9ED] hover:bg-transparent hover:text-[#111111] hover:border-[#111111] transition-all shadow-xs cursor-pointer active:scale-95"
          >
            Finish Bouquet
          </button>
          
          <button
            onClick={handleReset}
            disabled={placedFlowers.length === 0}
            style={{ minWidth: '85px' }}
            className={`text-[10px] uppercase tracking-[0.2em] font-medium py-2 px-3 transition-all flex items-center justify-center border border-[#D9D9CE] ${
              placedFlowers.length > 0 
                ? 'bg-[#FAFAF2] text-[#111111] hover:border-[#111111] active:scale-95 cursor-pointer shadow-2xs' 
                : 'bg-[#FAFAF2]/50 text-[#85857D] border-[#D9D9CE]/50 cursor-not-allowed opacity-50'
            }`}
          >
            <span>Reset</span>
          </button>
        </div>

      </main>

    </div>
  );
};
