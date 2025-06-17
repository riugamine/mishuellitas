'use client'

interface CurvedDividerProps {
  variant?: 'wave' | 'blob' | 'curve' | 'organic' | 'animated-wave';
  direction?: 'up' | 'down';
  color?: string;
  height?: number;
  className?: string;
}

export function CurvedDivider({ 
  variant = 'wave', 
  direction = 'down', 
  color = 'currentColor',
  height = 100,
  className = ''
}: CurvedDividerProps) {
  // Cyclic wave path: both ends at same height, extend 2px below
  const cyclicWavePath = direction === 'down'
    ? `M0,${height/2} C400,0 1200,${height} 1600,${height/2} L1600,${height+2} L0,${height+2} Z`
    : `M0,${height/2} C400,${height} 1200,0 1600,${height/2} L1600,-2 L0,-2 Z`;

  const paths = {
    wave: direction === 'down' 
      ? `M0,0 Q400,${height * 0.8} 800,${height * 0.3} T1600,${height * 0.2} L1600,0 Z`
      : `M0,${height} Q400,${height * 0.2} 800,${height * 0.7} T1600,${height * 0.8} L1600,${height} L0,${height} Z`,
    
    blob: direction === 'down'
      ? `M0,0 Q200,${height * 1.2} 600,${height * 0.6} Q1000,${height * 0.2} 1400,${height * 0.8} Q1600,${height * 0.6} 1600,0 Z`
      : `M0,${height} Q200,${height * -0.2} 600,${height * 0.4} Q1000,${height * 0.8} 1400,${height * 0.2} Q1600,${height * 0.4} 1600,${height} Z`,
    
    curve: direction === 'down'
      ? `M0,0 Q800,${height * 1.5} 1600,0 L1600,0 Z`
      : `M0,${height} Q800,${height * -0.5} 1600,${height} L0,${height} Z`,
    
    organic: direction === 'down'
      ? `M0,0 C300,${height * 1.3} 500,${height * 0.3} 800,${height * 0.7} C1100,${height * 1.1} 1300,${height * 0.2} 1600,${height * 0.5} L1600,0 Z`
      : `M0,${height} C300,${height * -0.3} 500,${height * 0.7} 800,${height * 0.3} C1100,${height * -0.1} 1300,${height * 0.8} 1600,${height * 0.5} L1600,${height} L0,${height} Z`,

    'animated-wave': cyclicWavePath
  };

  return (
    <div className={`relative w-full overflow-hidden ${className}`} style={{ height: `${height}px`, lineHeight: 0, padding: 0, margin: 0 }}>
      <svg
        className="absolute inset-0 w-full h-full block"
        viewBox={`0 0 1600 ${height}`}
        preserveAspectRatio="none"
        fill="none"
        style={{ display: 'block' }}
      >
        {variant === 'animated-wave' ? (
          <g className="animate-wave">
            <path d={paths[variant]} fill={color} />
            <path d={paths[variant]} fill={color} transform="translate(1600, 0)" />
          </g>
        ) : (
          <path
            d={paths[variant]}
            fill={color}
            className="animate-fade-in-up"
          />
        )}
      </svg>
    </div>
  );
} 