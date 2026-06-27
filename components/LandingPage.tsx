
import React from 'react';
import { translations } from '../translations';

interface LandingPageProps {
  onEnter: () => void;
  lang: 'en' | 'tw';
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter, lang }) => {
  const t = translations[lang];
  return (
    <div className="fixed inset-0 z-[200] bg-white dark:bg-slate-900 flex flex-col overflow-hidden">
      {/* Dynamic Background - Decorative */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-yellow-400/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] left-[10%] w-[50%] h-[50%] bg-green-700/10 rounded-full blur-[120px]" />
      </div>

      <div className="flex-1 flex flex-col justify-center items-center text-center px-8 relative z-10" role="main">
        <div className="space-y-8 max-w-2xl w-full">
          <div className="inline-flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase mx-auto" role="status">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
            {t.officialPortal}
          </div>
          
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-slate-900 dark:text-white leading-[0.9] tracking-tighter">
            {lang === 'en' ? (
              <>Power to the <br /><span className="text-green-700">People.</span> <br /><span className="text-red-600">Ghana</span> <br /><span className="text-yellow-600">First.</span></>
            ) : (
              <>Tumi ma <br /><span className="text-green-700">Ɔmanfoɔ.</span> <br /><span className="text-red-600">Ghana</span> <br /><span className="text-yellow-600">Di kan.</span></>
            )}
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed font-medium">
            {lang === 'en' ? 'Connect with your local government, report issues instantly, and vote on projects.' : 'Kyɛ wo ho nsɛm ma aban, bɔ amannebɔ, na to aba ma wo mpɔtam hɔ nnwuma.'}
          </p>

          <div className="pt-4 flex flex-col items-center gap-6">
            <button
              onClick={onEnter}
              className="w-full sm:w-72 py-6 bg-slate-900 dark:bg-slate-700 text-white rounded-3xl font-black text-2xl shadow-2xl shadow-slate-200 dark:shadow-none hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-700"
            >
              {t.enterApp}
              <span className="text-2xl group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
            </button>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <div className="flex -space-x-3" aria-hidden="true">
                {[1, 2, 3, 4].map((i) => (
                  <img 
                    key={i} 
                    className="w-12 h-12 rounded-full border-4 border-white dark:border-slate-800 shadow-sm" 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}`} 
                    alt="" 
                  />
                ))}
              </div>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400">
                {t.joinedBy} <span className="text-slate-900 dark:text-white font-black">24k+</span> {t.citizens}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Footer */}
      <footer className="p-8 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center text-white font-black text-sm" aria-hidden="true">C</div>
          <span className="font-black text-slate-900 dark:text-white tracking-tight">CivicConnect GH</span>
        </div>
        <div className="flex gap-1" aria-hidden="true">
          <div className="w-6 h-1 bg-red-600" />
          <div className="w-6 h-1 bg-yellow-400" />
          <div className="w-6 h-1 bg-green-700" />
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
