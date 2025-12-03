
import React, { useState, useEffect } from 'react';
import { QrCode, CheckCircle, ScanLine, Smartphone } from 'lucide-react';

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
    return () => {}; // Cleanup not strictly necessary for this simple loop
  }, []);

  return (
    <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto perspective-1000">
      {/* Phone Frame / Card Container */}
      <div className="relative w-full h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-slate-600 shadow-2xl flex items-center justify-center overflow-hidden transition-all duration-500 transform hover:scale-105">
        
        {/* Stage 1 & 2: QR Code */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${stage === 'success' ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}>
          <div className="relative p-4 bg-white rounded-xl shadow-sm">
             <QrCode size={100} className="text-slate-900" strokeWidth={1.5} />
             
             {/* Logo overlay in QR center */}
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                   <div className="w-5 h-5 bg-gradient-to-tr from-b2u-blue to-b2u-teal rounded-full animate-pulse" />
                </div>
             </div>
          </div>
        </div>

        {/* Stage 2: Scan Line */}
        {stage === 'scan' && (
          <div className="absolute inset-0 z-10 pointer-events-none">
            <div className="w-full h-1 bg-b2u-teal shadow-[0_0_15px_rgba(46,209,168,0.8)] absolute top-0 animate-[scan_1.5s_ease-in-out_infinite]" />
            <div className="absolute inset-0 bg-gradient-to-b from-b2u-teal/10 to-transparent animate-[scan_1.5s_ease-in-out_infinite] h-1/3" />
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
            <CheckCircle size={48} className="text-green-500 dark:text-green-400" />
          </div>
          <span className="text-lg font-bold text-slate-800 dark:text-white">Payment Sent!</span>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Transaction Verified</span>
        </div>

        {/* Bottom Text Hint */}
        <div className="absolute bottom-3 left-0 right-0 text-center">
           <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 ${stage === 'scan' ? 'text-b2u-blue animate-pulse' : 'text-slate-400'}`}>
             {stage === 'appear' ? 'Ready to Scan' : stage === 'scan' ? 'Scanning...' : 'Complete'}
           </span>
        </div>

      </div>

      {/* Floating Elements (Decorations) */}
      <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-b2u-blue to-b2u-cyan rounded-2xl opacity-20 rotate-12 animate-float" style={{ animationDelay: '0.5s' }} />
      <div className="absolute -bottom-2 -left-4 w-8 h-8 bg-b2u-teal rounded-full opacity-20 animate-float" style={{ animationDelay: '1.2s' }} />
    </div>
  );
};
