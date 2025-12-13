
import React, { useState, useEffect } from 'react';
import { ArrowRight, Lock, MapPin, FileText, ChevronLeft, ChevronRight, X, Maximize2, Globe } from 'lucide-react';
import { RaisedBalanceDisplay } from './RaisedBalanceDisplay';
import { DescriptionRotator } from './DescriptionRotator';
import { BackgroundGraph } from './BackgroundGraph';
import SpaceNetwork from './SpaceNetwork';
import { AuthMode } from '../types';
import { AnimatedCounter } from './AnimatedCounter';
import { MockQRTransaction } from './MockQRTransaction';
import { loginWithPin, qrBaseUrl } from '../lib/authClient';

const LAST_SIGNIN_IDENTIFIER_KEY = 'b2u:last-signin-identifier';

const referenceData = [
  {
    id: 1,
    title: "Who We Are",
    content: (
      <div className="space-y-6">
        <p className="text-xl md:text-2xl font-medium text-slate-800 dark:text-slate-100 leading-relaxed">
          <strong className="text-b2u-blue dark:text-b2u-teal">B2U.App</strong> is a Sri Lankan fintech startup focused on increasing LankaQR usage, merchant transaction volume, and driving national digital transformation.
        </p>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          We support banks by onboarding underperforming merchants and increasing QR transaction adoption.
        </p>
      </div>
    )
  },
  {
    id: 2,
    title: "Market Problem We Address",
    content: (
      <div className="space-y-6">
        <p className="text-lg text-slate-600 dark:text-slate-300">Many merchants receive QR codes from banks, but face significant challenges:</p>
        <ul className="list-disc pl-6 space-y-3 text-lg text-slate-700 dark:text-slate-200">
          <li>Monthly transactions are often <strong>below Rs. 20,000</strong></li>
          <li>Customer adoption remains low</li>
          <li>Heavy dependency on cash persists</li>
          <li>Banks incur costs issuing QR codes with <strong>low ROI</strong></li>
          <li>Public awareness of digital payments is limited</li>
        </ul>
        <p className="text-xl font-bold text-b2u-blue mt-4">B2U.App bridges this gap.</p>
      </div>
    )
  },
  {
    id: 3,
    title: "Our Value Proposition",
    content: (
      <div className="space-y-6">
        <p className="text-lg text-slate-600 dark:text-slate-300">We increase QR transaction usage by providing:</p>
        <ul className="space-y-4">
          {[
            "Ability to create Dynamic QR codes",
            "Real-time verification via bank APIs",
            "Instant transaction notifications",
            "Increased trust & convenience",
            "Driving customer digital payment usage"
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-b2u-teal shadow-[0_0_10px_rgba(46,209,168,0.5)]" />
              <span className="text-lg text-slate-700 dark:text-slate-200">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    )
  },
  {
    id: 4,
    title: "How B2U.App Works",
    content: (
      <div className="space-y-6">
        <ol className="list-decimal pl-6 space-y-3 text-lg text-slate-700 dark:text-slate-200 marker:text-b2u-blue dark:marker:text-b2u-teal marker:font-bold">
          <li>Bank issues <strong>LankaQR</strong></li>
          <li>Bank shares <strong>merchant list</strong> and <strong>verification API</strong></li>
          <li>B2U.App activates merchant on the platform</li>
          <li>Merchant creates <strong>Dynamic QR</strong></li>
          <li>Customer pays via their preferred app</li>
          <li>B2U.App verifies payment with bank</li>
          <li>Merchant receives <strong>real-time confirmation</strong></li>
          <li>Transaction reflects instantly in bank system</li>
        </ol>
      </div>
    )
  },
  {
    id: 5,
    title: "Benefits to Merchants",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {[
          "No need for petty cash or coins",
          "Eliminates losses on small transactions",
          "Real-time credit to account",
          "Verified transactions improve trust",
          "Cashflow visibility → easier loans",
          "Reduced card commission cost (save 3%)",
          "Extra revenue opportunities",
          "Easy payments for foreign customers",
          "Zero fraud risk"
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3 text-base md:text-lg text-slate-700 dark:text-slate-200">
            <div className="mt-2 w-1.5 h-1.5 rounded-full bg-b2u-blue shrink-0" />
            {item}
          </div>
        ))}
      </div>
    )
  },
  {
    id: 6,
    title: "Benefits to Customers",
    content: (
      <ul className="space-y-5 text-lg text-slate-700 dark:text-slate-200">
        <li className="flex items-center gap-4 p-4 rounded-xl bg-white/30 dark:bg-white/5 border border-white/20">
          <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/40 text-green-600"><ArrowRight size={18} /></div>
          No need to carry cash or cards
        </li>
        <li className="flex items-center gap-4 p-4 rounded-xl bg-white/30 dark:bg-white/5 border border-white/20">
          <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/40 text-green-600"><ArrowRight size={18} /></div>
          Seamless digital transactions
        </li>
        <li className="flex items-center gap-4 p-4 rounded-xl bg-white/30 dark:bg-white/5 border border-white/20">
          <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/40 text-green-600"><ArrowRight size={18} /></div>
          Fast, secure, authenticated payments
        </li>
        <li className="flex items-center gap-4 p-4 rounded-xl bg-white/30 dark:bg-white/5 border border-white/20">
          <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/40 text-green-600"><ArrowRight size={18} /></div>
          Confidence when paying verified merchants
        </li>
      </ul>
    )
  },
  {
    id: 7,
    title: "Benefits to Banks",
    content: (
      <ul className="space-y-4 text-lg text-slate-700 dark:text-slate-200">
        <li>• New business brought through B2U.App</li>
        <li>• Reduced cash risk, cost & transport requirements</li>
        <li>• Reduced operational overhead</li>
        <li>• Clear customer/merchant transaction insights</li>
        <li className="font-bold text-b2u-blue dark:text-b2u-teal text-xl p-2 bg-b2u-blue/5 rounded-lg">• Approx. 1% interchange revenue per QR transaction</li>
        <li>• Increased low-cost deposits (CASA)</li>
        <li>• Stronger digital presence</li>
      </ul>
    )
  },
  {
    id: 8,
    title: "Benefits to CBSL",
    content: (
      <div className="space-y-6">
        <p className="text-xl text-slate-700 dark:text-slate-200 font-medium">Supporting national interests through:</p>
        <ul className="list-disc pl-6 space-y-3 text-lg text-slate-600 dark:text-slate-300">
          <li>Reduced cash printing & circulation cost</li>
          <li>Lower cost of physical currency replacement</li>
          <li>Supports national digital transformation</li>
          <li>Increases LankaQR penetration</li>
        </ul>
      </div>
    )
  },
  {
    id: 9,
    title: "Benefits to Government",
    content: (
      <ul className="space-y-4 text-lg text-slate-700 dark:text-slate-200">
        <li className="p-3 border-l-4 border-b2u-blue bg-white/30 dark:bg-slate-800/30">Lower nationwide currency management cost</li>
        <li className="p-3 border-l-4 border-b2u-cyan bg-white/30 dark:bg-slate-800/30">Improved tax visibility via income pattern recognition</li>
        <li className="p-3 border-l-4 border-b2u-teal bg-white/30 dark:bg-slate-800/30">No commissions paid to foreign networks (Visa/Master)</li>
        <li className="p-3 border-l-4 border-purple-500 bg-white/30 dark:bg-slate-800/30">Improved transparency and financial traceability</li>
      </ul>
    )
  },
  {
    id: 10,
    title: "Environmental Benefits",
    content: (
      <div className="flex flex-col gap-6 justify-center h-full">
        <div className="p-8 rounded-2xl bg-green-50 dark:bg-emerald-900/20 border border-green-100 dark:border-emerald-800/50 flex flex-col items-center text-center">
          <Globe size={48} className="text-green-600 dark:text-emerald-400 mb-4" />
          <p className="text-2xl font-bold text-green-800 dark:text-emerald-300">Reduced physical cash <br />= lower carbon footprint</p>
        </div>
        <ul className="space-y-3 text-lg text-center text-slate-700 dark:text-slate-300">
          <li>Supports green, sustainable financial initiatives</li>
          <li>Contributes to a digital, eco-friendly Sri Lanka</li>
        </ul>
      </div>
    )
  },
  {
    id: 11,
    title: "Request from Bank",
    content: (
      <div className="space-y-6">
        <p className="text-xl text-slate-600 dark:text-slate-300">To enable B2U.App, we request:</p>
        <div className="grid gap-4">
          <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-600 bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm flex items-center gap-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white font-bold">1</span>
            <span className="text-lg"><strong>Merchant list</strong> (registered LankaQR merchants)</span>
          </div>
          <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-600 bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm flex items-center gap-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white font-bold">2</span>
            <span className="text-lg"><strong>API access</strong> for transaction verification</span>
          </div>
          <div className="p-6 rounded-xl border border-slate-200 dark:border-slate-600 bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm flex items-center gap-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white font-bold">3</span>
            <span className="text-lg">Basic integration assistance from digital team</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 12,
    title: "Primary Target Segments",
    content: (
      <div className="flex flex-wrap gap-3 content-center h-full">
        {[
          "Ride-hailing drivers", "Delivery riders", "Small retailers",
          "Food stalls", "Professional services", "Parking sector",
          "Transport sector", "Micro businesses"
        ].map((tag, i) => (
          <span key={i} className="px-5 py-3 rounded-xl bg-white/50 dark:bg-slate-800/50 text-slate-800 dark:text-b2u-cyan text-lg font-medium border border-slate-200 dark:border-slate-700 shadow-sm">
            {tag}
          </span>
        ))}
      </div>
    )
  },
  {
    id: 13,
    title: "Why Partner With B2U?",
    content: (
      <ul className="space-y-5">
        {[
          "Expertise in Sri Lankan fintech ecosystem",
          "Fully aligned with CBSL’s digital roadmap",
          "Strong capability to drive QR transaction growth",
          "No operational burden to the bank",
          "Shared vision for a cashless Sri Lanka"
        ].map((item, i) => (
          <li key={i} className="flex items-center gap-4 text-xl text-slate-700 dark:text-slate-200 p-2">
            <div className="w-3 h-3 bg-b2u-teal rotate-45 shrink-0 shadow-[0_0_8px_rgba(46,209,168,0.8)]" />
            {item}
          </li>
        ))}
      </ul>
    )
  }
];

const qrDestination = `${qrBaseUrl}/generate-qr`;

export const MerchantQRView: React.FC = () => {
  const [authMode, setAuthMode] = useState<AuthMode>('signin');
  const [walletAmount, setWalletAmount] = useState(84392.50);
  const [totalVolume, setTotalVolume] = useState(1250450.00);
  const [transactionCount, setTransactionCount] = useState(142);
  const [transactionSource, setTransactionSource] = useState("Thambili Stall #4");
  const [showNotification, setShowNotification] = useState(false);
  const [lastIncrement, setLastIncrement] = useState(0);
  const [activeRefIndex, setActiveRefIndex] = useState<number | null>(null);
  const [identifier, setIdentifier] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [signing, setSigning] = useState(false);

  useEffect(() => {
    setError(null);
    setSigning(false);
  }, [authMode]);

  useEffect(() => {
    if (authMode !== 'signin') return;
    try {
      const savedIdentifier = localStorage.getItem(LAST_SIGNIN_IDENTIFIER_KEY);
      if (savedIdentifier) {
        setIdentifier(savedIdentifier);
      }
    } catch (storageError) {
      console.warn('Unable to read stored sign-in identifier', storageError);
    }
  }, [authMode]);

  useEffect(() => {
    if (authMode !== 'signin') return;
    const trimmedIdentifier = identifier.trim();
    if (!trimmedIdentifier) return;
    try {
      localStorage.setItem(LAST_SIGNIN_IDENTIFIER_KEY, trimmedIdentifier);
    } catch (storageError) {
      console.warn('Unable to persist sign-in identifier', storageError);
    }
  }, [identifier, authMode]);

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

      // Update all metrics
      setWalletAmount(prev => prev + amount);
      setTotalVolume(prev => prev + amount);
      setTransactionCount(prev => prev + 1);

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

  const handleSigninSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signing) return;

    // keep signup behavior (opens QR signup in new tab)
    if (authMode === 'signup') {
      const signupWindow = window.open('', '_blank');
      if (!signupWindow) {
        setError('Pop-up blocked. Please allow the QR portal to open in a new tab.');
        return;
      }
      signupWindow.opener = null;
      signupWindow.document.title = 'B2U - Create Account';
      signupWindow.document.body.innerHTML = `
      <style>body{display:flex;align-items:center;justify-content:center;height:100vh;margin:0;font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;background:#020617;color:#fff} .pulse{width:48px;height:48px;border-radius:50%;border:3px solid rgba(255,255,255,0.3);border-top-color:#2ED1A8;animation:spin 1s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}</style>
      <div class="pulse" aria-hidden="true"></div>
      <p style="margin-top:16px;font-size:14px;color:rgba(255,255,255,0.8);">Opening signup page…</p>
    `;
      try {
        signupWindow.location.replace(`${qrBaseUrl}/signup`);
        signupWindow.focus?.();
      } catch (err) {
        console.error('Failed to open signup page', err);
        signupWindow.close();
        setError('Unable to open signup page. Please try again.');
      }
      return;
    }

    setError(null);

    if (!identifier.trim()) {
      setError('Please enter an email or phone number to sign in.');
      return;
    }

    if (!/^\d{4,6}$/.test(pin)) {
      setError('PIN must be 4 to 6 digits.');
      return;
    }

    setSigning(true);
    try {
      // Determine same-origin with QR app
      const sameOrigin = (() => {
        try { return new URL(qrBaseUrl).origin === window.location.origin; } catch { return false; }
      })();

      // Call loginWithPin with NO targetWindow so it will:
      // - same-origin: sign in client + fetch POST to /api/session/create and return (we then navigate)
      // - cross-origin: submit a top-level form POST to /api/session/landing which will navigate this tab
      const res = await loginWithPin({ identifier: identifier.trim(), pin });

      if (!res.ok) {
        setError('message' in res ? res.message : 'Sign-in failed');
        return;
      }

      // If same-origin, loginWithPin already created server session via fetch and returned;
      // manually navigate to the destination in the same tab.
      if (sameOrigin) {
        // prefer the redirect provided by loginWithPin, fallback to qrDestination if absent
        const goto = (res as any).redirectTo || qrDestination;
        try {
          window.location.replace(goto);
        } catch (err) {
          window.location.href = goto;
        }
        return;
      }

      // If cross-origin, loginWithPin will have submitted the top-level form and navigated this tab.
      // In that case, the page will unload; no further action needed here.
    } catch (err) {
      console.error('PIN sign-in failed', err);
      setError('Unable to sign in right now. Please try again.');
    } finally {
      setSigning(false);
    }
  };

  const openExternalSignup = () => {
    const signupWindow = window.open('', '_blank');
    if (!signupWindow) {
      setError('Pop-up blocked. Please allow the QR portal to open in a new tab.');
      return;
    }
    signupWindow.opener = null;
    signupWindow.document.title = 'B2U - Create Account';
    signupWindow.document.body.innerHTML = `
      <style>body{display:flex;align-items:center;justify-content:center;height:100vh;margin:0;font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;background:#020617;color:#fff} .pulse{width:48px;height:48px;border-radius:50%;border:3px solid rgba(255,255,255,0.3);border-top-color:#2ED1A8;animation:spin 1s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}</style>
      <div class="pulse" aria-hidden="true"></div>
      <p style="margin-top:16px;font-size:14px;color:rgba(255,255,255,0.8);">Opening signup page…</p>
    `;
    try {
      signupWindow.location.replace(`${qrBaseUrl}/signup`);
      signupWindow.focus?.();
    } catch (err) {
      console.error('Failed to open signup page', err);
      signupWindow.close();
      setError('Unable to open signup page. Please try again.');
    }
  };

  const openExternalResetPin = () => {
    const resetWindow = window.open('', '_blank');
    if (!resetWindow) {
      setError('Pop-up blocked. Please allow the QR portal to open in a new tab.');
      return;
    }
    resetWindow.opener = null;
    resetWindow.document.title = 'B2U - Reset PIN';
    resetWindow.document.body.innerHTML = `
      <style>body{display:flex;align-items:center;justify-content:center;height:100vh;margin:0;font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;background:#020617;color:#fff} .pulse{width:48px;height:48px;border-radius:50%;border:3px solid rgba(255,255,255,0.3);border-top-color:#2ED1A8;animation:spin 1s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}</style>
      <div class="pulse" aria-hidden="true"></div>
      <p style="margin-top:16px;font-size:14px;color:rgba(255,255,255,0.8);">Opening reset PIN page…</p>
    `;
    try {
      resetWindow.location.replace(`${qrBaseUrl}/reset-pin`);
      resetWindow.focus?.();
    } catch (err) {
      console.error('Failed to open reset-pin page', err);
      resetWindow.close();
      setError('Unable to open reset PIN page. Please try again.');
    }
  };

  const handleNextRef = () => {
    if (activeRefIndex === null) return;
    setActiveRefIndex((prev) => (prev !== null && prev < referenceData.length - 1 ? prev + 1 : 0));
  };

  const handlePrevRef = () => {
    if (activeRefIndex === null) return;
    setActiveRefIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : referenceData.length - 1));
  };

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeRefIndex === null) return;
      if (e.key === 'ArrowRight') handleNextRef();
      if (e.key === 'ArrowLeft') handlePrevRef();
      if (e.key === 'Escape') setActiveRefIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeRefIndex]);

  const scrollToReferences = () => {
    document.getElementById('references-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full flex flex-col gap-16 lg:gap-24 pb-12">
      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientMove 3s ease infinite;
        }
      `}</style>

      {/* Background Graph specific to this view */}
      <BackgroundGraph />

      {/* Top Section: Hero, Wallet, Login */}
      <div className="relative w-full flex flex-col lg:flex-row gap-8 lg:gap-20 items-center lg:items-start min-h-[calc(100vh-140px)]">

        {/* Mobile Layout: Order 2 (Bottom) / Desktop Layout: Order 1 (Left) */}
        <div className="order-2 lg:order-1 flex-1 w-full flex flex-col items-center lg:items-start space-y-6 lg:space-y-10 relative z-10">

          {/* Hero Text */}
          <div className="w-full max-w-2xl transform scale-90 md:scale-100 origin-top">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="space-y-4 text-center lg:text-left">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-b2u-teal/10 border border-b2u-teal/20 text-b2u-teal text-[10px] md:text-xs font-bold tracking-wider uppercase backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-b2u-teal mr-2 animate-pulse shadow-[0_0_10px_rgba(46,209,168,0.5)]"></span>
                  Merchant Portal Live
                </div>

                <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
                  Connect your business to the <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-b2u-blue via-b2u-cyan to-b2u-teal drop-shadow-sm">
                    Digital Economy
                  </span>
                </h1>
              </div>

              {/* Animated Reference Button - Desktop Position */}
              <button
                onClick={scrollToReferences}
                className="hidden lg:flex shrink-0 items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-b2u-blue via-b2u-cyan to-b2u-teal text-white font-bold text-sm shadow-lg hover:shadow-b2u-cyan/40 hover:scale-105 transition-all animate-gradient mt-2"
              >
                <FileText size={18} />
                View References
              </button>
            </div>

            <div className="text-center lg:text-left mt-4 space-y-6">
              <DescriptionRotator phrases={phrases} />

              {/* Mobile Button Position */}
              <div className="flex justify-center lg:hidden">
                <button
                  onClick={scrollToReferences}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-b2u-blue via-b2u-cyan to-b2u-teal text-white font-bold text-sm shadow-lg animate-gradient"
                >
                  <FileText size={18} />
                  View References
                </button>
              </div>
            </div>
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

              <div className="p-5 flex flex-col gap-5 bg-gradient-to-b from-transparent to-slate-50/50 dark:to-black/20">
                {/* 1. Available Balance */}
                <div className="flex flex-col items-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Available Balance</p>
                  <RaisedBalanceDisplay amount={walletAmount} />
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-slate-200/50 dark:bg-slate-700/50" />

                {/* 2. Total Volume & 3. Total Transactions */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center p-3 rounded-xl bg-white/40 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/50">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Volume</p>
                    <span className="text-lg font-bold text-slate-700 dark:text-slate-200 font-mono tracking-tight">
                      <span className="text-xs text-slate-400 mr-1">LKR</span>
                      {(totalVolume / 1000000).toFixed(2)}M
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-3 rounded-xl bg-white/40 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-700/50">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Transactions</p>
                    <AnimatedCounter
                      end={transactionCount}
                      duration={500} // Fast update for live feel
                      className="text-lg font-bold text-slate-700 dark:text-slate-200 font-mono tracking-tight"
                    />
                  </div>
                </div>
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
        <div className="order-1 lg:order-2 w-full max-w-sm md:max-w-md mx-auto lg:mr-0 mb-4 lg:mb-0 relative z-20 flex flex-col items-center">

          {/* New Mock QR Animation Widget */}
          <div className="mb-6 transform scale-90 md:scale-100">
            <MockQRTransaction />
          </div>

          {/* Sign In Widget - Lowered by margin-top */}
          <div className="w-full glass-panel rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] dark:shadow-black/50 border border-white/50 dark:border-slate-700 backdrop-blur-2xl relative transform transition-all duration-500 hover:shadow-2xl mt-4 lg:mt-20">

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

            <form className="space-y-3 md:space-y-4" onSubmit={handleSigninSubmit}>
              {authMode === 'signin' ? (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 ml-1 uppercase">Email / Mobile</label>
                    <input
                      type="text"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      autoComplete="username"
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-b2u-blue/50 focus:border-b2u-blue transition-all"
                      placeholder="contact@business.lk"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 ml-1 uppercase">PIN</label>
                      <a
                        href="#"
                        onClick={(ev) => { ev.preventDefault(); openExternalResetPin(); }}
                        className="text-xs font-medium text-b2u-blue hover:text-b2u-teal"
                      >
                        Forgot?
                      </a>
                    </div>
                    <div className="relative">
                      <input
                        type="password"
                        inputMode="numeric"
                        pattern="\d{4,6}"
                        maxLength={6}
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        autoComplete="one-time-code"
                        className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-b2u-blue/50 focus:border-b2u-blue transition-all tracking-[0.3em]"
                        placeholder="••••"
                      />
                      <Lock className="absolute right-3 top-3 text-slate-400" size={16} />
                    </div>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 ml-1">4-6 digit access PIN</p>
                  </div>

                  {error && (
                    <div className="text-xs font-semibold text-red-600 bg-red-50 dark:bg-red-900/30 border border-red-100 dark:border-red-800 rounded-xl px-4 py-2">
                      {error}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 ml-1 uppercase">Business Name</label>
                    <input
                      type="text"
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-b2u-blue/50 focus:border-b2u-blue transition-all"
                      placeholder="e.g. Silva Stores"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 ml-1 uppercase">Email / Mobile</label>
                    <input
                      type="text"
                      className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-b2u-blue/50 focus:border-b2u-blue transition-all"
                      placeholder="contact@business.lk"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 ml-1 uppercase">Password</label>
                    <div className="relative">
                      <input
                        type="password"
                        className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-600 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-b2u-blue/50 focus:border-b2u-blue transition-all"
                        placeholder="••••••••"
                      />
                      <Lock className="absolute right-3 top-3 text-slate-400" size={16} />
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={authMode === 'signin' && signing}
                aria-busy={authMode === 'signin' && signing}
                className="w-full bg-gradient-to-r from-slate-900 to-slate-800 dark:from-b2u-blue dark:to-b2u-cyan text-white font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-b2u-blue/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 group mt-2 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
              >
                {authMode === 'signin' ? (signing ? 'Signing In...' : 'Sign In') : 'Create Account'}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-4 md:mt-6 text-center">
              <button
                onClick={() => {
                  if (authMode === 'signin') {
                    openExternalSignup();
                  } else {
                    setAuthMode('signin');
                  }
                }}
                className="text-xs md:text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-b2u-blue dark:hover:text-white transition-colors"
              >
                {authMode === 'signin' ? 'New here? Create an account' : 'Already have an account? Sign in'}
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* References Section */}
      <div id="references-section" className="w-full relative z-10 pt-8 lg:pt-0">

        <div className="glass-panel w-full rounded-3xl border border-white/50 dark:border-slate-700 p-8 lg:p-12 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-10 space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              B2U.App – Empowering Sri Lanka’s <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-b2u-blue via-b2u-cyan to-b2u-teal">Digital Payment Ecosystem</span>
            </h2>
            <div className="w-24 h-1 bg-b2u-teal/50 rounded-full mx-auto"></div>
            <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              A Fintech Solution to Increase LankaQR Adoption & Merchant Transactions.
            </p>
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-400 dark:text-slate-500 pt-2">
              <span>Presented to: [Bank Name]</span>
              <span>•</span>
              <span>Company: B2U.App Sri Lanka</span>
            </div>
          </div>

          {/* Grid of Widgets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {referenceData.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActiveRefIndex(index)}
                className="group relative flex flex-col items-start p-6 rounded-2xl bg-white/40 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 hover:border-b2u-blue/50 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all duration-300 hover:-translate-y-1 text-left w-full h-full"
              >
                <div className="flex items-center justify-between w-full mb-4">
                  <span className="text-xs font-bold text-b2u-blue dark:text-b2u-teal px-2 py-1 rounded-md bg-b2u-blue/10 dark:bg-b2u-teal/10">
                    {String(item.id).padStart(2, '0')}
                  </span>
                  <Maximize2 size={14} className="text-slate-400 group-hover:text-b2u-blue transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white leading-tight group-hover:text-b2u-blue dark:group-hover:text-b2u-cyan transition-colors">
                  {item.title}
                </h3>
                <div className="mt-auto pt-4 w-full">
                  <div className="h-1 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full w-0 group-hover:w-full bg-gradient-to-r from-b2u-blue to-b2u-teal transition-all duration-700 ease-in-out"></div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Slide Show Modal - Full Screen */}
      {activeRefIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/95 backdrop-blur-lg transition-opacity"
            onClick={() => setActiveRefIndex(null)}
          ></div>

          {/* Modal Content - Maximize View (95vw, 90vh) */}
          <div className="relative w-full h-full md:w-[95vw] md:h-[90vh] glass-panel rounded-none md:rounded-3xl border border-white/50 dark:border-slate-600 shadow-2xl overflow-hidden flex flex-col md:flex-row animate-float">

            {/* Neural Network Background INSIDE Modal */}
            <div className="absolute inset-0 z-0">
              <SpaceNetwork isDark={true} />
            </div>

            {/* Close Button */}
            <button
              onClick={() => setActiveRefIndex(null)}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 text-slate-600 dark:text-slate-300 transition-colors hover:rotate-90 duration-200"
            >
              <X size={24} />
            </button>

            {/* Sidebar / Index - Transparent for bg visibility */}
            <div className="relative z-10 w-full md:w-1/4 bg-slate-100/40 dark:bg-slate-900/40 border-b md:border-b-0 md:border-r border-slate-200/50 dark:border-slate-700/50 p-8 flex flex-col justify-center overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-b2u-blue to-b2u-teal"></div>
              <span className="text-[12rem] font-black text-slate-400 dark:text-slate-500 absolute -bottom-10 -right-10 select-none opacity-10">
                {String(referenceData[activeRefIndex].id).padStart(2, '0')}
              </span>
              <div className="relative z-10">
                <span className="text-sm font-bold uppercase tracking-widest text-b2u-blue dark:text-b2u-teal mb-3 block">
                  Section {referenceData[activeRefIndex].id} / {referenceData.length}
                </span>
                <h3 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
                  {referenceData[activeRefIndex].title}
                </h3>
              </div>
            </div>

            {/* Content Area - Transparent for bg visibility */}
            <div className="relative z-10 w-full md:w-3/4 p-8 md:px-20 md:py-16 flex flex-col bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm">

              {/* Center Content Wrapper */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="prose prose-lg md:prose-xl dark:prose-invert max-w-none">
                  {referenceData[activeRefIndex].content}
                </div>
              </div>

              {/* Bottom Navigation */}
              <div className="flex justify-between items-center mt-12 pt-6 border-t border-slate-200/50 dark:border-slate-700/50">
                <span className="text-sm font-mono text-slate-500 dark:text-slate-400 hidden md:block">
                  Use Arrow Keys to Navigate
                </span>
                <div className="flex items-center gap-6 ml-auto w-full md:w-auto justify-between md:justify-end">
                  <button
                    onClick={handlePrevRef}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl hover:bg-slate-100/50 dark:hover:bg-slate-800/50 text-base font-medium text-slate-700 dark:text-slate-200 transition-colors"
                  >
                    <ChevronLeft size={20} /> Previous
                  </button>
                  <button
                    onClick={handleNextRef}
                    className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-b2u-blue via-b2u-cyan to-b2u-teal bg-[length:200%_200%] animate-gradient text-white text-base font-bold shadow-lg shadow-b2u-blue/30 transition-all hover:scale-105"
                  >
                    Next <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
