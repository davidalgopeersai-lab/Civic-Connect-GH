
import React from 'react';
import { translations } from '../translations';

interface WelcomeScreenProps {
  onGetStarted: () => void;
  lang: 'en' | 'tw';
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted, lang }) => {
  const t = translations[lang];
  return (
    <div className="fixed inset-0 z-[100] bg-white dark:bg-slate-900 flex flex-col overflow-hidden">
      {/* Background Accents in Ghana Colors */}
      <div className="absolute top-0 left-0 w-full h-2 bg-red-600" />
      <div className="absolute top-2 left-0 w-full h-2 bg-yellow-400" />
      <div className="absolute top-4 left-0 w-full h-2 bg-green-600" />
      
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 -left-24 w-64 h-64 bg-red-400/10 rounded-full blur-3xl" />

      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-8">
        <div className="relative">
          <div className="w-32 h-32 bg-slate-900 dark:bg-slate-800 rounded-[2.5rem] rotate-12 flex items-center justify-center shadow-2xl">
            <span className="text-6xl -rotate-12">🇬🇭</span>
          </div>
          <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full border-4 border-white dark:border-slate-800 flex items-center justify-center text-xl shadow-lg">
            🤝
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {t.welcome}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xs mx-auto">
            {lang === 'en' ? (
              <>Welcome to <span className="font-bold text-green-700">CivicConnect GH</span>. Let's build a better community together.</>
            ) : (
              <>Akwaaba kɔ <span className="font-bold text-green-700">CivicConnect GH</span>. Ma yɛnyɛ mpɔtam hɔ yie.</>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 w-full max-w-sm">
          <div className="flex items-center gap-4 text-left p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
            <span className="text-2xl">🎓</span>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white text-sm">{t.academy}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t.learnGov}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-left p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
            <span className="text-2xl">📢</span>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white text-sm">{t.reports}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t.fixStreet}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 pb-12">
        <button
          onClick={onGetStarted}
          className="w-full py-5 bg-green-700 text-white rounded-3xl font-black text-lg shadow-xl shadow-green-200 dark:shadow-none active:scale-[0.98] transition-all"
        >
          {t.getStarted}
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
