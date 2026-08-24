import React, { useState, useRef, useEffect } from 'react';
import { 
  Flower as FlowerType, PlacedFlower, Bouquet, 
  WrappingStyle, RibbonStyle, RibbonTexture, AppView, CompositionTemplate, AnchorType 
} from '../types';
import { FLOWERS } from '../data/flowers';
import { FlowerSVG } from './FlowerSVG';
import { MiniPreview } from './MiniPreview';
import { FlowerInfoCard } from './FlowerInfoCard';
import { CompositionAnchor } from './CompositionAnchor';
import { calculateSmartArrangement, getNextSmartSlot } from '../utils/arrangement';
import { 
  Plus, Minus, Undo2, Wand2, Download, Sliders, ArrowUp, ArrowDown, X, Info 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toPng } from 'html-to-image';

interface BouquetBuilderProps {
  onSaveBouquet: (bouquet: Bouquet) => void;
  setCurrentView: (view: AppView) => void;
}

interface HistoryStep {
  flowers: PlacedFlower[];
}

export const BouquetBuilder: React.FC<BouquetBuilderProps> = ({ 
  onSaveBouquet, 
  setCurrentView 
}) => {
  // Placed flowers (normalized % coordinates)
  const [placedFlowers, setPlacedFlowers] = useState<PlacedFlower[]>([
    { instanceId: 'init-1', flowerId: 'rose-red', x: 50, y: 37, rotation: 0, scale: 1.20, zIndex: 24, role: 'focal' },
    { instanceId: 'init-2', flowerId: 'peony-coral', x: 37, y: 43, rotation: -12, scale: 1.10, zIndex: 20, role: 'supporting' },
    { instanceId: 'init-3', flowerId: 'tulip-parisian', x: 63, y: 43, rotation: 12, scale: 1.10, zIndex: 20, role: 'supporting' },
    { instanceId: 'init-4', flowerId: 'eucalyptus-silver', x: 26, y: 39, rotation: -22, scale: 1.00, zIndex: 12, role: 'foliage' },
    { instanceId: 'init-5', flowerId: 'eucalyptus-silver', x: 74, y: 39, rotation: 22, scale: 1.00, zIndex: 12, role: 'foliage' },
  ]);

  const [history, setHistory] = useState<HistoryStep[]>([]);
  const [selectedInstanceId, setSelectedInstanceId] = useState<string | null>(null);
  const [visibleSquareId, setVisibleSquareId] = useState<string | null>(null);
  const [squareTimer, setSquareTimer] = useState<NodeJS.Timeout | null>(null);

  // Floriography inspection
  const [hoveredFlower, setHoveredFlower] = useState<FlowerType | null>(null);
  const [inspectedFlower, setInspectedFlower] = useState<FlowerType | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  // Optional Note & Gift Message
  const [note, setNote] = useState('');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [isExportingImage, setIsExportingImage] = useState(false);

  // Default wrapping & anchor
  const wrapping: WrappingStyle = 'kraft';
  const ribbon: RibbonStyle = 'raw-silk';
  const ribbonColor = '#F7F4EF';
  const ribbonTexture: RibbonTexture = 'silk';
  const ribbonText = '';
  const ribbonTextColor = '#D4AF37';
  const template: CompositionTemplate = 'round';
  const anchorType: AnchorType = 'soft-wrap';

  const [dragTarget, setDragTarget] = useState<{ id: string; offset: { x: number; y: number } } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const artboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (squareTimer) clearTimeout(squareTimer);
      if (hoverTimeout) clearTimeout(hoverTimeout);
    };
  }, [squareTimer, hoverTimeout]);

  const pushHistory = () => {
    setHistory(prev => [
      ...prev.slice(-15), 
      { flowers: placedFlowers }
    ]);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const previousState = history[history.length - 1];
    setHistory(prev => prev.slice(0, prev.length - 1));
    setPlacedFlowers(previousState.flowers);
    setSelectedInstanceId(null);
    setVisibleSquareId(null);
  };

  const handleSelectFlower = (instanceId: string) => {
    setSelectedInstanceId(instanceId);
    setVisibleSquareId(instanceId);

    if (squareTimer) clearTimeout(squareTimer);
    const timer = setTimeout(() => {
      setVisibleSquareId(null);
    }, 4000);
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
      f.instanceId === selectedInstanceId ? { ...f, zIndex: Math.max(8, minZ - 1) } : f
    ));
  };

  // Automatic Smart Harmonization
  const handleHarmonize = () => {
    if (placedFlowers.length === 0) return;
    pushHistory();
    const arranged = calculateSmartArrangement(placedFlowers, 'round');
    setPlacedFlowers(arranged);
  };

  const handleAddFlower = (flower: FlowerType) => {
    pushHistory();
    const count = placedFlowers.length;
    const slot = getNextSmartSlot(count, flower, 'round');
    const instanceId = `flower-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

    const newFlower: PlacedFlower = {
      instanceId,
      flowerId: flower.id,
      x: slot.x,
      y: slot.y,
      rotation: slot.rotation,
      scale: slot.scale,
      zIndex: slot.zIndex,
      role: flower.role || 'supporting',
    };

    setPlacedFlowers(prev => [...prev, newFlower]);
    handleSelectFlower(instanceId);
  };

  const handleRemoveFlower = (instanceId: string) => {
    pushHistory();
    setPlacedFlowers(prev => prev.filter(f => f.instanceId !== instanceId));
    if (selectedInstanceId === instanceId) {
      setSelectedInstanceId(null);
      setVisibleSquareId(null);
    }
  };

  const handleRemoveFlowerByType = (flower: FlowerType) => {
    const instances = placedFlowers.filter(f => f.flowerId === flower.id);
    if (instances.length === 0) return;
    const lastInstance = instances[instances.length - 1];
    handleRemoveFlower(lastInstance.instanceId);
  };

  const handleUpdateSelectedFlower = (updates: Partial<PlacedFlower>) => {
    if (!selectedInstanceId) return;
    setPlacedFlowers(prev => prev.map(f => 
      f.instanceId === selectedInstanceId ? { ...f, ...updates } : f
    ));
  };

  const handleReset = () => {
    pushHistory();
    setPlacedFlowers([]);
    setSelectedInstanceId(null);
    setVisibleSquareId(null);
  };

  const handleStartDrag = (id: string, clientX: number, clientY: number) => {
    if (!artboardRef.current) return;
    const rect = artboardRef.current.getBoundingClientRect();
    const touchX = ((clientX - rect.left) / rect.width) * 100;
    const touchY = ((clientY - rect.top) / rect.height) * 100;

    const item = placedFlowers.find(f => f.instanceId === id);
    if (item) {
      setDragTarget({ id, offset: { x: item.x - touchX, y: item.y - touchY } });
    }
  };

  const handleCanvasPointerMove = (clientX: number, clientY: number) => {
    if (!dragTarget || !artboardRef.current) return;
    const rect = artboardRef.current.getBoundingClientRect();
    const touchX = ((clientX - rect.left) / rect.width) * 100;
    const touchY = ((clientY - rect.top) / rect.height) * 100;

    const x = touchX + dragTarget.offset.x;
    const y = touchY + dragTarget.offset.y;

    const clampedX = Math.max(10, Math.min(90, x));
    const clampedY = Math.max(10, Math.min(85, y));

    setPlacedFlowers(prev => prev.map(f => 
      f.instanceId === dragTarget.id ? { ...f, x: clampedX, y: clampedY } : f
    ));
  };

  const handleGenerateAI = async () => {
    setIsGeneratingAI(true);
    try {
      const randomVerses = [
        "In quiet moments where soft petals turn to morning light, may your heart find peace and blooming joy.",
        "Gathered with care and gentle warmth, a timeless bouquet for someone truly special.",
        "May joy unfold around you gently, petal by petal, like spring awakening after winter rain.",
        "A symphony of fresh blooms to brighten your hours and bring serene garden warmth into your day.",
        "Wishing you gentle days filled with sunshine, simple beauty, and boundless comfort."
      ];

      setTimeout(() => {
        const chosen = randomVerses[Math.floor(Math.random() * randomVerses.length)];
        setNote(chosen);
        setIsGeneratingAI(false);
      }, 500);
    } catch (e) {
      console.error(e);
      setIsGeneratingAI(false);
    }
  };

  const handleExportPNG = async () => {
    if (!artboardRef.current) return;
    setIsExportingImage(true);
    
    const prevVisibleSquare = visibleSquareId;
    setVisibleSquareId(null);

    try {
      await new Promise(r => setTimeout(r, 150));
      const dataUrl = await toPng(artboardRef.current, {
        quality: 0.98,
        pixelRatio: 2.5,
        backgroundColor: '#F9F9ED',
        cacheBust: true,
        fontEmbedCSS: '',
      });
      
      const link = document.createElement('a');
      link.download = `digibouquet_arrangement.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error exporting PNG image:', error);
    } finally {
      setIsExportingImage(false);
      setVisibleSquareId(prevVisibleSquare);
    }
  };

  const handleFinishBouquet = () => {
    if (placedFlowers.length === 0) {
      alert('Please add at least one botanical bloom to compose your arrangement.');
      return;
    }

    const newBouquet: Bouquet = {
      id: `bouquet-${Date.now()}`,
      title: 'Bespoke Floral Arrangement',
      flowers: placedFlowers,
      stickers: [],
      wrapping,
      ribbon,
      ribbonColor,
      ribbonTexture,
      ribbonText,
      ribbonTextColor,
      recipientName: 'Someone Special',
      senderName: 'With Love',
      note: note.trim() || 'With heartfelt affection.',
      createdAt: Date.now(),
      template: 'round',
      anchorType: 'soft-wrap',
    };

    onSaveBouquet(newBouquet);
    setCurrentView('garden');
  };

  const selectedFlowerItem = placedFlowers.find(f => f.instanceId === selectedInstanceId);
  const selectedFlowerDef = selectedFlowerItem ? FLOWERS.find(f => f.id === selectedFlowerItem.flowerId) : null;

  return (
    <div className="w-full flex flex-col md:flex-row bg-[#F9F9ED] text-[#111111]">
      
      {/* Sidebar / Flower Library (Desktop: Left Column; Mobile: Below Canvas in unified natural flow) */}
      <aside className="w-full md:w-[380px] lg:w-[420px] md:border-r border-[#D9D9CE] bg-[#FAFAF2] p-4 sm:p-6 md:p-7 md:max-h-[calc(100vh-80px)] md:overflow-y-auto flex flex-col gap-6 order-2 md:order-1">
        
        {/* Flower Library Header */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-[11px] uppercase tracking-[0.18em] font-bold text-[#111111]">
              Available Blooms ({FLOWERS.length})
            </h2>
            <button
              type="button"
              onClick={() => setCurrentView('botanical-guide')}
              className="text-[9px] uppercase tracking-wider font-mono text-[#85857D] hover:text-[#111111] underline cursor-pointer"
            >
              Botanical Guide ↗
            </button>
          </div>
          <p className="text-[10px] text-[#6F6F6F] font-sans">
            Choose blooms to compose into your bouquet. Tap ⓘ for symbolism & lore.
          </p>
        </div>

        {/* 17 Blooms Grid: Clean 2-column scrollable library */}
        <div className="grid grid-cols-2 gap-2.5">
          {FLOWERS.map((flower) => {
            const count = placedFlowers.filter(pf => pf.flowerId === flower.id).length;
            const isHovered = hoveredFlower?.id === flower.id;

            return (
              <div
                key={flower.id}
                onMouseEnter={() => {
                  if (hoverTimeout) clearTimeout(hoverTimeout);
                  setHoveredFlower(flower);
                }}
                onMouseLeave={() => {
                  const timeout = setTimeout(() => {
                    setHoveredFlower(null);
                  }, 250);
                  setHoverTimeout(timeout);
                }}
                className={`bg-[#FAFAF2] border transition-all relative flex flex-col justify-between p-2 shadow-2xs group ${
                  isHovered ? 'border-[#111111] ring-1 ring-[#111111]/20' : 'border-[#D9D9CE] hover:border-[#85857D]'
                }`}
              >
                {/* Top Meta: Info button */}
                <div className="flex items-center justify-end w-full mb-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setInspectedFlower(flower);
                    }}
                    className="w-5 h-5 rounded-full bg-[#EAE8D8] hover:bg-[#111111] hover:text-[#F8F7EB] text-[#111111] flex items-center justify-center transition-colors cursor-pointer border border-[#D0CEBF]"
                    title={`Inspect ${flower.name} Meaning & Lore`}
                  >
                    <Info className="w-2.5 h-2.5" />
                  </button>
                </div>

                {/* Flower Visual Vector Art */}
                <div 
                  onClick={() => setInspectedFlower(flower)}
                  className="w-full h-16 bg-transparent flex items-center justify-center p-1 cursor-pointer group-hover:scale-[1.06] transition-transform my-1 overflow-hidden"
                >
                  <div className="w-14 h-14 flex items-center justify-center">
                    <FlowerSVG flowerId={flower.id} svgType={flower.svgType} color={flower.color} imageUrl={flower.imageUrl} />
                  </div>
                </div>

                {/* Flower Name & Meaning Snippet */}
                <div className="mt-1 text-center">
                  <h4 
                    onClick={() => setInspectedFlower(flower)}
                    className="text-[10px] font-serif italic text-[#111111] truncate cursor-pointer group-hover:text-amber-900"
                  >
                    {flower.name}
                  </h4>
                  <p className="text-[7.5px] text-[#85857D] font-mono uppercase tracking-wider truncate">
                    {flower.meaning.slice(0, 2).join(' · ')}
                  </p>
                </div>

                {/* Action Bar: Add & Decrement */}
                <div className="mt-2 pt-1.5 border-t border-[#EAE8D8] flex items-center gap-1 w-full">
                  <button
                    type="button"
                    onClick={() => handleAddFlower(flower)}
                    className="flex-1 py-1.5 bg-[#111111] text-[#F8F7EB] text-[8.5px] font-mono uppercase tracking-wider font-semibold flex items-center justify-center gap-1 hover:bg-[#222222] transition-colors cursor-pointer"
                  >
                    <Plus className="w-2.5 h-2.5" />
                    <span>Add</span>
                    {count > 0 && <span className="text-[#E5A910]">({count})</span>}
                  </button>

                  {count > 0 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFlowerByType(flower);
                      }}
                      className="p-1.5 border border-[#D9D9CE] hover:border-red-600 hover:text-red-600 text-[#6F6F6F] bg-[#FAFAF2] transition-colors cursor-pointer"
                      title={`Remove 1 ${flower.name}`}
                    >
                      <Minus className="w-2.5 h-2.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Bloom Fine-Tuning Controls (Visible when a bloom is selected) */}
        {selectedInstanceId && selectedFlowerItem && (
          <div className="bg-[#F5F5E9] border border-[#D9D9CE] p-3.5 space-y-3 font-sans shadow-2xs">
            <div className="flex justify-between items-center font-sans">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#111111] flex items-center gap-1">
                <Sliders className="w-3 h-3 text-[#111111]" />
                <span>Bloom Tuning</span>
              </span>
              <span className="text-[10px] text-[#6F6F6F] italic truncate max-w-[140px]">
                {selectedFlowerDef ? selectedFlowerDef.name : 'Selected'}
              </span>
            </div>

            <div>
              <div className="flex justify-between text-[9.5px] mb-1 text-[#6F6F6F]">
                <span>Size</span>
                <span>{Math.round(selectedFlowerItem.scale * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.8"
                step="0.05"
                value={selectedFlowerItem.scale}
                onChange={(e) => handleUpdateSelectedFlower({ scale: parseFloat(e.target.value) })}
                className="w-full accent-[#111111] cursor-pointer h-1 bg-[#D9D9CE]"
              />
            </div>

            <div>
              <div className="flex justify-between text-[9.5px] mb-1 text-[#6F6F6F]">
                <span>Angle</span>
                <span>{selectedFlowerItem.rotation}°</span>
              </div>
              <input
                type="range"
                min="-45"
                max="45"
                step="1"
                value={selectedFlowerItem.rotation}
                onChange={(e) => handleUpdateSelectedFlower({ rotation: parseInt(e.target.value) })}
                className="w-full accent-[#111111] cursor-pointer h-1 bg-[#D9D9CE]"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={handleBringForward}
                  className="p-1.5 border border-[#D9D9CE] text-[9.5px] uppercase tracking-wider text-[#111111] hover:border-[#111111] cursor-pointer flex items-center gap-1 bg-[#FAFAF2]"
                  title="Bring Forward"
                >
                  <ArrowUp className="w-3 h-3" />
                  <span>Layer +</span>
                </button>
                <button
                  type="button"
                  onClick={handleSendBackward}
                  className="p-1.5 border border-[#D9D9CE] text-[9.5px] uppercase tracking-wider text-[#111111] hover:border-[#111111] cursor-pointer flex items-center gap-1 bg-[#FAFAF2]"
                  title="Send Backward"
                >
                  <ArrowDown className="w-3 h-3" />
                  <span>Layer -</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => handleRemoveFlower(selectedInstanceId)}
                className="text-[9.5px] uppercase tracking-widest text-red-600 hover:underline cursor-pointer active:scale-95 font-sans font-semibold"
              >
                Remove
              </button>
            </div>
          </div>
        )}

        {/* Integrated Optional Message Area */}
        <div className="bg-[#FAFAF2] border border-[#D9D9CE] p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] uppercase tracking-[0.18em] font-bold text-[#111111]">
              A Little Note
            </h3>
            <button
              type="button"
              onClick={handleGenerateAI}
              disabled={isGeneratingAI}
              className="text-[9px] uppercase tracking-wider text-[#111111] hover:underline flex items-center gap-1 font-semibold cursor-pointer active:scale-95"
            >
              <Wand2 className="w-3 h-3 text-amber-600" />
              <span>{isGeneratingAI ? 'Composing...' : 'AI Verse'}</span>
            </button>
          </div>
          <p className="text-[9.5px] text-[#85857D] font-mono">
            Write something for them... (optional)
          </p>
          <textarea
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write something from the heart..."
            className="w-full p-2.5 border border-[#D9D9CE] bg-[#F9F9ED] text-xs font-serif italic focus:outline-none focus:border-[#111111] text-[#111111] placeholder:text-[#85857D]/60 resize-none"
          />
        </div>

        {/* Mobile-Only Action Buttons Container (Placed naturally at end of mobile flow) */}
        <div className="flex md:hidden items-center justify-between gap-2 pt-3 pb-8 border-t border-[#D9D9CE]">
          <button
            type="button"
            onClick={handleUndo}
            disabled={history.length === 0}
            className={`flex-1 text-[10px] uppercase tracking-[0.16em] font-medium py-2.5 px-3 border border-[#D9D9CE] transition-all flex items-center justify-center gap-1 ${
              history.length > 0 ? 'bg-[#FAFAF2] text-[#111111] hover:border-[#111111]' : 'bg-[#FAFAF2]/50 text-[#85857D] opacity-50'
            }`}
          >
            <Undo2 className="w-3.5 h-3.5" />
            <span>Undo</span>
          </button>

          <button
            type="button"
            onClick={handleFinishBouquet}
            className="flex-2 text-[10px] uppercase tracking-[0.18em] font-medium py-2.5 px-4 bg-[#000000] text-[#F9F9ED] border border-[#000000] hover:bg-transparent hover:text-[#111111] transition-all"
          >
            Finish Bouquet
          </button>

          <button
            type="button"
            onClick={handleReset}
            disabled={placedFlowers.length === 0}
            className={`flex-1 text-[10px] uppercase tracking-[0.16em] font-medium py-2.5 px-3 border border-[#D9D9CE] transition-all flex items-center justify-center ${
              placedFlowers.length > 0 ? 'bg-[#FAFAF2] text-[#111111] hover:border-[#111111]' : 'bg-[#FAFAF2]/50 text-[#85857D] opacity-50'
            }`}
          >
            Reset
          </button>
        </div>

      </aside>

      {/* Main Studio Canvas Area */}
      <main 
        ref={canvasRef}
        onMouseMove={(e) => handleCanvasPointerMove(e.clientX, e.clientY)}
        onMouseUp={() => setDragTarget(null)}
        onMouseLeave={() => setDragTarget(null)}
        onTouchMove={(e) => {
          if (e.touches.length > 0) {
            handleCanvasPointerMove(e.touches[0].clientX, e.touches[0].clientY);
          }
        }}
        onTouchEnd={() => setDragTarget(null)}
        className="flex-1 relative bg-[#F9F9ED] flex flex-col items-center justify-between p-3 sm:p-6 md:p-8 select-none order-1 md:order-2 md:max-h-[calc(100vh-80px)] md:overflow-y-auto"
      >
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        {/* Top Action Bar */}
        <div className="w-full max-w-xl flex items-center justify-between bg-[#FAFAF2] border border-[#D9D9CE] px-3.5 py-2 mb-3 z-20 shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#111111]"></span>
            <span className="text-[10px] font-sans uppercase tracking-widest font-bold text-[#111111]">
              {placedFlowers.length} {placedFlowers.length === 1 ? 'Bloom' : 'Blooms'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Auto Harmonize */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleHarmonize}
              disabled={placedFlowers.length === 0}
              className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-sans font-medium px-2.5 py-1.5 border transition-all cursor-pointer bg-[#F9F9ED] hover:bg-[#111111] hover:text-[#F9F9ED] text-[#111111] border-[#D9D9CE]"
              title="Intelligently rebalance bloom placement"
            >
              <Wand2 className="w-3 h-3 text-amber-600" />
              <span>Harmonize</span>
            </motion.button>

            {/* Export PNG */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExportPNG}
              disabled={isExportingImage || placedFlowers.length === 0}
              className={`flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-sans font-medium px-2.5 py-1.5 border transition-all cursor-pointer ${
                isExportingImage 
                  ? 'bg-amber-100 text-amber-900 border-amber-300' 
                  : 'bg-[#111111] text-[#F9F9ED] border-[#111111] hover:bg-[#222222]'
              }`}
              title="Save high-resolution PNG image of your bouquet"
            >
              <Download className="w-3 h-3" />
              <span>{isExportingImage ? 'Exporting...' : 'PNG'}</span>
            </motion.button>
          </div>
        </div>

        {/* Real-time Scaled Mini-Preview Pane */}
        <MiniPreview
          placedFlowers={placedFlowers}
          placedStickers={[]}
          wrapping={wrapping}
          ribbon={ribbon}
          ribbonColor={ribbonColor}
          ribbonTexture={ribbonTexture}
          ribbonText={ribbonText}
          ribbonTextColor={ribbonTextColor}
          bouquetTitle="Bespoke Arrangement"
          recipientName=""
          senderName=""
          template={template}
          anchorType={anchorType}
          onExportPNG={handleExportPNG}
          isExporting={isExportingImage}
        />

        {/* Bouquet Composition Artboard Canvas */}
        <div 
          ref={artboardRef}
          onMouseMove={(e) => handleCanvasPointerMove(e.clientX, e.clientY)}
          onMouseUp={() => setDragTarget(null)}
          onTouchMove={(e) => {
            if (e.touches.length > 0) {
              handleCanvasPointerMove(e.touches[0].clientX, e.touches[0].clientY);
            }
          }}
          onTouchEnd={() => setDragTarget(null)}
          className="relative w-full max-w-[360px] sm:max-w-[400px] aspect-[4/5] flex items-center justify-center my-2 sm:my-auto bg-[#F9F9ED] rounded-xl overflow-hidden shadow-2xs select-none touch-none isolate z-10"
        >
          {/* Background Watermark */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none" 
            style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}
          />

          {/* 1. BACK ANCHOR LAYER (Wrapping Back) */}
          <CompositionAnchor
            anchorType={anchorType}
            wrappingStyle={wrapping}
            ribbonStyle={ribbon}
            ribbonColor={ribbonColor}
            ribbonTexture={ribbonTexture}
            ribbonText={ribbonText}
            ribbonTextColor={ribbonTextColor}
            layer="back"
          />

          {/* 2. PLACED BOTANICAL BLOOMS (Stemless, overlapping) */}
          <div className="absolute inset-0 overflow-visible pointer-events-auto z-20">
            <AnimatePresence>
              {placedFlowers.map((pf) => {
                const flowerDef = FLOWERS.find(f => f.id === pf.flowerId);
                if (!flowerDef) return null;
                const isShowSquare = pf.instanceId === visibleSquareId;

                return (
                  <motion.div
                    key={pf.instanceId}
                    initial={{ scale: 0, opacity: 0, y: -15, rotate: pf.rotation - 10 }}
                    animate={{ scale: pf.scale, opacity: 1, y: 0, rotate: pf.rotation }}
                    exit={{ scale: 0, opacity: 0, transition: { duration: 0.18 } }}
                    transition={{ type: "spring", stiffness: 350, damping: 24 }}
                    style={{
                      position: 'absolute',
                      left: `${pf.x}%`,
                      top: `${pf.y}%`,
                      transform: `translate(-50%, -50%)`,
                      zIndex: pf.zIndex,
                    }}
                    className="pointer-events-none"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.96 }}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        handleSelectFlower(pf.instanceId);
                        handleStartDrag(pf.instanceId, e.clientX, e.clientY);
                      }}
                      onTouchStart={(e) => {
                        e.stopPropagation();
                        handleSelectFlower(pf.instanceId);
                        if (e.touches.length > 0) {
                          handleStartDrag(pf.instanceId, e.touches[0].clientX, e.touches[0].clientY);
                        }
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectFlower(pf.instanceId);
                      }}
                      className={`w-28 h-28 sm:w-32 sm:h-32 relative cursor-grab active:cursor-grabbing pointer-events-auto transition-all ${
                        isShowSquare ? 'ring-1 ring-[#111111]/70 bg-[#111111]/5 rounded-full' : ''
                      }`}
                      title="Click or drag to position bloom"
                    >
                      {isShowSquare && (
                        <motion.button
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFlower(pf.instanceId);
                          }}
                          className="absolute -top-1 -right-1 w-6 h-6 bg-[#000000] text-[#F9F9ED] rounded-full flex items-center justify-center text-xs shadow-md z-50 hover:scale-110 transition-transform cursor-pointer pointer-events-auto"
                          title="Delete bloom"
                        >
                          <X className="w-3.5 h-3.5" />
                        </motion.button>
                      )}
                      <div className="absolute inset-0 pointer-events-auto flex items-center justify-center">
                        <FlowerSVG 
                          flowerId={flowerDef.id}
                          svgType={flowerDef.svgType} 
                          color={flowerDef.color}
                          imageUrl={flowerDef.imageUrl}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* 3. FRONT ANCHOR LAYER (Wrapping Cone Front) */}
          <CompositionAnchor
            anchorType={anchorType}
            wrappingStyle={wrapping}
            ribbonStyle={ribbon}
            ribbonColor={ribbonColor}
            ribbonTexture={ribbonTexture}
            ribbonText={ribbonText}
            ribbonTextColor={ribbonTextColor}
            layer="front"
          />

          {placedFlowers.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-[#111111]/5 rounded-2xl pointer-events-none z-10">
              <p className="font-serif text-base opacity-60 mb-1 text-[#111111]">Artboard is empty</p>
              <p className="text-[10px] font-sans opacity-40 uppercase tracking-widest text-[#6F6F6F]">Select blooms from the catalog</p>
            </div>
          )}
        </div>

        {/* Desktop Bottom Control Bar (Hidden on Mobile since mobile has the natural bottom bar) */}
        <div className="hidden md:flex w-full max-w-lg bg-[#FAFAF2] border border-[#D9D9CE] py-2.5 px-6 items-center justify-between shadow-xs font-sans z-30 mt-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
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
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleFinishBouquet}
            style={{ minWidth: '130px' }}
            className="text-[10px] uppercase tracking-[0.2em] font-medium py-2 px-5 border border-[#000000] bg-[#000000] text-[#F9F9ED] hover:bg-transparent hover:text-[#111111] hover:border-[#111111] transition-all shadow-xs cursor-pointer"
          >
            Finish Bouquet
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
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
          </motion.button>
        </div>

      </main>

      {/* Floating Hover Card on Desktop */}
      <AnimatePresence>
        {hoveredFlower && !inspectedFlower && (
          <motion.div
            initial={{ opacity: 0, x: -10, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.15 }}
            className="hidden lg:block fixed z-40 bottom-6 left-[390px] max-w-xs w-full pointer-events-none"
          >
            <div className="bg-[#FAFAF2] border border-[#111111] p-3.5 shadow-lg text-[#111111] font-sans">
              <div className="flex items-center justify-between border-b border-[#D9D9CE] pb-2 mb-2">
                <div>
                  <span className="text-[8px] uppercase tracking-widest font-mono text-[#85857D]">
                    {hoveredFlower.birthMonth ? `Month: ${hoveredFlower.birthMonth}` : 'Botanical Bloom'}
                  </span>
                  <h4 className="font-serif italic text-base text-[#111111] leading-tight">
                    {hoveredFlower.name}
                  </h4>
                </div>
                <div className="w-12 h-12 bg-transparent p-0.5 flex items-center justify-center shrink-0 overflow-hidden">
                  <FlowerSVG 
                    flowerId={hoveredFlower.id} 
                    svgType={hoveredFlower.svgType} 
                    color={hoveredFlower.color} 
                    imageUrl={hoveredFlower.imageUrl} 
                  />
                </div>
              </div>

              <div className="text-[10px] space-y-1.5 text-[#444444]">
                <div>
                  <span className="font-semibold text-[#111111]">Symbolizes: </span>
                  <span className="italic">{hoveredFlower.symbolism}</span>
                </div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {hoveredFlower.bestFor.slice(0, 3).map((item, idx) => (
                    <span key={idx} className="px-1.5 py-0.2 bg-[#EAE8D8] text-[8px] uppercase tracking-wider font-mono text-[#222222]">
                      {item}
                    </span>
                  ))}
                </div>
                <p className="text-[9.5px] italic text-[#666666] pt-1 border-t border-[#D9D9CE]/60 line-clamp-2">
                  "{hoveredFlower.whyChoose}"
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inspected Flower Full Lore Modal */}
      <AnimatePresence>
        {inspectedFlower && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="max-w-md w-full"
            >
              <FlowerInfoCard
                flower={inspectedFlower}
                placedCount={placedFlowers.filter(pf => pf.flowerId === inspectedFlower.id).length}
                onAddFlower={(flower) => handleAddFlower(flower)}
                onRemoveFlower={(flower) => handleRemoveFlowerByType(flower)}
                onClose={() => setInspectedFlower(null)}
                isModal={true}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
