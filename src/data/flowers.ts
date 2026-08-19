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
  { id: 'ivory-silk', name: 'Ivory Silk Ribbon', color: '#F7F4EF', border: '#E0D8CC' },
  { id: 'burgundy-velvet', name: 'Burgundy Velvet', color: '#4A1525', border: '#300D18' },
  { id: 'sage-chiffon', name: 'Sage Chiffon', color: '#9CAF88', border: '#7A9164' },
  { id: 'black-satin', name: 'Black Satin', color: '#1A1A1A', border: '#000000' },
  { id: 'raw-linen', name: 'Raw Hemp Twine', color: '#C2B295', border: '#A39274' }
];
