import React, { useId } from 'react';
import { RibbonStyle, RibbonTexture } from '../types';

interface RibbonSVGProps {
  styleId?: RibbonStyle;
  color?: string;
  texture?: RibbonTexture;
  customText?: string;
  textColor?: string;
  className?: string;
}

function adjustHex(hex: string, amount: number): string {
  if (!hex || !hex.startsWith('#')) return hex || '#B76E79';
  let col = hex.replace('#', '');
  if (col.length === 3) {
    col = col.split('').map(c => c + c).join('');
  }
  const num = parseInt(col, 16);
  if (isNaN(num)) return hex;
  let r = (num >> 16) + amount;
  let g = ((num >> 8) & 0x00FF) + amount;
  let b = (num & 0x0000FF) + amount;
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export const RibbonSVG: React.FC<RibbonSVGProps> = ({ 
  styleId = 'raw-silk', 
  color,
  texture,
  customText = '',
  textColor = '#D4AF37',
  className = "w-full h-full" 
}) => {
  const uniqueId = useId().replace(/:/g, '');
  const patternId = `ribbon-pat-${uniqueId}`;
  const pathTextId = `ribbon-text-path-${uniqueId}`;
  const gradId = `ribbon-grad-${uniqueId}`;
  const shineId = `ribbon-shine-${uniqueId}`;

  // Determine effective texture
  let effectiveTexture: RibbonTexture = texture || 'silk';
  if (!texture) {
    if (styleId === 'jute-twine' || styleId === 'raw-linen') effectiveTexture = 'jute';
    else if (styleId === 'burgundy-velvet' || styleId === 'blush-velvet') effectiveTexture = 'velvet';
    else if (styleId === 'sage-chiffon') effectiveTexture = 'chiffon';
    else if (styleId === 'black-satin') effectiveTexture = 'satin';
    else effectiveTexture = 'silk';
  }

  // Determine effective base color
  let baseColor = color;
  if (!baseColor) {
    switch (styleId) {
      case 'jute-twine':
      case 'raw-linen':
        baseColor = '#BFAF95';
        break;
      case 'burgundy-velvet':
        baseColor = '#4E1222';
        break;
      case 'blush-velvet':
        baseColor = '#B76E79';
        break;
      case 'sage-chiffon':
        baseColor = '#9CAF88';
        break;
      case 'black-satin':
        baseColor = '#1C1C1C';
        break;
      case 'ivory-silk':
      case 'raw-silk':
      default:
        baseColor = '#F7F4EF';
        break;
    }
  }

  const primary = baseColor;
  const deepShadow = adjustHex(primary, -55);
  const midShadow = adjustHex(primary, -30);
  const highlight = adjustHex(primary, 45);
  const outline = adjustHex(primary, -70);

  // Dynamic opacity based on texture
  const isChiffon = effectiveTexture === 'chiffon';
  const isJute = effectiveTexture === 'jute';
  const isGrosgrain = effectiveTexture === 'grosgrain';
  const isMetallic = effectiveTexture === 'metallic';
  const isVelvet = effectiveTexture === 'velvet';
  const isSatin = effectiveTexture === 'satin';

  const bodyOpacity = isChiffon ? 0.85 : 1;

  // Personalized text calculation & formatting
  const trimmedText = customText.trim();
  const fontSize = trimmedText.length > 28 ? 5.2 : trimmedText.length > 18 ? 6.2 : 7.2;

  return (
    <svg viewBox="0 0 160 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Dynamic Texture Patterns */}
        {isGrosgrain && (
          <pattern id={patternId} width="4" height="2" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0.5" x2="4" y2="0.5" stroke={outline} strokeWidth="0.6" opacity="0.35" />
            <line x1="0" y1="1.5" x2="4" y2="1.5" stroke={highlight} strokeWidth="0.4" opacity="0.45" />
          </pattern>
        )}

        {isJute && (
          <pattern id={patternId} width="6" height="6" patternUnits="userSpaceOnUse">
            <path d="M 0 3 L 6 3 M 3 0 L 3 6" stroke={outline} strokeWidth="0.7" opacity="0.3" />
            <path d="M 1 1 L 5 5 M 1 5 L 5 1" stroke={midShadow} strokeWidth="0.4" opacity="0.25" />
          </pattern>
        )}

        {isMetallic && (
          <pattern id={patternId} width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.8" fill="#FFF275" opacity="0.8" />
            <circle cx="6" cy="6" r="0.8" fill="#FFE144" opacity="0.7" />
            <circle cx="6" cy="2" r="0.5" fill="#FFFDF7" opacity="0.9" />
          </pattern>
        )}

        {/* Shading Gradients */}
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={highlight} stopOpacity={isSatin ? 0.9 : 0.6} />
          <stop offset="50%" stopColor={primary} />
          <stop offset="100%" stopColor={deepShadow} />
        </linearGradient>

        <linearGradient id={shineId} x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor={highlight} stopOpacity={isVelvet ? 0.5 : 0.8} />
          <stop offset="50%" stopColor={primary} stopOpacity={0.2} />
          <stop offset="100%" stopColor={deepShadow} stopOpacity={0.7} />
        </linearGradient>

        {/* Curved Path for Personalized Inscribed Ribbon Text */}
        <path 
          id={pathTextId} 
          d="M 88 48 C 98 66 112 86 122 112" 
          fill="none" 
        />
      </defs>

      {/* 1. Stem Wrap Band (Behind Knot) */}
      <path 
        d="M 24 30 C 55 35 105 35 136 30 C 136 41 105 46 24 41 Z" 
        fill={primary} 
        fillOpacity={bodyOpacity}
        stroke={outline} 
        strokeWidth="1.2" 
      />
      <path 
        d="M 28 33 C 55 37 105 37 132 33" 
        stroke={highlight} 
        strokeWidth={isSatin ? 1.6 : 1.2} 
        strokeLinecap="round" 
        opacity={isSatin ? 0.9 : 0.6} 
      />
      {(isGrosgrain || isJute || isMetallic) && (
        <path d="M 24 30 C 55 35 105 35 136 30 C 136 41 105 46 24 41 Z" fill={`url(#${patternId})`} pointerEvents="none" />
      )}

      {/* 2. Left Ribbon Tail */}
      <g>
        <path 
          d="M 72 44 C 55 68 36 90 28 116 C 38 113 48 107 56 97 C 66 77 75 58 79 46 Z" 
          fill={primary} 
          fillOpacity={bodyOpacity}
          stroke={outline} 
          strokeWidth="1.2" 
        />
        {/* Tail Specular / Texture */}
        <path 
          d="M 36 108 C 46 84 62 64 72 48" 
          stroke={highlight} 
          strokeWidth={isSatin ? 1.5 : 1.1} 
          opacity={isSatin ? 0.9 : 0.6} 
          fill="none" 
        />
        {(isGrosgrain || isJute || isMetallic) && (
          <path 
            d="M 72 44 C 55 68 36 90 28 116 C 38 113 48 107 56 97 C 66 77 75 58 79 46 Z" 
            fill={`url(#${patternId})`} 
            pointerEvents="none" 
          />
        )}
      </g>

      {/* 3. Right Ribbon Tail (Holds the personalized inscribed text) */}
      <g>
        <path 
          d="M 88 44 C 105 68 124 90 132 116 C 122 113 112 107 104 97 C 94 77 85 58 81 46 Z" 
          fill={primary} 
          fillOpacity={bodyOpacity}
          stroke={outline} 
          strokeWidth="1.2" 
        />
        {/* Tail Highlight */}
        <path 
          d="M 124 108 C 114 84 98 64 88 48" 
          stroke={highlight} 
          strokeWidth={isSatin ? 1.5 : 1.1} 
          opacity={isSatin ? 0.9 : 0.6} 
          fill="none" 
        />
        {(isGrosgrain || isJute || isMetallic) && (
          <path 
            d="M 88 44 C 105 68 124 90 132 116 C 122 113 112 107 104 97 C 94 77 85 58 81 46 Z" 
            fill={`url(#${patternId})`} 
            pointerEvents="none" 
          />
        )}

        {/* 🌟 Personalized Ribbon Inscription Text Overlay 🌟 */}
        {trimmedText && (
          <g className="select-none pointer-events-none filter drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]">
            <text
              fontFamily="'Playfair Display', Georgia, serif"
              fontSize={fontSize}
              fontWeight="600"
              fontStyle="italic"
              fill={textColor}
              letterSpacing="0.08em"
            >
              <textPath 
                href={`#${pathTextId}`} 
                startOffset="15%" 
                textAnchor="start"
              >
                {trimmedText}
              </textPath>
            </text>
          </g>
        )}
      </g>

      {/* 4. Left Bow Loop */}
      <g>
        <path 
          d="M 76 42 C 46 14 16 28 30 52 C 44 66 66 52 76 45 Z" 
          fill={primary} 
          fillOpacity={bodyOpacity}
          stroke={outline} 
          strokeWidth="1.2" 
        />
        {/* Deep Loop Hollow */}
        <path 
          d="M 34 32 C 24 42 36 52 50 46" 
          fill={deepShadow} 
          opacity={isVelvet ? 0.75 : 0.55} 
        />
        {/* Loop Outer Highlight */}
        <path 
          d="M 40 24 C 54 20 66 32 72 40" 
          stroke={highlight} 
          strokeWidth={isSatin ? 1.8 : 1.4} 
          strokeLinecap="round" 
          opacity={isSatin ? 0.95 : 0.7} 
          fill="none" 
        />
        {(isGrosgrain || isJute || isMetallic) && (
          <path 
            d="M 76 42 C 46 14 16 28 30 52 C 44 66 66 52 76 45 Z" 
            fill={`url(#${patternId})`} 
            pointerEvents="none" 
          />
        )}
      </g>

      {/* 5. Right Bow Loop */}
      <g>
        <path 
          d="M 84 42 C 114 14 144 28 130 52 C 116 66 94 52 84 45 Z" 
          fill={primary} 
          fillOpacity={bodyOpacity}
          stroke={outline} 
          strokeWidth="1.2" 
        />
        {/* Deep Loop Hollow */}
        <path 
          d="M 126 32 C 136 42 124 52 110 46" 
          fill={deepShadow} 
          opacity={isVelvet ? 0.75 : 0.55} 
        />
        {/* Loop Outer Highlight */}
        <path 
          d="M 120 24 C 106 20 94 32 88 40" 
          stroke={highlight} 
          strokeWidth={isSatin ? 1.8 : 1.4} 
          strokeLinecap="round" 
          opacity={isSatin ? 0.95 : 0.7} 
          fill="none" 
        />
        {(isGrosgrain || isJute || isMetallic) && (
          <path 
            d="M 84 42 C 114 14 144 28 130 52 C 116 66 94 52 84 45 Z" 
            fill={`url(#${patternId})`} 
            pointerEvents="none" 
          />
        )}
      </g>

      {/* 6. Center Tied Knot */}
      <g>
        <rect 
          x="72" 
          y="36" 
          width="16" 
          height="15" 
          rx={isJute ? 7 : 5} 
          fill={midShadow} 
          stroke={outline} 
          strokeWidth="1.2" 
        />
        {/* Knot Fold Highlights */}
        <path 
          d="M 75 39 C 80 43 80 43 85 39" 
          stroke={highlight} 
          strokeWidth="1.3" 
          strokeLinecap="round" 
          opacity={0.8} 
        />
        <path 
          d="M 76 47 C 80 49 80 49 84 47" 
          stroke={deepShadow} 
          strokeWidth="1.1" 
          strokeLinecap="round" 
          opacity={0.7} 
        />
      </g>
    </svg>
  );
};
