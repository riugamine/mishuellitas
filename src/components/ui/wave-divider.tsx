'use client'

import { motion } from 'framer-motion'

interface WaveDividerProps {
  className?: string;
  inverted?: boolean;
  color?: string;
}

export function WaveDivider({ className = '', inverted = false, color = '#4A90C2' }: WaveDividerProps) {
  return (
    <div className={`relative w-full h-24 overflow-hidden ${className}`} style={{ transform: inverted ? 'rotate(180deg)' : 'none' }}>
      <svg
        className="absolute bottom-0 left-0 w-full h-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Single clean wave */}
        <motion.path
          fill={color}
          fillOpacity="1"
          d="M0,160L60,165.3C120,171,240,181,360,165.3C480,149,600,107,720,106.7C840,107,960,149,1080,165.3C1200,181,1320,171,1380,165.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          animate={{
            d: [
              "M0,160L60,165.3C120,171,240,181,360,165.3C480,149,600,107,720,106.7C840,107,960,149,1080,165.3C1200,181,1320,171,1380,165.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z",
              "M0,160L60,154.7C120,149,240,139,360,154.7C480,171,600,213,720,213.3C840,213,960,171,1080,154.7C1200,139,1320,149,1380,154.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z",
              "M0,160L60,165.3C120,171,240,181,360,165.3C480,149,600,107,720,106.7C840,107,960,149,1080,165.3C1200,181,1320,171,1380,165.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            ]
          }}
          transition={{
            duration: 8,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </svg>
    </div>
  );
} 