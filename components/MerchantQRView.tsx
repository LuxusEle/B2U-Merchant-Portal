import React, { useState, useEffect } from 'react';
import { ArrowRight, Lock, MapPin } from 'lucide-react';
import { RaisedBalanceDisplay } from './RaisedBalanceDisplay';
import { DescriptionRotator } from './DescriptionRotator';
import { BackgroundGraph } from './BackgroundGraph';
import { AuthMode } from '../types';

export const MerchantQRView: React.FC = () => {
  const [authMode, setAuthMode] = useState<AuthMode>('signin');
  const [walletAmount, setWalletAmount] = useState(84392.50);
  const [transactionSource, setTransactionSource] = useState("Thambili Stall #4");
  const [showNotification, setShowNotification] = useState(false);
  const [lastIncrement, setLastIncrement] = useState(0);

  // Simulate Live Transactions
  useEffect(() => {
    const transactionSources = [
      "Kandy Spices", "Galle Face Vendor", 
      "Colombo TukTuk", "Lotus Tower Shop", "Jaffna Mangoes",
      "Sigiriya Souvenirs", "Tea Factory", "Pettah Market", "Hikkaduwa Surf"
    ];

    const triggerTransaction = () => {
        const amount = Math.floor(Math.random() * 5000) + 150;
        const source = transactionSources[Math.floor(Math.random() * transactionSources.length)];
        
        setShowNotification(true);
        setLastIncrement(amount);
        setTransactionSource(source);
        setWalletAmount(prev => prev + amount);

        setTimeout(() => setShowNotification(false), 2500);

        const nextDelay = Math.random() * 4000 + 2000;
        setTimeout(triggerTransaction, nextDelay);
    };

    const initialTimeout = setTimeout(triggerTransaction, 2000);
    return () => clearTimeout(initialTimeout);
  }, []);

  const phrases = [
    "The harmonic bridge between traditional commerce and digital payments.",
    "Instant LKR settlements for every coconut sold and tuk-tuk ride taken.",
    "Empowering Sri Lankan SMEs with next-gen financial tools.",
    "Join thousands of merchants scaling effortlessly with B2U."
  ];

  return (
    <div className="relative w-full flex flex-col lg:flex-row gap-8 lg:gap-20 items-center lg:items-center min-h-[calc(100vh-140px)]">
      
      {/* Background Graph specific to this view */}
      <BackgroundGraph />

      {/* Mobile Layout: Order 2 (Bottom) / Desktop Layout: Order 1 (Left) */}
      <div className="order-2 lg:order-1 flex-1 w-full flex flex-col items-center lg:items-start space-y-6 lg:space-y-10 relative z-10">
        
        {/* Hero Text */}
        <div className="text-center lg:text-left space-y-4 max-w-2xl transform scale-90 md:scale-100 origin-top">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-b2u-teal/10 border border-b2u-teal/20 text-b2u-teal text-[10px] md:text-xs font-bold tracking-wider uppercase backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-b2u-teal mr-2 animate-pulse shadow-[0_0_10px_rgba(46,209,168,0.5)]"></span>
            Merchant Portal Live
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
            Connect your business to the <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-b2u-blue via-b2u-cyan to-b2u-teal drop-shadow-sm">
              Digital Economy
            </span>
          </h1>
          
          <DescriptionRotator phrases={phrases} />
        </div>

        {/* Wallet Widget */}
        <div className="relative w-full max-w-md">
           <div className="relative overflow-hidden rounded-2xl border border-white/40 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl shadow-xl transition-transform duration-500 hover:scale-[1.02]">
              <div className="px-6 py-3 border-b border-slate-200/50 dark:border-slate-700/50 flex justify-between items-center bg-white/40 dark:bg-black/20">
                 <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-gradient-to-br from-b2u-blue to-b2u-cyan flex items-center justify-center text-white shadow">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>
                    </div>
                    <span className="font-semibold text-sm text-slate-700 dark:text-slate-200">Merchant Wallet</span>
                 </div>
                 <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-green-600 dark:text-green-400 uppercase">Live</span>
                 </div>
              </div>

              <div className="p-5 flex flex-col items-center bg-gradient-to-b from-transparent to-slate-50/50 dark:to-black/20">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Available Balance</p>
                 <RaisedBalanceDisplay amount={walletAmount} />
              </div>

              {/* Live Notification */}
              <div className={`mx-3 mb-3 p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-b2u-cyan/20 flex items-center gap-3 transition-all duration-500 transform ${showNotification ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                 <div className="p-1.5 rounded-full bg-b2u-teal/10 text-b2u-teal">
                    <ArrowRight size={12} />
                 </div>
                 <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-800 dark:text-white truncate">Incoming Transaction</p>
                    <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400">
                       <MapPin size={10} /> {transactionSource}
                    </div>
                 </div>
                 <div className="text-right">
                    <p className="text-sm font-bold text-b2u-teal">+{lastIncrement.toLocaleString()} LKR</p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Mobile Layout: Order 1 (Top) / Desktop Layout: Order 2 (Right) */}
      <div className="order-1 lg:order-2 w-full max-w-sm md:max-w-md mx-auto lg:mr-0 mb-4 lg:mb-0 relative z-20">
        <div className="glass-panel rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-black/50 border border-white/50 dark:border-slate-700 backdrop-blur-2xl relative transform transition-all duration-500 hover:shadow-2xl">
          
          <div className="mb-6 text-center lg:text-left">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
              {authMode === 'signin' ? 'Merchant Portal' : 'Join the Network'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm mt-1">
              {authMode === 'signin' 
                ? 'Secure login for registered businesses' 
                : 'Start accepting LKR payments today'}
            </p>
          </div>

          <form className="space-y-3 md:space-y-4" onSubmit={(e) => e.preventDefault()}>
            {authMode === 'signup' && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 ml-1 uppercase">Business Name</label>
                <input 
                  type="text" 
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-b2u-blue/50 focus:border-b2u-blue transition-all"
                  placeholder="e.g. Silva Stores"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 ml-1 uppercase">Email / Mobile</label>
              <input 
                type="text" 
                className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-b2u-blue/50 focus:border-b2u-blue transition-all"
                placeholder="contact@business.lk"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 ml-1 uppercase">Password</label>
                {authMode === 'signin' && (
                  <a href="#" className="text-xs font-medium text-b2u-blue hover:text-b2u-teal">Forgot?</a>
                )}
              </div>
              <div className="relative">
                <input 
                  type="password" 
                  className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-b2u-blue/50 focus:border-b2u-blue transition-all"
                  placeholder="••••••••"
                />
                <Lock className="absolute right-3 top-3 text-slate-400" size={16} />
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-slate-900 to-slate-800 dark:from-b2u-blue dark:to-b2u-cyan text-white font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-b2u-blue/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 group mt-2">
              {authMode === 'signin' ? 'Sign In' : 'Create Account'}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-4 md:mt-6 text-center">
            <button 
              onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
              className="text-xs md:text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-b2u-blue dark:hover:text-white transition-colors"
            >
              {authMode === 'signin' ? "New here? Create an account" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};