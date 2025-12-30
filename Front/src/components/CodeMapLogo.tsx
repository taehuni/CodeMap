import React from 'react';

interface CodeMapLogoProps {
  variant?: 'default' | 'white';
  className?: string;
}

export default function CodeMapLogo({ variant = 'default', className = '' }: CodeMapLogoProps) {
  const primaryColor = variant === 'white' ? '#FFFFFF' : '#3B82F6';
  const secondaryColor = variant === 'white' ? '#FFFFFF' : '#8B5CF6';
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Road path going upward */}
        <path 
          d="M18 32 L18 12 M18 12 L12 18 M18 12 L24 18" 
          stroke={primaryColor} 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        {/* Code brackets */}
        <path 
          d="M10 8 L6 12 L10 16" 
          stroke={secondaryColor} 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M26 8 L30 12 L26 16" 
          stroke={secondaryColor} 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        {/* Location pin at top */}
        <circle cx="18" cy="6" r="3" fill={primaryColor} />
        <circle cx="18" cy="6" r="1.5" fill="white" />
      </svg>
      <span className={`text-xl ${variant === 'white' ? 'text-white' : 'text-gray-900'}`}>
        Code<span className={variant === 'white' ? 'text-white' : 'text-blue-500'}>Map</span>
      </span>
    </div>
  );
}
