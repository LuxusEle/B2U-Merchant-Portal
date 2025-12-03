
import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

export const MockQRTransaction: React.FC = () => {
  const [stage, setStage] = useState<'appear' | 'scan' | 'success'>('appear');

  useEffect(() => {
    const runSequence = () => {
      setStage('appear');
      
      // Start scanning after 1s
      setTimeout(() => {
        setStage('scan');
      }, 1000);

      // Success after scanning for 2s (total 3s)
      setTimeout(() => {
        setStage('success');
      }, 3000);

      // Reset sequence after success for 2.5s (total 5.5s)
      setTimeout(() => {
        runSequence(); // Loop
      }, 5500);
    };

    runSequence();
    return () => {};
  }, []);

  return (
    <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto perspective-1000">
      {/* Phone Frame / Card Container */}
      <div className="relative w-full h-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-slate-600 shadow-2xl flex items-center justify-center overflow-hidden transition-all duration-500 transform hover:scale-105">
        
        {/* Stage 1 & 2: QR Code */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${stage === 'success' ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}>
          <div className="relative p-3 bg-white rounded-xl shadow-sm border border-slate-100">
             
             {/* Complex QR SVG */}
             <svg width="140" height="140" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-slate-900">
                {/* 3 Corner Markers */}
                <path d="M0 0H30V30H0V0ZM5 5V25H25V5H5Z" fill="currentColor"/>
                <rect x="10" y="10" width="10" height="10" fill="currentColor"/>
                
                <path d="M70 0H100V30H70V0ZM75 5V25H95V5H75Z" fill="currentColor"/>
                <rect x="80" y="10" width="10" height="10" fill="currentColor"/>
                
                <path d="M0 70H30V100H0V70ZM5 75V95H25V75H5Z" fill="currentColor"/>
                <rect x="10" y="80" width="10" height="10" fill="currentColor"/>

                {/* Random Data Patterns */}
                <rect x="35" y="0" width="5" height="5" fill="currentColor"/>
                <rect x="45" y="0" width="5" height="15" fill="currentColor"/>
                <rect x="55" y="0" width="5" height="5" fill="currentColor"/>
                <rect x="65" y="0" width="5" height="5" fill="currentColor"/>
                <rect x="35" y="10" width="15" height="5" fill="currentColor"/>
                <rect x="55" y="10" width="5" height="5" fill="currentColor"/>
                <rect x="40" y="20" width="5" height="5" fill="currentColor"/>
                <rect x="50" y="20" width="20" height="5" fill="currentColor"/>
                
                <rect x="0" y="35" width="5" height="5" fill="currentColor"/>
                <rect x="10" y="35" width="20" height="5" fill="currentColor"/>
                <rect x="35" y="35" width="5" height="5" fill="currentColor"/>
                <rect x="45" y="35" width="5" height="5" fill="currentColor"/>
                <rect x="55" y="35" width="5" height="5" fill="currentColor"/>
                <rect x="65" y="35" width="15" height="5" fill="currentColor"/>
                <rect x="85" y="35" width="15" height="5" fill="currentColor"/>

                <rect x="0" y="45" width="5" height="15" fill="currentColor"/>
                <rect x="10" y="45" width="5" height="5" fill="currentColor"/>
                <rect x="20" y="45" width="10" height="5" fill="currentColor"/>
                <rect x="80" y="45" width="20" height="5" fill="currentColor"/>

                <rect x="35" y="70" width="5" height="20" fill="currentColor"/>
                <rect x="45" y="70" width="15" height="5" fill="currentColor"/>
                <rect x="65" y="70" width="5" height="20" fill="currentColor"/>
                <rect x="75" y="70" width="25" height="5" fill="currentColor"/>
                <rect x="45" y="80" width="5" height="5" fill="currentColor"/>
                <rect x="55" y="80" width="5" height="15" fill="currentColor"/>
                <rect x="80" y="80" width="10" height="10" fill="currentColor"/>
                <rect x="95" y="80" width="5" height="20" fill="currentColor"/>
             </svg>
             
             {/* LankaQR Logo Overlay */}
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white px-3 py-1.5 rounded-xl shadow-lg border border-slate-100 flex flex-col items-center justify-center">
                   
                   {/* Graphic Logo */}
                   <svg width="48" height="42" viewBox="0 0 100 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Red Part (Left Hook) */}
                      <path d="M30 80 L 30 50 L 55 25" stroke="#B91C1C" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M25 80 H 55" stroke="#B91C1C" strokeWidth="8" strokeLinecap="round"/>
                      
                      {/* Orange Part (Box Q) */}
                      <rect x="40" y="35" width="35" height="35" rx="8" stroke="#F97316" strokeWidth="7" fill="white"/>
                      <rect x="48" y="43" width="7" height="7" fill="#F97316"/>
                      <rect x="60" y="43" width="7" height="7" fill="#F97316"/>
                      <rect x="48" y="55" width="7" height="7" fill="#F97316"/>
                      <rect x="60" y="55" width="7" height="7" fill="#F97316"/>
                      
                      {/* Green Part (Right Z) */}
                      <path d="M85 30 V 50 L 95 75" stroke="#15803D" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
                   </svg>

                   {/* Text Logo */}
                   <div className="flex items-baseline gap-0.5 mt-0.5">
                      <span className="text-[12px] font-black tracking-tighter text-[#1e1b4b] leading-none">LANKA</span>
                      <span className="text-[12px] font-black tracking-tighter text-[#B91C1C] leading-none">QR</span>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Stage 2: Scan Line */}
        {stage === 'scan' && (
          <div className="absolute inset-0 z-10 pointer-events-none">
            {/* Reddish scan line for LankaQR theme */}
            <div className="w-full h-1 bg-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.8)] absolute top-0 animate-[scan_1.5s_ease-in-out_infinite]" />
            <div className="absolute inset-0 bg-gradient-to-b from-red-500/10 to-transparent animate-[scan_1.5s_ease-in-out_infinite] h-1/3" />
            <style>{`
              @keyframes scan {
                0% { top: 10%; opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { top: 90%; opacity: 0; }
              }
            `}</style>
          </div>
        )}

        {/* Stage 3: Success Tick */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center gap-2 transition-all duration-500 transform ${stage === 'success' ? 'opacity-100 scale-100' : 'opacity-0 scale-150'}`}>
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full mb-1 ring-4 ring-green-50 dark:ring-green-900/10 animate-bounce">
            <CheckCircle size={48} className="text-green-600 dark:text-green-400" />
          </div>
          <span className="text-xl font-bold text-slate-800 dark:text-white">Payment Success!</span>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Transaction Verified</span>
        </div>

        {/* Bottom Text Hint */}
        <div className="absolute bottom-3 left-0 right-0 text-center">
           <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${stage === 'scan' ? 'text-red-500 animate-pulse' : 'text-slate-400'}`}>
             {stage === 'appear' ? 'Scan LankaQR' : stage === 'scan' ? 'Processing...' : 'Complete'}
           </span>
        </div>

      </div>

      {/* Floating Elements (Decorations) */}
      <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl opacity-10 rotate-12 animate-float" style={{ animationDelay: '0.5s' }} />
      <div className="absolute -bottom-2 -left-4 w-8 h-8 bg-b2u-teal rounded-full opacity-20 animate-float" style={{ animationDelay: '1.2s' }} />
    </div>
  );
};
