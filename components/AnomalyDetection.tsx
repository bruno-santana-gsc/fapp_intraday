
import React from 'react';
import { Anomaly } from '../types';
import { Card } from './Card';

interface AnomalyDetectionProps {
  data: Anomaly[];
}

export const AnomalyDetection: React.FC<AnomalyDetectionProps> = ({ data }) => {
  return (
    <Card title="Anomalias Detectadas (Último Ciclo)" className="h-full border-2 border-brand-salmon/20">
      <div className="space-y-4">
        {data.length > 0 ? data.map((anomaly) => (
          <div 
            key={anomaly.id} 
            className={`p-4 rounded-xl border transition-all hover:shadow-sm ${
              anomaly.severity === 'critical' 
                ? 'bg-brand-salmon/5 border-brand-salmon/20' 
                : anomaly.severity === 'warning'
                ? 'bg-brand-orange/5 border-brand-orange/20'
                : 'bg-brand-turquoise/5 border-brand-turquoise/20'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                anomaly.severity === 'critical' 
                  ? 'bg-brand-salmon text-white' 
                  : anomaly.severity === 'warning'
                  ? 'bg-brand-orange text-white'
                  : 'bg-brand-turquoise text-white'
              }`}>
                {anomaly.type === 'price' ? 'Preço' : 
                 anomaly.type === 'volume' ? 'Volume' : 
                 anomaly.type === 'value' ? 'Ticket' : 'Cancelamento'}
              </span>
              <span className="text-[9px] font-bold text-brand-teal uppercase opacity-70">{anomaly.time}</span>
            </div>
            
            <h4 className="text-[13px] font-extrabold text-brand-darkGray mb-1 leading-tight tracking-tight">
              {anomaly.title}
            </h4>
            
            <p className="text-[11px] text-brand-teal leading-snug mb-3 font-medium">
              {anomaly.description}
            </p>

            {anomaly.details && (
              <div className="mt-3 pt-3 border-t border-gray-100/50 space-y-2">
                <div className="flex flex-wrap gap-2">
                  {anomaly.details.pharmacy && (
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/50 border border-gray-100">
                      <span className="text-[8px] font-bold text-brand-teal uppercase opacity-60">Farmácia:</span>
                      <span className="text-[9px] font-bold text-brand-darkGray">{anomaly.details.pharmacy}</span>
                    </div>
                  )}
                  {anomaly.details.location && (
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/50 border border-gray-100">
                      <span className="text-[8px] font-bold text-brand-teal uppercase opacity-60">Região:</span>
                      <span className="text-[9px] font-bold text-brand-darkGray">{anomaly.details.location}</span>
                    </div>
                  )}
                </div>
                {anomaly.details.impact && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] font-black text-brand-salmon uppercase tracking-tighter">Impacto:</span>
                    <span className="text-[10px] font-extrabold text-brand-darkGray">{anomaly.details.impact}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )) : (
          <div className="py-20 text-center opacity-40 italic text-[10px] uppercase font-bold tracking-widest">
            Nenhuma anomalia crítica na região
          </div>
        )}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-turquoise animate-pulse" />
          <span className="text-[9px] font-bold text-brand-teal uppercase tracking-widest">Motor de Fraude Ativo</span>
        </div>
      </div>
    </Card>
  );
};
