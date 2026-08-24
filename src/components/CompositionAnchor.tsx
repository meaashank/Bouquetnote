import React from 'react';
import { AnchorType, WrappingStyle, RibbonStyle, RibbonTexture } from '../types';
import { WrappingPaperSVG } from './WrappingPaperSVG';
import { RibbonSVG } from './RibbonSVG';

interface CompositionAnchorProps {
  anchorType: AnchorType;
  wrappingStyle?: WrappingStyle;
  ribbonStyle?: RibbonStyle;
  ribbonColor?: string;
  ribbonTexture?: RibbonTexture;
  ribbonText?: string;
  ribbonTextColor?: string;
  className?: string;
  layer?: 'back' | 'front';
}

export const ANCHOR_OPTIONS: {
  id: AnchorType;
  name: string;
  subtitle: string;
  desc: string;
  icon: string;
}[] = [
  {
    id: 'soft-wrap',
    name: 'Soft Paper Wrap',
    subtitle: 'Classic Origami Sleeve',
    desc: 'Tapered layered paper sleeve that gently cradles blooms with draped collar and ribbon tie.',
    icon: 'Package'
  },
  {
    id: 'vase-silhouette',
    name: 'Ceramic Vase',
    subtitle: 'Fluted Vessel Silhouette',
    desc: 'Minimalist fluted ceramic vase silhouette grounding the base of the botanical arrangement.',
    icon: 'Wine'
  },
  {
    id: 'ribbon-tie',
    name: 'Ribbon Collar',
    subtitle: 'Hand-Tied Silk Bow',
    desc: 'Minimalist hand-tied silk ribbon draping softly beneath the flower heads.',
    icon: 'Sparkle'
  },
  {
    id: 'folded-paper',
    name: 'Folded Studio Wrap',
    subtitle: 'Geometric Craft Paper',
    desc: 'Crisp angled origami parchment folded diagonally around the floral base.',
    icon: 'Layers'
  },
  {
    id: 'oval-shadow',
    name: 'Artistic Shadow',
    subtitle: 'Floating Floral Sculpture',
    desc: 'Subtle soft ambient grounding shadow allowing blooms to float like fine botanical art.',
    icon: 'Circle'
  },
  {
    id: 'none',
    name: 'Bare Arrangement',
    subtitle: 'Pure Floral Art',
    desc: 'Clean stemless floral artwork without base wrapping or vessel.',
    icon: 'Feather'
  }
];

export const CompositionAnchor: React.FC<CompositionAnchorProps> = ({
  anchorType = 'soft-wrap',
  wrappingStyle = 'kraft',
  ribbonStyle = 'raw-silk',
  ribbonColor = '#F7F4EF',
  ribbonTexture = 'silk',
  ribbonText,
  ribbonTextColor = '#D4AF37',
  layer = 'front'
}) => {
  if (anchorType === 'none') {
    return null;
  }

  // 1. SOFT WRAP (Uses Origami Wrapping Paper SVG + Ribbon)
  if (anchorType === 'soft-wrap') {
    if (layer === 'back') {
      return (
        <div className="absolute bottom-[6%] left-1/2 -translate-x-1/2 w-[76%] h-[62%] pointer-events-none z-0 opacity-95">
          <WrappingPaperSVG styleId={wrappingStyle} layer="back" className="w-full h-full" />
        </div>
      );
    }
    return (
      <div className="absolute bottom-[6%] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none w-[60%] h-[48%]">
        <div className="w-full h-full relative">
          <WrappingPaperSVG styleId={wrappingStyle} layer="front" className="w-full h-full" />
        </div>

        {/* Ribbon attached directly to collar */}
        <div className="absolute top-[25%] left-1/2 -translate-x-1/2 w-[54%] h-[34%] pointer-events-auto z-32 filter drop-shadow-xs">
          <RibbonSVG
            styleId={ribbonStyle}
            color={ribbonColor}
            texture={ribbonTexture}
            customText={ribbonText}
            textColor={ribbonTextColor}
            className="w-full h-full"
          />
        </div>
      </div>
    );
  }

  // 2. VASE SILHOUETTE
  if (anchorType === 'vase-silhouette') {
    if (layer === 'back') {
      return (
        <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-[50%] h-[44%] pointer-events-none z-0 opacity-40">
          <svg viewBox="0 0 100 120" className="w-full h-full">
            <ellipse cx="50" cy="20" rx="32" ry="8" fill="#DCD8C8" />
          </svg>
        </div>
      );
    }
    return (
      <div className="absolute bottom-[6%] left-1/2 -translate-x-1/2 z-30 w-[48%] h-[46%] pointer-events-none flex flex-col items-center">
        <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-md">
          <defs>
            <linearGradient id="vaseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EAE5D8" />
              <stop offset="25%" stopColor="#FAF7F0" />
              <stop offset="70%" stopColor="#EDE8DD" />
              <stop offset="100%" stopColor="#D9D2C2" />
            </linearGradient>
          </defs>
          {/* Vase Body */}
          <path
            d="M24 20 C24 35 34 50 32 75 C30 95 34 110 50 110 C66 110 70 95 68 75 C66 50 76 35 76 20 Z"
            fill="url(#vaseGrad)"
            stroke="#C4BCAC"
            strokeWidth="1.2"
          />
          {/* Rim Fluting */}
          <ellipse cx="50" cy="20" rx="26" ry="6" fill="#F4EFE6" stroke="#C4BCAC" strokeWidth="1.2" />
          <ellipse cx="50" cy="20" rx="22" ry="4" fill="#3D352E" opacity="0.1" />
          {/* Subtle ribbing lines */}
          <path d="M50 26 L50 108" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
          <path d="M42 25 C43 50 40 75 42 106" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.4" />
          <path d="M58 25 C57 50 60 75 58 106" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.4" />
        </svg>

        {/* Small Ribbon Accent on Vase Neck */}
        <div className="absolute top-[16%] left-1/2 -translate-x-1/2 w-[42%] h-[24%] pointer-events-auto z-32 filter drop-shadow-xs">
          <RibbonSVG
            styleId={ribbonStyle}
            color={ribbonColor}
            texture={ribbonTexture}
            customText={ribbonText}
            textColor={ribbonTextColor}
            className="w-full h-full"
          />
        </div>
      </div>
    );
  }

  // 3. RIBBON TIE ONLY
  if (anchorType === 'ribbon-tie') {
    if (layer === 'back') return null;
    return (
      <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 z-30 w-[40%] h-[24%] pointer-events-auto filter drop-shadow-md">
        <RibbonSVG
          styleId={ribbonStyle}
          color={ribbonColor}
          texture={ribbonTexture}
          customText={ribbonText}
          textColor={ribbonTextColor}
          className="w-full h-full"
        />
      </div>
    );
  }

  // 4. FOLDED PAPER (Crisp Angular Studio Wrap)
  if (anchorType === 'folded-paper') {
    if (layer === 'back') {
      return (
        <div className="absolute bottom-[7%] left-1/2 -translate-x-1/2 w-[72%] h-[58%] pointer-events-none z-0 opacity-90">
          <svg viewBox="0 0 100 120" className="w-full h-full">
            <path d="M10 20 L50 115 L90 20 L75 10 L25 10 Z" fill="#D5CBBF" />
            <path d="M15 25 L50 110 L85 25 Z" fill="#E6DFD5" />
          </svg>
        </div>
      );
    }
    return (
      <div className="absolute bottom-[6%] left-1/2 -translate-x-1/2 z-30 w-[58%] h-[48%] pointer-events-none flex flex-col items-center">
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
          {/* Folded Front Triangles */}
          <path d="M10 10 L50 95 L65 30 Z" fill="#EFE8DE" stroke="#C8BFB2" strokeWidth="1" />
          <path d="M90 15 L50 95 L35 30 Z" fill="#E3DACF" stroke="#C8BFB2" strokeWidth="1" />
          <path d="M35 30 L50 95 L65 30 Z" fill="#FAF6EE" stroke="#D5CCC0" strokeWidth="0.8" />
        </svg>

        <div className="absolute top-[28%] left-1/2 -translate-x-1/2 w-[52%] h-[32%] pointer-events-auto z-32 filter drop-shadow-xs">
          <RibbonSVG
            styleId={ribbonStyle}
            color={ribbonColor}
            texture={ribbonTexture}
            customText={ribbonText}
            textColor={ribbonTextColor}
            className="w-full h-full"
          />
        </div>
      </div>
    );
  }

  // 5. OVAL SHADOW (Floating Modern Floral Sculpture)
  if (anchorType === 'oval-shadow') {
    if (layer === 'back') {
      return (
        <div className="absolute bottom-[6%] left-1/2 -translate-x-1/2 w-[64%] h-[12%] pointer-events-none z-0">
          <div className="w-full h-full bg-[#111111]/[0.07] rounded-full blur-[14px]" />
          <div className="w-3/4 h-2/3 mx-auto bg-[#111111]/[0.10] rounded-full blur-[6px]" />
        </div>
      );
    }
    return null;
  }

  return null;
};
