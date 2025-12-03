import React from 'react';
import { Calendar, Clock, CreditCard, CheckCircle } from 'lucide-react';

export const BookingView: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[calc(100vh-140px)] py-12 relative z-10">
      <div className="glass-panel max-w-4xl w-full p-8 md:p-12 rounded-3xl border border-white/50 dark:border-slate-700 shadow-2xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-b2u-teal/10 rounded-xl text-b2u-teal">
            <Calendar size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Online Booking Engine</h1>
        </div>
        
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
            Accept reservations 24/7. Whether you run a hotel, a restaurant, or a salon, our booking engine ensures you never miss a customer.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/40 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
                    <Clock size={24} />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Real-time Availability</h3>
                <p className="text-xs text-slate-500">Live sync across your website and mobile app prevents double bookings.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/40 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-4">
                    <CreditCard size={24} />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Instant Payments</h3>
                <p className="text-xs text-slate-500">Collect deposits or full payments via B2U Wallet, Cards, or Bank Transfer.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/40 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 mb-4">
                    <CheckCircle size={24} />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Auto Confirmation</h3>
                <p className="text-xs text-slate-500">SMS and Email notifications sent automatically to you and your customer.</p>
            </div>
        </div>

        <button className="w-full py-4 rounded-xl bg-gradient-to-r from-b2u-teal to-b2u-cyan text-white font-bold text-lg hover:shadow-lg hover:scale-[1.01] transition-all">
            Schedule a Demo
        </button>
      </div>
    </div>
  );
};