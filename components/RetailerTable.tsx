
import React from 'react';
// Fix: Use PHARMACY_PERFORMANCE as RETAILER_PERFORMANCE is not defined in constants.tsx
import { PHARMACY_PERFORMANCE } from '../constants';
import { Card } from './Card';

export const RetailerTable: React.FC = () => {
  // Ordenação principal para a tabela
  // Fix: Use PHARMACY_PERFORMANCE instead of undefined RETAILER_PERFORMANCE
  const sortedByGmv = [...PHARMACY_PERFORMANCE].sort((a, b) => b.gmv - a.gmv);
  
  // Lógica de categorização para os Insights Superiores
  // Fix: Use PHARMACY_PERFORMANCE instead of undefined RETAILER_PERFORMANCE
  const gainers = [...PHARMACY_PERFORMANCE].sort((a, b) => b.gmvDelta - a.gmvDelta).slice(0, 3);
  const decliners = [...PHARMACY_PERFORMANCE].sort((a, b) => a.gmvDelta - b.gmvDelta).slice(0, 3);
  const risks = [...PHARMACY_PERFORMANCE].filter(r => r.cancellationDelta > 0 || parseInt(r.deliveryTime) > 40).slice(0, 3);

  const bestPharmacy = sortedByGmv[0];
  const worstPharmacy = sortedByGmv[sortedByGmv.length - 1];

  return (
    <Card title="Central de Performance do Varejo" className="h-full">
      {/* Seção de Insights Rápidos (Top Row) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 pb-8 border-b border-gray-100">
        {/* Altas */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-lg bg-brand-turquoise/10 text-brand-turquoise">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <p className="text-[9px] font-bold text-brand-teal uppercase tracking-widest">Maiores Altas (Ciclo)</p>
          </div>
          {gainers.map((r, i) => (
            <div key={i} className="flex justify-between items-center text-[11px]">
              <span className="font-bold text-brand-darkGray truncate max-w-[120px]">{r.name}</span>
              <span className="font-black text-brand-turquoise">+{r.gmvDelta}%</span>
            </div>
          ))}
        </div>

        {/* Quedas */}
        <div className="space-y-3 border-l border-gray-50 pl-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-lg bg-brand-salmon/10 text-brand-salmon">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
            </div>
            <p className="text-[9px] font-bold text-brand-teal uppercase tracking-widest">Maiores Quedas</p>
          </div>
          {decliners.map((r, i) => (
            <div key={i} className="flex justify-between items-center text-[11px]">
              <span className="font-bold text-brand-darkGray truncate max-w-[120px]">{r.name}</span>
              <span className="font-black text-brand-salmon">{r.gmvDelta}%</span>
            </div>
          ))}
        </div>

        {/* Riscos */}
        <div className="space-y-3 border-l border-gray-50 pl-6">
          <div className="flex items-center gap-2 mb-1">
            <div className="p-1.5 rounded-lg bg-brand-orange/10 text-brand-orange">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-[9px] font-bold text-brand-teal uppercase tracking-widest">Riscos Operacionais</p>
          </div>
          {risks.map((r, i) => (
            <div key={i} className="flex justify-between items-center text-[11px]">
              <span className="font-bold text-brand-darkGray truncate max-w-[120px]">{r.name}</span>
              <span className="font-black text-brand-orange">SLA {r.deliveryTime}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabela de Detalhes */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-50">
              <th className="pb-3 text-[10px] font-bold text-brand-teal uppercase tracking-wider pl-2">Varejista</th>
              <th className="pb-3 text-[10px] font-bold text-brand-teal uppercase tracking-wider text-right px-2">GMV (R$)</th>
              <th className="pb-3 text-[10px] font-bold text-brand-teal uppercase tracking-wider text-right px-2">Pedidos</th>
              <th className="pb-3 text-[10px] font-bold text-brand-teal uppercase tracking-wider text-right px-2">Canc.</th>
              <th className="pb-3 text-[10px] font-bold text-brand-teal uppercase tracking-wider text-right pr-2">SLA Médio</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {sortedByGmv.map((pharmacy, idx) => {
              const isBest = pharmacy.name === bestPharmacy.name;
              const isWorst = pharmacy.name === worstPharmacy.name;

              return (
                <tr key={idx} className={`hover:bg-gray-50 transition-colors ${isBest ? 'bg-brand-turquoise/5' : isWorst ? 'bg-brand-salmon/5' : ''}`}>
                  <td className="py-4 pl-2">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-brand-darkGray">{pharmacy.name}</span>
                      <div className="flex items-center gap-2 mt-1">
                        {isBest && (
                          <span className="text-[8px] font-black text-brand-turquoise bg-brand-turquoise/10 px-1.5 py-0.5 rounded uppercase tracking-tighter">
                            Destaque do Ciclo
                          </span>
                        )}
                        {isWorst && (
                          <span className="text-[8px] font-black text-brand-salmon bg-brand-salmon/10 px-1.5 py-0.5 rounded uppercase tracking-tighter">
                            Gargalo de Performance
                          </span>
                        )}
                        <span className={`text-[8px] font-bold ${pharmacy.gmvDelta > 0 ? 'text-brand-turquoise' : 'text-brand-salmon'}`}>
                          {pharmacy.gmvDelta > 0 ? '↑' : '↓'} {Math.abs(pharmacy.gmvDelta)}% vs Janela Ant.
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-sm font-bold text-brand-darkGray text-right px-2">
                    {pharmacy.gmv.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-4 text-sm font-medium text-brand-teal text-right px-2">
                    {pharmacy.orders}
                  </td>
                  <td className="py-4 text-right px-2">
                    <div className="flex flex-col items-end">
                      <span className={`text-sm font-bold ${pharmacy.cancellations > 10 ? 'text-brand-salmon' : 'text-brand-teal'}`}>
                        {pharmacy.cancellations}
                      </span>
                      {pharmacy.cancellationDelta !== 0 && (
                        <span className={`text-[8px] font-bold ${pharmacy.cancellationDelta > 0 ? 'text-brand-salmon' : 'text-brand-turquoise'}`}>
                          {pharmacy.cancellationDelta > 0 ? '+' : ''}{pharmacy.cancellationDelta} vrs. méd.
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 text-sm font-bold text-brand-darkGray text-right pr-2">
                    <div className="flex flex-col items-end">
                      <span>{pharmacy.deliveryTime}</span>
                      <span className={`text-[8px] font-bold ${pharmacy.deliveryTimeDelta > 0 ? 'text-brand-salmon' : 'text-brand-turquoise'}`}>
                        {pharmacy.deliveryTimeDelta > 0 ? '+' : ''}{pharmacy.deliveryTimeDelta} min
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
