import React from 'react';

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

export const FLOWER_IMAGE_MAP: Record<string, string> = {
  // By exact flower id
  'rose-red': imgRose,
  'peony-coral': imgPeony,
  'sunflower-solstice': imgSunflower,
  'dahlia-imperial': imgDahlia,
  'lily-casablanca': imgLily,
  'ranunculus-burgundy': imgRanunculus,
  'tulip-parisian': imgTulip,
  'carnation-heirloom': imgCarnation,
  'zinnia-blaze': imgZinnia,
  'anemone-windflower': imgAnemone,
  'orchid-cascade': imgOrchid,
  'daisy-chamomile': imgDaisy,

  // By svgType or short name
  'rose': imgRose,
  'peony': imgPeony,
  'sunflower': imgSunflower,
  'dahlia': imgDahlia,
  'lily': imgLily,
  'ranunculus': imgRanunculus,
  'tulip': imgTulip,
  'carnation': imgCarnation,
  'zinnia': imgZinnia,
  'anemone': imgAnemone,
  'orchid': imgOrchid,
  'daisy': imgDaisy,
};

export interface FlowerSVGProps {
  svgType?: string;
  flowerId?: string;
  imageUrl?: string;
  color?: string;
  scale?: number;
  className?: string;
  alt?: string;
}

export const FlowerSVG: React.FC<FlowerSVGProps> = ({ 
  svgType = '', 
  flowerId = '', 
  imageUrl, 
  color = '#D44D5C', 
  className = 'w-full h-full',
  alt
}) => {
  // Resolve image source according to flower id, image url or svg type
  const resolvedImg = imageUrl || (flowerId ? FLOWER_IMAGE_MAP[flowerId] : undefined) || (svgType ? FLOWER_IMAGE_MAP[svgType] : undefined);

  if (resolvedImg) {
    return (
      <img
        src={resolvedImg}
        alt={alt || flowerId || svgType || 'Botanical Bloom'}
        className={`${className} object-contain mix-blend-multiply select-none pointer-events-none drop-shadow-xs`}
        referrerPolicy="no-referrer"
        loading="eager"
      />
    );
  }

  const leafGreen = '#60733B';
  const darkGreen = '#435227';
  const lightGreen = '#7D9450';

  switch (svgType) {
    case 'rose':
      return (
        <svg viewBox="0 0 100 100" className={`${className} drop-shadow-sm`}>
          {/* Subtle green calyx base */}
          <path d="M50 78 Q42 86 34 82 Q42 74 48 72 Z" fill={leafGreen} />
          <path d="M50 78 Q58 86 66 82 Q58 74 52 72 Z" fill={leafGreen} />
          <path d="M50 75 L50 86" stroke={darkGreen} strokeWidth="3" strokeLinecap="round" />
          
          {/* Outer Layer Petals */}
          <path d="M50 20 C32 20 20 34 20 52 C20 70 34 82 50 82 C66 82 80 70 80 52 C80 34 68 20 50 20 Z" fill={color} opacity="0.82" />
          <path d="M26 44 C26 30 40 22 50 22 C60 22 74 30 74 44 C74 62 60 76 50 76 C40 76 26 62 26 44 Z" fill={color} opacity="0.9" />
          
          {/* Ruffled Petal Swirls */}
          <path d="M30 48 Q32 32 48 30 Q66 32 68 48 Q64 68 50 70 Q34 68 30 48 Z" fill={color} />
          <path d="M35 50 C36 40 44 35 52 36 C60 37 64 45 62 55 C60 63 52 66 45 64 C38 62 34 56 35 50 Z" fill="#000" opacity="0.1" />
          <path d="M36 50 C37 42 43 38 50 38 C57 38 62 44 60 52 C58 58 52 62 46 60 C40 58 35 54 36 50 Z" fill={color} />
          
          {/* Heart/Core Swirl Highlights */}
          <path d="M42 46 Q50 38 56 46 Q52 56 46 54 Q40 52 42 46 Z" fill="#FFFFFF" opacity="0.25" />
          <circle cx="49" cy="48" r="4.5" fill="#FAF0D7" opacity="0.75" />
        </svg>
      );

    case 'peony':
      return (
        <svg viewBox="0 0 100 100" className={`${className} drop-shadow-md`}>
          {/* Soft Calyx */}
          <path d="M45 74 Q32 82 28 76 Q38 68 46 68 Z" fill={leafGreen} opacity="0.9" />
          <path d="M55 74 Q68 82 72 76 Q62 68 54 68 Z" fill={leafGreen} opacity="0.9" />
          
          {/* Billowing Voluminous Petal Rosette */}
          <circle cx="50" cy="50" r="38" fill={color} opacity="0.70" />
          
          {/* Fluted Petal Scallops */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
            <path
              key={i}
              d="M50 50 C40 24 60 24 50 50 Z"
              fill={color}
              transform={`rotate(${deg} 50 50)`}
              opacity="0.85"
            />
          ))}
          
          {/* Inner Billowing Layers */}
          <circle cx="50" cy="50" r="24" fill={color} opacity="0.95" />
          <circle cx="45" cy="46" r="16" fill={color} />
          <circle cx="55" cy="46" r="16" fill={color} />
          <circle cx="50" cy="54" r="16" fill={color} />
          
          {/* Ruffled Golden & Cream Heart */}
          <circle cx="50" cy="50" r="10" fill="#FFF5EE" opacity="0.6" />
          <circle cx="50" cy="50" r="6" fill="#FCE794" opacity="0.8" />
        </svg>
      );

    case 'sunflower':
      return (
        <svg viewBox="0 0 100 100" className={`${className} drop-shadow-md`}>
          {/* Golden Ray Petals (Outer Circle) */}
          {[0, 24, 48, 72, 96, 120, 144, 168, 192, 216, 240, 264, 288, 312, 336].map((deg, i) => (
            <ellipse
              key={`outer-${i}`}
              cx="50"
              cy="50"
              rx="6"
              ry="32"
              fill={i % 2 === 0 ? color : '#E5A910'}
              transform={`rotate(${deg} 50 50)`}
              opacity="0.95"
            />
          ))}
          
          {/* Inner Ray Petals */}
          {[12, 36, 60, 84, 108, 132, 156, 180, 204, 228, 252, 276, 300, 324, 348].map((deg, i) => (
            <ellipse
              key={`inner-${i}`}
              cx="50"
              cy="50"
              rx="5"
              ry="26"
              fill={color}
              transform={`rotate(${deg} 50 50)`}
              opacity="1"
            />
          ))}
          
          {/* Velvety Seed Disc Core */}
          <circle cx="50" cy="50" r="18" fill="#3D2314" />
          <circle cx="50" cy="50" r="14" fill="#251408" />
          <circle cx="50" cy="50" r="10" fill="#180C05" />
          
          {/* Golden Stippled Pollen Rim */}
          <circle cx="50" cy="50" r="14" stroke="#E5B834" strokeWidth="1.5" strokeDasharray="2 3" fill="none" opacity="0.85" />
          <circle cx="50" cy="50" r="8" stroke="#FBD034" strokeWidth="1.2" strokeDasharray="1.5 2.5" fill="none" opacity="0.85" />
        </svg>
      );

    case 'dahlia':
      return (
        <svg viewBox="0 0 100 100" className={`${className} drop-shadow-md`}>
          {/* Outer Pointed Sculpted Florets */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
            <path
              key={`d1-${i}`}
              d="M50 50 L40 18 L50 8 L60 18 Z"
              fill={color}
              transform={`rotate(${deg} 50 50)`}
              opacity="0.8"
            />
          ))}
          
          {/* Mid Layer Florets */}
          {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((deg, i) => (
            <path
              key={`d2-${i}`}
              d="M50 50 L43 26 L50 16 L57 26 Z"
              fill={color}
              transform={`rotate(${deg} 50 50)`}
              opacity="0.92"
            />
          ))}
          
          {/* Inner Dense Cone Florets */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
            <path
              key={`d3-${i}`}
              d="M50 50 L45 34 L50 26 L55 34 Z"
              fill={color}
              transform={`rotate(${deg} 50 50)`}
              opacity="1"
            />
          ))}
          
          {/* Center Velvet Core */}
          <circle cx="50" cy="50" r="7" fill="#4B1226" />
          <circle cx="50" cy="50" r="4" fill="#2E0A16" />
        </svg>
      );

    case 'lily':
      return (
        <svg viewBox="0 0 100 100" className={`${className} drop-shadow-md`}>
          {/* Flaring 6 Sculptural Star Petals */}
          <ellipse cx="50" cy="22" rx="10" ry="24" fill={color} />
          <ellipse cx="22" cy="38" rx="9" ry="22" fill={color} transform="rotate(-60 22 38)" opacity="0.92" />
          <ellipse cx="78" cy="38" rx="9" ry="22" fill={color} transform="rotate(60 78 38)" opacity="0.92" />
          <ellipse cx="26" cy="68" rx="10" ry="22" fill={color} transform="rotate(-120 26 68)" opacity="0.95" />
          <ellipse cx="74" cy="68" rx="10" ry="22" fill={color} transform="rotate(120 74 68)" opacity="0.95" />
          <ellipse cx="50" cy="78" rx="10" ry="22" fill={color} transform="rotate(180 50 78)" opacity="0.98" />
          
          {/* Mid Throat Pistil & Anther Stamens */}
          <circle cx="50" cy="50" r="9" fill="#8FA356" opacity="0.85" />
          <path d="M50 50 L40 32 M50 50 L60 32 M50 50 L34 52 M50 50 L66 52 M50 50 L44 68 M50 50 L56 68" stroke="#5C330A" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="40" cy="32" r="2.8" fill="#8B4513" />
          <circle cx="60" cy="32" r="2.8" fill="#8B4513" />
          <circle cx="34" cy="52" r="2.8" fill="#8B4513" />
          <circle cx="66" cy="52" r="2.8" fill="#8B4513" />
          <circle cx="44" cy="68" r="2.8" fill="#8B4513" />
          <circle cx="56" cy="68" r="2.8" fill="#8B4513" />
        </svg>
      );

    case 'hydrangea':
      return (
        <svg viewBox="0 0 100 100" className={`${className} drop-shadow-md`}>
          {/* Cloud of Florets */}
          <circle cx="50" cy="50" r="38" fill={color} opacity="0.75" />
          
          {/* Nested Floret Rosettes */}
          {[
            [50, 28], [34, 38], [66, 38], [26, 54], [50, 50], [74, 54], [36, 68], [64, 68], [50, 72]
          ].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="14" fill={color} opacity="0.9" />
              {/* 4 Petals of each tiny floret */}
              <circle cx={cx - 5} cy={cy} r="5" fill="#FFF" opacity="0.3" />
              <circle cx={cx + 5} cy={cy} r="5" fill="#FFF" opacity="0.3" />
              <circle cx={cx} cy={cy - 5} r="5" fill="#FFF" opacity="0.3" />
              <circle cx={cx} cy={cy + 5} r="5" fill="#FFF" opacity="0.3" />
              <circle cx={cx} cy={cy} r="2.2" fill="#FAF6E8" />
            </g>
          ))}
        </svg>
      );

    case 'ranunculus':
      return (
        <svg viewBox="0 0 100 100" className={`${className} drop-shadow-sm`}>
          {/* Concentric Tightly Layered Geometric Petals */}
          <circle cx="50" cy="50" r="36" fill={color} opacity="0.65" />
          <circle cx="50" cy="50" r="30" fill={color} opacity="0.78" />
          <circle cx="50" cy="50" r="24" fill={color} opacity="0.88" />
          <circle cx="50" cy="50" r="18" fill={color} opacity="0.96" />
          <circle cx="50" cy="50" r="12" fill={color} />
          
          {/* Spiral Edge Details */}
          <circle cx="50" cy="50" r="18" stroke="#FFF" strokeWidth="1" strokeDasharray="3 4" fill="none" opacity="0.4" />
          <circle cx="50" cy="50" r="12" stroke="#FFF" strokeWidth="1" strokeDasharray="2 3" fill="none" opacity="0.5" />
          
          {/* Dark Velvet Core */}
          <circle cx="50" cy="50" r="6" fill="#2C1810" />
        </svg>
      );

    case 'tulip':
      return (
        <svg viewBox="0 0 100 100" className={`${className} drop-shadow-sm`}>
          {/* Calyx base */}
          <path d="M50 78 Q42 86 36 84 Q44 76 48 74 Z" fill={leafGreen} />
          <path d="M50 78 Q58 86 64 84 Q56 76 52 74 Z" fill={leafGreen} />
          
          {/* Cupped Satin Tulip Petals */}
          <path d="M25 55 C25 24 50 18 50 18 C50 18 75 24 75 55 C75 80 50 82 50 82 C50 82 25 80 25 55 Z" fill={color} opacity="0.9" />
          <path d="M35 52 C35 28 50 26 50 26 C50 26 65 28 65 52 C65 74 50 76 50 76 C50 76 35 74 35 52 Z" fill={color} opacity="0.75" />
          <path d="M42 50 C42 34 50 32 50 32 C50 32 58 34 58 50 C58 68 50 70 50 70 C50 70 42 68 42 50 Z" fill="#FFF" opacity="0.2" />
        </svg>
      );

    case 'carnation':
      return (
        <svg viewBox="0 0 100 100" className={`${className} drop-shadow-sm`}>
          {/* Calyx base */}
          <path d="M44 76 L50 88 L56 76 L54 66 L46 66 Z" fill={leafGreen} />
          
          {/* Serrated Layered Rosette */}
          <circle cx="50" cy="46" r="34" fill={color} opacity="0.65" />
          <path d="M22 46 Q30 22 50 24 Q70 22 78 46 Q70 70 50 68 Q30 70 22 46 Z" fill={color} opacity="0.80" />
          <path d="M30 46 Q36 28 50 30 Q64 28 70 46 Q64 64 50 62 Q36 64 30 46 Z" fill={color} opacity="0.92" />
          <path d="M36 46 Q42 34 50 36 Q58 34 64 46 Q58 58 50 56 Q42 58 36 46 Z" fill={color} />
          <circle cx="50" cy="46" r="7" fill="#FFF" opacity="0.3" />
        </svg>
      );

    case 'zinnia':
      return (
        <svg viewBox="0 0 100 100" className={`${className} drop-shadow-sm`}>
          {/* Outer Layer Ray Petals */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
            <path
              key={`z-out-${i}`}
              d="M50 50 Q41 18 50 14 Q59 18 50 50 Z"
              fill={color}
              transform={`rotate(${deg} 50 50)`}
              opacity="0.85"
            />
          ))}
          
          {/* Inner Dense Florets */}
          {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((deg, i) => (
            <path
              key={`z-in-${i}`}
              d="M50 50 Q43 26 50 22 Q57 26 50 50 Z"
              fill={color}
              transform={`rotate(${deg} 50 50)`}
              opacity="0.95"
            />
          ))}
          
          {/* Center Corona */}
          <circle cx="50" cy="50" r="13" fill="#4A2A0C" />
          <circle cx="50" cy="50" r="9" stroke="#FBD034" strokeWidth="2.5" strokeDasharray="2 2" fill="#7A4112" />
        </svg>
      );

    case 'anemone':
      return (
        <svg viewBox="0 0 100 100" className={`${className} drop-shadow-sm`}>
          {/* Flat Wide Silk Petals */}
          <ellipse cx="50" cy="30" rx="14" ry="24" fill={color} />
          <ellipse cx="72" cy="42" rx="24" ry="14" fill={color} />
          <ellipse cx="70" cy="66" rx="22" ry="14" fill={color} transform="rotate(30 70 66)" />
          <ellipse cx="28" cy="42" rx="24" ry="14" fill={color} />
          <ellipse cx="30" cy="66" rx="22" ry="14" fill={color} transform="rotate(-30 30 66)" />
          <ellipse cx="50" cy="74" rx="14" ry="22" fill={color} />
          
          {/* Midnight Velvet Center */}
          <circle cx="50" cy="50" r="16" fill="#141414" />
          <circle cx="50" cy="50" r="13" stroke="#D1D5DB" strokeWidth="1" strokeDasharray="1.5 2.5" fill="#242424" />
          <circle cx="50" cy="50" r="7" fill="#3D2314" />
        </svg>
      );

    case 'orchid':
      return (
        <svg viewBox="0 0 100 100" className={`${className} drop-shadow-md`}>
          {/* Upper Dorsal Sepal */}
          <ellipse cx="50" cy="28" rx="15" ry="24" fill={color} opacity="0.92" />
          
          {/* Lateral Flaring Wings */}
          <ellipse cx="30" cy="48" rx="24" ry="16" fill={color} transform="rotate(-25 30 48)" opacity="0.88" />
          <ellipse cx="70" cy="48" rx="24" ry="16" fill={color} transform="rotate(25 70 48)" opacity="0.88" />
          
          {/* Lower Sepals */}
          <ellipse cx="38" cy="68" rx="12" ry="18" fill={color} transform="rotate(-40 38 68)" opacity="0.8" />
          <ellipse cx="62" cy="68" rx="12" ry="18" fill={color} transform="rotate(40 62 68)" opacity="0.8" />
          
          {/* Rich Center Lip / Labellum */}
          <path d="M40 58 Q50 78 60 58 Q56 46 50 52 Q44 46 40 58 Z" fill="#6A1B4D" />
          <circle cx="50" cy="52" r="4.5" fill="#FCE794" />
        </svg>
      );

    case 'daisy':
      return (
        <svg viewBox="0 0 100 100" className={`${className} drop-shadow-sm`}>
          {/* Starry Ray Petals */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
            <ellipse
              key={i}
              cx="50"
              cy="50"
              rx="6"
              ry="26"
              fill={color}
              transform={`rotate(${deg} 50 50)`}
              opacity="0.95"
            />
          ))}
          {/* Sunny Golden Pollen Core */}
          <circle cx="50" cy="50" r="11" fill="#FFD700" />
          <circle cx="50" cy="50" r="8" fill="#E6A100" opacity="0.8" />
        </svg>
      );

    case 'lavender':
      return (
        <svg viewBox="0 0 100 100" className={`${className} drop-shadow-sm`}>
          {/* Central Stem */}
          <path d="M50 14 L50 86" stroke={leafGreen} strokeWidth="2.5" strokeLinecap="round" />
          
          {/* Tiered Fragrant Purple Buds */}
          {[20, 28, 36, 44, 52, 60, 68].map((y, idx) => (
            <g key={idx}>
              <ellipse cx="43" cy={y} rx="6" ry="4" fill={color} transform={`rotate(-20 43 ${y})`} />
              <ellipse cx="57" cy={y + 3} rx="6" ry="4" fill={color} transform={`rotate(20 57 ${y + 3})`} />
              <circle cx="50" cy={y - 2} r="3" fill="#D8B4E2" opacity="0.75" />
            </g>
          ))}
        </svg>
      );

    case 'mimosa':
      return (
        <svg viewBox="0 0 100 100" className={`${className} drop-shadow-sm`}>
          {/* Foliage Sprig */}
          <path d="M30 70 Q50 50 70 30" stroke={lightGreen} strokeWidth="2" strokeLinecap="round" />
          <path d="M40 60 Q25 45 35 35" stroke={lightGreen} strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Sunny Pollen Puffballs */}
          {[
            [38, 35], [52, 38], [68, 32], [32, 52], [48, 50], [62, 48], [44, 66], [58, 64], [72, 55]
          ].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="8" fill={color} opacity="0.92" />
              <circle cx={cx} cy={cy} r="5" fill="#FFF59D" opacity="0.7" />
            </g>
          ))}
        </svg>
      );

    case 'babysbreath':
      return (
        <svg viewBox="0 0 100 100" className={`${className} drop-shadow-sm`}>
          {/* Fine Branching Twigs */}
          <path d="M50 82 Q48 50 50 24" stroke={lightGreen} strokeWidth="1.5" />
          <path d="M50 64 Q32 50 24 38" stroke={lightGreen} strokeWidth="1.2" />
          <path d="M50 52 Q68 44 76 34" stroke={lightGreen} strokeWidth="1.2" />
          <path d="M50 40 Q36 30 30 20" stroke={lightGreen} strokeWidth="1.2" />
          
          {/* Starry Micro Florets */}
          {[
            [50, 22], [44, 26], [56, 28], [24, 38], [18, 32], [30, 42],
            [76, 34], [82, 40], [70, 44], [30, 20], [24, 16], [38, 18],
            [50, 48], [42, 56], [58, 58]
          ].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="4" fill={color} opacity="0.95" />
              <circle cx={cx} cy={cy} r="1.5" fill="#FAF6E8" />
            </g>
          ))}
        </svg>
      );

    case 'eucalyptus':
      return (
        <svg viewBox="0 0 100 100" className={`${className} drop-shadow-sm`}>
          {/* Arching Central Stem */}
          <path d="M50 12 Q52 50 50 88" stroke={leafGreen} strokeWidth="2.2" strokeLinecap="round" />
          
          {/* Silver Dollar Round Foliage Leaves */}
          <ellipse cx="36" cy="24" rx="12" ry="16" fill={color} transform="rotate(-28 36 24)" opacity="0.9" />
          <ellipse cx="64" cy="36" rx="12" ry="16" fill={color} transform="rotate(28 64 36)" opacity="0.9" />
          <ellipse cx="34" cy="50" rx="13" ry="17" fill={color} transform="rotate(-22 34 50)" opacity="0.9" />
          <ellipse cx="66" cy="64" rx="13" ry="17" fill={color} transform="rotate(22 66 64)" opacity="0.9" />
          <ellipse cx="38" cy="78" rx="11" ry="15" fill={color} transform="rotate(-15 38 78)" opacity="0.9" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="30" fill={color} />
        </svg>
      );
  }
};
