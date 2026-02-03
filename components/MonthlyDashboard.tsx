
import React from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ComposedChart, Cell 
} from 'recharts';
import { 
  MONTHLY_KPIS, 
  DIARIZED_PERFORMANCE, 
  MONTHLY_FORECAST, 
  SALES_BY_CATEGORY, 
  TOP_PRODUCTS, 
  PHARMACY_PERFORMANCE,
  RECOMMENDATIONS
} from '../constants';
import { Card } from './Card';
import { HeaderKPIs } from './HeaderKPIs';
import { TrendingUp, TrendingDown, Minus, Target, Zap, AlertTriangle, Lightbulb } from 'lucide-react';

export const MonthlyDashboard: React.FC = () => {
  const totalMonthlyRevenue = DIARIZED_PERFORMANCE.reduce((acc, curr) => acc + curr.delivered, 0);

  return (
    <div className="animate-in fade-in duration-700 space-y-6">
      {/* 1. TOP METRICS – MONTH SUMMARY */}
      <HeaderKPIs data={MONTHLY_KPIS} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* 2. DIARIZED REVENUE CHART (MAIN SECTION) */}
        <div className="lg:col-span-12">
          <Card title="Diarização de Performance (Realizado vs Meta)" className="min-h-[480px]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
              <div className="flex flex-col gap-1">
                <p className="text-[9px] font-black text-brand-teal uppercase tracking-[0.2em] opacity-50">
                  Faturamento Total Acumulado
                </p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-bold text-brand-teal opacity-40">R$</span>
                  <h2 className="text-4xl font-black text-brand-darkGray tracking-tighter leading-none">
                    {totalMonthlyRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </h2>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-3 bg-gray-50/50 p-1.5 rounded-xl border border-gray-100">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg shadow-sm border border-gray-100">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-turquoise shadow-[0_0_8px_rgba(6,171,162,0.3)]" />
                  <span className="text-[9px] font-black text-brand-teal uppercase tracking-tighter">Entregues</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg shadow-sm border border-gray-100">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-darkGray/30" />
                  <span className="text-[9px] font-black text-brand-teal uppercase tracking-tighter">Abertos</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg shadow-sm border border-gray-100">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-salmon shadow-[0_0_8px_rgba(247,111,103,0.3)]" />
                  <span className="text-[9px] font-black text-brand-teal uppercase tracking-tighter">Cancelados</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg shadow-sm border border-dashed border-brand-orange/40">
                  <div className="w-5 h-0.5 bg-brand-orange" />
                  <span className="text-[9px] font-black text-brand-orange uppercase tracking-tighter">Meta</span>
                </div>
              </div>
            </div>

            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={DIARIZED_PERFORMANCE} margin={{ left: -30, right: 10 }}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#06ABA2" stopOpacity={1} />
                      <stop offset="100%" stopColor="#06ABA2" stopOpacity={0.8} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    fontSize={10} 
                    fontWeight={700} 
                    stroke="#94a3b8" 
                    dy={10}
                  />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{fill: '#f8fafc', opacity: 0.4}}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', padding: '16px' }}
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-gray-100">
                            <p className="text-[9px] font-black text-brand-teal uppercase tracking-widest mb-3">Dia {label}</p>
                            <div className="space-y-2 min-w-[140px]">
                              {payload.map((entry: any, i: number) => (
                                <div key={i} className="flex justify-between items-center gap-4">
                                  <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color || entry.stroke }} />
                                    <span className="text-[10px] font-bold text-brand-teal">{entry.name}:</span>
                                  </div>
                                  <span className="text-[10px] font-black text-brand-darkGray">
                                    R$ {entry.value.toLocaleString('pt-BR')}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend hide />
                  <Bar dataKey="delivered" name="Entregues" stackId="a" fill="url(#barGradient)" radius={[0, 0, 0, 0]} barSize={22} />
                  <Bar dataKey="open" name="Abertos" stackId="a" fill="#7A8590" opacity={0.2} barSize={22} />
                  <Bar dataKey="cancelled" name="Cancelados" stackId="a" fill="#F76F67" radius={[4, 4, 0, 0]} barSize={22} />
                  <Line type="monotone" name="Meta" dataKey="target" stroke="#F7B66E" strokeWidth={2.5} strokeDasharray="5 5" dot={false} activeDot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-50 flex justify-center">
               <p className="text-[8px] font-black text-brand-teal uppercase tracking-[0.3em] opacity-30 italic">Análise Temporal Consolidada • Base de Dados Operacional</p>
            </div>
          </Card>
        </div>

        {/* 3. TRANSACTIONAL PERFORMANCE BLOCK */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Volume de Pedidos vs SAC" className="flex flex-col">
             <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-gray-50/50 p-3.5 rounded-xl border border-gray-100">
                   <p className="text-[8px] font-black text-brand-teal uppercase tracking-widest opacity-60 mb-1">Pedidos Mês</p>
                   <h4 className="text-xl font-black text-brand-darkGray tracking-tighter">42.150</h4>
                   <div className="flex items-center gap-1 mt-0.5">
                      <TrendingUp size={9} className="text-brand-turquoise" />
                      <span className="text-[8px] font-bold text-brand-turquoise">+12.4%</span>
                   </div>
                </div>
                <div className="bg-brand-salmon/5 p-3.5 rounded-xl border border-brand-salmon/10">
                   <p className="text-[8px] font-black text-brand-salmon uppercase tracking-widest opacity-60 mb-1">Taxa Reclamação</p>
                   <h4 className="text-xl font-black text-brand-salmon tracking-tighter">1.84%</h4>
                   <div className="flex items-center gap-1 mt-0.5 text-brand-salmon opacity-60">
                      <TrendingUp size={9} />
                      <span className="text-[8px] font-bold">Estável</span>
                   </div>
                </div>
             </div>
             <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={DIARIZED_PERFORMANCE} margin={{ left: -35, right: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="day" hide />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white p-2.5 rounded-xl shadow-md border border-gray-100 text-[9px] font-black uppercase">
                              <p className="text-brand-turquoise mb-1">Pedidos: {payload[0].value}</p>
                              <p className="text-brand-salmon">Alertas: {payload[1].value}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Line type="monotone" dataKey="orders" stroke="#06ABA2" strokeWidth={3} dot={false} />
                    <Line type="monotone" dataKey="paymentFailures" stroke="#F76F67" strokeWidth={1.5} dot={false} strokeDasharray="3 3" />
                  </LineChart>
                </ResponsiveContainer>
             </div>
             <div className="mt-4 flex justify-between bg-gray-50/50 px-4 py-2.5 rounded-xl border border-gray-100">
                <div className="flex items-center gap-1.5">
                   <div className="w-2 h-2 rounded-full bg-brand-turquoise" />
                   <span className="text-[9px] font-black text-brand-teal uppercase tracking-tighter">Pedidos</span>
                </div>
                <div className="flex items-center gap-1.5">
                   <div className="w-2 h-2 rounded-full bg-brand-salmon" />
                   <span className="text-[9px] font-black text-brand-teal uppercase tracking-tighter">Quebra / Falha</span>
                </div>
             </div>
          </Card>

          <Card title="Ruptura de Estoque por Canal">
             <div className="grid grid-cols-3 gap-2 mb-6">
                {SALES_BY_CATEGORY.slice(0, 3).map((cat, i) => (
                  <div key={i} className="bg-gray-50/50 p-3 rounded-xl border border-gray-100 text-center">
                    <p className="text-lg font-black text-brand-orange tracking-tighter leading-none mb-1">{cat.rupture}%</p>
                    <p className="text-[7px] font-black text-brand-teal uppercase opacity-50 truncate">{cat.name.split(' ')[0]}</p>
                  </div>
                ))}
             </div>
             <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={SALES_BY_CATEGORY} margin={{ bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="name" 
                      fontSize={8} 
                      fontWeight={700} 
                      axisLine={false} 
                      tickLine={false} 
                      stroke="#7A8590" 
                      tickFormatter={(v) => v.substring(0, 10)}
                      angle={-20}
                      textAnchor="end"
                    />
                    <YAxis hide />
                    <Tooltip cursor={{fill: 'rgba(0,0,0,0.02)'}} />
                    <Bar dataKey="rupture" radius={[4, 4, 0, 0]} barSize={26}>
                       {SALES_BY_CATEGORY.map((entry, index) => (
                         <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#F7B66E' : '#E2E8F0'} />
                       ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
             </div>
             <p className="mt-4 text-[10px] font-bold text-brand-teal text-center opacity-60">
                Alvo de Ruptura: <span className="text-brand-orange font-black">&lt; 2.5%</span>
             </p>
          </Card>
        </div>

        {/* 4. TOP PRODUCTS */}
        <div className="lg:col-span-4">
           <Card title="Mix de Produtos Destaque" className="h-full">
              <div className="space-y-2.5">
                {TOP_PRODUCTS.map((prod, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3.5 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all group cursor-default">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center font-black text-brand-turquoise group-hover:bg-brand-turquoise group-hover:text-white transition-all text-xs border border-gray-100">
                        {idx + 1}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[11px] font-black text-brand-darkGray truncate w-32 leading-none mb-1">{prod.name}</p>
                        <p className="text-[8px] font-bold text-brand-teal uppercase opacity-40 tracking-tighter">{prod.category}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                       <p className="text-[11px] font-black text-brand-darkGray">R$ {prod.gmv.toLocaleString('pt-BR')}</p>
                       <div className="flex items-center justify-end gap-1 mt-0.5">
                          {prod.trend === 'up' ? <TrendingUp size={10} className="text-brand-turquoise" /> : <TrendingDown size={10} className="text-brand-salmon" />}
                          <span className="text-[8px] font-black uppercase text-brand-teal tabular-nums">{prod.sales} UN</span>
                       </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-3 bg-brand-darkGray/5 hover:bg-brand-turquoise/10 text-brand-teal hover:text-brand-turquoise rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border border-gray-100 border-dashed">
                Relatório Full Mix
              </button>
           </Card>
        </div>

        {/* 5. LOJISTAS Ranking */}
        <div className="lg:col-span-12">
          <Card title="Performance Sellers (Visão Consolidada)">
            <div className="overflow-x-auto -mx-2">
              <table className="w-full text-left border-separate border-spacing-y-1.5">
                <thead>
                  <tr className="text-[9px] font-black text-brand-teal uppercase tracking-widest opacity-40">
                    <th className="px-6 py-3">Lojista</th>
                    <th className="px-6 py-3 text-right">GMV Bruto</th>
                    <th className="px-6 py-3 text-right">Pedidos</th>
                    <th className="px-6 py-3 text-right">Canc. (%)</th>
                    <th className="px-6 py-3 text-right">SLA Médio</th>
                    <th className="px-6 py-3 text-right">Ruptura</th>
                    <th className="px-6 py-3 text-right">SAC</th>
                  </tr>
                </thead>
                <tbody>
                  {PHARMACY_PERFORMANCE.slice(0, 6).map((p, idx) => (
                    <tr key={idx} className="bg-gray-50/30 hover:bg-white hover:shadow-lg transition-all group">
                      <td className="px-6 py-3 rounded-l-xl border-l-2 border-l-transparent group-hover:border-l-brand-turquoise">
                         <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-[10px] ${idx < 3 ? 'bg-brand-turquoise/10 text-brand-turquoise' : 'bg-gray-100 text-brand-teal'}`}>
                               {idx + 1}
                            </div>
                            <div>
                               <p className="text-[12px] font-black text-brand-darkGray group-hover:text-brand-turquoise transition-colors leading-none mb-1">{p.name}</p>
                               <p className="text-[8px] font-bold text-brand-teal uppercase opacity-50">{p.region}</p>
                            </div>
                         </div>
                      </td>
                      <td className="px-6 py-3 text-right text-[12px] font-black text-brand-darkGray tabular-nums">
                        {p.gmv.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-3 text-right text-[12px] font-bold text-brand-teal tabular-nums">{p.orders}</td>
                      <td className={`px-6 py-3 text-right text-[11px] font-black tabular-nums ${p.cancellations > 10 ? 'text-brand-salmon' : 'text-brand-teal opacity-60'}`}>
                        {((p.cancellations / p.orders) * 100).toFixed(1)}%
                      </td>
                      <td className="px-6 py-3 text-right text-[11px] font-bold text-brand-darkGray">{p.deliveryTime}</td>
                      <td className="px-6 py-3 text-right text-[11px] font-black text-brand-orange">{p.rupture}%</td>
                      <td className="px-6 py-3 text-right text-[11px] font-black rounded-r-xl text-brand-salmon tabular-nums">{p.complaints}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* 6. LOGISTICA – MENSAL */}
        <div className="lg:col-span-6">
           <Card title="Logística Mensal Unificada" className="h-full">
              <div className="grid grid-cols-2 gap-4 mb-10">
                 <div className="p-6 bg-brand-turquoise/5 rounded-2xl border border-brand-turquoise/10 flex flex-col items-center justify-center group hover:bg-brand-turquoise transition-all duration-500">
                    <p className="text-[9px] font-black text-brand-teal group-hover:text-white uppercase tracking-widest mb-3 opacity-60">Tempo Médio</p>
                    <div className="flex items-baseline group-hover:text-white transition-colors">
                       <h3 className="text-4xl font-black tracking-tighter">28</h3>
                       <span className="text-sm ml-0.5 font-bold">min</span>
                    </div>
                    <div className="mt-4 flex items-center gap-1.5 bg-brand-turquoise/10 group-hover:bg-white/20 px-3 py-1 rounded-full text-brand-turquoise group-hover:text-white text-[9px] font-bold">
                       <TrendingUp size={12} />
                       <span>+2.5% vs Ant.</span>
                    </div>
                 </div>
                 <div className="p-6 bg-brand-darkGray/5 rounded-2xl border border-gray-100 flex flex-col items-center justify-center group hover:bg-brand-darkGray transition-all duration-500">
                    <p className="text-[9px] font-black text-brand-teal group-hover:text-white uppercase tracking-widest mb-3 opacity-60">SLA Global</p>
                    <div className="flex items-baseline group-hover:text-white transition-colors">
                       <h3 className="text-4xl font-black tracking-tighter">94</h3>
                       <span className="text-sm ml-0.5 font-bold">.2%</span>
                    </div>
                    <div className="mt-4 flex items-center gap-1.5 bg-brand-salmon/10 group-hover:bg-white/20 px-3 py-1 rounded-full text-brand-salmon group-hover:text-white text-[9px] font-bold">
                       <TrendingDown size={12} />
                       <span>-1.2% Pico</span>
                    </div>
                 </div>
              </div>
              <div className="space-y-2">
                 {[
                   { label: 'SLA Sudeste', value: '22 min', color: 'bg-brand-turquoise' },
                   { label: 'SLA Nordeste', value: '34 min', color: 'bg-brand-orange' },
                   { label: 'SLA Sul', value: '41 min', color: 'bg-brand-salmon' }
                 ].map((reg, idx) => (
                   <div key={idx} className="flex justify-between items-center p-3.5 bg-gray-50/50 rounded-xl border border-gray-100 hover:bg-white transition-all">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${reg.color}`} />
                        <span className="text-[10px] font-black text-brand-teal group-hover:text-brand-darkGray uppercase tracking-widest">{reg.label}</span>
                      </div>
                      <span className="text-xs font-black text-brand-darkGray tabular-nums">{reg.value}</span>
                   </div>
                 ))}
              </div>
           </Card>
        </div>

        {/* 7 & 8. FORECAST & RECOMMENDATIONS */}
        <div className="lg:col-span-6 flex flex-col gap-6">
           <Card title="Motor IA: Projeção Mês" className="border-l-4 border-l-brand-orange bg-gradient-to-br from-white to-orange-50/10">
              <div className="flex items-center gap-6 mb-8">
                 <div className="flex-1">
                    <p className="text-[9px] font-black text-brand-teal uppercase tracking-widest mb-3 opacity-40">Progressão vs Meta</p>
                    <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden shadow-inner border border-gray-100">
                       <div className="h-full bg-brand-orange shadow-[0_0_10px_rgba(247,182,110,0.4)] animate-pulse" style={{ width: '92.4%' }} />
                    </div>
                    <div className="flex justify-between mt-4">
                       <div>
                          <p className="text-[8px] font-black text-brand-teal uppercase opacity-40 mb-1">Forecast</p>
                          <p className="text-xl font-black text-brand-darkGray leading-none tracking-tighter">R$ 14.22M</p>
                       </div>
                       <div className="text-right">
                          <p className="text-[8px] font-black text-brand-teal uppercase opacity-40 mb-1">Objetivo</p>
                          <p className="text-xl font-black text-brand-darkGray leading-none tracking-tighter opacity-30">R$ 15.00M</p>
                       </div>
                    </div>
                 </div>
                 <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center text-brand-orange shrink-0 border border-brand-orange/20">
                    <Target size={30} />
                 </div>
              </div>
              <div className="space-y-3">
                 <div className="flex items-start gap-3 p-4 bg-white/80 rounded-xl border border-brand-salmon/10">
                    <div className="mt-0.5 text-brand-salmon">
                       <AlertTriangle size={14} />
                    </div>
                    <div>
                       <p className="text-[8px] font-black text-brand-salmon uppercase tracking-widest mb-0.5">Risco Fechamento</p>
                       <p className="text-[11px] text-brand-darkGray font-bold leading-tight">{MONTHLY_FORECAST.risks[1]}</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-3 p-4 bg-white/80 rounded-xl border border-brand-turquoise/10">
                    <div className="mt-0.5 text-brand-turquoise">
                       <Zap size={14} />
                    </div>
                    <div>
                       <p className="text-[8px] font-black text-brand-turquoise uppercase tracking-widest mb-0.5">Oportunidade</p>
                       <p className="text-[11px] text-brand-darkGray font-bold leading-tight">{MONTHLY_FORECAST.opportunities[0]}</p>
                    </div>
                 </div>
              </div>
           </Card>

           <Card title="Ações Recomendadas" className="flex-1 border-l-4 border-l-brand-turquoise bg-gradient-to-br from-white to-turquoise-50/10">
              <div className="grid grid-cols-2 gap-4">
                 {RECOMMENDATIONS.slice(0, 4).map((rec) => (
                   <div key={rec.id} className="flex gap-3 p-4 rounded-2xl bg-gray-50/50 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-brand-turquoise/10 group cursor-default">
                      <div className="w-10 h-10 rounded-xl bg-brand-turquoise/10 text-brand-turquoise flex items-center justify-center shrink-0 group-hover:bg-brand-turquoise group-hover:text-white transition-all shadow-sm">
                         <Lightbulb size={20} />
                      </div>
                      <div className="flex flex-col justify-center overflow-hidden">
                         <p className="text-[8px] font-black text-brand-turquoise uppercase tracking-widest mb-1">{rec.category}</p>
                         <p className="text-[10px] text-brand-darkGray font-black leading-tight truncate group-hover:text-brand-darkGray transition-colors">{rec.text}</p>
                      </div>
                   </div>
                 ))}
              </div>
              <div className="mt-6 flex items-center justify-center gap-2 py-4 border-t border-gray-100 border-dashed">
                 <div className="w-1.5 h-1.5 rounded-full bg-brand-turquoise animate-pulse" />
                 <span className="text-[8px] font-black text-brand-teal uppercase tracking-[0.2em] opacity-30">Analítico Ativo • Ver. 4.2</span>
              </div>
           </Card>
        </div>

      </div>
    </div>
  );
};
