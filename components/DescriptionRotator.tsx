import React, { useState, useEffect } from 'react';

interface DescriptionRotatorProps {
  phrases: string[];
}

export const DescriptionRotator: React.FC<DescriptionRotatorProps> = ({ phrases }) => {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % phrases.length);
        setIsAnimating(false);
      }, 500); // Wait for exit animation
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    <div className="h-20 overflow-hidden relative">
      <div 
        className={`transition-all duration-500 transform ${
          isAnimating ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-lg font-medium">
          {phrases[index]}
        </p>
      </div>
    </div>
  );
};