
import React from 'react';
import { PHARMACY_PERFORMANCE } from '../constants';
import { Card } from './Card';

export const PharmacyTable: React.FC = () => {
  const sortedByGmv = [...PHARMACY_PERFORMANCE].sort((a, b) => b.gmv - a.gmv);
  
  const gainers = [...PHARMACY_PERFORMANCE].sort((a, b) => b.gmvDelta - a.gmvDelta).slice(0, 3);
  const decliners = [...PHARMACY_PERFORMANCE].sort((a, b) => a.gmvDelta - b.gmvDelta).slice(0, 3);

  const bestPharmacyName = sortedByGmv[0].name;
  const worstPharmacyName = sortedByGmv[sortedByGmv.length - 1].name;

  return (
    <Card title="Performance das Farmácias (Visão Geral)" className="h-full">
      {/* Top Highlights - Simplified for clarity */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[180px] p-3 rounded-2xl bg-brand-turquoise/5 border border-brand-turquoise/10">
          <p className="text-[9px] font-extrabold text-brand-turquoise uppercase tracking-widest mb-2 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-turquoise animate-pulse" />
            Em Alta (GMV)
          </p>
          <div className="flex gap-4">
            {gainers.map((r, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-[10px] font-bold text-brand-darkGray truncate max-w-[80px] leading-tight">{r.name}</span>
                <span className="text-[10px] font-black text-brand-turquoise leading-none">+{r.gmvDelta}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 min-w-[180px] p-3 rounded-2xl bg-brand-salmon/5 border border-brand-salmon/10">
          <p className="text-[9px] font-extrabold text-brand-salmon uppercase tracking-widest mb-2 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-salmon" />
            Atenção (Quedas)
          </p>
          <div className="flex gap-4">
            {decliners.map((r, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-[10px] font-bold text-brand-darkGray truncate max-w-[80px] leading-tight">{r.name}</span>
                <span className="text-[10px] font-black text-brand-salmon leading-none">{r.gmvDelta}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Table - Optimized density to fill space vertically */}
      <div className="overflow-x-auto -mx-2">
        <table className="w-full text-left border-separate border-spacing-y-1.5">
          <thead>
            <tr className="text-brand-teal text-[9px] font-extrabold uppercase tracking-widest opacity-60">
              <th className="px-4 py-1">Farmácia</th>
              <th className="px-4 py-1 text-right">GMV Atual</th>
              <th className="px-4 py-1 text-right">Pedidos</th>
              <th className="px-4 py-1 text-right">Cancelados</th>
              <th className="px-4 py-1 text-right">SLA Médio</th>
            </tr>
          </thead>
          <tbody>
            {sortedByGmv.map((pharmacy, idx) => {
              const isBest = pharmacy.name === bestPharmacyName;
              const isWorst = pharmacy.name === worstPharmacyName;

              return (
                <tr 
                  key={idx} 
                  className="group bg-gray-50/10 hover:bg-white hover:shadow-sm transition-all duration-200 rounded-lg"
                >
                  <td className="px-4 py-2.5 rounded-l-lg relative">
                    <div className={`absolute left-0 top-2 bottom-2 w-1 rounded-full ${
                      isBest ? 'bg-brand-turquoise' : isWorst ? 'bg-brand-salmon' : 'bg-transparent group-hover:bg-gray-200'
                    }`} />
                    
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[12px] font-bold text-brand-darkGray group-hover:text-brand-turquoise transition-colors leading-none">
                          {pharmacy.name}
                        </span>
                        {isBest && <span className="text-[8px] text-brand-turquoise">★</span>}
                      </div>
                      <span className={`text-[8px] font-bold mt-0.5 ${pharmacy.gmvDelta > 0 ? 'text-brand-turquoise' : 'text-brand-salmon'}`}>
                        {pharmacy.gmvDelta > 0 ? '↑' : '↓'} {Math.abs(pharmacy.gmvDelta)}% vs Ciclo Ant.
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-2.5 text-[12px] font-bold text-brand-darkGray text-right tabular-nums">
                    <span className="text-[9px] text-brand-teal font-normal mr-1">R$</span>
                    {pharmacy.gmv.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>

                  <td className="px-4 py-2.5 text-[12px] font-semibold text-brand-teal text-right tabular-nums">
                    {pharmacy.orders}
                  </td>

                  <td className="px-4 py-2.5 text-right">
                    <div className="flex flex-col items-end">
                      <span className={`text-[12px] font-bold leading-none ${pharmacy.cancellations > 10 ? 'text-brand-salmon' : 'text-brand-darkGray'}`}>
                        {pharmacy.cancellations}
                      </span>
                      {pharmacy.cancellationDelta !== 0 && (
                        <span className={`text-[8px] font-bold opacity-60 ${pharmacy.cancellationDelta > 0 ? 'text-brand-salmon' : 'text-brand-turquoise'}`}>
                          {pharmacy.cancellationDelta > 0 ? '+' : ''}{pharmacy.cancellationDelta} vrs.
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-2.5 rounded-r-lg text-right">
                    <div className="inline-flex flex-col items-end">
                      <span className={`text-[12px] font-bold leading-none ${parseInt(pharmacy.deliveryTime) > 40 ? 'text-brand-orange' : 'text-brand-darkGray'}`}>
                        {pharmacy.deliveryTime}
                      </span>
                      <div className="h-0.5 w-10 bg-gray-100 rounded-full mt-1 overflow-hidden">
                        <div 
                          className={`h-full ${parseInt(pharmacy.deliveryTime) > 40 ? 'bg-brand-orange' : 'bg-brand-turquoise'}`}
                          style={{ width: `${Math.min(100, (parseInt(pharmacy.deliveryTime) / 60) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-brand-teal opacity-40">
        <span>Consolidação por Ciclo • Janelas de 30min</span>
        <div className="flex gap-4">
          <button className="hover:text-brand-turquoise transition-colors">Alertas Ativos</button>
          <button className="hover:text-brand-turquoise transition-colors">Exportar Tudo</button>
        </div>
      </div>
    </Card>
  );
};
