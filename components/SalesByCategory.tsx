
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { SALES_BY_CATEGORY, TOP_PRODUCTS } from '../constants';
import { Card } from './Card';

const COLORS = ['#62D9D1', '#7A8590', '#F78881', '#F7B66E', '#FFB166'];

export const SalesByCategory: React.FC = () => {
  return (
    <Card title="Vendas por Categoria" className="h-full">
      {/* Gráfico de Categorias */}
      <div className="h-[200px] mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={SALES_BY_CATEGORY}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f0f0f0" />
            <XAxis type="number" hide />
            <YAxis 
              type="category" 
              dataKey="name" 
              stroke="#57616B" 
              fontSize={8} 
              fontWeight={700}
              width={100}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              cursor={{fill: '#f8f9fa'}}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '10px' }}
              formatter={(value: number) => `R$ ${value.toLocaleString('pt-BR')}`}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={14}>
              {SALES_BY_CATEGORY.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Listagem de Métricas de Categoria */}
      <div className="space-y-1.5 mb-6">
        {SALES_BY_CATEGORY.map((cat, idx) => (
          <div key={idx} className="flex justify-between items-center text-[10px] font-bold">
            <span className="text-brand-teal truncate w-24 uppercase tracking-tighter">{cat.name}</span>
            <div className="flex gap-2 items-center">
              <span className="text-brand-darkGray">R$ {cat.value.toLocaleString('pt-BR')}</span>
              <span className="bg-gray-100 text-brand-teal px-1.5 py-0.5 rounded text-[9px]">{cat.percentage}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Top 5 Produtos Sold */}
      <div className="pt-4 border-t border-gray-100">
        <p className="text-[10px] font-bold text-brand-teal uppercase tracking-widest mb-3">Top 5 Produtos Vendidos</p>
        <div className="space-y-2">
          {TOP_PRODUCTS.map((product, idx) => (
            <div key={idx} className="flex items-center justify-between group">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="text-[9px] font-black text-brand-turquoise w-3 shrink-0">{idx + 1}</span>
                <div className="flex flex-col overflow-hidden">
                  <p className="text-[10px] font-bold text-brand-darkGray truncate leading-tight group-hover:text-brand-turquoise transition-colors">
                    {product.name}
                  </p>
                  <p className="text-[8px] text-brand-teal font-medium uppercase tracking-tighter">{product.category}</p>
                </div>
              </div>
              <div className="text-right shrink-0 ml-2">
                <p className="text-[10px] font-bold text-brand-darkGray leading-none">{product.sales}</p>
                <p className="text-[8px] text-brand-teal uppercase font-medium">unid.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
