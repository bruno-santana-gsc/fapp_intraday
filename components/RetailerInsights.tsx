
import React from 'react';
// Fix: Use PHARMACY_PERFORMANCE as RETAILER_PERFORMANCE is not defined in constants.tsx
import { PHARMACY_PERFORMANCE } from '../constants';
import { Card } from './Card';

export const RetailerInsights: React.FC = () => {
  // Mock logic to categorize performance
  // Fix: Use PHARMACY_PERFORMANCE instead of undefined RETAILER_PERFORMANCE
  const gainers = [...PHARMACY_PERFORMANCE].sort((a, b) => b.gmvDelta - a.gmvDelta).slice(0, 3);
  const decliners = [...PHARMACY_PERFORMANCE].sort((a, b) => a.gmvDelta - b.gmvDelta).slice(0, 3);
  const risks = [...PHARMACY_PERFORMANCE].filter(r => r.cancellationDelta > 0 || parseInt(r.deliveryTime) > 40);

  return (
    <Card title="Insights de Performance do Varejo" className="h-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Top Altas de GMV */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-brand-turquoise/10 text-brand-turquoise">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <p className="text-[10px] font-bold text-brand-teal uppercase tracking-widest">Maiores Altas (GMV %)</p>
          </div>
          <div className="space-y-3">
            {gainers.map((retailer, idx) => (
              <div key={idx} className="flex justify-between items-center p-2.5 rounded-xl bg-brand-turquoise/5 border border-brand-turquoise/10">
                <div className="overflow-hidden mr-2">
                  <p className="text-[11px] font-bold text-brand-darkGray truncate">{retailer.name}</p>
                  <p className="text-[9px] text-brand-teal">R$ {retailer.gmv.toLocaleString('pt-BR')}</p>
                </div>
                <span className="text-[10px] font-black text-brand-turquoise shrink-0">+{retailer.gmvDelta}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Maiores Quedas de GMV */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-brand-salmon/10 text-brand-salmon">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
            </div>
            <p className="text-[10px] font-bold text-brand-teal uppercase tracking-widest">Maiores Quedas (GMV %)</p>
          </div>
          <div className="space-y-3">
            {decliners.map((retailer, idx) => (
              <div key={idx} className="flex justify-between items-center p-2.5 rounded-xl bg-brand-salmon/5 border border-brand-salmon/10">
                <div className="overflow-hidden mr-2">
                  <p className="text-[11px] font-bold text-brand-darkGray truncate">{retailer.name}</p>
                  <p className="text-[9px] text-brand-teal">R$ {retailer.gmv.toLocaleString('pt-BR')}</p>
                </div>
                <span className="text-[10px] font-black text-brand-salmon shrink-0">{retailer.gmvDelta}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Alertas de Risco Operacional */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-brand-orange/10 text-brand-orange">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-[10px] font-bold text-brand-teal uppercase tracking-widest">Riscos Operacionais</p>
          </div>
          <div className="space-y-3">
            {risks.map((retailer, idx) => (
              <div key={idx} className="flex flex-col p-2.5 rounded-xl bg-brand-orange/5 border border-brand-orange/10">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-[11px] font-bold text-brand-darkGray truncate">{retailer.name}</p>
                  <span className="text-[9px] font-extrabold text-brand-orange uppercase">Crítico</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[9px] text-brand-teal">Canc.: <b className="text-brand-salmon">+{retailer.cancellationDelta}</b></span>
                  <span className="text-[9px] text-brand-teal">SLA: <b className="text-brand-darkGray">{retailer.deliveryTime}</b></span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Card>
  );
};
