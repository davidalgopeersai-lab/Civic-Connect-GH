
import React, { useState } from 'react';
import { Poll } from '../types';
import { translations } from '../translations';

interface YouthVoiceProps {
  lang: 'en' | 'tw';
}

const YouthVoice: React.FC<YouthVoiceProps> = ({ lang }) => {
  const t = translations[lang];
  const [polls, setPolls] = useState<Poll[]>([
    {
      id: 'p1',
      title: lang === 'en' ? 'New Community Library?' : 'Nwoma Korabea Foforo?',
      description: lang === 'en' ? 'Where should we build it?' : 'Ɛhefa na yɛnhyia nsi nwoma korabea no?',
      votes: { 'Market': 45, 'School': 82 }
    }
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleVote = (pollId: string, option: string) => {
    setPolls(prev => prev.map(p => {
      if (p.id === pollId) {
        return { ...p, votes: { ...p.votes, [option]: (p.votes[option] as number) + 1 } };
      }
      return p;
    }));
  };

  const handleNewIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    const newPoll: Poll = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTitle,
      description: newDesc,
      votes: { 
        [lang === 'en' ? 'Support' : 'Boa']: 0, 
        [lang === 'en' ? 'Review' : 'Hwɛ mu bio']: 0 
      }
    };

    setPolls([newPoll, ...polls]);
    setNewTitle('');
    setNewDesc('');
    setIsSubmitting(false);
  };

  return (
    <div className="p-4 space-y-6 pb-24 max-w-2xl mx-auto">
      <header>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{t.youthVoice}</h1>
        <p className="text-slate-600 dark:text-slate-400 font-medium">{t.yourIdeas}</p>
      </header>

      <div className="space-y-6">
        {polls.map(poll => (
          <div key={poll.id} className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 animate-in fade-in slide-in-from-bottom-2">
            <h3 className="font-black text-lg mb-1 text-slate-900 dark:text-white">{poll.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{poll.description}</p>
            <div className="space-y-4">
              {Object.entries(poll.votes).map(([option, count]) => {
                const total = (Object.values(poll.votes) as number[]).reduce((a, b) => a + b, 0);
                const percent = total > 0 ? Math.round(((count as number) / total) * 100) : 0;
                return (
                  <button key={option} onClick={() => handleVote(poll.id, option)} className="w-full text-left group focus:outline-none focus:ring-2 focus:ring-green-500 rounded-xl">
                    <div className="flex justify-between items-center mb-1 px-1">
                      <span className="text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-200">{option}</span>
                      <span className="text-xs font-black text-green-700">{percent}%</span>
                    </div>
                    <div className="h-10 w-full bg-slate-50 dark:bg-slate-900 rounded-xl relative overflow-hidden ring-1 ring-slate-100 dark:ring-slate-700">
                      <div className="h-full bg-green-500/20 transition-all duration-500" style={{ width: `${percent}%` }} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 dark:bg-slate-950 text-white p-8 rounded-[2.5rem] shadow-xl space-y-6">
        <div className="h-14 w-14 bg-white/10 rounded-2xl flex items-center justify-center text-3xl">💡</div>
        <div>
          <h2 className="text-xl font-black uppercase tracking-tight mb-2">{t.haveIdea}</h2>
          <p className="text-slate-400 text-sm leading-relaxed">{lang === 'en' ? 'Submit your proposal for local development.' : 'Fa wo nsɛm kɔ aban so na yɛnyɛ mmoa.'}</p>
        </div>
        <button 
          onClick={() => setIsSubmitting(true)}
          className="w-full py-4 bg-green-700 hover:bg-green-800 rounded-2xl font-black text-sm transition-all active:scale-95"
        >
          {t.submitIdea}
        </button>
      </div>

      {isSubmitting && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-[300] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <h2 className="text-2xl font-black mb-6 text-slate-900 dark:text-white uppercase tracking-tight">{t.submitIdea}</h2>
            <form onSubmit={handleNewIdea} className="space-y-5">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 ml-1">{t.projectTitle}</label>
                <input
                  required
                  type="text"
                  placeholder={lang === 'en' ? "e.g. New Playground" : "Sɛnea yɛbɛyɛ agodie baabi"}
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border-none ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-green-700 font-bold outline-none dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 ml-1">{t.projectDescription}</label>
                <textarea
                  required
                  rows={4}
                  placeholder={lang === 'en' ? "What do you want to achieve?" : "Dɛn na wopɛ sɛ woyɛ?"}
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border-none ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-green-700 font-medium outline-none dark:text-white resize-none"
                />
              </div>
              <div className="flex flex-col gap-3 pt-4">
                <button type="submit" className="w-full py-4 bg-green-700 text-white rounded-2xl font-black shadow-lg shadow-green-200 dark:shadow-none transition-all active:scale-95">{t.submit}</button>
                <button 
                  type="button" 
                  onClick={() => setIsSubmitting(false)} 
                  className="w-full py-4 bg-slate-100 dark:bg-slate-700 rounded-2xl font-black text-slate-600 dark:text-slate-300 transition-all active:scale-95"
                >
                  {t.cancel}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default YouthVoice;
