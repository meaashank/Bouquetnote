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

    default:
      return (
        <svg viewBox="0 0 100 140" className="w-full h-full">
          <circle cx="50" cy="50" r="25" fill={color} />
        </svg>
      );
  }
};
