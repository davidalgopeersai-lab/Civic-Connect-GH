
import React from 'react';
import { translations } from '../translations';

interface SettingsProps {
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  lang: 'en' | 'tw';
  setLang: (lang: 'en' | 'tw') => void;
}

const Settings: React.FC<SettingsProps> = ({ isDarkMode, setIsDarkMode, lang, setLang }) => {
  const t = translations[lang];

  return (
    <div className="p-4 space-y-8 pb-24 max-w-2xl mx-auto animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">{t.settings}</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">{lang === 'en' ? 'Manage your preferences.' : 'Siesie wo mpɛnsɛmpɛnsɛmu.'}</p>
      </header>

      <section className="space-y-4">
        <h2 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-1">{t.displaySound}</h2>
        <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700 divide-y divide-slate-50 dark:divide-slate-700 overflow-hidden">
          <div className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-xl">{isDarkMode ? '🌙' : '☀️'}</div>
              <div>
                <p className="font-bold text-slate-800 dark:text-white">{t.darkMode}</p>
              </div>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`w-14 h-8 rounded-full transition-colors relative ${isDarkMode ? 'bg-green-600' : 'bg-slate-200'}`}
            >
              <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-sm transition-transform ${isDarkMode ? 'translate-x-6' : ''}`} />
            </button>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-1">{t.localization}</h2>
        <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700 p-5">
          <p className="font-bold text-slate-800 dark:text-white mb-4">{t.appLanguage}</p>
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-900 rounded-2xl">
            <button onClick={() => setLang('en')} className={`py-3 rounded-xl text-sm font-black transition-all ${lang === 'en' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-400'}`}>English</button>
            <button onClick={() => setLang('tw')} className={`py-3 rounded-xl text-sm font-black transition-all ${lang === 'tw' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-400'}`}>Twi</button>
          </div>
        </div>
      </section>

      <footer className="text-center py-4">
        <button onClick={() => { if(confirm(t.resetConfirm)) { localStorage.clear(); window.location.reload(); } }} className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">{t.resetData}</button>
      </footer>
    </div>
  );
};

export default Settings;
