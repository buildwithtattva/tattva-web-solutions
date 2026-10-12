'use client';

import React, { useEffect, useState } from 'react';

interface TattvaLogoProps {
  className?: string;
  size?: number;
  animated?: boolean;
  onAnimationComplete?: () => void;
}

export const TattvaLogo: React.FC<TattvaLogoProps> = ({
  className = '',
  size = 48,
  animated = false,
  onAnimationComplete,
}) => {
  const [isCompleted, setIsCompleted] = useState(!animated);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setIsCompleted(true);
        if (onAnimationComplete) onAnimationComplete();
      }, 1400);
      return () => clearTimeout(timer);
    }
  }, [animated, onAnimationComplete]);

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-500 hover:scale-105"
        aria-label="Tattva Web Solutions Logo"
      >
        <defs>
          {/* Liquid Chrome Linear & Radial Gradients */}
          <linearGradient id="tattvaChrome" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#cbd5e1" />
            <stop offset="50%" stopColor="#38bdf8" />
            <stop offset="75%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>

          <linearGradient id="tattvaGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>

          <filter id="chromeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Ring with stroke path animation */}
        <circle
          cx="50"
          cy="50"
          r="42"
          stroke="url(#tattvaChrome)"
          strokeWidth="3.5"
          strokeLinecap="round"
          className={animated ? 'animate-stroke-circle' : ''}
          style={
            animated
              ? {
                  strokeDasharray: 264,
                  strokeDashoffset: isCompleted ? 0 : 264,
                  transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                }
              : {}
          }
        />

        {/* Inner Abstract Liquid-Chrome Triangle / Polygon Path */}
        <polygon
          points="50,16 80,76 20,76"
          fill="none"
          stroke="url(#tattvaGold)"
          strokeWidth="3"
          strokeLinejoin="round"
          className={animated ? 'animate-stroke-poly' : ''}
          style={
            animated
              ? {
                  strokeDasharray: 210,
                  strokeDashoffset: isCompleted ? 0 : 210,
                  transition: 'stroke-dashoffset 1.3s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
                }
              : {}
          }
        />

        {/* Center Stylized 'T' Symbol */}
        <path
          d="M 32 34 H 68 M 50 34 V 68"
          stroke="url(#tattvaChrome)"
          strokeWidth="6"
          strokeLinecap="round"
          filter="url(#chromeGlow)"
          style={
            animated
              ? {
                  strokeDasharray: 80,
                  strokeDashoffset: isCompleted ? 0 : 80,
                  transition: 'stroke-dashoffset 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
                }
              : {}
          }
        />

        {/* Dynamic Sparkle Dots */}
        <circle cx="50" cy="16" r="3.5" fill="#ffffff" />
        <circle cx="80" cy="76" r="3.5" fill="#38bdf8" />
        <circle cx="20" cy="76" r="3.5" fill="#ec4899" />
      </svg>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center">
        <span className="font-extrabold tracking-wider text-xl leading-none bg-gradient-to-r from-white via-sky-200 to-indigo-300 bg-clip-text text-transparent">
          TATTVA
        </span>
        <span className="text-[10px] font-semibold tracking-[0.25em] text-sky-400 uppercase leading-tight mt-1">
          Web Solutions
        </span>
      </div>
    </div>
  );
};
