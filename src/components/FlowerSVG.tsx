import React from 'react';

interface FlowerSVGProps {
  svgType: string;
  color: string;
  scale?: number;
}

export const FlowerSVG: React.FC<FlowerSVGProps> = ({ svgType, color }) => {
  const stemColor = '#708238';
  const leafColor = '#556B2F';

  switch (svgType) {
    case 'rose':
      return (
        <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-sm">
          {/* Stem & Leaves */}
          <path d="M50 80 L50 135" stroke={stemColor} strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M50 105 Q35 100 30 110 Q45 115 50 105" fill={leafColor} opacity="0.9" />
          <path d="M50 118 Q65 113 70 123 Q55 128 50 118" fill={leafColor} opacity="0.9" />
          {/* Outer Petals */}
          <circle cx="50" cy="50" r="28" fill={color} opacity="0.75" />
          <circle cx="42" cy="45" r="22" fill={color} opacity="0.85" />
          <circle cx="58" cy="45" r="22" fill={color} opacity="0.85" />
          <circle cx="50" cy="58" r="22" fill={color} opacity="0.85" />
          {/* Inner Swirl Petals */}
          <circle cx="50" cy="50" r="16" fill={color} opacity="0.95" />
          <path d="M44 50 Q50 38 56 50 Q50 62 44 50" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.6" />
          <circle cx="50" cy="50" r="8" fill="#E6A15C" opacity="0.8" />
        </svg>
      );

    case 'peony':
      return (
        <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-md">
          <path d="M50 85 L50 135" stroke={stemColor} strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M50 110 Q32 105 28 120 Q44 125 50 110" fill={leafColor} />
          {/* Voluminous ruffled petals */}
          <circle cx="50" cy="48" r="36" fill={color} opacity="0.6" />
          <circle cx="38" cy="45" r="26" fill={color} opacity="0.75" />
          <circle cx="62" cy="45" r="26" fill={color} opacity="0.75" />
          <circle cx="50" cy="60" r="26" fill={color} opacity="0.8" />
          <circle cx="50" cy="45" r="18" fill={color} opacity="0.95" />
          <circle cx="50" cy="45" r="10" fill="#FFF5EE" opacity="0.7" />
        </svg>
      );

    case 'ranunculus':
      return (
        <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-sm">
          <path d="M50 80 L50 135" stroke={stemColor} strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M50 100 Q65 95 68 108 Q52 112 50 100" fill={leafColor} />
          {/* Tightly layered concentric petals */}
          <circle cx="50" cy="50" r="24" fill={color} opacity="0.7" />
          <circle cx="50" cy="50" r="20" fill={color} opacity="0.8" />
          <circle cx="50" cy="50" r="15" fill={color} opacity="0.9" />
          <circle cx="50" cy="50" r="10" fill={color} opacity="1" />
          <circle cx="50" cy="50" r="5" fill="#2C1810" />
        </svg>
      );

    case 'tulip':
      return (
        <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-sm">
          <path d="M50 75 Q55 105 50 135" stroke={stemColor} strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M52 95 Q30 90 25 110 Q45 115 52 95" fill={leafColor} />
          {/* Elegant cup petals */}
          <path d="M30 65 Q30 30 50 35 Q70 30 70 65 Q70 85 50 80 Q30 85 30 65 Z" fill={color} opacity="0.9" />
          <path d="M40 65 Q40 40 50 42 Q60 40 60 65 Q60 78 50 75 Q40 78 40 65 Z" fill={color} opacity="0.7" />
        </svg>
      );

    case 'hydrangea':
      return (
        <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-md">
          <path d="M50 90 L50 135" stroke={stemColor} strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M50 115 Q30 110 25 125 Q45 130 50 115" fill={leafColor} />
          {/* Cluster of florets */}
          <circle cx="50" cy="45" r="30" fill={color} opacity="0.85" />
          <circle cx="35" cy="40" r="16" fill={color} opacity="0.9" />
          <circle cx="65" cy="40" r="16" fill={color} opacity="0.9" />
          <circle cx="50" cy="30" r="16" fill={color} opacity="0.9" />
          <circle cx="50" cy="60" r="16" fill={color} opacity="0.9" />
          <circle cx="38" cy="55" r="14" fill={color} opacity="0.95" />
          <circle cx="62" cy="55" r="14" fill={color} opacity="0.95" />
        </svg>
      );

    case 'anemone':
      return (
        <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-sm">
          <path d="M50 80 L50 135" stroke={stemColor} strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M50 110 Q68 105 72 118 Q55 124 50 110" fill={leafColor} />
          {/* Large flat petals */}
          <ellipse cx="50" cy="35" rx="10" ry="20" fill={color} />
          <ellipse cx="70" cy="45" rx="20" ry="10" fill={color} />
          <ellipse cx="70" cy="65" rx="18" ry="10" fill={color} transform="rotate(30 70 65)" />
          <ellipse cx="30" cy="45" rx="20" ry="10" fill={color} />
          <ellipse cx="30" cy="65" rx="18" ry="10" fill={color} transform="rotate(-30 30 65)" />
          <ellipse cx="50" cy="75" rx="10" ry="18" fill={color} />
          {/* Dark center */}
          <circle cx="50" cy="50" r="14" fill="#1A1A1A" />
          <circle cx="50" cy="50" r="6" fill="#3D2314" />
        </svg>
      );

    case 'eucalyptus':
      return (
        <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-sm">
          <path d="M50 20 L50 138" stroke={stemColor} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <ellipse cx="38" cy="35" rx="10" ry="14" fill={color} transform="rotate(-25 38 35)" opacity="0.9" />
          <ellipse cx="62" cy="50" rx="10" ry="14" fill={color} transform="rotate(25 62 50)" opacity="0.9" />
          <ellipse cx="38" cy="68" rx="11" ry="15" fill={color} transform="rotate(-20 38 68)" opacity="0.9" />
          <ellipse cx="62" cy="85" rx="11" ry="15" fill={color} transform="rotate(20 62 85)" opacity="0.9" />
          <ellipse cx="40" cy="105" rx="10" ry="14" fill={color} transform="rotate(-15 40 105)" opacity="0.9" />
        </svg>
      );

    case 'lavender':
      return (
        <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-sm">
          <path d="M50 30 L50 138" stroke={stemColor} strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Lavender spike buds */}
          {[35, 43, 51, 59, 67, 75, 83].map((y, idx) => (
            <g key={idx}>
              <ellipse cx="45" cy={y} rx="5" ry="3" fill={color} transform="rotate(-15 45 y)" />
              <ellipse cx="55" cy={y + 4} rx="5" ry="3" fill={color} transform="rotate(15 55 y)" />
            </g>
          ))}
        </svg>
      );

    case 'mimosa':
      return (
        <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-sm">
          <path d="M50 40 L50 138" stroke={stemColor} strokeWidth="2.5" fill="none" />
          {/* Fluffy yellow balls */}
          {[[42, 45], [58, 50], [40, 65], [60, 72], [45, 90], [55, 100], [50, 60]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="7" fill={color} opacity="0.9" />
          ))}
        </svg>
      );

    case 'daisy':
      return (
        <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-sm">
          <path d="M50 80 L50 138" stroke={stemColor} strokeWidth="2.5" fill="none" />
          <path d="M50 110 Q35 105 32 118 Q45 122 50 110" fill={leafColor} />
          {/* Daisy petals */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
            <ellipse key={i} cx="50" cy="50" rx="5" ry="18" fill={color} transform={`rotate(${deg} 50 50)`} />
          ))}
          <circle cx="50" cy="50" r="8" fill="#FFD700" />
        </svg>
      );

    case 'babysbreath':
      return (
        <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-sm">
          <path d="M50 30 L50 138" stroke={stemColor} strokeWidth="1.5" fill="none" />
          <path d="M50 60 Q30 50 25 40" stroke={stemColor} strokeWidth="1" fill="none" />
          <path d="M50 80 Q70 70 78 60" stroke={stemColor} strokeWidth="1" fill="none" />
          <path d="M50 100 Q30 90 22 80" stroke={stemColor} strokeWidth="1" fill="none" />
          {/* Tiny florets */}
          {[[25, 40], [20, 45], [30, 35], [78, 60], [83, 65], [72, 55], [22, 80], [17, 85], [28, 75], [50, 30], [45, 25], [55, 27], [50, 50], [42, 60], [58, 70]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="3" fill={color} opacity="0.95" />
          ))}
        </svg>
      );

    case 'orchid':
      return (
        <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-md">
          <path d="M50 40 Q55 90 50 138" stroke={stemColor} strokeWidth="3" fill="none" />
          {/* Exotic orchid petals */}
          <ellipse cx="50" cy="35" rx="14" ry="22" fill={color} opacity="0.9" />
          <ellipse cx="35" cy="55" rx="20" ry="12" fill={color} transform="rotate(-30 35 55)" opacity="0.85" />
          <ellipse cx="65" cy="55" rx="20" ry="12" fill={color} transform="rotate(30 65 55)" opacity="0.85" />
          <path d="M42 65 Q50 82 58 65 Q55 52 50 58 Q45 52 42 65 Z" fill="#8B008B" opacity="0.9" />
        </svg>
      );

    case 'lily':
      return (
        <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-md">
          <path d="M50 78 L50 138" stroke={stemColor} strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M50 105 Q32 100 28 116 Q45 120 50 105" fill={leafColor} />
          {/* 6 Elegant Flaring Petals */}
          <path d="M50 50 Q50 15 50 10 Q50 25 50 50" stroke={color} strokeWidth="16" strokeLinecap="round" fill="none" opacity="0.95" />
          <ellipse cx="50" cy="28" rx="8" ry="20" fill={color} />
          <ellipse cx="26" cy="38" rx="7" ry="18" fill={color} transform="rotate(-55 26 38)" opacity="0.9" />
          <ellipse cx="74" cy="38" rx="7" ry="18" fill={color} transform="rotate(55 74 38)" opacity="0.9" />
          <ellipse cx="30" cy="62" rx="8" ry="18" fill={color} transform="rotate(-115 30 62)" opacity="0.92" />
          <ellipse cx="70" cy="62" rx="8" ry="18" fill={color} transform="rotate(115 70 62)" opacity="0.92" />
          <ellipse cx="50" cy="70" rx="8" ry="18" fill={color} transform="rotate(180 50 70)" opacity="0.95" />
          {/* Center throat & stamens */}
          <circle cx="50" cy="50" r="7" fill="#8FA356" opacity="0.9" />
          <path d="M50 50 L42 34 M50 50 L58 34 M50 50 L38 52 M50 50 L62 52" stroke="#6B3E11" strokeWidth="1.2" />
          <circle cx="42" cy="34" r="2.2" fill="#8B4513" />
          <circle cx="58" cy="34" r="2.2" fill="#8B4513" />
          <circle cx="38" cy="52" r="2.2" fill="#8B4513" />
          <circle cx="62" cy="52" r="2.2" fill="#8B4513" />
        </svg>
      );

    case 'sunflower':
      return (
        <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-md">
          <path d="M50 78 L50 138" stroke={stemColor} strokeWidth="4.5" fill="none" strokeLinecap="round" />
          <path d="M50 108 Q24 98 18 118 Q42 124 50 108" fill={leafColor} />
          <path d="M50 120 Q76 110 82 130 Q58 136 50 120" fill={leafColor} />
          {/* Radiating Golden Ray Petals */}
          {[0, 24, 48, 72, 96, 120, 144, 168, 192, 216, 240, 264, 288, 312, 336].map((deg, i) => (
            <ellipse 
              key={i} 
              cx="50" 
              cy="50" 
              rx="6" 
              ry="26" 
              fill={i % 2 === 0 ? color : '#E5A910'} 
              transform={`rotate(${deg} 50 50)`} 
              opacity="0.95"
            />
          ))}
          {/* Seed Disc Core */}
          <circle cx="50" cy="50" r="16" fill="#3D2314" />
          <circle cx="50" cy="50" r="13" fill="#251408" />
          <circle cx="50" cy="50" r="9" fill="#180C05" />
          {/* Golden stipples */}
          <circle cx="50" cy="50" r="13" stroke="#D4AF37" strokeWidth="1" strokeDasharray="2 3" fill="none" opacity="0.7" />
          <circle cx="50" cy="50" r="7" stroke="#D4AF37" strokeWidth="1" strokeDasharray="1.5 2.5" fill="none" opacity="0.7" />
        </svg>
      );

    case 'zinnia':
      return (
        <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-sm">
          <path d="M50 80 L50 138" stroke={stemColor} strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M50 106 Q70 100 74 114 Q56 120 50 106" fill={leafColor} />
          {/* Outer ray florets */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
            <path
              key={`out-${i}`}
              d="M50 50 Q43 24 50 20 Q57 24 50 50 Z"
              fill={color}
              transform={`rotate(${deg} 50 50)`}
              opacity="0.85"
            />
          ))}
          {/* Inner dense ray florets */}
          {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((deg, i) => (
            <path
              key={`in-${i}`}
              d="M50 50 Q44 30 50 26 Q56 30 50 50 Z"
              fill={color}
              transform={`rotate(${deg} 50 50)`}
              opacity="0.95"
            />
          ))}
          {/* Tiny center ring and cone */}
          <circle cx="50" cy="50" r="11" fill="#4A2A0C" />
          <circle cx="50" cy="50" r="8" stroke="#FBD034" strokeWidth="2.2" strokeDasharray="2 2" fill="#7A4112" />
        </svg>
      );

    case 'carnation':
      return (
        <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-sm">
          <path d="M50 82 L50 138" stroke={stemColor} strokeWidth="3.2" fill="none" strokeLinecap="round" />
          {/* Calyx sepals */}
          <path d="M43 78 L50 86 L57 78 L54 68 L46 68 Z" fill={leafColor} />
          <path d="M50 108 Q30 102 26 116 Q45 120 50 108" fill={leafColor} />
          {/* Ruffled layered petals with serrated feel */}
          <circle cx="50" cy="48" r="28" fill={color} opacity="0.65" />
          <path d="M26 48 Q32 30 50 32 Q68 30 74 48 Q68 66 50 64 Q32 66 26 48 Z" fill={color} opacity="0.75" />
          <path d="M32 46 Q38 34 50 36 Q62 34 68 46 Q62 58 50 56 Q38 58 32 46 Z" fill={color} opacity="0.88" />
          <path d="M38 46 Q42 38 50 40 Q58 38 62 46 Q58 52 50 50 Q42 52 38 46 Z" fill={color} opacity="0.95" />
          <circle cx="50" cy="46" r="6" fill="#FFF2F2" opacity="0.5" />
        </svg>
      );

    case 'dahlia':
      return (
        <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-md">
          <path d="M50 82 L50 138" stroke={stemColor} strokeWidth="3.8" fill="none" strokeLinecap="round" />
          <path d="M50 108 Q72 102 76 118 Q56 122 50 108" fill={leafColor} />
          {/* Geometric multi-layered pointed petals */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
            <path
              key={`d1-${i}`}
              d="M50 50 L42 26 L50 18 L58 26 Z"
              fill={color}
              transform={`rotate(${deg} 50 50)`}
              opacity="0.8"
            />
          ))}
          {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((deg, i) => (
            <path
              key={`d2-${i}`}
              d="M50 50 L44 32 L50 24 L56 32 Z"
              fill={color}
              transform={`rotate(${deg} 50 50)`}
              opacity="0.9"
            />
          ))}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
            <path
              key={`d3-${i}`}
              d="M50 50 L46 38 L50 32 L54 38 Z"
              fill={color}
              transform={`rotate(${deg} 50 50)`}
              opacity="1"
            />
          ))}
          <circle cx="50" cy="50" r="5" fill="#4B1226" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 100 140" className="w-full h-full">
          <circle cx="50" cy="50" r="25" fill={color} />
        </svg>
      );
  }
};
