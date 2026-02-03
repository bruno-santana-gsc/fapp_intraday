
import React from 'react';
import { RECOMMENDATIONS } from '../constants';
import { Card } from './Card';

export const AIRecommendations: React.FC = () => {
  return (
    <Card title="Insights Analíticos (IA)" className="h-full border-l-4 border-l-brand-turquoise">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {RECOMMENDATIONS.map((rec) => (
          <li key={rec.id} className="flex items-start gap-3 group">
            <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${
              rec.type === 'alert' ? 'bg-brand-salmon' : 
              rec.type === 'opportunity' ? 'bg-brand-orange' : 'bg-brand-turquoise'
            }`} />
            <p className="text-[12px] leading-relaxed text-brand-darkGray group-hover:text-black transition-colors">
              {rec.text}
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
        <span className="text-[10px] text-brand-teal font-bold uppercase tracking-widest">IA processada por janela intradiária</span>
        <button className="text-brand-turquoise text-[11px] font-bold hover:underline">Histórico de Ciclos</button>
      </div>
    </Card>
  );
};
