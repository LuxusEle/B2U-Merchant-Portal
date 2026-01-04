import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Phone, Mail, MapPin } from 'lucide-react';
import SpaceNetwork from './components/SpaceNetwork';
import { Logo } from './components/Logo';
import { MerchantQRView } from './components/MerchantQRView';
import { HomeView } from './components/HomeView';
import { ERPView } from './components/ERPView';
import { BookingView } from './components/BookingView';
import AdminSignin from './components/AdminSignin';
import AdminView from './components/AdminView';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'merchant-qr', label: 'Merchant QR' },
  { id: 'erp', label: 'ERP Solutions' },
  { id: 'booking', label: 'Online Booking' },
  { id: 'admin', label: 'Admin' },
  { id: 'spendex', label: 'SpendEx' },
] as const;

const DEFAULT_VIEW = NAV_ITEMS[0].id;
const NAV_ITEM_IDS = new Set<string>(NAV_ITEMS.map((item) => item.id));

const getInitialView = () => {
  if (typeof window === 'undefined') return DEFAULT_VIEW;

  const params = new URLSearchParams(window.location.search);
  const viewFromQuery = params.get('view');
  if (viewFromQuery && NAV_ITEM_IDS.has(viewFromQuery)) {
    return viewFromQuery;
  }

  const hashValue = window.location.hash.replace(/^#/, '');
  if (hashValue && NAV_ITEM_IDS.has(hashValue)) {
    return hashValue;
  }

  return DEFAULT_VIEW;
};

function App() {
  const [isDark, setIsDark] = useState(false);
  const [currentView, setCurrentView] = useState(() => getInitialView());
  const videoRef = useRef<HTMLVideoElement>(null);
  const navItems = NAV_ITEMS;
  const [showAdminSignin, setShowAdminSignin] = useState(false);
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement | null>(null);

  // Toggle Dark Mode
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Force Video Playback & Settings
  useEffect(() => {
    if (videoRef.current) {
        videoRef.current.playbackRate = 0.8; // Slow smooth flyover
        videoRef.current.play().catch(error => {
            console.log("Video autoplay prevented:", error);
        });
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    url.searchParams.set('view', currentView);
    window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`);
  }, [currentView]);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const onDocDown = (ev: MouseEvent) => {
      const target = ev.target as Node | null;
      if (mobileNavRef.current && target && !mobileNavRef.current.contains(target)) {
        setMobileNavOpen(false);
      }
    };
    const onKey = (ev: KeyboardEvent) => { if (ev.key === 'Escape') setMobileNavOpen(false); };
    document.addEventListener('mousedown', onDocDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [mobileNavOpen]);

  const renderView = () => {
    switch(currentView) {
      case 'home': return <HomeView onNavigate={setCurrentView} />;
      case 'merchant-qr': return <MerchantQRView />;
      case 'erp': return <ERPView />;
      case 'booking': return <BookingView />;
      case 'admin': return adminAuthenticated ? <AdminView /> : <HomeView onNavigate={setCurrentView} />;
      default: return <HomeView onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className={`relative min-h-screen w-full font-sans overflow-x-hidden transition-colors duration-500 ${isDark ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* Global: hide number input spin buttons for better presentation */}
      <style>{`
        /* Chrome, Safari, Edge, Opera */
        input[type=number]::-webkit-outer-spin-button,
        input[type=number]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        /* Firefox */
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>
      
      {/* Background Container - Fixed to Viewport */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Background Video Layer (Halftone Style) */}
        <div className="absolute inset-0 bg-white dark:bg-slate-900">
          <video 
            ref={videoRef}
            autoPlay 
            loop 
            muted 
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 
              ${isDark ? 'opacity-20 mix-blend-luminosity' : 'opacity-30 mix-blend-multiply'}
              grayscale contrast-125 brightness-110`}
            src="https://videos.pexels.com/video-files/2882776/2882776-hd_1920_1080_30fps.mp4"
          />
          
          {/* Gradient Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/60 to-white/90 dark:from-slate-900/90 dark:via-slate-900/60 dark:to-slate-900" />
        </div>

        {/* Background Dotted Pattern (Screen) */}
        <div 
          className="absolute inset-0 opacity-[0.35] dark:opacity-[0.25] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `radial-gradient(${isDark ? '#2ed1a8' : '#2e57d1'} 1.5px, transparent 1.5px)`,
            backgroundSize: '8px 8px'
          }}
        />
        
        {/* Layer 0: Space Network (Deep Background) */}
        <SpaceNetwork isDark={isDark} />
      </div>

      {/* Navigation - Sticky Layer 50 */}
      <nav className="sticky top-0 z-50 px-4 md:px-6 py-4 relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border border-white/20 dark:border-slate-800 rounded-2xl px-6 py-3 shadow-lg">
          <button onClick={() => setCurrentView('home')} className="focus:outline-none">
             <Logo className="scale-90 md:scale-100" />
          </button>
          
          {/* Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems
              .filter((item) => item.id !== 'admin' || adminAuthenticated)
              .map((item) => (
              <button 
                key={item.id}
                onClick={() => {
                  if (item.id === 'spendex') {
                    window.open('https://spendex.b2u.app', '_blank', 'noopener,noreferrer');
                  } else {
                    setCurrentView(item.id);
                  }
                }}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 
                  ${currentView === item.id 
                    ? 'bg-b2u-blue/10 text-b2u-blue dark:text-b2u-cyan' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-b2u-blue dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Contact Link scrolls to footer */}
            <button 
                onClick={() => document.getElementById('footer-contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-b2u-blue dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
            >
                Contact
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2 md:p-2.5 rounded-full bg-slate-200/50 dark:bg-slate-800/50 hover:bg-slate-300/50 dark:hover:bg-slate-700/50 transition-colors border border-slate-300/20 dark:border-white/10"
            >
              {isDark ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-slate-600" />}
            </button>
            
            {/* Mobile Menu Button (opens nav dropdown) */}
            <div className="lg:hidden relative">
                <button 
                  onClick={() => setMobileNavOpen((s) => !s)}
                  className="p-2 text-slate-600 dark:text-slate-300"
                  aria-expanded={mobileNavOpen}
                  aria-controls="mobile-nav"
                >
                    <span className="sr-only">Menu</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                </button>

                {/* Mobile Nav Dropdown */}
                <div id="mobile-nav" ref={mobileNavRef} className={`absolute right-0 mt-2 w-44 z-40 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden ${mobileNavOpen ? 'block' : 'hidden'}`}>
                  <div className="flex flex-col p-2">
                    {navItems
                      .filter((item) => item.id !== 'admin' || adminAuthenticated)
                      .map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setMobileNavOpen(false);
                          if (item.id === 'spendex') {
                            window.open('https://spendex.b2u.app', '_blank', 'noopener,noreferrer');
                          } else {
                            setCurrentView(item.id);
                          }
                        }}
                        className="text-left px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-sm text-slate-700 dark:text-slate-200"
                      >
                        {item.label}
                      </button>
                    ))}

                    <button
                      onClick={() => {
                        setMobileNavOpen(false);
                        if (adminAuthenticated) {
                          setAdminAuthenticated(false);
                          setCurrentView(DEFAULT_VIEW);
                        } else {
                          setShowAdminSignin(true);
                        }
                      }}
                      className="text-left px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-sm text-slate-700 dark:text-slate-200"
                    >
                      {adminAuthenticated ? 'Sign out' : 'Admin Signin'}
                    </button>

                    <button
                      onClick={() => { setMobileNavOpen(false); document.getElementById('footer-contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                      className="text-left px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-sm text-slate-700 dark:text-slate-200"
                    >
                      Contact
                    </button>
                  </div>
                </div>
            </div>
          </div>
        </div>

        {/* Admin Signin Button (absolute top-right of nav) */}
        <button
          onClick={() => {
            if (adminAuthenticated) {
              // sign out
              setAdminAuthenticated(false);
              setCurrentView(DEFAULT_VIEW);
              setShowAdminSignin(false);
            } else {
              setShowAdminSignin((s) => !s);
            }
          }}
          className="absolute right-6 top-3 hidden lg:inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-semibold border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all"
        >
          {adminAuthenticated ? 'Sign out' : 'Admin Signin'}
        </button>

        <AdminSignin
          show={showAdminSignin}
          onClose={() => setShowAdminSignin(false)}
          onAuthSuccess={() => {
            setAdminAuthenticated(true);
            setCurrentView('admin');
          }}
        />
      </nav>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8">
        {renderView()}
      </main>

      {/* Footer / Contact Section */}
      <footer id="footer-contact" className="relative z-10 w-full bg-white/80 dark:bg-slate-900/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
                <Logo className="mb-4" />
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Empowering Sri Lankan businesses with next-generation digital payment and management solutions.
                </p>
            </div>
            
            <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Services</h3>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li><button onClick={() => setCurrentView('merchant-qr')} className="hover:text-b2u-blue">Merchant QR Solutions</button></li>
                    <li><button onClick={() => setCurrentView('erp')} className="hover:text-b2u-blue">ERP Solutions</button></li>
                    <li><button onClick={() => setCurrentView('booking')} className="hover:text-b2u-blue">Online Booking</button></li>
                </ul>
            </div>

            <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Contact Us</h3>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-center gap-2">
                        <Mail size={16} className="text-b2u-blue" />
                        <a href="mailto:adminb2u@gmail.com" className="hover:text-b2u-blue">adminb2u@gmail.com</a>
                    </li>
                    <li className="flex items-center gap-2">
                        <Phone size={16} className="text-b2u-blue" />
                        <a href="tel:+94777163564" className="hover:text-b2u-blue">+94 77 716 3564</a>
                    </li>
                    <li className="flex items-start gap-2">
                        <MapPin size={16} className="text-b2u-blue mt-0.5" />
                        <span>Chakindarama Road, Mt Lavinia,<br/>Sri Lanka</span>
                    </li>
                </ul>
            </div>
        </div>
        <div className="border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-400">
            &copy; {new Date().getFullYear()} B2U Holdings. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;