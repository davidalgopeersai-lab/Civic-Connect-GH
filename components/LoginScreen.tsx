
import React, { useState } from 'react';
import { translations } from '../translations';

interface LoginScreenProps {
  onLogin: () => void;
  onBack: () => void;
  lang: 'en' | 'tw';
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onBack, lang }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const t = translations[lang];

  // Simulated valid accounts for demo purposes
  const VALID_EMAILS = ['test@test.com', 'citizen@ghana.com', 'admin@civic.gh'];

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(email)) {
      setError(t.invalidEmail);
      return;
    }

    if (password.length < 6) {
      setError(t.invalidPassword);
      return;
    }

    setLoading(true);

    // Simulate account validation
    setTimeout(() => {
      setLoading(false);
      // Requirement: "if there is no account or the mail is not valid don't make the person continue"
      if (VALID_EMAILS.includes(email.toLowerCase())) {
        onLogin();
      } else {
        setError(t.accountNotFound);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[250] bg-white dark:bg-slate-900 flex flex-col p-8 animate-in slide-in-from-right duration-500 overflow-y-auto">
      <button 
        onClick={onBack} 
        aria-label={t.back}
        className="absolute top-8 left-8 p-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
      >
        <span className="text-2xl" aria-hidden="true">←</span>
      </button>

      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full space-y-12 py-12" role="main">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-slate-900 dark:bg-slate-800 rounded-3xl mx-auto flex items-center justify-center text-3xl shadow-xl shadow-slate-200 dark:shadow-none" aria-hidden="true">
            🇬🇭
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{t.welcomeBack}</h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium">{t.signInInstructions}</p>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="email-input" className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">{t.email}</label>
              <input 
                id="email-input"
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="citizen@ghana.com"
                className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-green-700 transition-all outline-none font-medium dark:text-white"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password-input" className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">{t.password}</label>
              <input 
                id="password-input"
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-green-700 transition-all outline-none font-medium dark:text-white"
                required
              />
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-2xl text-xs font-bold animate-in fade-in" role="alert">
              ⚠️ {error}
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-green-700 text-white rounded-2xl font-black shadow-lg shadow-green-100 dark:shadow-none hover:bg-green-800 active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-900 flex items-center justify-center gap-3 disabled:opacity-70"
          >
            {loading && <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />}
            {loading ? '...' : t.login}
          </button>
        </form>

        <p className="text-center text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed uppercase tracking-wider font-bold">
          CivicConnect GH &copy; 2024 <br />
          <a href="#" className="text-slate-900 dark:text-slate-200 underline focus-visible:ring-1 focus-visible:ring-slate-900">Terms</a> & <a href="#" className="text-slate-900 dark:text-slate-200 underline focus-visible:ring-1 focus-visible:ring-slate-900">Privacy</a>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
