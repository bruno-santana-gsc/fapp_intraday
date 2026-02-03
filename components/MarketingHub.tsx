
import React from 'react';
import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Scatter } from 'recharts';
import { TOP_COUPONS, DEVICE_PERFORMANCE } from '../constants';
import { ChannelPerformance, GrowthData } from '../types';
import { Card } from './Card';

interface MarketingHubProps {
  channels: ChannelPerformance[];
  growthData: GrowthData[];
  regionName: string;
}

const CustomPushDot = (props: any) => {
  const { cx, cy, payload } = props;
  if (!payload.push) return null;

  return (
    <g>
      {/* Halo pulse effect */}
      <circle cx={cx} cy={cy} r={12} fill="#F7B66E" fillOpacity={0.15}>
        <animate attributeName="r" from="8" to="16" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.3" to="0" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx={cx} cy={cy} r={5} fill="#F7B66E" stroke="#fff" strokeWidth={2} className="drop-shadow-sm" />
      <g transform={`translate(${cx}, ${cy - 16})`}>
        <rect x="-18" y="-12" width="36" height="14" rx="4" fill="#F7B66E" />
        <text textAnchor="middle" y="-2" fill="#fff" fontSize="8" fontWeight="900" style={{ letterSpacing: '0.05em' }}>PUSH</text>
      </g>
    </g>
  );
};

export const MarketingHub: React.FC<MarketingHubProps> = ({ channels, growthData, regionName }) => {
  const currentTicket = growthData[growthData.length - 1].ticket;
  const totalSessions = growthData.reduce((acc, g) => acc + g.count, 0);
  const totalRegistrations = growthData.reduce((acc, g) => acc + g.newRegistrations, 0);

  // A escala regional baseada nos dados de crescimento (w)
  const regionScale = growthData.length > 0 ? growthData[0].count / 120 : 1;

  return (
    <Card title={`Crescimento & Performance de Marketing - ${regionName}`} className="h-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="flex flex-wrap items-center justify-between mb-10 gap-6">
            <div className="flex gap-8 md:gap-12">
              <div>
                <p className="text-[10px] font-bold text-brand-teal uppercase tracking-widest mb-2 opacity-60">Sessões Totais</p>
                <h4 className="text-3xl font-black text-brand-darkGray leading-none tracking-tighter">
                  {totalSessions.toLocaleString('pt-BR')}
                </h4>
              </div>
              <div className="border-l border-gray-100 pl-8">
                <p className="text-[10px] font-bold text-brand-salmon uppercase tracking-widest mb-2 opacity-60">Ticket Médio</p>
                <h4 className="text-3xl font-black text-brand-darkGray leading-none tracking-tighter">
                  <span className="text-sm font-bold mr-1 opacity-40">R$</span>
                  {currentTicket.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </h4>
              </div>
              <div className="border-l border-gray-100 pl-8">
                <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2 opacity-60">Novos Cadastros</p>
                <h4 className="text-3xl font-black text-brand-darkGray leading-none tracking-tighter">
                  {totalRegistrations.toLocaleString('pt-BR')}
                </h4>
              </div>
            </div>
            
            {/* Chart Legend */}
            <div className="flex flex-wrap items-center gap-5 bg-white shadow-sm border border-gray-100 px-5 py-2.5 rounded-2xl">
               <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-turquoise" />
                  <span className="text-[10px] font-black text-brand-teal uppercase tracking-tighter">Volume Sessões</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-salmon" />
                  <span className="text-[10px] font-black text-brand-teal uppercase tracking-tighter">Ticket Médio</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span className="text-[10px] font-black text-brand-teal uppercase tracking-tighter">Novos Cadastros</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-orange shadow-[0_0_8px_rgba(247,182,110,0.5)]" />
                  <span className="text-[10px] font-black text-brand-teal uppercase tracking-tighter">Eventos de Push</span>
               </div>
            </div>
          </div>

          <div className="h-[280px] w-full mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={growthData} margin={{ top: 20, right: 30, bottom: 20, left: 0 }}>
                <defs>
                  <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#62D9D1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#62D9D1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="period" 
                  fontSize={10} 
                  axisLine={false} 
                  tickLine={false} 
                  stroke="#7A8590" 
                  tickMargin={15}
                  fontWeight={600}
                />
                <YAxis yAxisId="left" hide />
                <YAxis yAxisId="right" hide />
                <Tooltip 
                  cursor={{ stroke: '#E5E7EB', strokeWidth: 1 }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', padding: '16px' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white">
                          <p className="text-[11px] font-black text-brand-teal uppercase mb-3 tracking-widest">{data.period}h - Resumo de Janela</p>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center gap-6">
                              <span className="text-[11px] font-bold text-brand-teal">Volume:</span> 
                              <span className="text-sm font-black text-brand-darkGray">{data.count.toLocaleString('pt-BR')}</span>
                            </div>
                            <div className="flex justify-between items-center gap-6">
                              <span className="text-[11px] font-bold text-brand-teal">Ticket:</span> 
                              <span className="text-sm font-black text-brand-salmon">R$ {data.ticket.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center gap-6">
                              <span className="text-[11px] font-bold text-brand-teal">Novos Cadastros:</span> 
                              <span className="text-sm font-black text-blue-500">{data.newRegistrations.toLocaleString('pt-BR')}</span>
                            </div>
                            {data.push && (
                              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
                                <span className="text-brand-orange font-black uppercase text-[10px] tracking-tight">Notificação Enviada</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area yAxisId="left" type="monotone" dataKey="count" stroke="#62D9D1" fillOpacity={1} fill="url(#colorGrowth)" strokeWidth={4} />
                <Line yAxisId="right" type="monotone" dataKey="ticket" stroke="#F78881" strokeWidth={3} dot={{ r: 5, fill: '#F78881', stroke: '#fff', strokeWidth: 2 }} activeDot={{ r: 8, strokeWidth: 0 }} />
                <Line yAxisId="left" type="monotone" dataKey="newRegistrations" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4, fill: '#3B82F6', stroke: '#fff', strokeWidth: 2 }} strokeDasharray="5 5" />
                <Scatter yAxisId="left" dataKey="pushValue" shape={<CustomPushDot />} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-8 border-t border-gray-100">
            <p className="text-[10px] font-black text-brand-teal uppercase tracking-[0.2em] mb-6 opacity-40">Atribuição por Canal de Marketing</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
              {channels.map((ch, idx) => (
                <div key={idx} className="group">
                  <div className="flex justify-between items-center text-[11px] font-bold mb-2">
                    <span className="text-brand-darkGray group-hover:text-brand-turquoise transition-colors">{ch.channel}</span>
                    <span className="bg-brand-turquoise/10 text-brand-turquoise px-2 py-0.5 rounded-md text-[9px] font-black">{ch.conversion}% CVR</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-turquoise transition-all duration-1000 group-hover:opacity-100 opacity-70" 
                      style={{ width: `${(ch.gmv / Math.max(...channels.map(c => c.gmv))) * 100}%` }} 
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-[9px] font-bold text-brand-teal uppercase tracking-tight">
                    <span>{ch.sessions.toLocaleString('pt-BR')} Visitas</span>
                    <span className="text-brand-darkGray">R$ {ch.gmv.toLocaleString('pt-BR')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 border-l border-gray-100 pl-0 lg:pl-10 flex flex-col">
          <div className="mb-10">
            <p className="text-[10px] font-black text-brand-teal uppercase tracking-[0.2em] mb-6 opacity-40">Acessos por Plataforma</p>
            <div className="grid grid-cols-3 gap-3">
              {DEVICE_PERFORMANCE.map((dev, idx) => (
                <div key={idx} className="flex flex-col items-center p-4 rounded-2xl bg-gray-50/50 border border-gray-100 hover:bg-white hover:shadow-md transition-all group">
                  <span className="text-lg font-black text-brand-darkGray leading-none group-hover:text-brand-turquoise transition-colors">{dev.percentage}%</span>
                  <span className="text-[9px] font-black text-brand-teal uppercase mt-2 opacity-60">{dev.device}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[10px] font-black text-brand-teal uppercase tracking-[0.2em] mb-6 opacity-40">Principais Cupons em Uso</p>
          <div className="space-y-3 flex-1">
            {TOP_COUPONS.map((coupon, idx) => {
              const scaledUses = Math.floor(coupon.uses * regionScale);
              const scaledGmv = coupon.gmv * regionScale;

              return (
                <div key={idx} className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-gray-100 hover:shadow-lg hover:border-brand-turquoise/20 transition-all cursor-default group">
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 flex items-center justify-center bg-gray-50 group-hover:bg-brand-turquoise/10 group-hover:text-brand-turquoise text-brand-teal text-[12px] font-black rounded-xl transition-colors">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-[13px] font-black text-brand-darkGray tracking-tight leading-none mb-1.5">{coupon.code}</p>
                      <p className="text-[10px] text-brand-teal font-bold uppercase opacity-60">R$ {scaledGmv.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} GMV</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[12px] font-black text-brand-darkGray">{scaledUses.toLocaleString('pt-BR')}</p>
                    <p className="text-[8px] text-brand-teal font-black uppercase tracking-tighter">Usos</p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <button className="mt-8 w-full py-4 bg-gray-50 hover:bg-brand-turquoise hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-gray-100 border-dashed">
            Exportar Detalhado de MKT
          </button>
        </div>
      </div>
    </Card>
  );
};
