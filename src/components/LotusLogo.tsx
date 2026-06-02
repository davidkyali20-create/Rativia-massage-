import React from 'react';

interface LotusLogoProps {
  className?: string;
  size?: number;
}

export default function LotusLogo({ className = 'text-gold-main', size = 48 }: LotusLogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="currentColor" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Central Flame / Teardrop Petal */}
      <path 
        d="M50 20 C56 36, 56 50, 50 64 C44 50, 44 36, 50 20 Z" 
        className="fill-current"
      />
      
      {/* Inner Right Petal */}
      <path 
        d="M53 28 C64 40, 62 55, 50 64 C60 55, 60 40, 53 28 Z" 
        className="opacity-90 fill-current"
      />
      
      {/* Inner Left Petal */}
      <path 
        d="M47 28 C36 40, 38 55, 50 64 C40 55, 40 40, 47 28 Z" 
        className="opacity-90 fill-current"
      />
      
      {/* Outer Right Petal */}
      <path 
        d="M55 36 C73 45, 68 62, 50 64 C64 61, 68 47, 55 36 Z" 
        className="opacity-75 fill-current"
      />
      
      {/* Outer Left Petal */}
      <path 
        d="M45 36 C27 45, 32 62, 50 64 C36 61, 32 47, 45 36 Z" 
        className="opacity-75 fill-current"
      />

      {/* Elegant Lotus Stem/Base Curves */}
      <path 
        d="M32 68 C45 66, 55 66, 68 68 C55 70, 45 70, 32 68 Z" 
        className="fill-current opacity-80"
      />
      
      {/* Base Little Leaf underlay */}
      <path 
        d="M42 69 C50 71, 50 76, 50 78 C50 76, 50 71, 42 69 Z" 
        className="fill-current opacity-70"
      />
      <path 
        d="M58 69 C50 71, 50 76, 50 78 C50 76, 50 71, 58 69 Z" 
        className="fill-current opacity-70"
      />
    </svg>
  );
}
