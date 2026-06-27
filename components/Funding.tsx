
import React, { useState } from 'react';
import { translations } from '../translations';

interface Project {
  id: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  category: string;
  image: string;
}

interface FundingProps {
  lang: 'en' | 'tw';
}

const Funding: React.FC<FundingProps> = ({ lang }) => {
  const t = translations[lang];
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 'f1',
      title: lang === 'en' ? 'Solar Street Lights' : 'Akwantɛm Kanea',
      description: lang === 'en' ? 'Eco-friendly lighting for Adum.' : 'Kanea foforo ma Adum kuro mu.',
      goal: 50000,
      raised: 32400,
      category: 'Infrastructure',
      image: 'https://images.unsplash.com/photo-1542336391-ae2936d8efe4?auto=format&fit=crop&q=80&w=400'
    }
  ]);

  const contribute = (id: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === id) return { ...p, raised: p.raised + 100 };
      return p;
    }));
    alert(t.thankYouPledge);
  };

  return (
    <div className="p-4 space-y-6 pb-24 max-w-2xl mx-auto">
      <header>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{t.funding}</h1>
        <p className="text-slate-600 dark:text-slate-400 font-medium">{lang === 'en' ? 'Crowdfund local projects.' : 'Boasua na yɛnyɛ mpɔtam hɔ adwuma.'}</p>
      </header>

      <div className="space-y-6">
        {projects.map(p => {
          const progress = Math.min(100, (p.raised / p.goal) * 100);
          return (
            <div key={p.id} className="bg-white dark:bg-slate-800 rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700">
              <img src={p.image} className="w-full h-40 object-cover" alt={p.title} />
              <div className="p-6">
                <h3 className="font-black text-xl text-slate-900 dark:text-white mb-2">{p.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{p.description}</p>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest text-slate-400">
                    <span className="text-green-700">{p.raised.toLocaleString()} {t.fundingRaised}</span>
                    <span>{t.fundingGoal}: {p.goal.toLocaleString()}</span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-700 to-yellow-400" style={{ width: `${progress}%` }} />
                  </div>
                </div>
                <button onClick={() => contribute(p.id)} className="w-full py-4 bg-slate-900 dark:bg-slate-700 text-white rounded-2xl font-black text-sm shadow-xl active:scale-95 transition-all">
                  {t.pledge}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Funding;
