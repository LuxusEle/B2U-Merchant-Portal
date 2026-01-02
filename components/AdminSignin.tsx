import React, { useState, useRef, useEffect } from 'react';

interface Props {
  show: boolean;
  onClose: () => void;
}

const AdminSignin: React.FC<Props> = ({ show, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signing, setSigning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!show) return;
    const onDocDown = (ev: MouseEvent) => {
      const target = ev.target as Node | null;
      if (panelRef.current && target && !panelRef.current.contains(target)) {
        setError(null);
        onClose();
      }
    };
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        setError(null);
        onClose();
      }
    };
    document.addEventListener('mousedown', onDocDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [show, onClose]);

  return (
    <div
      aria-hidden={!show}
      className={`absolute right-6 top-full mt-3 z-50 transform origin-top-right transition-all duration-200 ${show ? 'opacity-100 translate-y-2 scale-100 pointer-events-auto' : 'opacity-0 -translate-y-2 scale-95 pointer-events-none'}`}
    >
      <div ref={panelRef} className="w-80 glass-panel rounded-3xl p-6 md:p-6 shadow-2xl border border-white/30 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80">
        <div className="mb-4 text-left">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Admin Signin</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Enter your admin credentials</p>
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setError(null);
            if (!email.trim() || !password) {
              setError('Please enter email and password.');
              return;
            }
            setSigning(true);
            try {
              // Replace with real admin auth when available
              await new Promise((r) => setTimeout(r, 700));
              onClose();
              setEmail('');
              setPassword('');
            } catch (err) {
              setError('Sign in failed.');
            } finally {
              setSigning(false);
            }
          }}
        >
          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 ml-1 uppercase">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-b2u-blue/50 transition-all"
                placeholder="admin@b2u.app"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 ml-1 uppercase">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-b2u-blue/50 transition-all"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="text-xs font-semibold text-red-600 bg-red-50 dark:bg-red-900/30 border border-red-100 dark:border-red-800 rounded-xl px-3 py-2">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={signing}
                className="w-full bg-gradient-to-r from-slate-900 to-slate-800 dark:from-b2u-blue dark:to-b2u-cyan text-white font-bold py-2 rounded-xl hover:shadow-lg hover:shadow-b2u-blue/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 group mt-2 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                {signing ? 'Signing In...' : 'Sign In'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSignin;
