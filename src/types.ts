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

export type WrappingStyle = 'kraft' | 'silk-white' | 'sage-linen' | 'noir-velvet' | 'newspaper';
export type RibbonStyle = 'ivory-silk' | 'burgundy-velvet' | 'sage-chiffon' | 'black-satin' | 'raw-linen';

export interface Bouquet {
  id: string;
  title: string;
  flowers: PlacedFlower[];
  wrapping: WrappingStyle;
  ribbon: RibbonStyle;
  recipientName: string;
  senderName: string;
  note: string;
  createdAt: number;
  themeColor?: string;
}

export type AppView = 'home' | 'builder' | 'garden' | 'view-bouquet';
