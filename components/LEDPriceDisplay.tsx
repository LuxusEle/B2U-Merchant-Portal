
import React from 'react';

const CHAR_MAP: Record<string, number[][]> = {
  '0': [[1,1,1],[1,0,1],[1,0,1],[1,0,1],[1,1,1]],
  '1': [[0,1,0],[1,1,0],[0,1,0],[0,1,0],[1,1,1]],
  '2': [[1,1,1],[0,0,1],[1,1,1],[1,0,0],[1,1,1]],
  '3': [[1,1,1],[0,0,1],[0,1,1],[0,0,1],[1,1,1]],
  '4': [[1,0,1],[1,0,1],[1,1,1],[0,0,1],[0,0,1]],
  '5': [[1,1,1],[1,0,0],[1,1,1],[0,0,1],[1,1,1]],
  '6': [[1,1,1],[1,0,0],[1,1,1],[1,0,1],[1,1,1]],
  '7': [[1,1,1],[0,0,1],[0,0,1],[0,0,1],[0,0,1]],
  '8': [[1,1,1],[1,0,1],[1,1,1],[1,0,1],[1,1,1]],
  '9': [[1,1,1],[1,0,1],[1,1,1],[0,0,1],[1,1,1]],
  '.': [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,1,0]],
  ',': [[0,0,0],[0,0,0],[0,0,0],[0,0,1],[0,1,0]],
};

const LEDDigit: React.FC<{ char: string }> = ({ char }) => {
  const grid = CHAR_MAP[char] || [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]];

  return (
    <div className="flex flex-col gap-[2px]">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-[2px]">
          {row.map((active, colIndex) => (
            <div
              key={colIndex}
              className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full transition-all duration-300 ${
                active 
                  ? 'bg-b2u-teal shadow-[0_0_8px_rgba(46,209,168,0.8)]' 
                  : 'bg-slate-300/20 dark:bg-slate-800'
              }`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

interface LEDPriceDisplayProps {
  amount: number;
  currency?: string;
}

export const LEDPriceDisplay: React.FC<LEDPriceDisplayProps> = ({ amount, currency = "LKR" }) => {
  const formatted = amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return (
    <div className="flex items-end gap-3 p-3 bg-black/5 dark:bg-black/40 rounded-xl border border-white/10 shadow-inner">
      <span className="text-sm font-bold text-b2u-blue mb-1">{currency}</span>
      <div className="flex gap-2">
        {formatted.split('').map((char, i) => (
          <LEDDigit key={`${i}-${char}`} char={char} />
        ))}
      </div>
    </div>
  );
};
