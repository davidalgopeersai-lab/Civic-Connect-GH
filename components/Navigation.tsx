
import React from 'react';
import { translations } from '../translations';

interface NavProps {
  currentTab: string;
  setTab: (tab: string) => void;
  lang: 'en' | 'tw';
}

const Navigation: React.FC<NavProps> = ({ currentTab, setTab, lang }) => {
  const t = translations[lang];
  const tabs = [
    { id: 'home', label: t.home, icon: '🏠' },
    { id: 'academy', label: t.academy, icon: '🎓' },
    { id: 'report', label: t.reports, icon: '📢' },
    { id: 'voice', label: t.voice, icon: '🗳️' },
    { id: 'settings', label: t.settings, icon: '⚙️' }
  ];

  return (
    <nav 
      aria-label="Main Navigation"
      className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 flex justify-around items-center py-2 pb-safe px-4 z-50 shadow-[0_-8px_30px_rgb(0,0,0,0.04)]"
    >
      {/* Decorative Ghana Stripe - marked as aria-hidden */}
      <div className="absolute top-0 left-0 w-full h-[3px] flex" aria-hidden="true">
        <div className="flex-1 bg-red-600" />
        <div className="flex-1 bg-yellow-400" />
        <div className="flex-1 bg-green-700" />
      </div>

      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setTab(tab.id)}
          aria-label={tab.label}
          aria-current={currentTab === tab.id ? 'page' : undefined}
          className={`flex flex-col items-center p-2 rounded-2xl transition-all duration-300 relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 ${
            currentTab === tab.id ? 'text-green-700 dark:text-green-500 scale-105' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <span className="text-2xl mb-0.5" aria-hidden="true">{tab.icon}</span>
          <span className={`text-[10px] font-black uppercase tracking-tighter ${
            currentTab === tab.id ? 'opacity-100' : 'opacity-70'
          }`}>
            {tab.label}
          </span>
          {currentTab === tab.id && (
            <div className="absolute -bottom-1 w-1 h-1 bg-green-700 dark:bg-green-500 rounded-full" aria-hidden="true" />
          )}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
