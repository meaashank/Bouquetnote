export type FlowerCategory = 'primary' | 'secondary' | 'accent' | 'filler' | 'foliage';

export interface Flower {
  id: string;
  name: string;
  botanicalName: string;
  category: FlowerCategory;
  color: string;
  svgType: 'rose' | 'peony' | 'ranunculus' | 'tulip' | 'eucalyptus' | 'lavender' | 'hydrangea' | 'daisy' | 'mimosa' | 'anemone' | 'babysbreath' | 'orchid';
  defaultScale: number;
  description: string;
  price: number;
}

export interface PlacedFlower {
  instanceId: string;
  flowerId: string;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  zIndex: number;
  flipX?: boolean;
}

export type StickerId = 'butterfly-gold' | 'butterfly-azure' | 'honey-bee' | 'ladybug' | 'dragonfly' | 'pollen-sparkle';

export interface BotanicalSticker {
  id: StickerId;
  name: string;
  category: 'fauna' | 'accent';
  desc: string;
}

export interface PlacedSticker {
  instanceId: string;
  stickerId: StickerId;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  zIndex: number;
}

export type WrappingStyle = 'kraft' | 'silk-white' | 'sage-linen' | 'noir-velvet' | 'newspaper';
export type RibbonStyle = 'ivory-silk' | 'raw-silk' | 'burgundy-velvet' | 'blush-velvet' | 'sage-chiffon' | 'black-satin' | 'raw-linen' | 'jute-twine';
export type RibbonTexture = 'silk' | 'velvet' | 'chiffon' | 'satin' | 'jute' | 'grosgrain' | 'metallic';

export interface RibbonColorOption {
  id: string;
  name: string;
  hex: string;
  borderHex: string;
  defaultTextColor: string;
}

export interface RibbonTextureOption {
  id: RibbonTexture;
  name: string;
  desc: string;
  badge: string;
}

export interface Bouquet {
  id: string;
  title: string;
  flowers: PlacedFlower[];
  stickers?: PlacedSticker[];
  wrapping: WrappingStyle;
  ribbon: RibbonStyle;
  ribbonColor?: string;
  ribbonTexture?: RibbonTexture;
  ribbonText?: string;
  ribbonTextColor?: string;
  recipientName: string;
  senderName: string;
  note: string;
  createdAt: number;
  themeColor?: string;
}

export type AppView = 'home' | 'builder' | 'garden' | 'view-bouquet';
