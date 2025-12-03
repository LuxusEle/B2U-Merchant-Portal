import React from 'react';
import { Server, BarChart3, Users, Box } from 'lucide-react';

export const ERPView: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[calc(100vh-140px)] py-12 relative z-10">
      <div className="glass-panel max-w-4xl w-full p-8 md:p-12 rounded-3xl border border-white/50 dark:border-slate-700 shadow-2xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-purple-500/10 rounded-xl text-purple-600 dark:text-purple-400">
            <Server size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">B2U Enterprise ERP</h1>
        </div>
        
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
            Streamline your entire business operation from a single dashboard. Our cloud-native ERP solution is designed specifically for the dynamic needs of Sri Lankan enterprises.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
                <Box className="text-b2u-blue mt-1" size={20} />
                <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Inventory Management</h3>
                    <p className="text-sm text-slate-500 mt-1">Real-time tracking of stock levels, automated reordering, and multi-warehouse support.</p>
                </div>
            </div>
            <div className="p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
                <Users className="text-b2u-teal mt-1" size={20} />
                <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">HR & Payroll</h3>
                    <p className="text-sm text-slate-500 mt-1">Automated payroll processing, attendance tracking, and employee self-service portals.</p>
                </div>
            </div>
            <div className="p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
                <BarChart3 className="text-purple-500 mt-1" size={20} />
                <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Financial Analytics</h3>
                    <p className="text-sm text-slate-500 mt-1">Deep insights into cash flow, profit margins, and expense categorization.</p>
                </div>
            </div>
        </div>
        
        <div className="mt-8 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-100 dark:border-purple-800/30">
            <p className="text-center text-sm font-medium text-purple-800 dark:text-purple-300">
                Integration with B2U Wallet available for seamless vendor payments.
            </p>
        </div>
      </div>
    </div>
  );
};