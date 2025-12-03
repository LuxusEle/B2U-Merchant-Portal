
import React, { useEffect, useState } from 'react';

export const CashFlowChart: React.FC = () => {
  const [visiblePoints, setVisiblePoints] = useState<number>(0);

  // Fake data: 6 months of increasing revenue
  const data = [15, 25, 40, 45, 60, 85];
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const maxVal = 100;

  useEffect(() => {
    const interval = setInterval(() => {
      setVisiblePoints(prev => (prev < data.length ? prev + 1 : prev));
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const getPoints = () => {
    return data.map((val, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - (val / maxVal) * 100;
      return `${x},${y}`;
    }).join(' ');
  };

  // Create area path
  const getAreaPath = () => {
    const points = data.slice(0, visiblePoints).map((val, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - (val / maxVal) * 100;
      return `${x},${y}`;
    });

    if (points.length === 0) return '';

    const firstPoint = points[0];
    const lastPoint = points[points.length - 1];
    // Need to close the loop for area
    // x of last point, y=100 (bottom)
    // x of first point, y=100 (bottom)
    
    // We need strict coordinate strings for SVG path
    const pathD = points.reduce((acc, point, i) => {
        return i === 0 ? `M ${point}` : `${acc} L ${point}`;
    }, '');

    // Close shape to bottom
    const [lastX] = lastPoint.split(',');
    const [firstX] = firstPoint.split(',');
    
    return `${pathD} L ${lastX},100 L ${firstX},100 Z`;
  };

  return (
    <div className="w-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl border border-white/40 dark:border-slate-700 rounded-2xl p-4 shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Monthly Cash Flow</h3>
        <span className="text-xs font-mono text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded">+24.5%</span>
      </div>
      
      <div className="relative h-24 w-full">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Grid lines */}
          <line x1="0" y1="25" x2="100" y2="25" className="stroke-slate-200 dark:stroke-slate-700" strokeWidth="0.5" strokeDasharray="2" />
          <line x1="0" y1="50" x2="100" y2="50" className="stroke-slate-200 dark:stroke-slate-700" strokeWidth="0.5" strokeDasharray="2" />
          <line x1="0" y1="75" x2="100" y2="75" className="stroke-slate-200 dark:stroke-slate-700" strokeWidth="0.5" strokeDasharray="2" />

          {/* Area Fill */}
          <path 
            d={getAreaPath()} 
            className="fill-b2u-teal/20 transition-all duration-500 ease-out" 
          />

          {/* Line */}
          <polyline 
            points={data.slice(0, visiblePoints).map((val, i) => {
               const x = (i / (data.length - 1)) * 100;
               const y = 100 - (val / maxVal) * 100;
               return `${x},${y}`;
            }).join(' ')}
            fill="none" 
            className="stroke-b2u-teal" 
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Dots */}
          {data.slice(0, visiblePoints).map((val, i) => {
            const x = (i / (data.length - 1)) * 100;
            const y = 100 - (val / maxVal) * 100;
            return (
              <circle 
                key={i} 
                cx={x} 
                cy={y} 
                r="1.5" 
                className="fill-white stroke-b2u-blue stroke-1 animate-ping"
              />
            );
          })}
        </svg>

        {/* X Axis Labels */}
        <div className="absolute top-full left-0 right-0 flex justify-between mt-1">
          {labels.map((l, i) => (
             <span key={i} className="text-[8px] text-slate-400 font-medium">{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
