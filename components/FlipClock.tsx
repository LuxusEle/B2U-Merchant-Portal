import React, { memo } from 'react';

interface FlipDigitProps {
  digit: string;
}

const FlipDigit: React.FC<FlipDigitProps> = memo(({ digit }) => {
  return (
    <div className="relative w-6 h-9 md:w-8 md:h-12 bg-slate-800 rounded-md overflow-hidden shadow-lg border border-slate-700 mx-[1px]">
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl md:text-2xl font-mono font-bold text-white z-10">{digit}</span>
      </div>
      {/* Glossy overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-black/30 z-20" />
    </div>
  );
});

interface FlipClockProps {
  amount: number;
  currency?: string;
}

export const FlipClock: React.FC<FlipClockProps> = ({ amount, currency = "LKR" }) => {
  const formatted = amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return (
    <div className="flex items-center gap-1 md:gap-2">
      <span className="text-xs md:text-sm font-bold text-slate-400 mr-1 md:mr-2 tracking-widest">{currency}</span>
      <div className="flex items-center">
        {formatted.split('').map((char, i) => (
          char === '.' || char === ',' ? (
            <span key={i} className="text-slate-400 font-bold mx-0.5 mb-2">{char}</span>
          ) : (
            <FlipDigit key={`${i}-${char}`} digit={char} />
          )
        ))}
      </div>
    </div>
  );
};