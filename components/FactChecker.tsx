
import React, { useState } from 'react';
import { factCheck } from '../services/geminiService';
import { translations } from '../translations';

interface FactCheckerProps {
  lang: 'en' | 'tw';
}

const FactChecker: React.FC<FactCheckerProps> = ({ lang }) => {
  const t = translations[lang];
  const [claim, setClaim] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!claim.trim()) return;
    setLoading(true);
    try {
      const data = await factCheck(claim);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-slate-900 dark:bg-slate-950 p-6 rounded-[2.5rem] text-white space-y-4 shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 relative z-10">
        <div className="w-12 h-12 bg-yellow-400 rounded-2xl flex items-center justify-center text-2xl rotate-6">🔍</div>
        <div>
          <h2 className="text-xl font-black tracking-tight">{t.truthFinder}</h2>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{t.truthFinderSub}</p>
        </div>
      </div>

      <div className="space-y-3 relative z-10">
        <textarea
          id="fact-check-input"
          value={claim}
          onChange={e => setClaim(e.target.value)}
          placeholder={t.truthFinderPlaceholder}
          className="w-full p-5 bg-white/10 border-none text-white placeholder-slate-400 rounded-2xl focus:ring-2 focus:ring-yellow-400 transition-all min-h-[110px] text-sm font-medium outline-none"
        />
        <button
          onClick={handleVerify}
          disabled={loading || !claim}
          className="w-full p-4 bg-yellow-500 text-slate-900 rounded-2xl font-black text-sm hover:bg-yellow-400 transition-colors disabled:opacity-50"
        >
          {loading ? t.verifying : t.verifyClaim}
        </button>
      </div>

      <div aria-live="polite">
        {result && (
          <div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-5 rounded-2xl mt-4 animate-in fade-in">
            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white mb-3 inline-block ${
              result.verdict === 'True' ? 'bg-green-800' : result.verdict === 'False' ? 'bg-red-700' : 'bg-yellow-600'
            }`}>
              {t.verdict}: {result.verdict}
            </span>
            <p className="text-sm font-bold leading-relaxed mb-4">{result.explanation}</p>
            <div className="border-t border-slate-100 dark:border-slate-700 pt-3">
              <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mb-2">{t.reliableSources}</p>
              {result.sources.map((s: string, i: number) => (
                <span key={i} className="text-[10px] bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700 truncate block mb-1">🔗 {s}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FactChecker;
