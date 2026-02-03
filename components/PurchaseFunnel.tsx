
import React from 'react';
import { FunnelStep } from '../types';
import { Card } from './Card';

interface PurchaseFunnelProps {
  data: FunnelStep[];
}

export const PurchaseFunnel: React.FC<PurchaseFunnelProps> = ({ data }) => {
  return (
    <Card title="Funil de Compra" className="mb-8">
      <div className="flex flex-col md:flex-row items-stretch justify-between gap-2">
        {data.map((step, idx) => (
          <div key={idx} className="flex-1 flex flex-col min-w-[120px]">
            <div className="flex justify-between items-end mb-2">
              <span className="text-[11px] font-bold text-brand-darkGray">{step.label}</span>
              <span className="text-[10px] font-medium text-brand-teal">{step.count.toLocaleString('pt-BR')}</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden relative">
              <div 
                className="h-full bg-brand-turquoise transition-all duration-1000"
                style={{ width: `${step.percentage}%` }}
              />
            </div>
            <div className="mt-1 flex justify-between">
              <span className="text-[9px] text-brand-teal font-medium">
                {idx > 0 ? `${step.percentage}% do anterior` : 'Origem'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
