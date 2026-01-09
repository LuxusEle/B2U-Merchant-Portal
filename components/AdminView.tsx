import React from 'react';

const AdminView: React.FC = () => {
  const cargillsLink = (import.meta as any).env?.VITE_CARGILLS_PRESENTATION_LINK || 'https://cargills.vercel.app';
  return (
    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 py-12">
      <div className="glass-panel rounded-3xl p-10 shadow-lg border border-white/20 dark:border-slate-800 text-center space-y-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">THIS IS ADMIN PAGE</h1>
        <p className="text-slate-600 dark:text-slate-300">Access the Cargills presentation web app.</p>
        <div>
          <a
            href={cargillsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-b2u-blue via-b2u-cyan to-b2u-teal text-white font-bold shadow-lg hover:shadow-b2u-cyan/40 transition-transform hover:scale-105"
          >
            Open Cargills Presentation
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 3h7m0 0v7m0-7L10 14" /></svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminView;
