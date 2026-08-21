import React from 'react';
import { StickerId } from '../types';

interface StickerSVGProps {
  stickerId: StickerId;
  className?: string;
}

export const STICKERS_CATALOG = [
  { id: 'butterfly-gold' as StickerId, name: 'Amber Monarch', category: 'fauna' as const, desc: 'Golden butterfly resting on petals' },
  { id: 'butterfly-azure' as StickerId, name: 'Azure Morpho', category: 'fauna' as const, desc: 'Sky-blue gossamer wings' },
  { id: 'honey-bee' as StickerId, name: 'Meadow Honeybee', category: 'fauna' as const, desc: 'Pollinating bumblebee with soft wings' },
  { id: 'ladybug' as StickerId, name: 'Botanical Ladybug', category: 'fauna' as const, desc: 'Glossy crimson garden friend' },
  { id: 'dragonfly' as StickerId, name: 'Emerald Dragonfly', category: 'fauna' as const, desc: 'Slender translucent dragonfly' },
  { id: 'pollen-sparkle' as StickerId, name: 'Sunlit Pollen', category: 'accent' as const, desc: 'Golden glimmer & botanical stardust' },
];

export const StickerSVG: React.FC<StickerSVGProps> = ({ stickerId, className = "w-full h-full" }) => {
  switch (stickerId) {
    case 'butterfly-gold':
      return (
        <svg viewBox="0 0 100 90" className={`${className} drop-shadow-md`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
            {/* Left Upper Wing */}
            <path d="M 50 45 C 40 25 15 15 10 32 C 8 45 28 58 48 48 Z" fill="#E89838" stroke="#3D2008" strokeWidth="1.2" />
            <path d="M 20 28 C 30 32 40 40 48 45" stroke="#3D2008" strokeWidth="0.8" />
            <circle cx="18" cy="28" r="2" fill="#FFFFFF" />
            <circle cx="28" cy="24" r="1.5" fill="#FFFFFF" />
            
            {/* Left Lower Wing */}
            <path d="M 48 48 C 32 54 18 68 28 80 C 40 85 48 65 50 52 Z" fill="#F4B553" stroke="#3D2008" strokeWidth="1.2" />
            <circle cx="28" cy="74" r="1.5" fill="#FFFFFF" />

            {/* Right Upper Wing */}
            <path d="M 50 45 C 60 25 85 15 90 32 C 92 45 72 58 52 48 Z" fill="#E89838" stroke="#3D2008" strokeWidth="1.2" />
            <path d="M 80 28 C 70 32 60 40 52 45" stroke="#3D2008" strokeWidth="0.8" />
            <circle cx="82" cy="28" r="2" fill="#FFFFFF" />
            <circle cx="72" cy="24" r="1.5" fill="#FFFFFF" />

            {/* Right Lower Wing */}
            <path d="M 52 48 C 68 54 82 68 72 80 C 60 85 52 65 50 52 Z" fill="#F4B553" stroke="#3D2008" strokeWidth="1.2" />
            <circle cx="72" cy="74" r="1.5" fill="#FFFFFF" />

            {/* Body and Antennae */}
            <ellipse cx="50" cy="48" rx="3.5" ry="14" fill="#2C1808" />
            <circle cx="50" cy="32" r="3" fill="#2C1808" />
            <path d="M 49 30 Q 42 18 36 20" stroke="#2C1808" strokeWidth="1" strokeLinecap="round" />
            <path d="M 51 30 Q 58 18 64 20" stroke="#2C1808" strokeWidth="1" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'butterfly-azure':
      return (
        <svg viewBox="0 0 100 90" className={`${className} drop-shadow-md`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
            {/* Left Wings */}
            <path d="M 50 45 C 38 20 12 18 10 35 C 8 50 30 58 48 48 Z" fill="#4B9CD3" stroke="#152B3C" strokeWidth="1.2" />
            <path d="M 22 28 C 32 34 42 42 48 45" stroke="#70C1B3" strokeWidth="1" opacity="0.8" />
            <path d="M 48 48 C 30 55 18 70 28 82 C 42 86 48 65 50 52 Z" fill="#68B0AB" stroke="#152B3C" strokeWidth="1.2" />

            {/* Right Wings */}
            <path d="M 50 45 C 62 20 88 18 90 35 C 92 50 70 58 52 48 Z" fill="#4B9CD3" stroke="#152B3C" strokeWidth="1.2" />
            <path d="M 78 28 C 68 34 58 42 52 45" stroke="#70C1B3" strokeWidth="1" opacity="0.8" />
            <path d="M 52 48 C 70 55 82 70 72 82 C 58 86 52 65 50 52 Z" fill="#68B0AB" stroke="#152B3C" strokeWidth="1.2" />

            {/* Body */}
            <ellipse cx="50" cy="48" rx="3.5" ry="14" fill="#152B3C" />
            <circle cx="50" cy="32" r="3" fill="#152B3C" />
            <path d="M 49 30 Q 40 18 35 22" stroke="#152B3C" strokeWidth="1" strokeLinecap="round" />
            <path d="M 51 30 Q 60 18 65 22" stroke="#152B3C" strokeWidth="1" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'honey-bee':
      return (
        <svg viewBox="0 0 90 90" className={`${className} drop-shadow-md`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
            {/* Translucent Gossamer Wings */}
            <ellipse cx="34" cy="32" rx="18" ry="10" transform="rotate(-35 34 32)" fill="#FFFFFF" fillOpacity="0.75" stroke="#D0D0D0" strokeWidth="0.8" />
            <ellipse cx="56" cy="32" rx="18" ry="10" transform="rotate(35 56 32)" fill="#FFFFFF" fillOpacity="0.75" stroke="#D0D0D0" strokeWidth="0.8" />

            {/* Bee Body */}
            <ellipse cx="45" cy="52" rx="13" ry="18" fill="#F6C343" stroke="#2B1D0E" strokeWidth="1.5" />
            {/* Stripes */}
            <path d="M 33 46 C 40 43 50 43 57 46" stroke="#2B1D0E" strokeWidth="3" strokeLinecap="round" />
            <path d="M 32 54 C 40 51 50 51 58 54" stroke="#2B1D0E" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 35 62 C 41 60 49 60 55 62" stroke="#2B1D0E" strokeWidth="2.5" strokeLinecap="round" />

            {/* Head */}
            <circle cx="45" cy="35" r="7.5" fill="#2B1D0E" />
            <circle cx="41" cy="33" r="1.5" fill="#FFFFFF" opacity="0.8" />
            <circle cx="49" cy="33" r="1.5" fill="#FFFFFF" opacity="0.8" />

            {/* Antennae */}
            <path d="M 42 28 Q 36 20 32 22" stroke="#2B1D0E" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 48 28 Q 54 20 58 22" stroke="#2B1D0E" strokeWidth="1.2" strokeLinecap="round" />

            {/* Tiny Stinger */}
            <path d="M 45 70 L 45 74" stroke="#2B1D0E" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </svg>
      );

    case 'ladybug':
      return (
        <svg viewBox="0 0 80 80" className={`${className} drop-shadow-md`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
            {/* Legs */}
            <path d="M 28 32 L 18 26 M 25 42 L 14 42 M 28 52 L 18 58" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 52 32 L 62 26 M 55 42 L 66 42 M 52 52 L 62 58" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />

            {/* Red Shell Body */}
            <ellipse cx="40" cy="42" rx="18" ry="20" fill="#E63946" stroke="#1A1A1A" strokeWidth="1.5" />
            <line x1="40" y1="23" x2="40" y2="62" stroke="#1A1A1A" strokeWidth="1.5" />

            {/* Glossy Black Spots */}
            <circle cx="32" cy="34" r="3.2" fill="#1A1A1A" />
            <circle cx="48" cy="34" r="3.2" fill="#1A1A1A" />
            <circle cx="30" cy="46" r="3.5" fill="#1A1A1A" />
            <circle cx="50" cy="46" r="3.5" fill="#1A1A1A" />
            <circle cx="35" cy="55" r="2.5" fill="#1A1A1A" />
            <circle cx="45" cy="55" r="2.5" fill="#1A1A1A" />

            {/* Head */}
            <path d="M 33 24 C 33 18 47 18 47 24 Z" fill="#1A1A1A" />
            {/* Antennae */}
            <path d="M 36 19 Q 32 12 28 14" stroke="#1A1A1A" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 44 19 Q 48 12 52 14" stroke="#1A1A1A" strokeWidth="1.2" strokeLinecap="round" />

            {/* Gloss highlight */}
            <ellipse cx="32" cy="30" rx="4" ry="2" fill="#FFFFFF" opacity="0.6" transform="rotate(-30 32 30)" />
          </g>
        </svg>
      );

    case 'dragonfly':
      return (
        <svg viewBox="0 0 100 100" className={`${className} drop-shadow-md`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
            {/* Gossamer wings */}
            <ellipse cx="25" cy="40" rx="24" ry="5" transform="rotate(-15 25 40)" fill="#A8DADC" fillOpacity="0.6" stroke="#457B9D" strokeWidth="0.7" />
            <ellipse cx="28" cy="52" rx="20" ry="4" transform="rotate(5 28 52)" fill="#A8DADC" fillOpacity="0.5" stroke="#457B9D" strokeWidth="0.7" />

            <ellipse cx="75" cy="40" rx="24" ry="5" transform="rotate(15 75 40)" fill="#A8DADC" fillOpacity="0.6" stroke="#457B9D" strokeWidth="0.7" />
            <ellipse cx="72" cy="52" rx="20" ry="4" transform="rotate(-5 72 52)" fill="#A8DADC" fillOpacity="0.5" stroke="#457B9D" strokeWidth="0.7" />

            {/* Slender Body */}
            <ellipse cx="50" cy="58" rx="2.5" ry="26" fill="#2A9D8F" stroke="#1D3557" strokeWidth="1" />
            <circle cx="50" cy="30" r="4.5" fill="#264653" />
            <circle cx="48" cy="28" r="1.5" fill="#E9C46A" />
            <circle cx="52" cy="28" r="1.5" fill="#E9C46A" />
          </g>
        </svg>
      );

    case 'pollen-sparkle':
    default:
      return (
        <svg viewBox="0 0 80 80" className={`${className} drop-shadow-sm`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
            {/* Center 4-Point Star Sparkle */}
            <path d="M 40 15 Q 40 40 15 40 Q 40 40 40 65 Q 40 40 65 40 Q 40 40 40 15 Z" fill="#F4D06F" stroke="#D4AF37" strokeWidth="0.8" />
            <circle cx="40" cy="40" r="3.5" fill="#FFFDF0" />

            {/* Surrounding Golden Pollen Specks */}
            <circle cx="20" cy="24" r="2.2" fill="#E76F51" opacity="0.85" />
            <circle cx="62" cy="22" r="2" fill="#F4A261" opacity="0.9" />
            <circle cx="60" cy="58" r="2.5" fill="#E9C46A" opacity="0.85" />
            <circle cx="24" cy="56" r="1.8" fill="#F4D06F" opacity="0.8" />
          </g>
        </svg>
      );
  }
};
