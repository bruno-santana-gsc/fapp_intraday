
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
        <Card key={idx} className="p-4 hover:shadow-md transition-shadow duration-300 relative overflow-hidden">
          <p className="text-[10px] font-bold text-brand-teal uppercase tracking-tight text-left mb-1">
            {kpi.label}
          </p>
          <div className="flex items-baseline gap-1">
            {kpi.prefix && kpi.prefix !== '%' && (
              <span className="text-brand-darkGray text-xs font-semibold">{kpi.prefix}</span>
            )}
            <span className="text-xl font-bold text-brand-darkGray leading-none">
              {kpi.value}
            </span>
            {kpi.prefix === '%' && (
              <span className="text-brand-darkGray text-xs font-semibold">{kpi.prefix}</span>
            )}
          </div>
          {kpi.trend && (
            <p className={`text-[10px] mt-1 font-bold ${kpi.trend > 0 ? 'text-brand-turquoise' : 'text-brand-salmon'}`}>
              {kpi.trend > 0 ? '↑' : '↓'} {Math.abs(kpi.trend)}%
            </p>
          )}
          <div className="absolute top-1 right-1 w-1 h-1 bg-gray-200 rounded-full" />
        </Card>
      ))}
    </div>
  );
};
