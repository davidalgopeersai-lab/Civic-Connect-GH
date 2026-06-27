
import React, { useState } from 'react';
import { PublicService } from '../types';
import { translations } from '../translations';

interface PublicServicesProps {
  lang: 'en' | 'tw';
}

const PublicServices: React.FC<PublicServicesProps> = ({ lang }) => {
  const t = translations[lang];
  const [filter, setFilter] = useState<string>(t.all);

  const services: PublicService[] = [
    {
      id: '1',
      name: 'Ridge Hospital',
      type: 'Clinic',
      location: 'Castle Rd, Accra',
      hours: '24/7',
      services: ['Emergency', 'Maternity']
    },
    {
      id: '2',
      name: 'Achimota School',
      type: 'School',
      location: 'Achimota, Accra',
      hours: '8:00 AM - 4:00 PM',
      services: ['Education']
    }
  ];

  const categories = [t.all, t.clinic, t.school, t.police, t.library];

  return (
    <div className="p-4 space-y-6 pb-24 max-w-2xl mx-auto">
      <header>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{t.publicServices}</h1>
        <p className="text-slate-600 dark:text-slate-400 font-medium">{t.findServices}</p>
      </header>

      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-xs font-black uppercase tracking-widest transition-all ${
              filter === cat ? 'bg-green-700 text-white shadow-md' : 'bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {services.map(service => (
          <div key={service.id} className="bg-white dark:bg-slate-800 p-5 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 flex gap-4">
            <div className="h-14 w-14 rounded-2xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-3xl">
              {service.type === 'Clinic' ? '🏥' : service.type === 'School' ? '🏫' : '👮'}
            </div>
            <div className="flex-1">
              <h3 className="font-black text-slate-800 dark:text-white">{service.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{service.location}</p>
              <p className="text-[10px] text-green-700 dark:text-green-500 font-black uppercase mb-3">🕒 {service.hours}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicServices;
