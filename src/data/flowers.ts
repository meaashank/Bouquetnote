import { Flower } from '../types';

export const FLOWERS: Flower[] = [
  {
    id: 'rose-blush',
    name: 'Blush Juliet Rose',
    botanicalName: 'Rosa "Juliet"',
    category: 'primary',
    color: '#F4C2C2',
    svgType: 'rose',
    defaultScale: 1.1,
    description: 'Lush cup-shaped garden rose with soft peach-pink undertones and delicate fragrance.',
    price: 12
  },
  {
    id: 'peony-coral',
    name: 'Coral Charm Peony',
    botanicalName: 'Paeonia lactiflora',
    category: 'primary',
    color: '#FF7F50',
    svgType: 'peony',
    defaultScale: 1.3,
    description: 'Breathtaking large blooms that gracefully transition from coral to warm peach and ivory.',
    price: 16
  },
  {
    id: 'ranunculus-burgundy',
    name: 'Persian Ranunculus',
    botanicalName: 'Ranunculus asiaticus',
    category: 'primary',
    color: '#581845',
    svgType: 'ranunculus',
    defaultScale: 1.0,
    description: 'Intricately layered tissue-thin petals in deep, moody wine and claret tones.',
    price: 10
  },
  {
    id: 'tulip-french',
    name: 'French Parrot Tulip',
    botanicalName: 'Tulipa gesneriana',
    category: 'secondary',
    color: '#DDA0DD',
    svgType: 'tulip',
    defaultScale: 1.05,
    description: 'Graceful undulating stems with feather-edged pastel petals and wild elegance.',
    price: 9
  },
  {
    id: 'hydrangea-white',
    name: 'Snow White Hydrangea',
    botanicalName: 'Hydrangea macrophylla',
    category: 'primary',
    color: '#F9F6EE',
    svgType: 'hydrangea',
    defaultScale: 1.4,
    description: 'Voluminous cloud-like clusters adding texture, fullness, and quiet serenity.',
    price: 15
  },
  {
    id: 'anemone-black',
    name: 'Pandora Black Anemone',
    botanicalName: 'Anemone coronaria',
    category: 'secondary',
    color: '#1A1A1A',
    svgType: 'anemone',
    defaultScale: 0.95,
    description: 'Stark white or deep petals anchored by a striking midnight-black central button.',
    price: 11
  },
  {
    id: 'eucalyptus-silver',
    name: 'Silver Dollar Eucalyptus',
    botanicalName: 'Eucalyptus cinerea',
    category: 'foliage',
    color: '#708238',
    svgType: 'eucalyptus',
    defaultScale: 1.2,
    description: 'Aromatic trailing silver-green foliage providing height, structure, and earthy aroma.',
    price: 8
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
    price: 7
  },
  {
    id: 'mimosa-yellow',
    name: 'Golden Wattle Mimosa',
    botanicalName: 'Acacia dealbata',
    category: 'accent',
    color: '#FFD700',
    svgType: 'mimosa',
    defaultScale: 1.0,
    description: 'Fluffy golden yellow pom-poms bursting with sunshine and cheerful warmth.',
    price: 10
  },
  {
    id: 'daisy-chamomile',
    name: 'Wild Chamomile Daisy',
    botanicalName: 'Matricaria chamomilla',
    category: 'accent',
    color: '#FFF8DC',
    svgType: 'daisy',
    defaultScale: 0.85,
    description: 'Delicate starry white blossoms with sunny yellow centers for an effortless meadow feel.',
    price: 6
  },
  {
    id: 'babys-breath',
    name: 'Celestial Gypsophila',
    botanicalName: 'Gypsophila paniculata',
    category: 'filler',
    color: '#FFFFFF',
    svgType: 'babysbreath',
    defaultScale: 1.1,
    description: 'Ethereal clouds of tiny white florets creating a dreamy celestial haze.',
    price: 7
  },
  {
    id: 'orchid-phalaenopsis',
    name: 'Cascade Phalaenopsis Orchid',
    botanicalName: 'Phalaenopsis amabilis',
    category: 'primary',
    color: '#E6E6FA',
    svgType: 'orchid',
    defaultScale: 1.25,
    description: 'Exquisite cascading sculptural blooms embodying exotic grace and timeless luxury.',
    price: 20
  }
];

export const WRAPPING_OPTIONS = [
  { id: 'kraft', name: 'Natural Kraft', bg: 'bg-[#C8A278]', border: '#A67C52', desc: 'Organic unbleached paper' },
  { id: 'silk-white', name: 'Ivory Silk', bg: 'bg-[#FDFBF7]', border: '#E2DBD0', desc: 'Crisp matte art paper' },
  { id: 'sage-linen', name: 'Sage Linen', bg: 'bg-[#D2D7CD]', border: '#B8C0B2', desc: 'Washed botanical linen' },
  { id: 'noir-velvet', name: 'Noir Matte', bg: 'bg-[#1C1C1C]', border: '#333333', desc: 'Midnight charcoal parchment' },
  { id: 'newspaper', name: 'Vintage Gazette', bg: 'bg-[#F2ECE1]', border: '#D9CDBF', desc: 'Classic typographic press' }
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

