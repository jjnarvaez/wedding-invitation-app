import React from 'react';

const CoffeeBranchSVG = () => (
  <svg viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 260 Q60 200 110 160 Q155 122 240 30" stroke="#AB7743" strokeWidth="2.5" fill="none"/>
    <path d="M20 260 Q80 218 100 170" stroke="#AB7743" strokeWidth="1.5" fill="none" opacity="0.7"/>
    <path d="M20 260 Q40 235 36 208 Q32 185 52 168" stroke="#84593D" strokeWidth="1.2" fill="none" opacity="0.6"/>
    {/* Leaves - inspired by reference: broad with veins */}
    <ellipse cx="110" cy="160" rx="28" ry="13" fill="#AB7743" opacity="0.5" transform="rotate(-35 110 160)"/>
    <path d="M130 148 Q110 160 90 172" stroke="#84593D" strokeWidth="0.8" fill="none" opacity="0.5"/>
    <path d="M124 152 Q110 160 96 168" stroke="#84593D" strokeWidth="0.6" fill="none" opacity="0.4"/>
    <ellipse cx="155" cy="125" rx="24" ry="11" fill="#AB7743" opacity="0.44" transform="rotate(-55 155 125)"/>
    <path d="M170 115 Q155 125 140 135" stroke="#84593D" strokeWidth="0.7" fill="none" opacity="0.4"/>
    <ellipse cx="80" cy="194" rx="26" ry="12" fill="#AB7743" opacity="0.42" transform="rotate(-18 80 194)"/>
    <path d="M96 187 Q80 194 64 201" stroke="#84593D" strokeWidth="0.7" fill="none" opacity="0.4"/>
    <ellipse cx="52" cy="168" rx="20" ry="9" fill="#84593D" opacity="0.38" transform="rotate(-50 52 168)"/>
    <ellipse cx="196" cy="85" rx="20" ry="9" fill="#AB7743" opacity="0.36" transform="rotate(-65 196 85)"/>
    {/* cherries */}
    <circle cx="32" cy="235" r="6" fill="#AB7743" opacity="0.48"/>
    <circle cx="40" cy="243" r="5" fill="#AB7743" opacity="0.44"/>
    <circle cx="26" cy="244" r="4.5" fill="#AB7743" opacity="0.4"/>
    <circle cx="90" cy="178" r="5" fill="#84593D" opacity="0.4"/>
    <circle cx="98" cy="185" r="4.5" fill="#84593D" opacity="0.36"/>
    <circle cx="170" cy="108" r="4" fill="#AB7743" opacity="0.35"/>
    <circle cx="177" cy="115" r="3.5" fill="#AB7743" opacity="0.32"/>
  </svg>
);

export default CoffeeBranchSVG;