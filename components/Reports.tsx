
import React, { useState } from 'react';
import { CommunityReport, ReportStatus } from '../types';
import { translations } from '../translations';

interface ReportsProps {
  lang: 'en' | 'tw';
}

const Reports: React.FC<ReportsProps> = ({ lang }) => {
  const t = translations[lang];
  const [reports, setReports] = useState<CommunityReport[]>([
    {
      id: '1',
      category: t.pothole,
      description: lang === 'en' ? 'Dangerous pothole on the main road.' : 'Tokuru kɛseɛ bi da kwan kɛseɛ no so.',
      location: 'Accra, Circle',
      timestamp: Date.now() - 86400000,
      status: ReportStatus.IN_PROGRESS,
      imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: '2',
      category: t.streetlight,
      description: lang === 'en' ? 'The streetlight near the junction is out.' : 'Kanea bi mfiri kwan so.',
      location: 'Kumasi, Adum',
      timestamp: Date.now() - 172800000,
      status: ReportStatus.PENDING,
      imageUrl: 'https://images.unsplash.com/photo-1621932953912-0b65d444040d?auto=format&fit=crop&q=80&w=800'
    }
  ]);

  const [isReporting, setIsReporting] = useState(false);
  const [formData, setFormData] = useState({ category: t.littering, description: '', location: '' });

  const sendSMS = () => {
    const body = `CivicConnect: ${formData.category} @ ${formData.location}. ${formData.description}`;
    window.location.href = `sms:1234?body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReport: CommunityReport = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      timestamp: Date.now(),
      status: ReportStatus.PENDING,
      imageUrl: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=800'
    };
    setReports([newReport, ...reports]);
    setIsReporting(false);
    setFormData({ category: t.littering, description: '', location: '' });
  };

  const getStatusColor = (status: ReportStatus) => {
    switch (status) {
      case ReportStatus.PENDING: return 'bg-red-700 text-white';
      case ReportStatus.IN_PROGRESS: return 'bg-yellow-500 text-slate-900';
      case ReportStatus.RESOLVED: return 'bg-green-800 text-white';
      default: return 'bg-slate-300';
    }
  };

  const getStatusLabel = (status: ReportStatus) => {
    switch (status) {
      case ReportStatus.PENDING: return t.pending;
      case ReportStatus.IN_PROGRESS: return t.inProgress;
      case ReportStatus.RESOLVED: return t.resolved;
      default: return status;
    }
  };

  return (
    <div className="p-4 space-y-6 pb-24 max-w-2xl mx-auto" role="main">
      <header className="flex justify-between items-center py-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Fix My Street</h1>
          <p className="text-slate-600 dark:text-slate-400 font-medium">{t.fixStreet}</p>
        </div>
        <button
          onClick={() => setIsReporting(true)}
          className="bg-red-700 text-white px-6 py-3 rounded-2xl font-black shadow-lg shadow-red-200 active:scale-90 transition-transform text-sm"
        >
          {t.reportIssue}
        </button>
      </header>

      {isReporting && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md z-[300] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] p-8 w-full max-w-md shadow-2xl animate-in zoom-in-95">
            <h2 className="text-2xl font-black mb-6 text-slate-900 dark:text-white">{t.reportIssue}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 ml-1">{t.category}</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border-none ring-1 ring-slate-300 dark:ring-slate-700 focus:ring-2 focus:ring-green-700 font-bold outline-none dark:text-white"
                >
                  <option>{t.littering}</option>
                  <option>{t.pothole}</option>
                  <option>{t.streetlight}</option>
                  <option>{t.flooding}</option>
                  <option>{t.openDrain}</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 ml-1">{t.location}</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Osu, Accra"
                  value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                  className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border-none ring-1 ring-slate-300 dark:ring-slate-700 focus:ring-2 focus:ring-green-700 font-medium outline-none dark:text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 ml-1">{t.details}</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border-none ring-1 ring-slate-300 dark:ring-slate-700 focus:ring-2 focus:ring-green-700 font-medium outline-none dark:text-white"
                />
              </div>
              <div className="flex flex-col gap-3 pt-6">
                <button type="submit" className="w-full p-4 bg-green-700 text-white rounded-2xl font-black">{t.submit}</button>
                <button type="button" onClick={sendSMS} className="w-full p-4 bg-slate-900 text-white rounded-2xl font-black">{t.smsReport}</button>
                <button type="button" onClick={() => setIsReporting(false)} className="w-full p-4 bg-slate-100 dark:bg-slate-700 rounded-2xl font-black text-slate-600 dark:text-slate-300">{t.cancel}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {reports.map(report => (
          <article key={report.id} className="bg-white dark:bg-slate-800 rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700">
            {report.imageUrl && (
              <div className="relative h-56">
                <img src={report.imageUrl} alt={report.category} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4">
                  <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl ${getStatusColor(report.status)}`}>
                    {getStatusLabel(report.status)}
                  </span>
                </div>
              </div>
            )}
            <div className="p-6">
              <h3 className="font-black text-xl text-slate-900 dark:text-white">{report.category}</h3>
              <p className="text-green-800 dark:text-green-500 text-xs font-black uppercase tracking-widest mb-3">📍 {report.location}</p>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">{report.description}</p>
              <button className="text-[10px] font-black uppercase text-slate-500 hover:text-green-800 transition-colors">{t.shareImpact}</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Reports;
