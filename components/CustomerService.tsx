
import React from 'react';
import { SAC_KPI_DATA, SAC_CATEGORIES, PHARMACY_PERFORMANCE } from '../constants';
import { Card } from './Card';
import { TrendingUp, TrendingDown, Headphones, MessageSquare, Clock, Smile } from 'lucide-react';

export const CustomerService: React.FC = () => {
  const topComplaintPharmacies = [...PHARMACY_PERFORMANCE]
    .sort((a, b) => (b.complaints || 0) - (a.complaints || 0))
    .slice(0, 5);

  const icons = [
    <MessageSquare size={16} className="text-brand-turquoise" />,
    < Headphones size={16} className="text-brand-orange" />,
    <Clock size={16} className="text-brand-salmon" />,
    <Smile size={16} className="text-brand-turquoise" />
  ];

  return (
    <Card title="Atendimento ao Cliente (SAC) - Janela Atual" className="h-full border-l-4 border-l-brand-orange">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {SAC_KPI_DATA.map((kpi, idx) => (
          <div key={idx} className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100 group hover:bg-white transition-all shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-lg bg-white shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                {icons[idx]}
              </div>
              <p className="text-[9px] font-black text-brand-teal uppercase tracking-widest opacity-60">
                {kpi.label}
              </p>
            </div>
            <div className="flex items-baseline justify-between">
              <h4 className="text-2xl font-black text-brand-darkGray tracking-tighter tabular-nums">
                {kpi.value}
              </h4>
              {kpi.trend !== undefined && (
                <div className={`flex items-center gap-0.5 text-[10px] font-black ${kpi.trend < 0 ? 'text-brand-turquoise' : 'text-brand-salmon'}`}>
                  {kpi.trend > 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                  <span>{Math.abs(kpi.trend)}%</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Categories Analysis */}
        <div className="lg:col-span-7">
          <p className="text-[10px] font-black text-brand-teal uppercase tracking-[0.2em] mb-4 opacity-40">Volume por Categoria de Ticket</p>
          <div className="space-y-4">
            {SAC_CATEGORIES.map((cat, idx) => (
              <div key={idx} className="group cursor-default">
                <div className="flex justify-between items-center text-[11px] font-bold mb-1.5">
                  <span className="text-brand-darkGray group-hover:text-brand-orange transition-colors">{cat.reason}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-brand-darkGray tabular-nums">{cat.count}</span>
                    <span className={`text-[9px] font-black ${cat.trend > 0 ? 'text-brand-salmon' : 'text-brand-turquoise'}`}>
                      {cat.trend > 0 ? '+' : ''}{cat.trend}%
                    </span>
                  </div>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand-orange/80 transition-all duration-1000 group-hover:bg-brand-orange" 
                    style={{ width: `${(cat.count / Math.max(...SAC_CATEGORIES.map(c => c.count))) * 100}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Offenders (Complaints) */}
        <div className="lg:col-span-5 border-l border-gray-100 pl-0 lg:pl-8">
          <p className="text-[10px] font-black text-brand-teal uppercase tracking-[0.2em] mb-4 opacity-40">Foco de Reclamações (Sellers)</p>
          <div className="space-y-3">
            {topComplaintPharmacies.map((p, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-brand-salmon/5 border border-transparent hover:border-brand-salmon/20 transition-all group">
                <div className="flex items-center gap-3 overflow-hidden">
                   <div className="w-7 h-7 flex items-center justify-center bg-white shadow-sm border border-gray-100 rounded-lg text-brand-salmon text-[10px] font-black shrink-0">
                      {idx + 1}
                   </div>
                   <div className="overflow-hidden">
                      <p className="text-[11px] font-bold text-brand-darkGray truncate leading-tight mb-0.5 group-hover:text-brand-salmon transition-colors">{p.name}</p>
                      <p className="text-[8px] font-bold text-brand-teal uppercase opacity-50">{p.region}</p>
                   </div>
                </div>
                <div className="text-right shrink-0">
                   <p className="text-[11px] font-black text-brand-salmon leading-none">{p.complaints}</p>
                   <p className="text-[7px] font-black text-brand-teal uppercase mt-0.5 opacity-40">tickets</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
             <div className="flex items-start gap-3">
                < Headphones size={16} className="text-brand-turquoise mt-0.5 shrink-0" />
                <div>
                   <p className="text-[10px] font-black text-brand-darkGray leading-tight mb-1">Status do Time de Suporte</p>
                   <p className="text-[9px] text-brand-teal font-medium">85% dos agentes online. SLA de 10 min está sendo cumprido em 92% dos casos.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 pt-4 border-t border-gray-100 flex justify-between items-center">
        <span className="text-[10px] text-brand-teal font-bold uppercase tracking-widest opacity-40 italic">Monitoramento de Voz do Cliente Ativado</span>
        <button className="text-[10px] font-black text-brand-orange uppercase hover:underline tracking-widest transition-all">Relatório SAC Detalhado</button>
      </div>
    </Card>
  );
};
