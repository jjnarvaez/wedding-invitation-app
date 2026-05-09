import React from 'react';

const CoffeePlantSVG = ({ color = "#6D3914", opacity = 1 }) => (
  <svg viewBox="0 0 320 900" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
    {/* main stem */}
    <path d="M160 880 Q155 750 158 620 Q162 490 155 360 Q150 240 162 100" stroke={color} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
    {/* secondary stems */}
    <path d="M158 700 Q130 680 100 660 Q70 640 45 610" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M160 700 Q190 678 220 658 Q248 638 270 605" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M156 560 Q120 538 88 515 Q60 492 40 462" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M160 560 Q196 536 228 514 Q258 490 278 460" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M157 420 Q128 398 100 372 Q76 348 62 315" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    <path d="M161 420 Q192 397 218 372 Q244 348 258 315" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    <path d="M158 285 Q136 264 115 240 Q96 218 88 188" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <path d="M162 285 Q184 263 204 238 Q224 215 230 183" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <path d="M159 165 Q144 148 132 128 Q120 108 118 82" stroke={color} strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    <path d="M163 165 Q178 147 188 126 Q200 106 200 80" stroke={color} strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    {/* leaves - LEFT SIDE (big, elliptical with center vein) */}
    {/* L1 */}
    <ellipse cx="72" cy="635" rx="40" ry="20" fill={color} opacity="0.6" transform="rotate(-30 72 635)"/>
    <path d="M100 620 Q72 635 44 650" stroke={color} strokeWidth="1" opacity="0.4" fill="none"/>
    <path d="M90 626 Q72 635 54 644" stroke={color} strokeWidth="0.7" opacity="0.3" fill="none"/>
    {/* L2 */}
    <ellipse cx="60" cy="490" rx="42" ry="19" fill={color} opacity="0.55" transform="rotate(-28 60 490)"/>
    <path d="M90 476 Q60 490 32 504" stroke={color} strokeWidth="1" opacity="0.38" fill="none"/>
    {/* L3 */}
    <ellipse cx="78" cy="340" rx="36" ry="16" fill={color} opacity="0.5" transform="rotate(-25 78 340)"/>
    <path d="M102 328 Q78 340 56 352" stroke={color} strokeWidth="0.9" opacity="0.35" fill="none"/>
    {/* L4 */}
    <ellipse cx="100" cy="210" rx="30" ry="13" fill={color} opacity="0.45" transform="rotate(-22 100 210)"/>
    {/* L5 */}
    <ellipse cx="122" cy="100" rx="22" ry="10" fill={color} opacity="0.4" transform="rotate(-18 122 100)"/>
    {/* leaves - RIGHT SIDE */}
    {/* R1 */}
    <ellipse cx="248" cy="630" rx="40" ry="20" fill={color} opacity="0.6" transform="rotate(30 248 630)"/>
    <path d="M220 615 Q248 630 276 645" stroke={color} strokeWidth="1" opacity="0.4" fill="none"/>
    {/* R2 */}
    <ellipse cx="258" cy="488" rx="42" ry="19" fill={color} opacity="0.55" transform="rotate(28 258 488)"/>
    <path d="M228 474 Q258 488 288 502" stroke={color} strokeWidth="1" opacity="0.38" fill="none"/>
    {/* R3 */}
    <ellipse cx="242" cy="338" rx="36" ry="16" fill={color} opacity="0.5" transform="rotate(25 242 338)"/>
    {/* R4 */}
    <ellipse cx="218" cy="208" rx="30" ry="13" fill={color} opacity="0.45" transform="rotate(22 218 208)"/>
    {/* R5 */}
    <ellipse cx="196" cy="98" rx="22" ry="10" fill={color} opacity="0.4" transform="rotate(18 196 98)"/>
    {/* coffee cherries clusters */}
    <circle cx="45" cy="612" r="5" fill={color} opacity="0.55"/>
    <circle cx="50" cy="620" r="4.5" fill={color} opacity="0.5"/>
    <circle cx="40" cy="620" r="4" fill={color} opacity="0.48"/>
    <circle cx="278" cy="607" r="5" fill={color} opacity="0.55"/>
    <circle cx="284" cy="615" r="4.5" fill={color} opacity="0.5"/>
    <circle cx="273" cy="615" r="4" fill={color} opacity="0.48"/>
    <circle cx="36" cy="462" r="4.5" fill={color} opacity="0.45"/>
    <circle cx="42" cy="469" r="4" fill={color} opacity="0.42"/>
    <circle cx="282" cy="460" r="4.5" fill={color} opacity="0.45"/>
    <circle cx="276" cy="468" r="4" fill={color} opacity="0.42"/>
    <circle cx="60" cy="316" r="4" fill={color} opacity="0.38"/>
    <circle cx="66" cy="323" r="3.5" fill={color} opacity="0.36"/>
    <circle cx="257" cy="316" r="4" fill={color} opacity="0.38"/>
    <circle cx="251" cy="323" r="3.5" fill={color} opacity="0.36"/>
  </svg>
);

export default CoffeePlantSVG;