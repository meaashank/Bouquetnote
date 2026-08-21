import React, { useState, useRef, useEffect } from 'react';
import { Flower as FlowerType, PlacedFlower, PlacedSticker, StickerId, Bouquet, WrappingStyle, RibbonStyle, RibbonTexture, AppView } from '../types';
import { FLOWERS, WRAPPING_OPTIONS, RIBBON_OPTIONS, RIBBON_TEXTURES, RIBBON_COLORS, RIBBON_TEXT_COLORS, RIBBON_TEXT_PRESETS } from '../data/flowers';
import { FlowerSVG } from './FlowerSVG';
import { RibbonSVG } from './RibbonSVG';
import { WrappingPaperSVG } from './WrappingPaperSVG';
import { StickerSVG, STICKERS_CATALOG } from './StickerSVG';
import { MiniPreview } from './MiniPreview';
import { 
  Sparkles, Plus, Trash2, RefreshCcw, Check, 
  Send, Wand2, Package, Layers, ChevronRight, X, Flower2, Undo2, ArrowUp, ArrowDown, Sliders, Download, Image as ImageIcon, Sparkle, Type, Palette, Feather, Tag, Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toPng } from 'html-to-image';

interface BouquetBuilderProps {
  onSaveBouquet: (bouquet: Bouquet) => void;
  setCurrentView: (view: AppView) => void;
}

interface HistoryStep {
  flowers: PlacedFlower[];
  stickers: PlacedSticker[];
}

export const BouquetBuilder: React.FC<BouquetBuilderProps> = ({ 
  onSaveBouquet, 
  setCurrentView 
}) => {
  const [placedFlowers, setPlacedFlowers] = useState<PlacedFlower[]>([
    { instanceId: 'init-1', flowerId: 'rose-blush', x: 50, y: 34, rotation: 0, scale: 1.15, zIndex: 12 },
    { instanceId: 'init-2', flowerId: 'peony-coral', x: 38, y: 39, rotation: -12, scale: 1.1, zIndex: 14 },
    { instanceId: 'init-3', flowerId: 'tulip-french', x: 62, y: 39, rotation: 12, scale: 1.05, zIndex: 16 },
    { instanceId: 'init-4', flowerId: 'eucalyptus-silver', x: 26, y: 32, rotation: -24, scale: 1.0, zIndex: 6 },
    { instanceId: 'init-5', flowerId: 'eucalyptus-silver', x: 74, y: 32, rotation: 24, scale: 1.0, zIndex: 8 },
  ]);

  const [placedStickers, setPlacedStickers] = useState<PlacedSticker[]>([
    { instanceId: 'init-stk-1', stickerId: 'butterfly-gold', x: 68, y: 22, rotation: 15, scale: 1.0, zIndex: 55 },
    { instanceId: 'init-stk-2', stickerId: 'pollen-sparkle', x: 42, y: 32, rotation: 0, scale: 0.9, zIndex: 56 }
  ]);

  const [history, setHistory] = useState<HistoryStep[]>([]);
  const [selectedInstanceId, setSelectedInstanceId] = useState<string | null>('init-1');
  const [selectedStickerId, setSelectedStickerId] = useState<string | null>(null);
  const [visibleSquareId, setVisibleSquareId] = useState<string | null>('init-1');
  const [squareTimer, setSquareTimer] = useState<NodeJS.Timeout | null>(null);

  const [wrapping, setWrapping] = useState<WrappingStyle>('kraft');
  const [ribbon, setRibbon] = useState<RibbonStyle>('raw-silk');
  const [ribbonTexture, setRibbonTexture] = useState<RibbonTexture>('silk');
  const [ribbonColor, setRibbonColor] = useState<string>('#F7F4EF');
  const [ribbonText, setRibbonText] = useState<string>('Forever in Bloom');
  const [ribbonTextColor, setRibbonTextColor] = useState<string>('#D4AF37');

  const [recipientName, setRecipientName] = useState('');
  const [senderName, setSenderName] = useState('');
  const [note, setNote] = useState('');
  const [bouquetTitle, setBouquetTitle] = useState('Bespoke Arrangement');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [isExportingImage, setIsExportingImage] = useState(false);
  const [activeTab, setActiveTab] = useState<'flowers' | 'stickers' | 'wrapping' | 'ribbons' | 'card'>('flowers');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const [dragTarget, setDragTarget] = useState<{ type: 'flower' | 'sticker'; id: string } | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const artboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (squareTimer) clearTimeout(squareTimer);
    };
  }, [squareTimer]);

  const pushHistory = () => {
    setHistory(prev => [...prev.slice(-15), { flowers: placedFlowers, stickers: placedStickers }]);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const previousState = history[history.length - 1];
    setHistory(prev => prev.slice(0, prev.length - 1));
    setPlacedFlowers(previousState.flowers);
    setPlacedStickers(previousState.stickers);
    setSelectedInstanceId(null);
    setSelectedStickerId(null);
    setVisibleSquareId(null);
  };

  const handleSelectFlower = (instanceId: string) => {
    setSelectedInstanceId(instanceId);
    setSelectedStickerId(null);
    setVisibleSquareId(instanceId);

    if (squareTimer) clearTimeout(squareTimer);
    const timer = setTimeout(() => {
      setVisibleSquareId(null);
    }, 3500);
    setSquareTimer(timer);
  };

  const handleSelectSticker = (instanceId: string) => {
    setSelectedStickerId(instanceId);
    setSelectedInstanceId(null);
    setVisibleSquareId(instanceId);

    if (squareTimer) clearTimeout(squareTimer);
    const timer = setTimeout(() => {
      setVisibleSquareId(null);
    }, 3500);
    setSquareTimer(timer);
  };

  const handleBringForward = () => {
    if (selectedInstanceId) {
      const maxZ = Math.max(0, ...placedFlowers.map(f => f.zIndex));
      setPlacedFlowers(placedFlowers.map(f => 
        f.instanceId === selectedInstanceId ? { ...f, zIndex: maxZ + 1 } : f
      ));
    } else if (selectedStickerId) {
      const maxZ = Math.max(50, ...placedStickers.map(s => s.zIndex));
      setPlacedStickers(placedStickers.map(s => 
        s.instanceId === selectedStickerId ? { ...s, zIndex: maxZ + 1 } : s
      ));
    }
  };

  const handleSendBackward = () => {
    if (selectedInstanceId) {
      const minZ = Math.min(...placedFlowers.map(f => f.zIndex));
      setPlacedFlowers(placedFlowers.map(f => 
        f.instanceId === selectedInstanceId ? { ...f, zIndex: Math.max(1, minZ - 1) } : f
      ));
    } else if (selectedStickerId) {
      const minZ = Math.min(...placedStickers.map(s => s.zIndex));
      setPlacedStickers(placedStickers.map(s => 
        s.instanceId === selectedStickerId ? { ...s, zIndex: Math.max(1, minZ - 1) } : s
      ));
    }
  };

  const handleAddFlower = (flower: FlowerType) => {
    pushHistory();
    const randomOffsetX = (Math.random() - 0.5) * 22;
    const randomOffsetY = (Math.random() - 0.5) * 16;
    const randomRotation = Math.floor((Math.random() - 0.5) * 30);
    const instanceId = `flower-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const maxZ = placedFlowers.length > 0 ? Math.max(...placedFlowers.map(f => f.zIndex)) : 10;

    const newFlower: PlacedFlower = {
      instanceId,
      flowerId: flower.id,
      x: 50 + randomOffsetX,
      y: 36 + randomOffsetY,
      rotation: randomRotation,
      scale: flower.defaultScale || 1.0,
      zIndex: maxZ + 1,
    };

    setPlacedFlowers(prev => [...prev, newFlower]);
    handleSelectFlower(instanceId);
  };

  const handleAddSticker = (stickerId: StickerId) => {
    pushHistory();
    const randomOffsetX = (Math.random() - 0.5) * 26;
    const randomOffsetY = (Math.random() - 0.5) * 20;
    const randomRotation = Math.floor((Math.random() - 0.5) * 36);
    const instanceId = `sticker-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const maxZ = placedStickers.length > 0 ? Math.max(...placedStickers.map(s => s.zIndex)) : 55;

    const newSticker: PlacedSticker = {
      instanceId,
      stickerId,
      x: 50 + randomOffsetX,
      y: 30 + randomOffsetY,
      rotation: randomRotation,
      scale: 1.0,
      zIndex: maxZ + 1,
    };

    setPlacedStickers(prev => [...prev, newSticker]);
    handleSelectSticker(instanceId);
  };

  const handleRemoveFlower = (instanceId: string) => {
    pushHistory();
    setPlacedFlowers(prev => prev.filter(f => f.instanceId !== instanceId));
    if (selectedInstanceId === instanceId) {
      setSelectedInstanceId(null);
      setVisibleSquareId(null);
    }
  };

  const handleRemoveSticker = (instanceId: string) => {
    pushHistory();
    setPlacedStickers(prev => prev.filter(s => s.instanceId !== instanceId));
    if (selectedStickerId === instanceId) {
      setSelectedStickerId(null);
      setVisibleSquareId(null);
    }
  };

  const handleUpdateSelectedFlower = (updates: Partial<PlacedFlower>) => {
    if (!selectedInstanceId) return;
    setPlacedFlowers(prev => prev.map(f => 
      f.instanceId === selectedInstanceId ? { ...f, ...updates } : f
    ));
  };

  const handleUpdateSelectedSticker = (updates: Partial<PlacedSticker>) => {
    if (!selectedStickerId) return;
    setPlacedStickers(prev => prev.map(s => 
      s.instanceId === selectedStickerId ? { ...s, ...updates } : s
    ));
  };

  const handleReset = () => {
    pushHistory();
    setPlacedFlowers([]);
    setPlacedStickers([]);
    setSelectedInstanceId(null);
    setSelectedStickerId(null);
    setVisibleSquareId(null);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragTarget || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const clampedX = Math.max(10, Math.min(90, x));
    const clampedY = Math.max(8, Math.min(88, y));

    if (dragTarget.type === 'flower') {
      setPlacedFlowers(prev => prev.map(f => 
        f.instanceId === dragTarget.id ? { ...f, x: clampedX, y: clampedY } : f
      ));
    } else if (dragTarget.type === 'sticker') {
      setPlacedStickers(prev => prev.map(s => 
        s.instanceId === dragTarget.id ? { ...s, x: clampedX, y: clampedY } : s
      ));
    }
  };

  const handleGenerateAI = async () => {
    setIsGeneratingAI(true);
    try {
      const stemNames = placedFlowers.map(f => {
        const d = FLOWERS.find(fl => fl.id === f.flowerId);
        return d ? d.name : 'flower';
      });

      const randomVerses = [
        "In quiet corners where soft petals turn to light, may your heart find peace and blossoming delight.",
        "Gathered from morning dew and gentle winds, a timeless bouquet for a cherished soul.",
        "May joy unfold around you gently, petal by petal, like spring awakening after winter rain.",
        "A symphony of fresh stems to brighten your hours and bring serene garden warmth into your day."
      ];

      setTimeout(() => {
        const chosen = randomVerses[Math.floor(Math.random() * randomVerses.length)];
        setNote(chosen);
        setIsGeneratingAI(false);
      }, 700);
    } catch (e) {
      console.error(e);
      setIsGeneratingAI(false);
    }
  };

  // High quality PNG export using html-to-image
  const handleExportPNG = async () => {
    if (!artboardRef.current) return;
    setIsExportingImage(true);
    
    // Deselect active squares during capture for clean artwork
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

      const sanitizedTitle = (bouquetTitle || 'DigiBouquet_Artwork')
        .replace(/[^a-z0-9]/gi, '_')
        .toLowerCase();
      
      const link = document.createElement('a');
      link.download = `${sanitizedTitle}.png`;
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
      alert('Please add at least one botanical stem to compose your bouquet.');
      return;
    }

    const newBouquet: Bouquet = {
      id: `bouquet-${Date.now()}`,
      title: bouquetTitle || 'Untitled Bouquet',
      flowers: placedFlowers,
      stickers: placedStickers,
      wrapping,
      ribbon,
      ribbonColor,
      ribbonTexture,
      ribbonText: ribbonText.trim(),
      ribbonTextColor,
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
  
  const selectedStickerItem = placedStickers.find(s => s.instanceId === selectedStickerId);
  const selectedStickerDef = selectedStickerItem ? STICKERS_CATALOG.find(sc => sc.id === selectedStickerItem.stickerId) : null;

  const currentWrappingObj = WRAPPING_OPTIONS.find(w => w.id === wrapping) || WRAPPING_OPTIONS[0];
  const currentRibbonObj = RIBBON_OPTIONS.find(r => r.id === ribbon) || RIBBON_OPTIONS[0];
  const currentTextureObj = RIBBON_TEXTURES.find(t => t.id === ribbonTexture) || RIBBON_TEXTURES[0];
  const currentColorObj = RIBBON_COLORS.find(c => c.hex.toLowerCase() === ribbonColor.toLowerCase());

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col md:flex-row overflow-hidden bg-[#F9F9ED] text-[#111111]">
      
      {/* Sidebar Library & Controls (Desktop) or Collapsible Drawer (Mobile) */}
      <aside className={`w-full md:w-[340px] lg:w-[380px] border-r border-[#D9D9CE] flex flex-col bg-[#F9F9ED]/95 backdrop-blur-md overflow-y-auto z-20 transition-all ${
        mobileDrawerOpen ? 'fixed inset-x-0 top-[73px] bottom-16 h-[calc(100vh-137px)] p-6 bg-[#FAFAF2] shadow-2xl z-40 block' : 'hidden md:flex p-6 md:p-7 max-h-[calc(100vh-80px)]'
      }`}>
        
        {/* Navigation Tabs */}
        <div className="grid grid-cols-5 border-b border-[#D9D9CE] pb-2 mb-4 font-sans text-[8.5px] sm:text-[9px] uppercase tracking-[0.12em] font-medium text-[#6F6F6F] text-center">
          <button
            onClick={() => setActiveTab('flowers')}
            className={`pb-1.5 transition-colors cursor-pointer active:scale-95 ${activeTab === 'flowers' ? 'text-[#111111] border-b-2 border-[#111111] font-bold' : 'hover:text-[#111111]'}`}
          >
            Stems
          </button>
          <button
            onClick={() => setActiveTab('stickers')}
            className={`pb-1.5 transition-colors cursor-pointer active:scale-95 flex items-center justify-center gap-1 ${activeTab === 'stickers' ? 'text-[#111111] border-b-2 border-[#111111] font-bold' : 'hover:text-[#111111]'}`}
          >
            <span>Stickers</span>
            {placedStickers.length > 0 && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>}
          </button>
          <button
            onClick={() => setActiveTab('wrapping')}
            className={`pb-1.5 transition-colors cursor-pointer active:scale-95 ${activeTab === 'wrapping' ? 'text-[#111111] border-b-2 border-[#111111] font-bold' : 'hover:text-[#111111]'}`}
          >
            Wrap
          </button>
          <button
            onClick={() => setActiveTab('ribbons')}
            className={`pb-1.5 transition-colors cursor-pointer active:scale-95 flex items-center justify-center gap-1 ${activeTab === 'ribbons' ? 'text-[#111111] border-b-2 border-[#111111] font-bold' : 'hover:text-[#111111]'}`}
          >
            <span>Ribbon</span>
            {ribbonText.trim() && <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>}
          </button>
          <button
            onClick={() => setActiveTab('card')}
            className={`pb-1.5 transition-colors cursor-pointer active:scale-95 ${activeTab === 'card' ? 'text-[#111111] border-b-2 border-[#111111] font-bold' : 'hover:text-[#111111]'}`}
          >
            Card
          </button>
        </div>

        {/* Tab 1: Botanical Flowers */}
        {activeTab === 'flowers' && (
          <div className="mb-6">
            <h2 className="text-[10px] uppercase tracking-[0.15em] font-sans font-semibold mb-3 text-[#85857D]">
              Botanical Stems ({FLOWERS.length})
            </h2>
            <div className="grid grid-cols-2 gap-2.5">
              {FLOWERS.map((flower) => {
                const count = placedFlowers.filter(pf => pf.flowerId === flower.id).length;

                return (
                  <motion.button
                    key={flower.id}
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      handleAddFlower(flower);
                      if (window.innerWidth < 768) setMobileDrawerOpen(false);
                    }}
                    className="aspect-[4/5] bg-[#FAFAF2] border border-[#D9D9CE] flex flex-col items-center justify-center p-2.5 cursor-pointer hover:border-[#111111] transition-all relative group text-left shadow-2xs"
                  >
                    {count > 0 && (
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2 w-5 h-5 bg-[#000000] text-[#F9F9ED] rounded-full flex items-center justify-center text-[10px] font-sans font-medium shadow-xs z-20"
                      >
                        {count}
                      </motion.div>
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
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Botanical Decorative Stickers Overlay */}
        {activeTab === 'stickers' && (
          <div className="mb-6 space-y-4 font-sans">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <h3 className="text-[10px] uppercase tracking-[0.15em] font-semibold text-[#85857D]">
                  Botanical Accents & Fauna
                </h3>
                <span className="text-[9px] text-[#6F6F6F]">{placedStickers.length} placed</span>
              </div>
              <p className="text-[10px] text-[#6F6F6F] leading-relaxed mb-3">
                Tap to place fluttering butterflies, meadow honeybees, botanical ladybugs, dragonflies, or golden pollen sparkles onto your arrangement.
              </p>

              <div className="grid grid-cols-2 gap-2.5">
                {STICKERS_CATALOG.map((stk) => {
                  const placedCount = placedStickers.filter(s => s.stickerId === stk.id).length;

                  return (
                    <motion.button
                      key={stk.id}
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        handleAddSticker(stk.id);
                        if (window.innerWidth < 768) setMobileDrawerOpen(false);
                      }}
                      className="p-3 bg-[#FAFAF2] border border-[#D9D9CE] hover:border-[#111111] transition-all flex flex-col items-center justify-center text-center cursor-pointer shadow-2xs group relative"
                    >
                      {placedCount > 0 && (
                        <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#111111] text-[#F9F9ED] rounded-full text-[9px] flex items-center justify-center font-medium">
                          {placedCount}
                        </div>
                      )}
                      <div className="w-12 h-12 mb-1.5 flex items-center justify-center group-hover:scale-115 transition-transform">
                        <StickerSVG stickerId={stk.id} />
                      </div>
                      <span className="font-serif italic text-xs text-[#111111] truncate w-full">{stk.name}</span>
                      <span className="text-[8px] text-[#6F6F6F] uppercase tracking-wider mt-0.5">{stk.category}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Wrapping Paper */}
        {activeTab === 'wrapping' && (
          <div className="mb-6 space-y-4 font-sans">
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.15em] font-semibold mb-2.5 text-[#85857D]">Wrapping Paper</h3>
              <div className="space-y-2 text-xs">
                {WRAPPING_OPTIONS.map((w) => (
                  <motion.button
                    key={w.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setWrapping(w.id as WrappingStyle)}
                    className={`w-full p-3 border text-left flex items-center justify-between transition-all cursor-pointer ${
                      wrapping === w.id ? 'border-[#111111] bg-[#F5F5E9] font-medium shadow-2xs' : 'border-[#D9D9CE] hover:border-[#85857D] bg-[#FAFAF2]'
                    }`}
                  >
                    <div>
                      <div className="font-serif italic text-sm text-[#111111]">{w.name}</div>
                      <div className="text-[9px] text-[#6F6F6F] uppercase tracking-wider">{w.desc}</div>
                    </div>
                    <span className={`w-5 h-5 rounded-full ${w.bg} border border-[#111111]/20 shrink-0 shadow-2xs`} />
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Ribbons Customization Panel */}
        {activeTab === 'ribbons' && (
          <div className="mb-6 space-y-6 font-sans">
            {/* Header & Live Ribbon Preview Banner */}
            <div className="bg-[#FAFAF2] border border-[#D9D9CE] p-4 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] font-semibold text-[#85857D]">
                    <Sparkle className="w-3 h-3 text-[#111111]" />
                    <span>Ribbon Atelier</span>
                  </div>
                  <h3 className="text-sm font-serif italic text-[#111111] font-medium">Bespoke Silk & Velvet Ties</h3>
                </div>
                <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 bg-[#111111]/5 border border-[#111111]/10 text-[#6F6F6F] font-mono">
                  {currentTextureObj.name}
                </span>
              </div>

              {/* Dynamic Live Ribbon Swatch */}
              <div className="relative h-24 bg-[#F5F5E9] border border-[#D9D9CE] overflow-hidden flex items-center justify-center p-2">
                <div className="w-28 h-20">
                  <RibbonSVG 
                    styleId={ribbon} 
                    color={ribbonColor}
                    texture={ribbonTexture}
                    customText={ribbonText}
                    textColor={ribbonTextColor}
                    className="w-full h-full" 
                  />
                </div>
                {ribbonText.trim() && (
                  <div className="absolute bottom-1 right-2 text-[8.5px] font-serif italic text-[#6F6F6F] bg-[#FAFAF2]/90 px-1.5 py-0.5 border border-[#D9D9CE]/70">
                    "{ribbonText}"
                  </div>
                )}
              </div>
            </div>

            {/* Section 1: Personalized Ribbon Inscription */}
            <div className="space-y-3 border-t border-[#D9D9CE] pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5 text-[#111111]" />
                  <h4 className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#111111]">
                    Personalized Ribbon Inscription
                  </h4>
                </div>
                <span className="text-[9px] text-[#6F6F6F] font-mono">{ribbonText.length}/42</span>
              </div>
              <p className="text-[10px] text-[#6F6F6F] leading-tight">
                Letters elegantly embossed and draped along the digital ribbon overlay.
              </p>

              {/* Text Input with Clear Button */}
              <div className="relative">
                <input
                  type="text"
                  value={ribbonText}
                  maxLength={42}
                  onChange={(e) => setRibbonText(e.target.value)}
                  placeholder="e.g. Forever in Bloom, For Clara"
                  className="w-full pl-3 pr-8 py-2.5 border border-[#D9D9CE] bg-[#FAFAF2] text-xs font-serif italic focus:outline-none focus:border-[#111111] text-[#111111]"
                />
                {ribbonText && (
                  <button
                    type="button"
                    onClick={() => setRibbonText('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#85857D] hover:text-[#111111] transition-colors cursor-pointer"
                    title="Clear text"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Quick Sentiment Chips */}
              <div className="space-y-1.5">
                <div className="text-[9px] uppercase tracking-wider text-[#85857D] font-medium">Quick Sentiments</div>
                <div className="flex flex-wrap gap-1.5">
                  {RIBBON_TEXT_PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setRibbonText(preset)}
                      className={`text-[9px] font-serif italic px-2.5 py-1 border transition-all cursor-pointer ${
                        ribbonText === preset 
                          ? 'bg-[#111111] text-[#F9F9ED] border-[#111111]' 
                          : 'bg-[#FAFAF2] text-[#4A4A4A] border-[#D9D9CE] hover:border-[#111111]'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inscription Lettering Foil / Thread Color */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[9px] uppercase tracking-wider text-[#85857D] font-medium">Lettering Thread / Foil</div>
                <div className="flex items-center gap-2">
                  {RIBBON_TEXT_COLORS.map((tc) => {
                    const isSelected = ribbonTextColor.toLowerCase() === tc.hex.toLowerCase();
                    return (
                      <button
                        key={tc.id}
                        type="button"
                        onClick={() => setRibbonTextColor(tc.hex)}
                        className={`flex items-center gap-1.5 px-2.5 py-1.5 border text-[9px] transition-all cursor-pointer ${
                          isSelected ? 'border-[#111111] bg-[#FAFAF2] font-semibold ring-1 ring-[#111111]' : 'border-[#D9D9CE] bg-[#FAFAF2]/60 hover:border-[#85857D]'
                        }`}
                        title={tc.name}
                      >
                        <span 
                          className="w-3 h-3 rounded-full border border-black/20 shrink-0" 
                          style={{ backgroundColor: tc.hex }} 
                        />
                        <span className="text-[#333333]">{tc.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Section 2: Ribbon Material & Texture */}
            <div className="space-y-3 border-t border-[#D9D9CE] pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Feather className="w-3.5 h-3.5 text-[#111111]" />
                  <h4 className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#111111]">
                    Ribbon Material & Texture
                  </h4>
                </div>
                <span className="text-[9px] uppercase tracking-wider text-[#6F6F6F] font-mono">
                  {currentTextureObj.badge}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {RIBBON_TEXTURES.map((t) => {
                  const isSelected = ribbonTexture === t.id;
                  return (
                    <motion.button
                      key={t.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRibbonTexture(t.id as RibbonTexture)}
                      className={`p-2.5 border text-left flex flex-col justify-between transition-all cursor-pointer ${
                        isSelected 
                          ? 'border-[#111111] bg-[#F5F5E9] font-medium shadow-2xs ring-1 ring-[#111111]' 
                          : 'border-[#D9D9CE] hover:border-[#85857D] bg-[#FAFAF2]'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <span className="font-serif italic text-xs text-[#111111]">{t.name}</span>
                        <span className="text-[7.5px] uppercase tracking-wider px-1 py-0.2 bg-[#111111]/5 border border-[#111111]/10 text-[#6F6F6F]">
                          {t.badge}
                        </span>
                      </div>
                      <div className="text-[8.5px] text-[#6F6F6F] line-clamp-1">{t.desc}</div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Section 3: Ribbon Color Palette */}
            <div className="space-y-3 border-t border-[#D9D9CE] pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-[#111111]" />
                  <h4 className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#111111]">
                    Botanical Color Palette
                  </h4>
                </div>
                <span className="text-[9px] text-[#6F6F6F] font-mono">
                  {currentColorObj ? currentColorObj.name : ribbonColor}
                </span>
              </div>

              {/* Color Swatch Grid */}
              <div className="grid grid-cols-7 gap-2">
                {RIBBON_COLORS.map((c) => {
                  const isSelected = ribbonColor.toLowerCase() === c.hex.toLowerCase();
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setRibbonColor(c.hex)}
                      className={`group relative aspect-square rounded-full border transition-transform cursor-pointer flex items-center justify-center ${
                        isSelected ? 'scale-110 ring-2 ring-[#111111] ring-offset-1 ring-offset-[#F9F9ED]' : 'hover:scale-105 border-[#111111]/20'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {isSelected && (
                        <Check className={`w-3 h-3 ${['#f7f4ef', '#f5d6d6', '#e8ddcb', '#ffffff'].includes(c.hex.toLowerCase()) ? 'text-black' : 'text-white'}`} />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Custom Color Input */}
              <div className="flex items-center gap-2 pt-1">
                <label className="text-[9px] uppercase tracking-wider text-[#85857D] whitespace-nowrap">
                  Custom Tone:
                </label>
                <div className="flex items-center gap-1.5 flex-1">
                  <input
                    type="color"
                    value={ribbonColor}
                    onChange={(e) => setRibbonColor(e.target.value)}
                    className="w-7 h-7 p-0 border border-[#D9D9CE] bg-transparent cursor-pointer rounded-xs"
                    title="Select custom shade"
                  />
                  <input
                    type="text"
                    value={ribbonColor}
                    onChange={(e) => setRibbonColor(e.target.value)}
                    className="flex-1 px-2.5 py-1 text-xs border border-[#D9D9CE] bg-[#FAFAF2] font-mono text-[#111111] uppercase"
                    placeholder="#F7F4EF"
                  />
                </div>
              </div>
            </div>

            {/* Section 4: Classic Pre-Curated Ribbons */}
            <div className="space-y-3 border-t border-[#D9D9CE] pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#111111]" />
                  <h4 className="text-[10px] uppercase tracking-[0.15em] font-bold text-[#111111]">
                    Curated Signature Ties
                  </h4>
                </div>
                <span className="text-[9px] text-[#6F6F6F]">Quick Archetypes</span>
              </div>

              <div className="space-y-2 text-xs">
                {RIBBON_OPTIONS.map((r) => {
                  const isSelected = ribbon === r.id && ribbonColor === r.color;
                  return (
                    <motion.button
                      key={r.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setRibbon(r.id as RibbonStyle);
                        setRibbonColor(r.color);
                        if (r.id === 'jute-twine') setRibbonTexture('jute');
                        else if (r.id.includes('velvet')) setRibbonTexture('velvet');
                        else if (r.id.includes('chiffon')) setRibbonTexture('chiffon');
                        else if (r.id.includes('satin')) setRibbonTexture('satin');
                        else setRibbonTexture('silk');
                      }}
                      className={`w-full p-2.5 border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isSelected ? 'border-[#111111] bg-[#F5F5E9] font-medium shadow-2xs ring-1 ring-[#111111]' : 'border-[#D9D9CE] hover:border-[#85857D] bg-[#FAFAF2]'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-serif italic text-xs text-[#111111]">{r.name}</span>
                          <span className="text-[7.5px] uppercase tracking-widest px-1 py-0.2 bg-[#111111]/5 border border-[#111111]/10 text-[#6F6F6F]">
                            {r.material}
                          </span>
                        </div>
                        <div className="text-[8.5px] text-[#6F6F6F] line-clamp-1">{r.desc}</div>
                      </div>

                      <div className="w-8 h-8 shrink-0 flex items-center justify-center p-0.5">
                        <RibbonSVG styleId={r.id as RibbonStyle} color={r.color} className="w-full h-full" />
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* Tab 5: Card & Sentiments */}
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

        {/* Selected Item Fine-Tuning Controls (Stem or Sticker) */}
        <div className="mt-auto pt-4 border-t border-[#D9D9CE]">
          <div className="flex justify-between items-center mb-3 font-sans">
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#111111] flex items-center gap-1">
              <Sliders className="w-3 h-3" />
              <span>{selectedStickerId ? 'Sticker Tuning' : 'Stem Tuning'}</span>
            </span>
            <span className="text-[10px] text-[#6F6F6F] truncate max-w-[140px]">
              {selectedStickerDef ? selectedStickerDef.name : selectedFlowerDef ? selectedFlowerDef.name : 'Select item'}
            </span>
          </div>

          {/* Stem Tuning */}
          {selectedInstanceId && selectedFlowerItem && (
            <div className="space-y-3 font-sans">
              <div>
                <div className="flex justify-between text-[10px] mb-1 text-[#6F6F6F]">
                  <span>Scale</span>
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
                  onChange={(e) => handleUpdateSelectedFlower({ rotation: parseInt(e.target.value) })}
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
          )}

          {/* Sticker Tuning */}
          {selectedStickerId && selectedStickerItem && (
            <div className="space-y-3 font-sans">
              <div>
                <div className="flex justify-between text-[10px] mb-1 text-[#6F6F6F]">
                  <span>Sticker Scale</span>
                  <span>{Math.round(selectedStickerItem.scale * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.4"
                  max="2.0"
                  step="0.05"
                  value={selectedStickerItem.scale}
                  onChange={(e) => handleUpdateSelectedSticker({ scale: parseFloat(e.target.value) })}
                  className="w-full accent-[#111111] cursor-pointer h-1 bg-[#D9D9CE]"
                />
              </div>

              <div>
                <div className="flex justify-between text-[10px] mb-1 text-[#6F6F6F]">
                  <span>Angle</span>
                  <span>{selectedStickerItem.rotation}°</span>
                </div>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  step="2"
                  value={selectedStickerItem.rotation}
                  onChange={(e) => handleUpdateSelectedSticker({ rotation: parseInt(e.target.value) })}
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
                  onClick={() => handleRemoveSticker(selectedStickerId)}
                  className="text-[10px] uppercase tracking-widest text-red-600 hover:underline cursor-pointer active:scale-95 font-sans"
                >
                  Remove
                </button>
              </div>
            </div>
          )}

          {!selectedInstanceId && !selectedStickerId && (
            <p className="text-[10px] font-sans text-[#6F6F6F] italic">Tap any flower or sticker to adjust scale, rotation & layering.</p>
          )}
        </div>

      </aside>

      {/* Main Canvas Area */}
      <main 
        ref={canvasRef}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={() => setDragTarget(null)}
        onMouseLeave={() => setDragTarget(null)}
        className="flex-1 relative bg-[#F9F9ED] flex flex-col items-center justify-between p-3 md:p-8 overflow-hidden select-none"
      >
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        {/* Top Action Bar (Export PNG, Mobile Toggle, Info) */}
        <div className="w-full max-w-2xl flex items-center justify-between bg-[#FAFAF2] border border-[#D9D9CE] px-4 py-2.5 mb-2 z-20 shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#111111]"></span>
            <span className="text-[10px] font-sans uppercase tracking-widest font-bold text-[#111111]">
              {placedFlowers.length} Stems • {placedStickers.length} Stickers
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Export PNG Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExportPNG}
              disabled={isExportingImage || placedFlowers.length === 0}
              className={`flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-sans font-medium px-3 py-1.5 border transition-all cursor-pointer ${
                isExportingImage 
                  ? 'bg-amber-100 text-amber-900 border-amber-300' 
                  : 'bg-[#F9F9ED] hover:bg-[#111111] hover:text-[#F9F9ED] text-[#111111] border-[#D9D9CE]'
              }`}
              title="Save high-resolution PNG image of your bouquet"
            >
              <Download className="w-3 h-3" />
              <span>{isExportingImage ? 'Exporting...' : 'Export PNG'}</span>
            </motion.button>

            {/* Mobile Drawer Toggle */}
            <button
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
              className="flex md:hidden text-[9px] uppercase tracking-widest font-sans font-medium px-3 py-1.5 bg-[#111111] text-[#F9F9ED] active:scale-95 cursor-pointer items-center gap-1"
            >
              <span>{mobileDrawerOpen ? 'Close' : 'Atelier Menu'}</span>
              <ChevronRight className={`w-3 h-3 transition-transform ${mobileDrawerOpen ? 'rotate-90' : ''}`} />
            </button>
          </div>
        </div>

        {/* Real-time Scaled-Down Mini-Preview Pane */}
        <MiniPreview
          placedFlowers={placedFlowers}
          placedStickers={placedStickers}
          wrapping={wrapping}
          ribbon={ribbon}
          ribbonColor={ribbonColor}
          ribbonTexture={ribbonTexture}
          ribbonText={ribbonText}
          ribbonTextColor={ribbonTextColor}
          bouquetTitle={bouquetTitle}
          recipientName={recipientName}
          senderName={senderName}
          onExportPNG={handleExportPNG}
          isExporting={isExportingImage}
        />

        {/* Bouquet Composition Artboard Canvas (Target for PNG export) */}
        <div 
          ref={artboardRef}
          className="relative w-full max-w-[460px] h-[400px] sm:h-[490px] md:h-[530px] flex items-center justify-center my-auto bg-[#F9F9ED] rounded-xl"
        >
          
          {/* 1. Background Origami Parchment Wings (Back Layer, z-0) */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-56 sm:w-68 h-52 sm:h-64 pointer-events-none z-0 filter drop-shadow-sm opacity-90">
            <WrappingPaperSVG styleId={wrapping} layer="back" className="w-full h-full" />
          </div>

          {/* 2. Placed Botanical Flowers (Middle Layer, z-10 to z-40) */}
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
                      whileTap={{ scale: 0.95 }}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        handleSelectFlower(pf.instanceId);
                        setDragTarget({ type: 'flower', id: pf.instanceId });
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectFlower(pf.instanceId);
                      }}
                      className={`w-24 h-32 sm:w-28 sm:h-36 relative cursor-grab active:cursor-grabbing pointer-events-auto transition-all ${
                        isShowSquare ? 'ring-1 ring-[#111111]/60 bg-[#111111]/5 rounded-xl' : ''
                      }`}
                      title="Click to select & drag flower"
                    >
                      {isShowSquare && (
                        <motion.button
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFlower(pf.instanceId);
                          }}
                          className="absolute -top-3 -right-3 w-6 h-6 bg-[#000000] text-[#F9F9ED] rounded-full flex items-center justify-center text-xs shadow-md z-50 hover:scale-110 transition-transform cursor-pointer pointer-events-auto"
                          title="Delete stem"
                        >
                          <X className="w-3.5 h-3.5" />
                        </motion.button>
                      )}
                      <div className="absolute inset-0 pointer-events-auto">
                        <FlowerSVG 
                          svgType={flowerDef.svgType} 
                          color={flowerDef.color} 
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* 3. Front Tapered Wrapping Cone (z-45) & 4. Botanical Ribbon (z-50) */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 z-45 flex flex-col items-center pointer-events-none">
            {/* Front Tapered Origami Wrap Cone */}
            <motion.div 
              key={`wrap-${wrapping}`}
              initial={{ scale: 0.96, opacity: 0.9 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-44 sm:w-54 h-32 sm:h-40 relative"
            >
              <WrappingPaperSVG styleId={wrapping} layer="front" className="w-full h-full" />
            </motion.div>

            {/* Botanical Ribbon Tied Over Stem Neck */}
            <motion.div 
              key={`ribbon-${ribbon}-${ribbonColor}-${ribbonTexture}-${ribbonText}-${ribbonTextColor}`}
              initial={{ scale: 0.85, opacity: 0, y: -4 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="absolute -top-5 left-1/2 -translate-x-1/2 w-28 sm:w-34 h-22 pointer-events-auto z-50 filter drop-shadow-md cursor-pointer"
              onClick={() => setActiveTab('ribbons')}
              title={`Tied with ${currentTextureObj.name} ribbon • "${ribbonText || 'Click to personalize ribbon'}"`}
            >
              <RibbonSVG 
                styleId={ribbon} 
                color={ribbonColor}
                texture={ribbonTexture}
                customText={ribbonText}
                textColor={ribbonTextColor}
                className="w-full h-full" 
              />
            </motion.div>
          </div>

          {/* 5. Decorative Botanical Stickers Overlay Layer (z-55 to z-70) */}
          <div className="absolute inset-0 overflow-visible pointer-events-auto z-55">
            <AnimatePresence>
              {placedStickers.map((ps) => {
                const isShowSquare = ps.instanceId === visibleSquareId;

                return (
                  <motion.div
                    key={ps.instanceId}
                    initial={{ scale: 0, opacity: 0, rotate: ps.rotation }}
                    animate={{ scale: ps.scale, opacity: 1, rotate: ps.rotation }}
                    exit={{ scale: 0, opacity: 0, transition: { duration: 0.15 } }}
                    transition={{ type: "spring", stiffness: 380, damping: 22 }}
                    style={{
                      position: 'absolute',
                      left: `${ps.x}%`,
                      top: `${ps.y}%`,
                      transform: `translate(-50%, -50%)`,
                      zIndex: ps.zIndex,
                    }}
                    className="pointer-events-none"
                  >
                    <motion.div 
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.94 }}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        handleSelectSticker(ps.instanceId);
                        setDragTarget({ type: 'sticker', id: ps.instanceId });
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectSticker(ps.instanceId);
                      }}
                      className={`w-14 h-14 sm:w-16 sm:h-16 relative cursor-grab active:cursor-grabbing pointer-events-auto transition-all ${
                        isShowSquare ? 'ring-1 ring-[#111111]/70 bg-white/30 rounded-xl backdrop-blur-2xs' : ''
                      }`}
                      title="Click & drag decorative botanical sticker"
                    >
                      {isShowSquare && (
                        <motion.button
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveSticker(ps.instanceId);
                          }}
                          className="absolute -top-2.5 -right-2.5 w-5 h-5 bg-[#000000] text-[#F9F9ED] rounded-full flex items-center justify-center text-xs shadow-md z-50 hover:scale-110 transition-transform cursor-pointer pointer-events-auto"
                          title="Remove sticker"
                        >
                          <X className="w-3 h-3" />
                        </motion.button>
                      )}
                      <div className="w-full h-full pointer-events-auto">
                        <StickerSVG stickerId={ps.stickerId} />
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
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
            disabled={placedFlowers.length === 0 && placedStickers.length === 0}
            style={{ minWidth: '85px' }}
            className={`text-[10px] uppercase tracking-[0.2em] font-medium py-2 px-3 transition-all flex items-center justify-center border border-[#D9D9CE] ${
              (placedFlowers.length > 0 || placedStickers.length > 0)
                ? 'bg-[#FAFAF2] text-[#111111] hover:border-[#111111] active:scale-95 cursor-pointer shadow-2xs' 
                : 'bg-[#FAFAF2]/50 text-[#85857D] border-[#D9D9CE]/50 cursor-not-allowed opacity-50'
            }`}
          >
            <span>Reset</span>
          </motion.button>
        </div>

      </main>

    </div>
  );
};
