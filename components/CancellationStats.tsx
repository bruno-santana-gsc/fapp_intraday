
import React from 'react';
import { CANCELLATION_DATA } from '../constants';
import { PharmacyPerformance } from '../types';
import { Card } from './Card';

interface CancellationStatsProps {
  pharmacies: PharmacyPerformance[];
}

export const CancellationStats: React.FC<CancellationStatsProps> = ({ pharmacies }) => {
  const topOffenders = [...pharmacies]
    .sort((a, b) => b.cancellations - a.cancellations)
    .slice(0, 5);

  return (
    <Card title="Análise de Cancelamentos" className="h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[9px] font-bold text-brand-teal uppercase tracking-widest mb-0.5">Total na Região</p>
          <p className="text-2xl font-extrabold text-brand-darkGray leading-none">
            {pharmacies.reduce((acc, p) => acc + p.cancellations, 0)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[9px] font-bold text-brand-salmon uppercase tracking-widest mb-0.5">Taxa de Quebra</p>
          <p className="text-lg font-bold text-brand-salmon leading-none">6,2%</p>
        </div>
      </div>

      <div className="space-y-3 mb-8">
        <p className="text-[10px] font-bold text-brand-teal uppercase tracking-widest border-b border-gray-50 pb-1">Motivos Principais</p>
        {CANCELLATION_DATA.map((item, idx) => (
          <div key={idx} className="group">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-bold text-brand-darkGray">{item.reason}</span>
              <span className="text-[9px] font-medium text-brand-teal">{item.percentage}%</span>
            </div>
            <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-brand-salmon opacity-80"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <p className="text-[10px] font-bold text-brand-salmon uppercase tracking-widest border-b border-brand-salmon/10 pb-1">Maiores Ofensores</p>
        <div className="space-y-2">
          {topOffenders.map((offender, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-brand-salmon/5 border border-transparent hover:border-brand-salmon/20">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black text-brand-salmon w-3">{idx + 1}</span>
                <span className="text-[11px] font-bold text-brand-darkGray truncate max-w-[140px]">{offender.name}</span>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-brand-salmon leading-none">{offender.cancellations}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
