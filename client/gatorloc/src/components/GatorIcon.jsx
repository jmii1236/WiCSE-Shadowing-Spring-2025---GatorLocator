import React from 'react';

const GatorIcon = ({ color = "currentColor", size = 24, strokeWidth = 1.65, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* Main head shape */}
    <path d="M4 14c0-3 3-5 8-5s8 2 8 5" />

    {/* eyes */}
    <path d="M6 10c0-6 3-6 8-6s4 8 4.2 6" />
    <circle cx="10" cy="6.75" r="0.45" />
    <circle cx="14" cy="6.75" r="0.45" />
    
    {/* Bottom jaw */}
    <path d="M4 14c-1 0-2 1-2 2s1 2 2 2h16" />
    <path d="M20 14c1 0 2 1 2 2s-1 2 -2 2h-16" />
    
    {/* nostrils */}
    <circle cx="8" cy="13" r="0.75" />
    <circle cx="16" cy="13" r="0.75" />
    
    {/* Teeth */}
    <circle cx="8" cy="18.75" r="0.75" />
    <circle cx="16" cy="18.75" r="0.75" />
    {/* <path d="M6 16l1-1M10 16l1-1M14 16l1-1" /> */}
  </svg>
);

export default GatorIcon;
