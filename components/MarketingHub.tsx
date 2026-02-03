
import React from 'react';
import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CUSTOMER_GROWTH, TOP_COUPONS, DEVICE_PERFORMANCE } from '../constants';
import { ChannelPerformance } from '../types';
import { Card } from './Card';

interface MarketingHubProps {
  channels: ChannelPerformance[];
  regionWeight: number;
}

export const MarketingHub: React.FC<MarketingHubProps> = ({ channels, regionWeight }) => {
  const currentTicket = CUSTOMER_GROWTH[CUSTOMER_GROWTH.length - 1].ticket;

  const adjustedGrowth = CUSTOMER_GROWTH.map(g => ({
    ...g,
    count: Math.floor(g.count * regionWeight)
  }));

  return (
    <Card title="Crescimento & Performance de Marketing" className="h-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-6">
            <div>
              <p className="text-[10px] font-bold text-brand-teal uppercase tracking-widest mb-1">Novos Clientes (Região)</p>
              <h4 className="text-2xl font-extrabold text-brand-darkGray leading-none">
                {Math.floor(892 * regionWeight)}
              </h4>
            </div>
            <div className="border-l border-gray-100 pl-6">
              <p className="text-[10px] font-bold text-brand-salmon uppercase tracking-widest mb-1">Ticket Médio (Hoje)</p>
              <h4 className="text-2xl font-extrabold text-brand-darkGray leading-none">
                R$ {currentTicket.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </h4>
            </div>
          </div>

          <div className="h-[180px] w-full mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={adjustedGrowth}>
                <defs>
                  <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#62D9D1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#62D9D1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="period" 
                  fontSize={9} 
                  axisLine={false} 
                  tickLine={false} 
                  stroke="#7A8590" 
                  tickMargin={10}
                />
                <YAxis yAxisId="left" hide />
                <YAxis yAxisId="right" hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '10px' }}
                />
                <Area yAxisId="left" type="monotone" dataKey="count" stroke="#62D9D1" fillOpacity={1} fill="url(#colorGrowth)" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="ticket" stroke="#F78881" strokeWidth={3} dot={{ r: 4, fill: '#F78881', stroke: '#fff' }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <p className="text-[10px] font-bold text-brand-teal uppercase tracking-widest mb-4">Performance por Canal na Região</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              {channels.map((ch, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-brand-darkGray">{ch.channel}</span>
                    <span className="text-brand-turquoise">{ch.conversion}% Conv.</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-turquoise opacity-80" style={{ width: `${(ch.gmv / Math.max(...channels.map(c => c.gmv))) * 100}%` }} />
                  </div>
                  <div className="flex justify-between text-[8px] font-bold text-brand-teal uppercase">
                    <span>{ch.sessions.toLocaleString('pt-BR')} sessões</span>
                    <span>R$ {ch.gmv.toLocaleString('pt-BR')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 border-l border-gray-100 pl-0 lg:pl-8 flex flex-col">
          <div className="mb-8">
            <p className="text-[10px] font-bold text-brand-teal uppercase tracking-widest mb-4">Uso por Dispositivo</p>
            <div className="flex justify-between gap-2">
              {DEVICE_PERFORMANCE.map((dev, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center p-3 rounded-xl bg-gray-50/50 border border-gray-100/50">
                  <span className="text-[12px] font-black text-brand-darkGray leading-none">{dev.percentage}%</span>
                  <span className="text-[8px] font-bold text-brand-teal uppercase mt-1">{dev.device}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[10px] font-bold text-brand-teal uppercase tracking-widest mb-4">Top Cupons em Operação</p>
          <div className="space-y-3 flex-1 overflow-y-auto">
            {TOP_COUPONS.map((coupon, idx) => (
              <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 flex items-center justify-center bg-brand-turquoise/10 text-brand-turquoise text-[11px] font-black rounded-lg">{idx + 1}</span>
                  <div>
                    <p className="text-xs font-bold text-brand-darkGray tracking-tight leading-none mb-1">{coupon.code}</p>
                    <p className="text-[9px] text-brand-teal font-medium uppercase">{Math.floor(coupon.uses * regionWeight)} conversões</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
