import React from 'react';
import { CANCELLATION_DATA, PHARMACY_PERFORMANCE } from '../constants';
import { Card } from './Card';

export const CancellationStats: React.FC = () => {
  const totalCancellations = CANCELLATION_DATA.reduce((acc, curr) => acc + curr.value, 0);

  // Calcula os top 5 ofensores (farmácias com mais cancelamentos)
  const topOffenders = [...PHARMACY_PERFORMANCE]
    .sort((a, b) => b.cancellations - a.cancellations)
    .slice(0, 5);

  return (
    <Card title="Análise de Cancelamentos" className="h-full">
      {/* Resumo Geral */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-[9px] font-bold text-brand-teal uppercase tracking-widest mb-0.5">Total Hoje</p>
          <p className="text-2xl font-extrabold text-brand-darkGray leading-none">{totalCancellations}</p>
        </div>
        <div className="text-right">
          <p className="text-[9px] font-bold text-brand-salmon uppercase tracking-widest mb-0.5">Taxa de Quebra</p>
          <p className="text-lg font-bold text-brand-salmon leading-none">6,2%</p>
        </div>
      </div>

      {/* Motivos de Cancelamento */}
      <div className="space-y-3 mb-8">
        <p className="text-[10px] font-bold text-brand-teal uppercase tracking-widest border-b border-gray-50 pb-1">Motivos Principais</p>
        {CANCELLATION_DATA.map((item, idx) => (
          <div key={idx} className="group">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-bold text-brand-darkGray">{item.reason}</span>
              <span className="text-[9px] font-medium text-brand-teal">{item.value} ({item.percentage}%)</span>
            </div>
            <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-brand-salmon opacity-80 group-hover:opacity-100 transition-all duration-500"
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Top 5 Ofensores (Farmácias) */}
      <div className="space-y-3">
        <p className="text-[10px] font-bold text-brand-salmon uppercase tracking-widest border-b border-brand-salmon/10 pb-1">Top 5 Ofensores (Farmácias)</p>
        <div className="space-y-2">
          {topOffenders.map((offender, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-brand-salmon/5 hover:bg-brand-salmon/10 transition-colors border border-transparent hover:border-brand-salmon/20">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black text-brand-salmon w-3">{idx + 1}</span>
                <span className="text-[11px] font-bold text-brand-darkGray truncate max-w-[140px]">{offender.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-[10px] font-bold text-brand-salmon leading-none">{offender.cancellations}</p>
                  <p className="text-[8px] text-brand-teal uppercase font-medium">canc.</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-3 rounded-xl bg-brand-salmon/5 border border-brand-salmon/20">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-salmon animate-pulse" />
          <p className="text-[9px] text-brand-salmon font-bold uppercase tracking-wider">Ação Recomendada</p>
        </div>
        <p className="text-[10px] text-brand-darkGray leading-tight">
          Notificar <strong>{topOffenders[0].name}</strong> sobre ruptura de estoque crítica detectada via API.
        </p>
      </div>
    </Card>
  );
};
