
import React from 'react';
import { LOGISTICS_STATUS, DELIVERY_TIMES } from '../constants';
import { PharmacyPerformance } from '../types';
import { Card } from './Card';

const statusTranslation: Record<string, string> = {
  'Waiting Approval': 'Aguardando Aprovação',
  'In Preparation': 'Em Preparação',
  'Out for Delivery': 'Saiu para Entrega',
  'Delivered': 'Entregue'
};

interface LogisticsStatusProps {
  pharmacies: PharmacyPerformance[];
}

export const LogisticsStatus: React.FC<LogisticsStatusProps> = ({ pharmacies }) => {
  const topLogisticsOffenders = [...pharmacies]
    .sort((a, b) => {
      const timeA = parseInt(a.deliveryTime.split(' ')[0]);
      const timeB = parseInt(b.deliveryTime.split(' ')[0]);
      return timeB - timeA;
    })
    .slice(0, 5);

  return (
    <Card title="Status Logístico" className="h-full">
      <div className="grid grid-cols-2 gap-4 mb-6">
        {LOGISTICS_STATUS.map((item, idx) => (
          <div 
            key={idx} 
            className="p-4 rounded-xl border border-gray-50 flex flex-col items-center justify-center text-center"
            style={{ backgroundColor: `${item.color}08` }}
          >
            <p className="text-[10px] font-bold uppercase tracking-tight mb-1" style={{ color: item.color }}>
              {statusTranslation[item.status] || item.status}
            </p>
            <p className="text-2xl font-extrabold text-brand-darkGray">
              {item.count}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-4 mb-6 pt-4 border-t border-gray-50">
        <h4 className="text-[10px] font-bold text-brand-teal uppercase tracking-widest mb-3">Tempo Médio Geral</h4>
        {DELIVERY_TIMES.map((delivery, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-gray-50/50">
            <div>
              <p className="text-[11px] font-bold text-brand-darkGray">{delivery.label}</p>
              <p className="text-[9px] text-brand-teal font-medium">SLA de performance</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-extrabold text-brand-darkGray">{delivery.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 mb-6">
        <p className="text-[10px] font-bold text-brand-orange uppercase tracking-widest border-b border-brand-orange/10 pb-1">Top 5 Ofensores (Atrasos)</p>
        <div className="space-y-2">
          {topLogisticsOffenders.map((offender, idx) => (
            <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-brand-orange/5 border border-transparent hover:border-brand-orange/20 group">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black text-brand-orange w-3">{idx + 1}</span>
                <span className="text-[11px] font-bold text-brand-darkGray truncate max-w-[140px] group-hover:text-brand-orange transition-colors">{offender.name}</span>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-brand-orange leading-none">{offender.deliveryTime}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
