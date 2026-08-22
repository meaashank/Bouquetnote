import { Flower } from '../types';

import imgRose from '../assets/images/botanical_red_rose_1787378453708.png';
import imgPeony from '../assets/images/botanical_peony_1787378285672.png';
import imgDaisy from '../assets/images/botanical_daisy_1787378300406.png';
import imgLily from '../assets/images/botanical_lily_1787378314911.png';
import imgRanunculus from '../assets/images/botanical_ranunculus_1787378327345.png';
import imgZinnia from '../assets/images/botanical_zinnia_1787378341695.png';
import imgCarnation from '../assets/images/botanical_carnation_1787378356926.png';
import imgDahlia from '../assets/images/botanical_dahlia_1787378375747.png';
import imgAnemone from '../assets/images/botanical_anemone_1787378390448.png';
import imgTulip from '../assets/images/botanical_tulip_1787378406059.png';
import imgOrchid from '../assets/images/botanical_orchid_1787378423881.png';
import imgSunflower from '../assets/images/botanical_sunflower_1787378440269.png';

export const FLOWERS: Flower[] = [
  {
    id: 'rose-red',
    name: 'Garden Rose',
    botanicalName: 'Rosa "Garden Charm"',
    category: 'primary',
    color: '#D44D5C',
    svgType: 'rose',
    defaultScale: 1.15,
    description: 'Lush velvet cup-shaped blossoms with layered ruffled petals and timeless aroma.',
    price: 14,
    meaning: ['Love', 'Passion', 'Devotion'],
    birthMonth: 'June',
    symbolism: 'Love & devotion',
    bestFor: ['Romance', 'Anniversary', 'Celebration', 'Valentine'],
    moods: ['love', 'admiration', 'birthday'],
    colors: ['Red', 'Coral', 'Blush Pink', 'Ivory'],
    whyChoose: 'Roses are the timeless emblem of deep affection and heartfelt devotion — a quintessential centerpiece for expressions of profound love and cherished milestones.',
    imageUrl: imgRose,
    colorMeanings: [
      { color: 'Red', meaning: 'Deep romantic passion & enduring devotion' },
      { color: 'Blush Pink', meaning: 'Grace, sweetness & gentle gratitude' },
      { color: 'White', meaning: 'Purity, reverence & sincere new beginnings' },
      { color: 'Coral', meaning: 'Enthusiasm, desire & radiant fascination' }
    ]
  },
  {
    id: 'peony-coral',
    name: 'Coral Charm Peony',
    botanicalName: 'Paeonia lactiflora',
    category: 'primary',
    color: '#FF6F59',
    svgType: 'peony',
    defaultScale: 1.25,
    description: 'Voluminous billowing blooms that gracefully transition from coral to warm peach and cream.',
    price: 16,
    meaning: ['Prosperity', 'Romance', 'Good Fortune'],
    birthMonth: 'May',
    symbolism: 'Prosperity & romantic bliss',
    bestFor: ['Love', 'Celebration', 'Wedding', 'Birthday'],
    moods: ['love', 'birthday', 'admiration', 'happiness'],
    colors: ['Coral', 'Blush', 'Cream White'],
    whyChoose: 'With their lush, billowing petals, peonies symbolize honor, prosperous happiness, and flourishing love, making them a breathtaking addition to celebratory moments.',
    imageUrl: imgPeony,
    colorMeanings: [
      { color: 'Coral', meaning: 'Dynamic transformation & joy' },
      { color: 'Pink', meaning: 'Romantic bliss & prosperous marriage' },
      { color: 'White', meaning: 'Refinement, dignity & quiet grace' }
    ]
  },
  {
    id: 'daisy-chamomile',
    name: 'Meadow Daisy',
    botanicalName: 'Bellis perennis',
    category: 'accent',
    color: '#FFFDF0',
    svgType: 'daisy',
    defaultScale: 0.9,
    description: 'Starry white petals radiating around a warm sunny disc, evoking carefree summer meadows.',
    price: 8,
    meaning: ['Innocence', 'Cheer', 'Simplicity'],
    birthMonth: 'April',
    symbolism: 'Pure joy & sincere cheerfulness',
    bestFor: ['Friendship', 'Thinking of You', 'Get Well', 'Thank You'],
    moods: ['happiness', 'friendship', 'get-well', 'thank-you'],
    colors: ['Crisp White', 'Buttercup Yellow', 'Soft Pink'],
    whyChoose: 'Daisies evoke sun-drenched meadows and carefree days — an uplifting gesture of genuine friendship, optimism, and unpretentious affection.',
    imageUrl: imgDaisy,
    colorMeanings: [
      { color: 'White', meaning: 'Innocence, loyalty & new beginnings' },
      { color: 'Yellow', meaning: 'Unconditional warmth & friendly cheer' }
    ]
  },
  {
    id: 'lily-casablanca',
    name: 'Star Casablanca Lily',
    botanicalName: 'Lilium auratum',
    category: 'primary',
    color: '#FAF9F6',
    svgType: 'lily',
    defaultScale: 1.2,
    description: 'Sculptural star-shaped trumpet petals with delicate golden stamens and majestic fragrance.',
    price: 15,
    meaning: ['Purity', 'Devotion', 'Rebirth'],
    birthMonth: 'May',
    symbolism: 'Purity, devotion & serenity',
    bestFor: ['Sympathy', 'Celebration', 'Peace', 'Thank You', 'Milestones'],
    moods: ['sympathy', 'thank-you', 'get-well', 'admiration'],
    colors: ['Ivory White', 'Stargazer Pink', 'Golden Yellow'],
    whyChoose: 'Lilies convey majestic grace and tranquil presence, bringing a calming spiritual resonance and refined distinction to bouquets honoring deeply meaningful connections.',
    imageUrl: imgLily,
    colorMeanings: [
      { color: 'White', meaning: 'Purity, majesty & peaceful remembrance' },
      { color: 'Pink', meaning: 'Quiet prosperity & gracious elegance' }
    ]
  },
  {
    id: 'ranunculus-burgundy',
    name: 'Persian Ranunculus',
    botanicalName: 'Ranunculus asiaticus',
    category: 'primary',
    color: '#801A36',
    svgType: 'ranunculus',
    defaultScale: 1.05,
    description: 'Intricately spiraled tissue-thin petals layered into tight geometric floral perfection.',
    price: 12,
    meaning: ['Charm', 'Radiance', 'Attraction'],
    birthMonth: 'March',
    symbolism: 'Luminous charm & captivating beauty',
    bestFor: ['Romance', 'Admiration', 'Date Night', 'Creative Spirits'],
    moods: ['love', 'admiration', 'birthday'],
    colors: ['Moody Wine', 'Golden Honey', 'Peach Sorbet'],
    whyChoose: 'Tightly spiraled like delicate origami, ranunculus whispers "you are radiant with charms" — perfect for when you want your gift to feel uniquely bewitching.',
    imageUrl: imgRanunculus,
    colorMeanings: [
      { color: 'Wine Red', meaning: 'Irresistible charm & captivating passion' },
      { color: 'Peach', meaning: 'Gentle warmth & creative enchantment' }
    ]
  },
  {
    id: 'zinnia-blaze',
    name: 'Sunburst Zinnia',
    botanicalName: 'Zinnia elegans',
    category: 'secondary',
    color: '#E85D04',
    svgType: 'zinnia',
    defaultScale: 1.0,
    description: 'Densely layered vibrant ray petals around a gold pollen crown that thrives in full sun.',
    price: 9,
    meaning: ['Lasting Affection', 'Constancy', 'Remembrance'],
    birthMonth: 'July',
    symbolism: 'Enduring bonds & daily gratitude',
    bestFor: ['Friendship', 'Thank You', 'Everyday Joy', 'Reunion'],
    moods: ['friendship', 'happiness', 'thank-you'],
    colors: ['Flame Orange', 'Vibrant Magenta', 'Goldenrod'],
    whyChoose: 'Zinnias celebrate long-lasting camaraderie and fond thoughts of absent friends. Their vibrant, sun-drenched layers bring an infectious burst of playful happiness.',
    imageUrl: imgZinnia,
    colorMeanings: [
      { color: 'Orange', meaning: 'Unending zest & hearty camaraderie' },
      { color: 'Magenta', meaning: 'Daily affection & steadfast loyalty' }
    ]
  },
  {
    id: 'carnation-heirloom',
    name: 'Heirloom Carnation',
    botanicalName: 'Dianthus caryophyllus',
    category: 'secondary',
    color: '#E07A5F',
    svgType: 'carnation',
    defaultScale: 0.95,
    description: 'Ruffled, fringed-edge petals steeped in spicy clove aroma and timeless floral lore.',
    price: 9,
    meaning: ['Love', 'Fascination', 'Gratitude'],
    birthMonth: 'January',
    symbolism: 'Devoted love & deep appreciation',
    bestFor: ['Appreciation', 'Thank You', 'Get Well', 'Motherhood'],
    moods: ['thank-you', 'get-well', 'love', 'sympathy'],
    colors: ['Dusty Terracotta', 'Blush Rose', 'Crimson Red'],
    whyChoose: 'Prized for centuries for their ruffled elegance and sweet clove aroma, carnations are the classic symbol of unconditional care and steadfast admiration.',
    imageUrl: imgCarnation,
    colorMeanings: [
      { color: 'Blush/Peach', meaning: 'Unconditional care & gratitude' },
      { color: 'Crimson', meaning: 'Deep fascination & high respect' },
      { color: 'White', meaning: 'Pure sweet remembrance' }
    ]
  },
  {
    id: 'dahlia-imperial',
    name: 'Imperial Dahlia',
    botanicalName: 'Dahlia pinnata',
    category: 'primary',
    color: '#6B1736',
    svgType: 'dahlia',
    defaultScale: 1.15,
    description: 'Intricate architectural mandala of sculpted florets radiating from a velvety center.',
    price: 14,
    meaning: ['Inner Strength', 'Dignity', 'Grace'],
    birthMonth: 'August',
    symbolism: 'Elegance, resilience & creativity',
    bestFor: ['Encouragement', 'Milestones', 'Admiration', 'Birthday'],
    moods: ['admiration', 'birthday', 'get-well'],
    colors: ['Plum Wine', 'Café au Lait', 'Apricot Sunset'],
    whyChoose: 'With their mesmerizing geometric symmetry, dahlias represent inner strength, standing steadfast in one\'s values, and celebrating bold personal growth.',
    imageUrl: imgDahlia,
    colorMeanings: [
      { color: 'Plum Wine', meaning: 'Royal dignity & steadfast inner strength' },
      { color: 'Café / Cream', meaning: 'Subtle elegance & generous spirit' }
    ]
  },
  {
    id: 'anemone-windflower',
    name: 'Windflower Anemone',
    botanicalName: 'Anemone coronaria',
    category: 'secondary',
    color: '#2B2D42',
    svgType: 'anemone',
    defaultScale: 0.95,
    description: 'Silken petals surrounding a velvety midnight center that dances gracefully with the wind.',
    price: 11,
    meaning: ['Anticipation', 'Protection', 'New Beginnings'],
    birthMonth: 'September',
    symbolism: 'Exciting anticipation & fresh chapters',
    bestFor: ['New Beginnings', 'Congratulations', 'Artistic Souls', 'Milestones'],
    moods: ['love', 'happiness', 'admiration'],
    colors: ['Midnight Center White', 'Deep Velvet Blue', 'Scarlet'],
    whyChoose: 'Known as windflowers, anemones bring high dramatic contrast with their midnight centers, symbolizing positive excitement for beautiful things yet to unfold.',
    imageUrl: imgAnemone,
    colorMeanings: [
      { color: 'White/Dark Center', meaning: 'Honest hope & lucidity' },
      { color: 'Velvet Violet', meaning: 'Mysterious protection & anticipation' }
    ]
  },
  {
    id: 'tulip-parisian',
    name: 'French Tulip',
    botanicalName: 'Tulipa gesneriana',
    category: 'secondary',
    color: '#C77DFF',
    svgType: 'tulip',
    defaultScale: 1.05,
    description: 'Slender architectural stems crowned with smooth satin cupped petals that bend toward light.',
    price: 10,
    meaning: ['Perfect Love', 'Grace', 'Renewal'],
    birthMonth: 'April',
    symbolism: 'Unconditional love & graceful rebirth',
    bestFor: ['Romance', 'Springtime', 'Friendship', 'Anniversary'],
    moods: ['love', 'friendship', 'happiness'],
    colors: ['Pastel Lilac', 'Ruby Red', 'Sunny Amber'],
    whyChoose: 'With clean, sculptural stems and cupped silk petals, tulips express pure, uncomplicated love and the joyful promise of new seasons together.',
    imageUrl: imgTulip,
    colorMeanings: [
      { color: 'Lilac', meaning: 'Royalty, refinement & spring awakening' },
      { color: 'Red', meaning: 'Direct declaration of sincere love' },
      { color: 'Yellow', meaning: 'Bright sunshine in your smile' }
    ]
  },
  {
    id: 'orchid-cascade',
    name: 'Cascade Orchid',
    botanicalName: 'Phalaenopsis amabilis',
    category: 'primary',
    color: '#B5838D',
    svgType: 'orchid',
    defaultScale: 1.25,
    description: 'Exotic moth-like petals floating upon arching stems, radiating unmatched refinement.',
    price: 18,
    meaning: ['Beauty', 'Love', 'Elegance', 'Refinement'],
    birthMonth: 'October',
    symbolism: 'Exotic beauty, love & refinement',
    bestFor: ['Romance', 'Birthday', 'Appreciation', 'Admiration'],
    moods: ['admiration', 'love', 'birthday', 'thank-you'],
    colors: ['Mauve Pink', 'Orchid Purple', 'Alabaster White'],
    whyChoose: 'Orchids are associated with beauty, refinement and admiration — a thoughtful choice when you want your bouquet to feel elegant and personal.',
    imageUrl: imgOrchid,
    colorMeanings: [
      { color: 'Pink', meaning: 'Admiration, gentle affection & femininity' },
      { color: 'Purple', meaning: 'Royalty, luxury & supreme respect' },
      { color: 'White', meaning: 'Innocence, reverence & pure elegance' }
    ]
  },
  {
    id: 'sunflower-solstice',
    name: 'Solstice Sunflower',
    botanicalName: 'Helianthus annuus',
    category: 'primary',
    color: '#F4A261',
    svgType: 'sunflower',
    defaultScale: 1.25,
    description: 'Broad golden ray petals framing a rich dark seed core that follows the path of the sun.',
    price: 13,
    meaning: ['Happiness', 'Loyalty', 'Warmth', 'Adoration'],
    birthMonth: 'August',
    symbolism: 'Joy, loyalty & radiant optimism',
    bestFor: ['Birthdays', 'Friendship', 'Get Well', 'Celebration'],
    moods: ['happiness', 'friendship', 'get-well', 'birthday'],
    colors: ['Golden Amber', 'Warm Ochre', 'Tuscan Yellow'],
    whyChoose: 'Sunflowers follow the sun with unwavering loyalty, infusing any bouquet with pure warmth, beaming positivity, and steadfast companionship.',
    imageUrl: imgSunflower,
    colorMeanings: [
      { color: 'Golden Yellow', meaning: 'Vitality, sunshine & lasting friendship' },
      { color: 'Amber Ochre', meaning: 'Deep loyalty & harvest gratitude' }
    ]
  },
  // Botanical Foliage & Accents
  {
    id: 'eucalyptus-silver',
    name: 'Silver Dollar Eucalyptus',
    botanicalName: 'Eucalyptus cinerea',
    category: 'foliage',
    color: '#708238',
    svgType: 'eucalyptus',
    defaultScale: 1.2,
    description: 'Aromatic trailing silver-green foliage providing height, structure, and earthy aroma.',
    price: 8,
    meaning: ['Protection', 'Healing', 'Abundance'],
    symbolism: 'Soothing balance & restoration',
    bestFor: ['Foliage Support', 'Get Well', 'Serenity'],
    moods: ['get-well', 'sympathy'],
    colors: ['Silver Sage'],
    whyChoose: 'Silver dollar eucalyptus introduces tranquil aromatic architecture and natural garden airiness into any arrangement.'
  },
  {
    id: 'lavender-french',
    name: 'English Lavender',
    botanicalName: 'Lavandula angustifolia',
    category: 'accent',
    color: '#967BB6',
    svgType: 'lavender',
    defaultScale: 0.9,
    description: 'Slender aromatic purple spikes that lend a whisper of wild countryside charm.',
    price: 7,
    meaning: ['Serenity', 'Grace', 'Devotion'],
    symbolism: 'Calm serenity & quiet devotion',
    bestFor: ['Peace', 'Relaxation', 'Friendship'],
    moods: ['sympathy', 'get-well', 'friendship'],
    colors: ['Wild Lavender'],
    whyChoose: 'Lavender adds delicate rustic texture, sweet floral whispers, and soothing stillness to botanical compositions.'
  }
];

export interface MoodFilter {
  id: string;
  label: string;
  emoji: string;
  description: string;
}

export const MOOD_FILTERS: MoodFilter[] = [
  { id: 'all', label: 'All 12 Flowers', emoji: '🌸', description: 'Complete botanical collection' },
  { id: 'love', label: 'Love', emoji: '❤️', description: 'Passion, romance & devotion' },
  { id: 'happiness', label: 'Happiness', emoji: '☀️', description: 'Joy, cheer & optimism' },
  { id: 'friendship', label: 'Friendship', emoji: '🌷', description: 'Loyalty, lasting affection & camaraderie' },
  { id: 'birthday', label: 'Birthday', emoji: '🎂', description: 'Celebration, growth & prosperity' },
  { id: 'thank-you', label: 'Thank You', emoji: '🤍', description: 'Gratitude, appreciation & sincere thanks' },
  { id: 'get-well', label: 'Get Well', emoji: '🌱', description: 'Restoration, vitality & encouragement' },
  { id: 'admiration', label: 'Admiration', emoji: '✨', description: 'Elegance, charm & high esteem' },
  { id: 'sympathy', label: 'Sympathy', emoji: '🕊️', description: 'Peace, remembrance & quiet comfort' },
];

export function getFlowerOfTheDay(): Flower {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  const core12 = FLOWERS.slice(0, 12);
  return core12[dayOfYear % core12.length];
}

export interface HomeSpotlightFlower {
  flower: Flower;
  type: 'day' | 'month' | 'seasonal' | 'standard';
  badgeLabel?: string;
  sublabel?: string;
}

export function getHomeFeaturedFlower(): HomeSpotlightFlower {
  const now = new Date();
  const dayOfMonth = now.getDate();
  const dayOfWeek = now.getDay(); // 0 = Sun, 6 = Sat
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const currentMonthName = monthNames[now.getMonth()];
  const redRose = FLOWERS.find(f => f.id === 'rose-classic') || FLOWERS[0];
  const core12 = FLOWERS.slice(0, 12);

  // 1. Days 1–5 of each month: Feature "Flower of the Month" (matching the birth month flower or month rotation)
  if (dayOfMonth >= 1 && dayOfMonth <= 5) {
    const monthFlower = core12.find(f => f.birthMonth?.toLowerCase().includes(currentMonthName.toLowerCase())) || core12[now.getMonth() % core12.length];
    return {
      flower: monthFlower,
      type: 'month',
      badgeLabel: 'Flower of the Month',
      sublabel: `${currentMonthName} Spotlight`
    };
  }

  // 2. Weekends (Friday, Saturday, Sunday): "Flower of the Day"
  if (dayOfWeek === 0 || dayOfWeek === 6 || dayOfWeek === 5) {
    const startOfYear = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - startOfYear.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    const dayFlower = core12[dayOfYear % core12.length];
    return {
      flower: dayFlower,
      type: 'day',
      badgeLabel: 'Flower of the Day',
      sublabel: 'Daily Botanical Spotlight'
    };
  }

  // 3. Wednesdays: "Seasonal Spotlight"
  if (dayOfWeek === 3) {
    const spotlightIndex = (now.getMonth() + 4) % core12.length;
    const seasonFlower = core12[spotlightIndex];
    return {
      flower: seasonFlower,
      type: 'seasonal',
      badgeLabel: 'Seasonal Spotlight',
      sublabel: 'Curated Botanical Feature'
    };
  }

  // 4. Other days / Default: classic placeholder Red Rose
  return {
    flower: redRose,
    type: 'standard'
  };
}

export function organizeBouquetStems(flowers: { instanceId: string; flowerId: string; x: number; y: number; rotation: number; scale: number; zIndex: number }[]): { instanceId: string; flowerId: string; x: number; y: number; rotation: number; scale: number; zIndex: number }[] {
  if (flowers.length === 0) return [];

  const foliageIds = ['eucalyptus-silver', 'lavender-french'];
  const foliageStems: typeof flowers = [];
  const bloomStems: typeof flowers = [];

  flowers.forEach(f => {
    if (foliageIds.includes(f.flowerId)) {
      foliageStems.push(f);
    } else {
      bloomStems.push(f);
    }
  });

  const organized: typeof flowers = [];

  // Arrange foliage in the background / flanking wing positions
  foliageStems.forEach((f, idx) => {
    const isLeft = idx % 2 === 0;
    const offset = Math.floor(idx / 2);
    const x = isLeft ? Math.max(26, 32 - offset * 5) : Math.min(74, 68 + offset * 5);
    const y = 41 + offset * 3;
    const rotation = isLeft ? -(22 + offset * 6) : (22 + offset * 6);
    organized.push({
      ...f,
      x,
      y,
      rotation,
      scale: f.scale || 1.0,
      zIndex: 5 + idx
    });
  });

  // Balanced radial bouquet slots
  const bloomSlots = [
    { x: 50, y: 36, rot: 0, z: 22, scale: 1.15 },    // 1: Center Crown
    { x: 40, y: 42, rot: -10, z: 18, scale: 1.08 },  // 2: Left Mid
    { x: 60, y: 42, rot: 10, z: 18, scale: 1.08 },   // 3: Right Mid
    { x: 50, y: 47, rot: 2, z: 24, scale: 1.1 },     // 4: Center Front
    { x: 32, y: 45, rot: -20, z: 14, scale: 1.0 },   // 5: Left Low Fan
    { x: 68, y: 45, rot: 20, z: 14, scale: 1.0 },    // 6: Right Low Fan
    { x: 44, y: 34, rot: -6, z: 12, scale: 1.0 },    // 7: Back Left High
    { x: 56, y: 34, rot: 6, z: 12, scale: 1.0 },     // 8: Back Right High
    { x: 28, y: 47, rot: -26, z: 10, scale: 0.95 },  // 9: Outer Left
    { x: 72, y: 47, rot: 26, z: 10, scale: 0.95 },   // 10: Outer Right
    { x: 50, y: 40, rot: -4, z: 20, scale: 1.05 },   // 11: Mid Center
    { x: 38, y: 48, rot: -12, z: 16, scale: 1.0 },   // 12: Low Left
  ];

  bloomStems.forEach((f, idx) => {
    const slot = bloomSlots[idx % bloomSlots.length];
    const layerOffset = Math.floor(idx / bloomSlots.length) * 2;
    organized.push({
      ...f,
      x: slot.x + (layerOffset ? (idx % 2 === 0 ? -3 : 3) : 0),
      y: slot.y + layerOffset * 2,
      rotation: slot.rot,
      scale: f.scale || slot.scale,
      zIndex: slot.z + layerOffset
    });
  });

  return organized;
}

export const WRAPPING_OPTIONS = [
  { id: 'kraft', name: 'Natural Kraft', bg: 'bg-[#C8A278]', border: '#A67C52', desc: 'Organic unbleached paper' },
  { id: 'silk-white', name: 'Ivory Silk', bg: 'bg-[#FDFBF7]', border: '#E2DBD0', desc: 'Crisp matte art paper' },
  { id: 'sage-linen', name: 'Sage Linen', bg: 'bg-[#D2D7CD]', border: '#B8C0B2', desc: 'Washed botanical linen' },
  { id: 'noir-velvet', name: 'Noir Matte', bg: 'bg-[#1C1C1C]', border: '#333333', desc: 'Midnight charcoal parchment' },
  { id: 'newspaper', name: 'Vintage Gazette', bg: 'bg-[#F2ECE1]', border: '#D9CDBF', desc: 'Classic typographic press' },
  { id: 'none', name: 'Bare Stems (No Wrap)', bg: 'bg-transparent', border: '#D9D9CE', desc: 'Minimalist hand-tied stem bouquet without paper sleeve' }
];

export const RIBBON_OPTIONS = [
  { id: 'raw-silk', name: 'Raw Silk Drape', material: 'Raw Silk', color: '#F7F4EF', border: '#E0D8CC', desc: 'Soft luminous ivory silk with organic flowing tails' },
  { id: 'jute-twine', name: 'Rustic Jute Twine', material: 'Jute', color: '#BFAF95', border: '#8E7E65', desc: 'Earthy hand-knotted natural fiber twine with frayed ends' },
  { id: 'burgundy-velvet', name: 'Burgundy Velvet', material: 'Velvet', color: '#4E1222', border: '#320A14', desc: 'Opulent deep crimson plush velvet bow' },
  { id: 'blush-velvet', name: 'Blush Rose Velvet', material: 'Velvet', color: '#B76E79', border: '#8C4B54', desc: 'Plush dusty rose velvet with gentle drape' },
  { id: 'sage-chiffon', name: 'Botanical Sage Chiffon', material: 'Chiffon', color: '#9CAF88', border: '#7A9164', desc: 'Sheer airy botanical green ribbon with fluttering drape' },
  { id: 'black-satin', name: 'Noir Satin', material: 'Satin', color: '#1A1A1A', border: '#000000', desc: 'Tailored lustrous black satin with crisp cut tails' }
];

export const RIBBON_TEXTURES = [
  { id: 'silk', name: 'Raw Silk', desc: 'Luminous organic drape with soft folds', badge: 'Fluid' },
  { id: 'velvet', name: 'Plush Velvet', desc: 'Opulent deep pile with rich tactile shadows', badge: 'Rich' },
  { id: 'chiffon', name: 'Airy Chiffon', desc: 'Translucent sheer weave with fluttering tails', badge: 'Sheer' },
  { id: 'satin', name: 'Gloss Satin', desc: 'Tailored luster with sharp pressed edges', badge: 'Lustrous' },
  { id: 'jute', name: 'Rustic Jute', desc: 'Earthy natural fiber twine with artisanal texture', badge: 'Raw' },
  { id: 'grosgrain', name: 'Ribbed Grosgrain', desc: 'Structured matte cross-grain weave', badge: 'Textured' },
  { id: 'metallic', name: 'Gold Lurex', desc: 'Shimmering fine metallic thread accents', badge: 'Gilded' },
] as const;

export const RIBBON_COLORS = [
  { id: 'ivory', name: 'Ivory Cream', hex: '#F7F4EF', borderHex: '#DCD5C6', defaultTextColor: '#3D352E' },
  { id: 'champagne', name: 'Champagne Sand', hex: '#E8DDCB', borderHex: '#C2B59F', defaultTextColor: '#42382D' },
  { id: 'blush', name: 'Blush Mist', hex: '#F5D6D6', borderHex: '#D9A7A7', defaultTextColor: '#612933' },
  { id: 'rose', name: 'Dusty Rose', hex: '#B76E79', borderHex: '#8C4B54', defaultTextColor: '#FFFDF7' },
  { id: 'burgundy', name: 'Burgundy Merlot', hex: '#4E1222', borderHex: '#2E0A14', defaultTextColor: '#D4AF37' },
  { id: 'terracotta', name: 'Terracotta Rust', hex: '#C36A4D', borderHex: '#994B32', defaultTextColor: '#FFFDF7' },
  { id: 'sage', name: 'Botanical Sage', hex: '#9CAF88', borderHex: '#738760', defaultTextColor: '#26361C' },
  { id: 'forest', name: 'Forest Evergreen', hex: '#2D4233', borderHex: '#1B2C20', defaultTextColor: '#D4AF37' },
  { id: 'azure', name: 'French Blue', hex: '#8DA4C4', borderHex: '#6880A3', defaultTextColor: '#172A45' },
  { id: 'navy', name: 'Midnight Navy', hex: '#1E2C3D', borderHex: '#0F1722', defaultTextColor: '#D4AF37' },
  { id: 'lavender', name: 'Lavender Mist', hex: '#B5A3C8', borderHex: '#8C77A1', defaultTextColor: '#2E1E3D' },
  { id: 'gold', name: 'Antique Gold', hex: '#D4AF37', borderHex: '#A38321', defaultTextColor: '#2E2204' },
  { id: 'espresso', name: 'Espresso Walnut', hex: '#4A3728', borderHex: '#2D2015', defaultTextColor: '#D4AF37' },
  { id: 'noir', name: 'Noir Obsidian', hex: '#1C1C1C', borderHex: '#050505', defaultTextColor: '#D4AF37' }
];

export const RIBBON_TEXT_COLORS = [
  { id: 'gold-foil', name: 'Gold Foil', hex: '#D4AF37', bg: 'bg-[#D4AF37]', border: '#A38321' },
  { id: 'midnight-ink', name: 'Midnight Ink', hex: '#1A1A1A', bg: 'bg-[#1A1A1A]', border: '#000000' },
  { id: 'ivory-stitch', name: 'Ivory Thread', hex: '#FFFDF7', bg: 'bg-[#FFFDF7]', border: '#DCD5C6' },
  { id: 'rose-gold', name: 'Rose Gold', hex: '#C88A8A', bg: 'bg-[#C88A8A]', border: '#A06666' },
  { id: 'silver-foil', name: 'Silver Foil', hex: '#D6D8DB', bg: 'bg-[#D6D8DB]', border: '#A4A8AD' },
];

export const RIBBON_TEXT_PRESETS = [
  'With All My Love',
  'Forever & Always',
  'Happy Birthday',
  'Thinking of You',
  'In Full Bloom',
  'With Gratitude',
  'To Someone Special',
  'A Moment of Serenity'
];
