
import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Academy from './components/Academy';
import Reports from './components/Reports';
import PublicServices from './components/PublicServices';
import YouthVoice from './components/YouthVoice';
import FactChecker from './components/FactChecker';
import WelcomeScreen from './components/WelcomeScreen';
import CivicChat from './components/CivicChat';
import Funding from './components/Funding';
import LandingPage from './components/LandingPage';
import Settings from './components/Settings';
import { translations } from './translations';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('home');
  const [landingPassed, setLandingPassed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('civic_connect_theme') === 'dark';
  });
  
  const [showWelcome, setShowWelcome] = useState<boolean | null>(null);
  const [lang, setLang] = useState<'en' | 'tw'>(() => {
    return (localStorage.getItem('civic_connect_lang') as 'en' | 'tw') || 'en';
  });
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('civic_connect_welcome_seen');
    setShowWelcome(!hasSeenWelcome);

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('civic_connect_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('civic_connect_theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('civic_connect_lang', lang);
  }, [lang]);

  const t = translations[lang];

  const handleLaunch = () => setLandingPassed(true);

  const handleFinishWelcome = () => {
    localStorage.setItem('civic_connect_welcome_seen', 'true');
    setShowWelcome(false);
  };

  const renderHome = () => (
    <div className="p-4 space-y-6 pb-24 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex items-center justify-between py-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            CivicConnect <span className="text-green-700">GH</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">{t.slogan} 🇬🇭</p>
        </div>
        <div className="flex flex-col items-end gap-2">
           <button 
             onClick={() => setCurrentTab('settings')}
             className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl border border-slate-200 dark:border-slate-700 hover:scale-105 active:scale-95 transition-all"
             aria-label={t.settings}
           >
             ⚙️
           </button>
           {isOffline && (
             <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-lg border border-orange-100 flex items-center gap-1">
               <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span> {t.offlineMode}
             </span>
           )}
        </div>
      </header>

      <FactChecker lang={lang} />

      <section>
        <h2 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4 px-1">{t.quickActions}</h2>
        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => setCurrentTab('academy')} className="p-5 bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border-b-4 border-green-700 flex flex-col items-center text-center gap-2 active:scale-95 transition-all">
            <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-2xl">🎓</div>
            <span className="font-black text-slate-800 dark:text-white text-xs">{t.academy}</span>
          </button>
          <button onClick={() => setCurrentTab('report')} className="p-5 bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border-b-4 border-red-600 flex flex-col items-center text-center gap-2 active:scale-95 transition-all">
            <div className="w-12 h-12 bg-red-50 dark:bg-red-900/30 rounded-2xl flex items-center justify-center text-2xl">📢</div>
            <span className="font-black text-slate-800 dark:text-white text-xs">{t.reports}</span>
          </button>
          <button onClick={() => setCurrentTab('chat')} className="p-5 bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border-b-4 border-blue-600 flex flex-col items-center text-center gap-2 active:scale-95 transition-all">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-2xl">💬</div>
            <span className="font-black text-slate-800 dark:text-white text-xs">{t.chat}</span>
          </button>
          <button onClick={() => setCurrentTab('funding')} className="p-5 bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border-b-4 border-yellow-500 flex flex-col items-center text-center gap-2 active:scale-95 transition-all">
            <div className="w-12 h-12 bg-yellow-50 dark:bg-yellow-900/30 rounded-2xl flex items-center justify-center text-2xl">💰</div>
            <span className="font-black text-slate-800 dark:text-white text-xs">{t.funding}</span>
          </button>
        </div>
      </section>

      <div className="bg-slate-900 dark:bg-slate-950 text-white p-6 rounded-3xl relative overflow-hidden shadow-xl group cursor-pointer" onClick={() => setCurrentTab('voice')}>
        <div className="absolute top-0 right-0 w-32 h-full bg-yellow-400/10 -skew-x-12 transform translate-x-8 group-hover:translate-x-4 transition-transform" />
        <h3 className="font-bold text-yellow-400 mb-2 flex items-center gap-2">
          <span>🗳️</span> {t.voice}
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed">
          {t.impact}: <span className="text-white font-bold">{lang === 'en' ? 'New Community ICT Center is 40% funded!' : 'ICT Bea foforo no anya sika 40%!'}</span>
        </p>
      </div>

      <div className="text-center pt-8">
        <button 
          onClick={() => { if(confirm(t.resetConfirm)) { localStorage.clear(); window.location.reload(); } }}
          className="text-[10px] text-slate-300 dark:text-slate-600 uppercase font-black tracking-widest hover:text-slate-400 transition-colors"
        >
          {t.resetData}
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentTab) {
      case 'home': return renderHome();
      case 'academy': return <Academy lang={lang} />;
      case 'report': return <Reports lang={lang} />;
      case 'services': return <PublicServices lang={lang} />;
      case 'voice': return <YouthVoice lang={lang} />;
      case 'chat': return <CivicChat lang={lang} />;
      case 'funding': return <Funding lang={lang} />;
      case 'settings': return (
        <Settings 
          isDarkMode={isDarkMode} 
          setIsDarkMode={setIsDarkMode} 
          lang={lang} 
          setLang={setLang} 
        />
      );
      default: return renderHome();
    }
  };

  if (showWelcome === null) return null;

  if (!landingPassed) return <LandingPage onEnter={handleLaunch} lang={lang} />;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100 selection:bg-yellow-200 transition-colors duration-300">
      {showWelcome && <WelcomeScreen onGetStarted={handleFinishWelcome} lang={lang} />}
      <main className={`transition-all duration-700 ease-in-out ${showWelcome ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
        {renderContent()}
      </main>
      {!showWelcome && <Navigation currentTab={currentTab} setTab={setCurrentTab} lang={lang} />}
    </div>
  );
};

export default App;
