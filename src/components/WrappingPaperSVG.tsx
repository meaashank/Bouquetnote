import React from 'react';
import { WrappingStyle } from '../types';

interface WrappingPaperSVGProps {
  styleId: WrappingStyle;
  className?: string;
  layer?: 'back' | 'front';
}

export const WrappingPaperSVG: React.FC<WrappingPaperSVGProps> = ({ 
  styleId, 
  className = "w-full h-full", 
  layer = 'front' 
}) => {
  // Color & texture palettes for each wrapping style
  const getStyleColors = (id: WrappingStyle) => {
    switch (id) {
      case 'silk-white':
        return {
          back: '#FBF9F5',
          frontMain: '#FFFFFF',
          frontFold: '#F4EFE6',
          border: '#DED5C5',
          shadow: '#00000010',
          pattern: 'none'
        };
      case 'sage-linen':
        return {
          back: '#C2C9BC',
          frontMain: '#D2D7CD',
          frontFold: '#BCC3B5',
          border: '#A4AC9C',
          shadow: '#00000015',
          pattern: 'linen'
        };
      case 'noir-velvet':
        return {
          back: '#181818',
          frontMain: '#242424',
          frontFold: '#161616',
          border: '#383838',
          shadow: '#00000040',
          pattern: 'matte'
        };
      case 'newspaper':
        return {
          back: '#E8E1D3',
          frontMain: '#F2ECE1',
          frontFold: '#DFD7C7',
          border: '#C5BAA7',
          shadow: '#00000015',
          pattern: 'gazette'
        };
      case 'kraft':
      default:
        return {
          back: '#B89267',
          frontMain: '#C8A278',
          frontFold: '#B58E62',
          border: '#9E784D',
          shadow: '#00000020',
          pattern: 'kraft'
        };
    }
  };

  const colors = getStyleColors(styleId);

  if (layer === 'back') {
    // Back Layer: elegant flared parchment wings behind the flower blooms
    return (
      <svg viewBox="0 0 200 180" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`back-grad-${styleId}`} x1="100" y1="20" x2="100" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={colors.back} stopOpacity="0.9" />
            <stop offset="100%" stopColor={colors.frontFold} stopOpacity="0.95" />
          </linearGradient>
        </defs>
        
        {/* Flared Origami Parchment Wings */}
        <path 
          d="M 100 170 L 35 70 Q 25 35 55 25 L 100 65 L 145 25 Q 175 35 165 70 Z" 
          fill={`url(#back-grad-${styleId})`} 
          stroke={colors.border} 
          strokeWidth="1.2" 
          strokeLinejoin="round" 
        />
        
        {/* Subtle Fold Lines */}
        <path d="M 55 25 L 100 110 L 145 25" stroke={colors.border} strokeWidth="0.8" opacity="0.6" strokeDasharray="3 2" fill="none" />
      </svg>
    );
  }

  // Front Layer: Tapered bouquet wrapper cone covering stems at the base
  return (
    <svg viewBox="0 0 200 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`front-main-${styleId}`} x1="100" y1="10" x2="100" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={colors.frontMain} />
          <stop offset="100%" stopColor={colors.frontFold} />
        </linearGradient>
        <filter id={`shadow-${styleId}`} x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.12" />
        </filter>
      </defs>

      {/* Main Tapered Cone Body */}
      <g filter={`url(#shadow-${styleId})`}>
        {/* Left Wrapped Flap */}
        <path 
          d="M 32 15 C 38 10 70 20 100 24 L 126 150 C 122 156 78 156 74 150 Z" 
          fill={colors.frontFold} 
          stroke={colors.border} 
          strokeWidth="1" 
        />

        {/* Right Wrapped Origami Overlap Flap */}
        <path 
          d="M 168 15 C 160 8 115 16 75 22 L 74 150 C 78 156 122 156 126 150 L 168 15 Z" 
          fill={`url(#front-main-${styleId})`} 
          stroke={colors.border} 
          strokeWidth="1.2" 
        />

        {/* Diagonal Origami Crease & Shading */}
        <path d="M 168 15 L 74 150" stroke={colors.border} strokeWidth="1" opacity="0.8" />
        <path d="M 32 15 L 126 150" stroke={colors.border} strokeWidth="0.8" opacity="0.4" />

        {/* Decorative Botanical Gazette Text Lines if Newspaper */}
        {styleId === 'newspaper' && (
          <g opacity="0.35" stroke="#2B2620" strokeWidth="0.8">
            <line x1="88" y1="45" x2="148" y2="45" />
            <line x1="86" y1="52" x2="142" y2="52" />
            <line x1="84" y1="59" x2="136" y2="59" />
            <line x1="82" y1="66" x2="130" y2="66" />
            <line x1="80" y1="73" x2="124" y2="73" />
            <line x1="78" y1="80" x2="118" y2="80" />
            <line x1="77" y1="87" x2="112" y2="87" />
          </g>
        )}

        {/* Subtle Organic Texture Highlight */}
        <path 
          d="M 80 23 C 110 18 145 12 165 16" 
          stroke="#FFFFFF" 
          strokeWidth="1.2" 
          strokeLinecap="round" 
          opacity={styleId === 'noir-velvet' ? '0.15' : '0.4'} 
        />
      </g>
    </svg>
  );
};
