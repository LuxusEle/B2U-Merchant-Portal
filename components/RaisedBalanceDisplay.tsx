
import React from 'react';

interface Props {
  amount: number;
  currency?: string;
}

export const RaisedBalanceDisplay: React.FC<Props> = ({ amount, currency = "LKR" }) => {
  const formatted = amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
  
  return (
    <div className="flex items-baseline gap-3 pb-2">
      <span className="text-lg font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider transform -translate-y-1">{currency}</span>
      <span 
        className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white font-mono tracking-tight"
        style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.15)' }}
      >
        {formatted}
      </span>
    </div>
  );
};
