import React from 'react';

const CoffeeLeaf = ({ size = 32, color = "#AB7743", rotate = 0 }) => (
  <svg width={size} height={size * 1.5} viewBox="0 0 40 60" fill="none" style={{ transform: `rotate(${rotate}deg)` }}>
    <ellipse cx="20" cy="30" rx="16" ry="26" fill={color} opacity="0.7"/>
    <path d="M20 4 Q24 15 24 30 Q24 45 20 56" stroke="rgba(245,237,215,0.4)" strokeWidth="1.2" fill="none"/>
    <path d="M20 18 Q26 22 28 30" stroke="rgba(245,237,215,0.25)" strokeWidth="0.8" fill="none"/>
    <path d="M20 18 Q14 22 12 30" stroke="rgba(245,237,215,0.25)" strokeWidth="0.8" fill="none"/>
    <path d="M20 30 Q26 33 28 38" stroke="rgba(245,237,215,0.22)" strokeWidth="0.8" fill="none"/>
    <path d="M20 30 Q14 33 12 38" stroke="rgba(245,237,215,0.22)" strokeWidth="0.8" fill="none"/>
  </svg>
);

export default CoffeeLeaf;