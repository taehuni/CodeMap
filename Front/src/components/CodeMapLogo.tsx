import React from 'react';

interface CodeMapLogoProps {
  variant?: 'default' | 'white';
  className?: string;
}

export default function CodeMapLogo({ variant = 'default', className = '' }: CodeMapLogoProps) {
  const bracketColor = variant === 'white' ? '#FFFFFF' : '#3B82F6';
  const pathColor = variant === 'white' ? '#FFFFFF' : '#10B981';
  const textColor = variant === 'white' ? '#FFFFFF' : '#111827';
  
  return (
    <svg width="180" height="48" viewBox="0 0 180 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g transform="translate(0, 0)">
        <path d="M16 8C16 8 12 8 12 12V18C12 20 10 20 8 20C10 20 12 20 12 22V28C12 32 16 32 16 32" stroke={bracketColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M28 8C28 8 32 8 32 12V18C32 20 34 20 36 20C34 20 32 20 32 22V28C32 32 28 32 28 32" stroke={bracketColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <path d="M22 36L22 30M22 30L22 24M22 24L19 21M22 24L25 21" stroke={pathColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="22" cy="36" r="1.5" fill={pathColor}/>
        <circle cx="22" cy="30" r="1.5" fill={pathColor}/>
        <circle cx="22" cy="24" r="2" fill={pathColor}/>
      </g>
      <text x="50" y="31" fontFamily="Inter, Pretendard, sans-serif" fontWeight="700" fontSize="24" fill={textColor} letterSpacing="-0.5">CodeMap</text>
    </svg>
  );
}
