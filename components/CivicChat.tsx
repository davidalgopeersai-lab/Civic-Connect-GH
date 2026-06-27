
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { translations } from '../translations';

interface CivicChatProps {
  lang: 'en' | 'tw';
}

const CivicChat: React.FC<CivicChatProps> = ({ lang }) => {
  const t = translations[lang];
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })), { role: 'user', parts: [{ text: userMsg }] }],
        config: {
          systemInstruction: `You are a helpful Ghanaian Local Government Official. You are knowledgeable about District Assemblies and the 1992 Constitution. 
          Respond in ${lang === 'tw' ? 'Twi' : 'English'}. Keep answers concise. Use 'Akwaaba' or 'Medaase' naturally.`,
        }
      });

      setMessages(prev => [...prev, { role: 'model', text: response.text || "Connection error." }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Service unavailable offline." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800" role="main">
      <div className="bg-slate-900 dark:bg-slate-950 p-4 text-white flex items-center gap-3">
        <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center text-xl shadow-inner" aria-hidden="true">🏛️</div>
        <div>
          <h3 className="font-black text-sm uppercase tracking-tight">{t.civicAssistant}</h3>
          <p className="text-[10px] text-green-400 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> {t.onlineNow}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4" aria-live="polite">
        {messages.length === 0 && (
          <div className="text-center py-10 px-6">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{t.askAnything}</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm ${
              m.role === 'user' ? 'bg-green-800 text-white rounded-tr-none' : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-slate-700'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl flex gap-1 animate-pulse">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
            </div>
          </div>
        )}
        <div ref={scrollRef}></div>
      </div>

      <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex gap-2">
        <input
          id="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder={t.placeholderChat}
          className="flex-1 p-3 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-green-700 text-sm font-medium"
        />
        <button onClick={sendMessage} className="w-12 h-12 bg-green-800 text-white rounded-xl flex items-center justify-center shadow-lg active:scale-90 transition-transform">
          🚀
        </button>
      </div>
    </div>
  );
};

export default CivicChat;
