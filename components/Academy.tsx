
import React, { useState } from 'react';
import { getCivicLesson } from '../services/geminiService';
import { translations } from '../translations';

interface AcademyProps {
  lang: 'en' | 'tw';
}

const topics = [
  "District Assemblies",
  "The Role of the MCE",
  "How Laws are Made in Ghana",
  "Chieftaincy & Modern Governance",
  "Rights of a Citizen"
];

const Academy: React.FC<AcademyProps> = ({ lang }) => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const t = translations[lang];

  const fetchLesson = async (topic: string) => {
    // Immediate UI response: switch view first
    setSelectedTopic(topic);
    setLesson(null);
    setQuizAnswers({});
    setLoading(true);
    
    try {
      const data = await getCivicLesson(topic);
      setLesson(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-6 pb-24 max-w-2xl mx-auto" role="main">
      <header>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{t.academy}</h1>
        <p className="text-slate-600 dark:text-slate-400 font-medium">{t.learnGov}</p>
      </header>

      {!selectedTopic ? (
        <nav aria-label="Topic selection" className="grid grid-cols-1 gap-3 animate-in fade-in duration-300">
          {topics.map(topic => (
            <button
              key={topic}
              onClick={() => fetchLesson(topic)}
              className="p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-left hover:border-green-600 transition-colors shadow-sm flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700"
            >
              <span className="font-bold text-slate-800 dark:text-slate-100">{topic}</span>
              <span className="text-green-700 dark:text-green-500 font-black group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
            </button>
          ))}
        </nav>
      ) : (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm space-y-4 animate-in slide-in-from-right-4 duration-300" aria-live="polite">
          <button 
            onClick={() => setSelectedTopic(null)} 
            className="text-green-700 dark:text-green-500 font-black mb-4 flex items-center gap-1 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700 rounded-lg"
          >
            <span aria-hidden="true">←</span> {t.backTopics}
          </button>

          {loading ? (
            <div className="flex flex-col items-center py-20 space-y-4" role="status">
              <div className="animate-spin h-10 w-10 border-4 border-green-700 dark:border-green-500 border-t-transparent rounded-full"></div>
              <p className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-xs">{t.preparingLesson}</p>
            </div>
          ) : lesson && (
            <>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{lesson.title}</h2>
              <div className="prose prose-slate dark:prose-invert text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap font-medium">
                {lesson.content}
              </div>

              <section className="mt-8 border-t border-slate-100 dark:border-slate-700 pt-8 space-y-6">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">{t.quickQuiz}</h3>
                {lesson.quiz.map((q: any, i: number) => {
                  const answered = quizAnswers[i] !== undefined;
                  const selectedIdx = quizAnswers[i];
                  return (
                    <fieldset key={i} className="space-y-4 border-none p-0 m-0">
                      <legend className="font-bold text-slate-800 dark:text-slate-200 mb-2">{i + 1}. {q.question}</legend>
                      <div className="grid grid-cols-1 gap-2">
                        {q.options.map((opt: string, idx: number) => {
                          const isCorrect = idx === q.correctAnswer;
                          const isUserSelection = selectedIdx === idx;
                          
                          let buttonStyles = "p-4 rounded-2xl text-left text-sm font-semibold transition-all border text-slate-800 dark:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-700";
                          let suffix = "";

                          if (!answered) {
                            buttonStyles += " bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 hover:scale-[1.01] active:scale-[0.99]";
                          } else {
                            if (isCorrect) {
                              buttonStyles += " bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 border-emerald-500 dark:border-emerald-600 font-bold";
                              suffix = " ✅ " + t.correct;
                            } else if (isUserSelection) {
                              buttonStyles += " bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300 border-rose-500 dark:border-rose-600 font-bold";
                              suffix = " ❌ " + t.tryAgain;
                            } else {
                              buttonStyles += " bg-slate-50/50 dark:bg-slate-900/50 opacity-40 border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-600";
                            }
                          }

                          return (
                            <button
                              key={idx}
                              disabled={answered}
                              onClick={() => {
                                setQuizAnswers(prev => ({ ...prev, [i]: idx }));
                              }}
                              className={`${buttonStyles} flex items-center justify-between w-full`}
                            >
                              <span>{opt}</span>
                              {suffix && <span className="text-xs font-black uppercase tracking-wider">{suffix}</span>}
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>
                  );
                })}
              </section>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Academy;
