
import React, { useEffect, useState } from 'react';
import { AnimatedCounterProps } from '../types';

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  end, 
  duration = 2000, 
  prefix = '', 
  suffix = '',
  className = '',
  decimals = 0,
  repeatDelay = 0
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let timeoutId: ReturnType<typeof setTimeout>;

    const startAnimation = () => {
      let startTime: number | null = null;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        
        // Ease out quart
        const ease = 1 - Math.pow(1 - percentage, 4);
        
        setCount(ease * end);

        if (progress < duration) {
          animationFrameId = requestAnimationFrame(animate);
        } else if (repeatDelay > 0) {
          timeoutId = setTimeout(() => {
             setCount(0); // Reset
             // Small delay to ensure render at 0 before restarting? 
             // RequestAnimationFrame will pick it up on next frame essentially.
             requestAnimationFrame(() => {
                startAnimation(); // Restart
             });
          }, repeatDelay);
        }
      };

      animationFrameId = requestAnimationFrame(animate);
    };

    startAnimation();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
    };
  }, [end, duration, repeatDelay]);

  const formattedNumber = count.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span className={className}>
      {prefix}{formattedNumber}{suffix}
    </span>
  );
};
