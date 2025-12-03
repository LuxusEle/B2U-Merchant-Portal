import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative w-10 h-10">
        {/* Abstract Bridge/Link Symbol */}
        <div className="absolute inset-0 bg-gradient-to-tr from-b2u-blue to-b2u-teal rounded-xl transform rotate-3"></div>
        <div className="absolute inset-0 bg-white/90 rounded-xl flex items-center justify-center border border-b2u-cyan/20">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="url(#logo_gradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <defs>
              <linearGradient id="logo_gradient" x1="7" y1="17" x2="17" y2="7" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2e57d1"/>
                <stop offset="1" stopColor="#2ed1a8"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-b2u-blue via-b2u-cyan to-b2u-teal tracking-tight">
        B2U
      </span>
    </div>
  );
};