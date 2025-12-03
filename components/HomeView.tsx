
import React from 'react';
import { QrCode, Server, Calendar, ArrowRight, TrendingUp, ShieldCheck, Globe, Users } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

interface HomeViewProps {
  onNavigate: (view: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[calc(100vh-140px)] py-12 gap-16 relative z-10">
      
      {/* Hero Header */}
      <div className="text-center space-y-6 max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 backdrop-blur-md shadow-sm">
          <Globe size={14} className="text-b2u-blue mr-2" />
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 tracking-wide uppercase">All-in-one Business Platform</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
          Empowering Sri Lanka's <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-b2u-blue via-b2u-cyan to-b2u-teal">
            Digital Transformation
          </span>
        </h1>
        
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          From street vendors to enterprise retail, B2U provides the essential infrastructure for modern commerce in the digital age.
        </p>
      </div>

      {/* Solutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl px-4">
        
        {/* Card 1: Merchant QR */}
        <div 
          onClick={() => onNavigate('merchant-qr')}
          className="group relative cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-b2u-blue/20 to-b2u-cyan/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative h-full glass-panel rounded-3xl p-8 border border-white/50 dark:border-slate-700 hover:border-b2u-blue/50 dark:hover:border-b2u-teal/50 transition-all duration-300 flex flex-col items-start gap-4 hover:-translate-y-1">
            
            {/* Header: Icon + Counter Horizontal */}
            <div className="w-full flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-b2u-blue/10 dark:bg-b2u-blue/20 flex items-center justify-center text-b2u-blue dark:text-b2u-cyan">
                  <QrCode size={28} />
                </div>
                <div className="flex flex-col items-end">
                    <AnimatedCounter 
                        end={20} 
                        duration={5000} 
                        repeatDelay={3000} 
                        className="text-3xl font-bold text-b2u-blue dark:text-b2u-cyan tabular-nums" 
                    />
                    <span className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider">Users</span>
                </div>
            </div>
            
            <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Merchant QR Solutions</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Accept LKR payments instantly via dynamic QR codes. Perfect for retail, tuk-tuks, and street vendors.
                </p>
            </div>
            
            <div className="mt-auto pt-4 flex items-center text-b2u-blue font-semibold text-sm group-hover:gap-2 transition-all">
              <span>Access Portal</span>
              <ArrowRight size={16} className="ml-1" />
            </div>
          </div>
        </div>

        {/* Card 2: ERP Solutions */}
        <div 
          onClick={() => onNavigate('erp')}
          className="group relative cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-b2u-blue/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative h-full glass-panel rounded-3xl p-8 border border-white/50 dark:border-slate-700 hover:border-purple-400/50 transition-all duration-300 flex flex-col items-start gap-4 hover:-translate-y-1">
            
            {/* Header: Icon + Counter Horizontal */}
            <div className="w-full flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <Server size={28} />
                </div>
                <div className="flex flex-col items-end">
                    <AnimatedCounter 
                        end={12} 
                        duration={5000} 
                        repeatDelay={3000} 
                        className="text-3xl font-bold text-purple-600 dark:text-purple-400 tabular-nums" 
                    />
                    <span className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider">Enterprises</span>
                </div>
            </div>

            <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">ERP Solutions</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Comprehensive Enterprise Resource Planning to manage inventory, payroll, and supply chains efficiently.
                </p>
            </div>
            
            <div className="mt-auto pt-4 flex items-center text-purple-600 dark:text-purple-400 font-semibold text-sm group-hover:gap-2 transition-all">
              <span>Learn More</span>
              <ArrowRight size={16} className="ml-1" />
            </div>
          </div>
        </div>

        {/* Card 3: Online Booking */}
        <div 
          onClick={() => onNavigate('booking')}
          className="group relative cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-b2u-teal/20 to-emerald-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative h-full glass-panel rounded-3xl p-8 border border-white/50 dark:border-slate-700 hover:border-b2u-teal/50 transition-all duration-300 flex flex-col items-start gap-4 hover:-translate-y-1">
            
            {/* Header: Icon + Counter Horizontal */}
            <div className="w-full flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-b2u-teal/10 dark:bg-b2u-teal/20 flex items-center justify-center text-b2u-teal">
                  <Calendar size={28} />
                </div>
                <div className="flex flex-col items-end">
                    <AnimatedCounter 
                        end={5} 
                        duration={5000} 
                        repeatDelay={3000} 
                        className="text-3xl font-bold text-b2u-teal dark:text-emerald-400 tabular-nums" 
                    />
                    <span className="text-[10px] font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider">Bookings</span>
                </div>
            </div>

            <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Online Booking</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  Seamless reservation systems for hotels, restaurants, and service providers. Integrated payment gateways.
                </p>
            </div>
            
            <div className="mt-auto pt-4 flex items-center text-b2u-teal font-semibold text-sm group-hover:gap-2 transition-all">
              <span>Explore</span>
              <ArrowRight size={16} className="ml-1" />
            </div>
          </div>
        </div>

      </div>

      {/* Stats/Trust Bar */}
      <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 mt-4">
        <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-slate-200 dark:bg-slate-800">
                <ShieldCheck size={20} className="text-slate-600 dark:text-slate-400" />
            </div>
            <div className="flex flex-col">
                <span className="text-lg font-bold text-slate-900 dark:text-white">Bank Grade</span>
                <span className="text-xs text-slate-500">Security Standard</span>
            </div>
        </div>
        <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-slate-200 dark:bg-slate-800">
                <TrendingUp size={20} className="text-slate-600 dark:text-slate-400" />
            </div>
            <div className="flex flex-col">
                <span className="text-lg font-bold text-slate-900 dark:text-white">99.9%</span>
                <span className="text-xs text-slate-500">Uptime Guarantee</span>
            </div>
        </div>
      </div>

    </div>
  );
};
