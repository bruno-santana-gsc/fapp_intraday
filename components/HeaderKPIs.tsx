
import React from 'react';
import { KPI } from '../types';
import { Card } from './Card';

interface HeaderKPIsProps {
  data: KPI[];
}

export const HeaderKPIs: React.FC<HeaderKPIsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
      {data.map((kpi, idx) => (
        <Card key={idx} className="p-4 hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
          <p className="text-[10px] font-bold text-brand-teal uppercase tracking-tight text-left mb-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
            {kpi.label}
          </p>
          <div className="flex items-baseline gap-1">
            {kpi.prefix && kpi.prefix !== '%' && (
              <span className="text-brand-darkGray text-[10px] font-bold opacity-40">{kpi.prefix}</span>
            )}
            <span className="text-xl font-black text-brand-darkGray leading-none tracking-tighter">
              {kpi.value}
            </span>
            {kpi.prefix === '%' && (
              <span className="text-brand-darkGray text-[10px] font-bold opacity-40">{kpi.prefix}</span>
            )}
          </div>
          
          <div className="mt-2.5 flex items-center gap-1.5">
            {kpi.trend !== undefined ? (
              <div className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[9px] font-black ${
                kpi.trend > 0 
                  ? 'text-brand-turquoise bg-brand-turquoise/5' 
                  : kpi.trend < 0 
                  ? 'text-brand-salmon bg-brand-salmon/5' 
                  : 'text-brand-teal bg-gray-50'
              }`}>
                <span>{kpi.trend > 0 ? '↑' : kpi.trend < 0 ? '↓' : '•'}</span>
                <span>{Math.abs(kpi.trend)}%</span>
              </div>
            ) : (
              <div className="px-1.5 py-0.5 rounded-md text-[9px] font-black text-brand-teal bg-gray-50 opacity-40">
                STABLE
              </div>
            )}
            <span className="text-[8px] font-bold text-brand-teal opacity-30 uppercase tracking-tighter">vs ciclo ant.</span>
          </div>

          <div className={`absolute top-0 right-0 w-1 h-full opacity-10 ${
            kpi.trend && kpi.trend > 0 ? 'bg-brand-turquoise' : kpi.trend && kpi.trend < 0 ? 'bg-brand-salmon' : 'bg-brand-teal'
          }`} />
        </Card>
      ))}
    </div>
  );
};
