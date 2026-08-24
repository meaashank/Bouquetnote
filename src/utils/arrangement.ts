import { Flower, PlacedFlower, FlowerRole, CompositionTemplate } from '../types';
import { FLOWERS } from '../data/flowers';

export interface SlotCoordinate {
  x: number;       // Normalized % 0-100
  y: number;       // Normalized % 0-100
  rotation: number;// Degrees
  scale: number;   // Multiplier
  zIndex: number;  // Layer depth
  rolePriority?: FlowerRole;
}

// 1. ROUND: Soft circular, balanced, romantic dome
const ROUND_SLOTS: SlotCoordinate[] = [
  { x: 50, y: 37, rotation: 0, scale: 1.20, zIndex: 24, rolePriority: 'focal' },        // #1 Focal Crown Center
  { x: 37, y: 43, rotation: -12, scale: 1.10, zIndex: 20, rolePriority: 'supporting' }, // #2 Left Mid Bloom
  { x: 63, y: 43, rotation: 12, scale: 1.10, zIndex: 20, rolePriority: 'supporting' },  // #3 Right Mid Bloom
  { x: 50, y: 49, rotation: 2, scale: 1.14, zIndex: 26, rolePriority: 'focal' },         // #4 Lower Center
  { x: 26, y: 39, rotation: -22, scale: 1.00, zIndex: 12, rolePriority: 'foliage' },    // #5 Left Wing Foliage
  { x: 74, y: 39, rotation: 22, scale: 1.00, zIndex: 12, rolePriority: 'foliage' },     // #6 Right Wing Foliage
  { x: 42, y: 29, rotation: -6, scale: 1.02, zIndex: 16, rolePriority: 'supporting' },  // #7 High Left
  { x: 58, y: 29, rotation: 6, scale: 1.02, zIndex: 16, rolePriority: 'supporting' },   // #8 High Right
  { x: 33, y: 50, rotation: -16, scale: 0.94, zIndex: 18, rolePriority: 'accent' },     // #9 Low Left Accent
  { x: 67, y: 50, rotation: 16, scale: 0.94, zIndex: 18, rolePriority: 'accent' },      // #10 Low Right Accent
];

// 2. WILD: Asymmetrical, organic, expressive branches & varied rotations
const WILD_SLOTS: SlotCoordinate[] = [
  { x: 47, y: 39, rotation: -8, scale: 1.20, zIndex: 24, rolePriority: 'focal' },        // #1 Off-Center Anchor
  { x: 62, y: 37, rotation: 16, scale: 1.12, zIndex: 20, rolePriority: 'supporting' },  // #2 Dynamic Right
  { x: 34, y: 45, rotation: -22, scale: 1.06, zIndex: 18, rolePriority: 'supporting' }, // #3 Cascading Left
  { x: 76, y: 32, rotation: 32, scale: 1.05, zIndex: 12, rolePriority: 'foliage' },     // #4 High Right Wild Foliage
  { x: 22, y: 40, rotation: -30, scale: 1.02, zIndex: 12, rolePriority: 'foliage' },    // #5 Flaring Left Foliage
  { x: 53, y: 49, rotation: 10, scale: 1.14, zIndex: 26, rolePriority: 'focal' },        // #6 Low Focal Anchor
  { x: 42, y: 27, rotation: -14, scale: 0.98, zIndex: 16, rolePriority: 'accent' },     // #7 High Crest Accent
  { x: 67, y: 48, rotation: 24, scale: 0.94, zIndex: 18, rolePriority: 'accent' },      // #8 Outer Right Accent
  { x: 26, y: 52, rotation: -26, scale: 0.90, zIndex: 14, rolePriority: 'foliage' },    // #9 Low Left Sprig
  { x: 52, y: 32, rotation: 4, scale: 1.00, zIndex: 18, rolePriority: 'supporting' },   // #10 Mid Crown
];

// 3. MINIMAL: Editorial 3-5 blooms with deliberate negative space & quiet elegance
const MINIMAL_SLOTS: SlotCoordinate[] = [
  { x: 50, y: 38, rotation: 0, scale: 1.25, zIndex: 24, rolePriority: 'focal' },        // #1 Solitary Hero
  { x: 36, y: 44, rotation: -14, scale: 1.04, zIndex: 20, rolePriority: 'supporting' }, // #2 Soft Left Counter
  { x: 64, y: 35, rotation: 14, scale: 1.00, zIndex: 16, rolePriority: 'accent' },      // #3 High Right Accent
  { x: 28, y: 34, rotation: -24, scale: 0.95, zIndex: 12, rolePriority: 'foliage' },    // #4 Atmospheric Foliage
  { x: 54, y: 50, rotation: 8, scale: 1.08, zIndex: 22, rolePriority: 'supporting' },   // #5 Base Balance
  { x: 70, y: 43, rotation: 22, scale: 0.92, zIndex: 14, rolePriority: 'foliage' },     // #6 Right Balance
  { x: 44, y: 28, rotation: -6, scale: 0.92, zIndex: 16, rolePriority: 'accent' },      // #7 High Whisper
  { x: 40, y: 52, rotation: -10, scale: 0.90, zIndex: 18, rolePriority: 'accent' },     // #8 Low Ground
  { x: 60, y: 29, rotation: 12, scale: 0.88, zIndex: 14, rolePriority: 'accent' },      // #9 Sky Accent
  { x: 50, y: 46, rotation: 0, scale: 1.00, zIndex: 20, rolePriority: 'supporting' },   // #10 Center Tuck
];

// 4. FULL: Dense, layered botanical tapestry with rich overlaps
const FULL_SLOTS: SlotCoordinate[] = [
  { x: 44, y: 40, rotation: -8, scale: 1.22, zIndex: 26, rolePriority: 'focal' },       // #1 Focal Front-Left
  { x: 58, y: 38, rotation: 10, scale: 1.20, zIndex: 24, rolePriority: 'focal' },       // #2 Focal Front-Right
  { x: 50, y: 30, rotation: 0, scale: 1.14, zIndex: 18, rolePriority: 'supporting' },   // #3 Top Apex Bloom
  { x: 34, y: 34, rotation: -16, scale: 1.06, zIndex: 16, rolePriority: 'supporting' }, // #4 Upper Left Mid
  { x: 66, y: 34, rotation: 18, scale: 1.06, zIndex: 16, rolePriority: 'supporting' },  // #5 Upper Right Mid
  { x: 50, y: 49, rotation: 4, scale: 1.16, zIndex: 28, rolePriority: 'focal' },        // #6 Lower Front Anchor
  { x: 25, y: 44, rotation: -26, scale: 1.00, zIndex: 12, rolePriority: 'foliage' },    // #7 Outer Left Foliage
  { x: 75, y: 44, rotation: 26, scale: 1.00, zIndex: 12, rolePriority: 'foliage' },     // #8 Outer Right Foliage
  { x: 35, y: 51, rotation: -12, scale: 0.96, zIndex: 18, rolePriority: 'accent' },     // #9 Lower Left Accent
  { x: 65, y: 51, rotation: 14, scale: 0.96, zIndex: 18, rolePriority: 'accent' },      // #10 Lower Right Accent
];

// 5. VERTICAL: Sculptural upward cascade with commanding crown
const VERTICAL_SLOTS: SlotCoordinate[] = [
  { x: 50, y: 28, rotation: 0, scale: 1.24, zIndex: 22, rolePriority: 'focal' },        // #1 High Crown Focal
  { x: 44, y: 38, rotation: -10, scale: 1.14, zIndex: 24, rolePriority: 'focal' },      // #2 Mid-Tier Focal
  { x: 56, y: 42, rotation: 12, scale: 1.12, zIndex: 22, rolePriority: 'supporting' },  // #3 Stepped Right
  { x: 48, y: 50, rotation: -4, scale: 1.16, zIndex: 26, rolePriority: 'focal' },       // #4 Low Center Base
  { x: 35, y: 30, rotation: -24, scale: 1.02, zIndex: 12, rolePriority: 'foliage' },    // #5 High Left Spire
  { x: 65, y: 30, rotation: 24, scale: 1.02, zIndex: 12, rolePriority: 'foliage' },     // #6 High Right Spire
  { x: 38, y: 44, rotation: -16, scale: 0.98, zIndex: 18, rolePriority: 'supporting' }, // #7 Left Waist
  { x: 62, y: 50, rotation: 18, scale: 0.94, zIndex: 16, rolePriority: 'accent' },      // #8 Low Right Accent
  { x: 52, y: 20, rotation: 0, scale: 0.88, zIndex: 10, rolePriority: 'accent' },       // #9 Top Spire Bud
  { x: 34, y: 54, rotation: -20, scale: 0.90, zIndex: 14, rolePriority: 'foliage' },    // #10 Base Left Sprig
];

export const TEMPLATE_SLOTS: Record<CompositionTemplate, SlotCoordinate[]> = {
  round: ROUND_SLOTS,
  wild: WILD_SLOTS,
  minimal: MINIMAL_SLOTS,
  full: FULL_SLOTS,
  vertical: VERTICAL_SLOTS,
};

export const TEMPLATE_DEFINITIONS: {
  id: CompositionTemplate;
  name: string;
  subtitle: string;
  description: string;
  idealCount: string;
  iconName: string;
}[] = [
  {
    id: 'round',
    name: 'Round Dome',
    subtitle: 'Classic & Romantic',
    description: 'A soft, balanced spherical arrangement with natural radial symmetry and lush bloom nesting.',
    idealCount: '4–8 blooms',
    iconName: 'CircleDot',
  },
  {
    id: 'wild',
    name: 'Wild Meadow',
    subtitle: 'Organic & Asymmetrical',
    description: 'Botanicals extend naturally at dynamic angles while keeping a captivating visual gravity.',
    idealCount: '5–10 blooms',
    iconName: 'Sparkles',
  },
  {
    id: 'minimal',
    name: 'Editorial Minimal',
    subtitle: 'High Negative Space',
    description: 'Sculptural placement emphasizing negative space, solitary flower majesty, and poetic restraint.',
    idealCount: '3–5 blooms',
    iconName: 'Feather',
  },
  {
    id: 'full',
    name: 'Opulent Full',
    subtitle: 'Dense Botanical Tapestry',
    description: 'A rich, deeply layered floral sculpture featuring overlapping focal blooms and cascading foliage.',
    idealCount: '7–10 blooms',
    iconName: 'Layers',
  },
  {
    id: 'vertical',
    name: 'Vertical Cascade',
    subtitle: 'Sculptural & Upward',
    description: 'An architectural column where crowning blooms step gracefully into cascading floral tiers.',
    idealCount: '4–8 blooms',
    iconName: 'ArrowUp',
  },
];

/**
 * Intelligent stemless arrangement algorithm:
 * Given existing placed flowers (or when adding/removing/re-arranging),
 * assigns optimal coordinates based on flower roles and template geometry.
 */
export function calculateSmartArrangement(
  placed: PlacedFlower[],
  template: CompositionTemplate = 'round'
): PlacedFlower[] {
  if (placed.length === 0) return [];

  const slots = TEMPLATE_SLOTS[template] || ROUND_SLOTS;

  // Categorize flowers by role
  const flowersWithDefs = placed.map(pf => {
    const def = FLOWERS.find(f => f.id === pf.flowerId) || FLOWERS[0];
    return {
      placed: pf,
      def,
      role: def.role || 'supporting'
    };
  });

  // Sort logically: Focals first for primary slots, then supporting, then accents, foliage to background wings
  const focals = flowersWithDefs.filter(f => f.role === 'focal');
  const supporting = flowersWithDefs.filter(f => f.role === 'supporting');
  const accents = flowersWithDefs.filter(f => f.role === 'accent');
  const foliage = flowersWithDefs.filter(f => f.role === 'foliage');

  const orderedFlowers = [...focals, ...supporting, ...accents, ...foliage];

  return orderedFlowers.map((item, idx) => {
    const slot = slots[idx % slots.length];
    
    // Add micro organic jitter so multiple arrangements feel hand-crafted
    const microJitterX = ((idx * 17) % 7) - 3;
    const microJitterY = ((idx * 23) % 5) - 2;
    const microJitterRot = ((idx * 11) % 7) - 3;

    // Foliage always receives lower zIndex for background depth
    let finalZ = slot.zIndex;
    if (item.role === 'foliage') {
      finalZ = Math.min(finalZ, 14);
    } else if (item.role === 'focal') {
      finalZ = Math.max(finalZ, 28);
    }

    return {
      ...item.placed,
      x: Math.max(12, Math.min(88, slot.x + microJitterX * 0.4)),
      y: Math.max(12, Math.min(82, slot.y + microJitterY * 0.4)),
      rotation: slot.rotation + microJitterRot,
      scale: (item.def.defaultScale || 1.0) * (slot.scale / 1.1),
      zIndex: finalZ,
      role: item.role
    };
  });
}

/**
 * Calculates default position when a new flower is added to the bouquet
 */
export function getNextSmartSlot(
  currentCount: number,
  newFlower: Flower,
  template: CompositionTemplate = 'round'
): { x: number; y: number; rotation: number; scale: number; zIndex: number } {
  const slots = TEMPLATE_SLOTS[template] || ROUND_SLOTS;
  const slot = slots[currentCount % slots.length];

  let finalZ = slot.zIndex;
  if (newFlower.role === 'foliage') {
    finalZ = 10;
  } else if (newFlower.role === 'focal') {
    finalZ = 30 + currentCount;
  } else {
    finalZ = 20 + currentCount;
  }

  return {
    x: slot.x,
    y: slot.y,
    rotation: slot.rotation,
    scale: (newFlower.defaultScale || 1.0) * (slot.scale / 1.1),
    zIndex: finalZ,
  };
}
