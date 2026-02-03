
import { 
  KPI, 
  FunnelStep, 
  CategoryData, 
  PharmacyPerformance, 
  LogisticStatus, 
  Recommendation, 
  Anomaly, 
  CouponData, 
  GrowthData, 
  TopProduct,
  ChannelPerformance,
  DevicePerformance,
  DailyPerformance,
  MonthlyForecast,
  SACCategory
} from './types';

export const HEADER_KPIS: KPI[] = [
  { label: 'GMV Janela Atual', value: '452.890', trend: 12.5, prefix: 'R$' },
  { label: 'Pedidos Consolidados', value: '1.240', trend: 8.2 },
  { label: 'Pedidos Aprovados', value: '1.192', trend: 7.8 },
  { label: 'Pedidos Faturados', value: '1.050', trend: 5.4 },
  { label: 'Taxa de Conversão', value: '4,8', trend: -1.2, prefix: '%' },
  { label: 'Farmácias com Venda', value: '342', trend: 2.1 },
  { label: 'Usuários com compra', value: '12.450', trend: 15.4 },
  { label: 'Ofertas Ativas', value: '8.902', trend: 0.5 },
];

export const FUNNEL_DATA: FunnelStep[] = [
  { label: 'Impressões', count: 125000, percentage: 100 },
  { label: 'Cliques', count: 15400, percentage: 12.3 },
  { label: 'Visitas', count: 12200, percentage: 79.2 },
  { label: 'Carrinhos', count: 3200, percentage: 26.2 },
  { label: 'Checkouts', count: 1800, percentage: 56.2 },
  { label: 'Pedidos', count: 1240, percentage: 68.8 },
];

export const SALES_BY_CATEGORY: CategoryData[] = [
  { name: 'Beleza & Cosméticos', value: 124500, percentage: 32, rupture: 4.2, growth: 12.5 },
  { name: 'Cuidados Pessoais', value: 89000, percentage: 23, rupture: 3.1, growth: 8.2 },
  { name: 'Vitaminas & Suplementos', value: 156000, percentage: 38, rupture: 5.8, growth: 15.4 },
  { name: 'MIPs (OTC)', value: 72000, percentage: 18, rupture: 2.5, growth: -2.1 },
  { name: 'Medicamentos Prescritos', value: 41390, percentage: 11, rupture: 1.8, growth: 4.0 },
];

export const TOP_PRODUCTS: TopProduct[] = [
  { name: 'Doralgina 20 Comprimidos', category: 'MIPs (OTC)', sales: 452, gmv: 8588, trend: 'up' },
  { name: 'Protetor Solar FPS 60 200ml', category: 'Beleza', sales: 312, gmv: 24960, trend: 'stable' },
  { name: 'Vitamina C 1g 10 eferv.', category: 'Vitaminas', sales: 284, gmv: 5680, trend: 'down' },
  { name: 'Sabonete Líquido Neutro 400ml', category: 'Cuidado', sales: 215, gmv: 4300, trend: 'up' },
  { name: 'Omega 3 1000mg 60 Cáps.', category: 'Vitaminas', sales: 198, gmv: 11880, trend: 'up' },
];

export const PHARMACY_PERFORMANCE: PharmacyPerformance[] = [
  { name: 'PharmaPlus Matriz', region: 'Sudeste', gmv: 42500, gmvDelta: 15.2, orders: 156, cancellations: 2, cancellationDelta: -1, deliveryTime: '22 min', deliveryTimeDelta: -3, rupture: 2.1, complaints: 1 },
  { name: 'MediCare Central', region: 'Sudeste', gmv: 38200, gmvDelta: 8.4, orders: 142, cancellations: 5, cancellationDelta: 2, deliveryTime: '28 min', deliveryTimeDelta: 2, rupture: 3.5, complaints: 3 },
  { name: 'HealthHub Sul', region: 'Sul', gmv: 31000, gmvDelta: -12.5, orders: 128, cancellations: 12, cancellationDelta: 8, deliveryTime: '45 min', deliveryTimeDelta: 12, rupture: 8.2, complaints: 15 },
  { name: 'WellPharm Direct', region: 'Nordeste', gmv: 28400, gmvDelta: 5.1, orders: 110, cancellations: 3, cancellationDelta: 0, deliveryTime: '24 min', deliveryTimeDelta: -1, rupture: 1.8, complaints: 2 },
  { name: 'QuickMeds Express', region: 'Sudeste', gmv: 21200, gmvDelta: 18.2, orders: 98, cancellations: 2, cancellationDelta: 0, deliveryTime: '20 min', deliveryTimeDelta: -2, rupture: 1.2, complaints: 0 },
  { name: 'BioSaúde Premium', region: 'Sul', gmv: 18900, gmvDelta: 12.5, orders: 92, cancellations: 4, cancellationDelta: 1, deliveryTime: '31 min', deliveryTimeDelta: 3, rupture: 2.9, complaints: 4 },
  { name: 'DrogaLuz Online', region: 'Centro-Oeste', gmv: 16400, gmvDelta: -4.2, orders: 85, cancellations: 7, cancellationDelta: 3, deliveryTime: '35 min', deliveryTimeDelta: 5, rupture: 5.4, complaints: 8 },
  { name: 'VidaFarma Matriz', region: 'Nordeste', gmv: 14200, gmvDelta: 22.1, orders: 78, cancellations: 1, cancellationDelta: -1, deliveryTime: '19 min', deliveryTimeDelta: -4, rupture: 0.9, complaints: 0 },
  { name: 'Nossa Farma Centro', region: 'Sudeste', gmv: 12800, gmvDelta: 3.8, orders: 65, cancellations: 3, cancellationDelta: 0, deliveryTime: '26 min', deliveryTimeDelta: 0, rupture: 2.3, complaints: 2 },
  { name: 'FarmaPopular 24h', region: 'Norte', gmv: 11500, gmvDelta: 7.4, orders: 58, cancellations: 1, cancellationDelta: -2, deliveryTime: '23 min', deliveryTimeDelta: -2, rupture: 1.5, complaints: 1 },
  { name: 'Drogaria do Povo', region: 'Nordeste', gmv: 10200, gmvDelta: -2.1, orders: 49, cancellations: 4, cancellationDelta: 1, deliveryTime: '38 min', deliveryTimeDelta: 4, rupture: 4.8, complaints: 6 },
  { name: 'Farmácia Popular Viva', region: 'Norte', gmv: 9800, gmvDelta: -45.0, orders: 42, cancellations: 15, cancellationDelta: 10, deliveryTime: '58 min', deliveryTimeDelta: 25, rupture: 15.2, complaints: 22 },
  { name: 'SulMeds Regional', region: 'Sul', gmv: 8500, gmvDelta: 12.0, orders: 38, cancellations: 0, cancellationDelta: -2, deliveryTime: '21 min', deliveryTimeDelta: -2, rupture: 1.1, complaints: 0 },
  { name: 'Centro Pharm', region: 'Centro-Oeste', gmv: 7900, gmvDelta: 3.5, orders: 32, cancellations: 2, cancellationDelta: 0, deliveryTime: '29 min', deliveryTimeDelta: 1, rupture: 2.6, complaints: 1 },
  { name: 'Beira Rio Farma', region: 'Norte', gmv: 6200, gmvDelta: -5.1, orders: 25, cancellations: 3, cancellationDelta: 1, deliveryTime: '34 min', deliveryTimeDelta: 3, rupture: 5.1, complaints: 4 },
];

export const LOGISTICS_STATUS: LogisticStatus[] = [
  { status: 'Waiting Approval', count: 45, color: '#F7B66E' },
  { status: 'In Preparation', count: 128, color: '#7A8590' },
  { status: 'Out for Delivery', count: 82, color: '#06ABA2' },
  { status: 'Delivered', count: 985, color: '#06ABA2' },
];

export const DELIVERY_TIMES = [
  { label: 'Logística Própria (Farmácia)', time: '42 min', trend: -5 },
  { label: 'Farmácias App Delivery', time: '26 min', trend: -12 }
];

export const CANCELLATION_DATA = [
  { reason: 'Falta de Estoque', value: 42, percentage: 55 },
  { reason: 'Arrependimento', value: 18, percentage: 24 },
  { reason: 'Erro de Pagamento', value: 12, percentage: 16 },
  { reason: 'Logística/Atraso', value: 4, prefix: 'L' , percentage: 5 },
];

export const ANOMALIES_DATA: Anomaly[] = [
  {
    id: 'a1',
    type: 'price',
    severity: 'critical',
    title: 'Anomalia de Preço: Preço Irreal',
    description: 'Dipirona 500mg com valor R$ 0,50 detectado na última carga.',
    time: 'Última Carga',
    details: {
      pharmacy: 'Farmácia Popular Viva',
      product: 'Dipirona 500mg 10 CP',
      location: 'São Paulo / SP',
      impact: '92% abaixo do mercado'
    }
  },
  {
    id: 'a2',
    type: 'volume',
    severity: 'warning',
    title: 'Pico de Demanda Regional',
    description: 'Aumento atípico de pedidos na categoria Vitaminas.',
    time: 'Ciclo Atual',
    details: {
      location: 'Rio de Janeiro / RJ (Zona Sul)',
      product: 'Vitamina C Efervescente',
      impact: 'Aumento de 3.2x vs média'
    }
  },
  {
    id: 'a3',
    type: 'cancellation',
    severity: 'critical',
    title: 'Taxa de Abandono Crítica: Checkout',
    description: 'Aumento súbito de erro 500 no processamento de pagamentos via PIX.',
    time: 'Últimos 15 min',
    details: {
      impact: 'Queda de 45% na conversão PIX',
      location: 'Brasil (Geral)',
      consumerId: 'Gateway #42'
    }
  },
  {
    id: 'a4',
    type: 'value',
    severity: 'info',
    title: 'Anomalia de Ticket Médio: Fraude?',
    description: 'Usuário realizou 12 pedidos seguidos com o mesmo cupom promocional.',
    time: 'Há 5 min',
    details: {
      consumerId: 'USR-882192',
      impact: 'R$ 1.200 em descontos indevidos',
      location: 'Curitiba / PR'
    }
  },
  {
    id: 'a5',
    type: 'volume',
    severity: 'critical',
    title: 'Gargalo Logístico: Atraso de Coleta',
    description: '52 pedidos aguardando coleta há mais de 45 minutos em hub central.',
    time: 'Janela Atual',
    details: {
      location: 'Belo Horizonte / MG',
      pharmacy: 'MediCare Central',
      impact: 'SLA comprometido em 12% da região'
    }
  },
  {
    id: 'a6',
    type: 'price',
    severity: 'warning',
    title: 'Divergência de Estoque: Ruptura Falsa',
    description: 'SKU reportado como 0 em estoque, mas com ofertas ativas em canais externos.',
    time: 'Há 1 hora',
    details: {
      product: 'Protetor Solar FPS 60',
      pharmacy: 'QuickMeds Express',
      impact: 'Perda estimada de R$ 4.500/hora'
    }
  }
];

export const SAC_KPI_DATA: KPI[] = [
  { label: 'Total de Chamados', value: '452', trend: 12.5 },
  { label: 'Em Aberto', value: '28', trend: -5.2 },
  { label: 'Tempo de Resposta', value: '8,5 min', trend: -12.4 },
  { label: 'CSAT (Satisfação)', value: '4,6/5', trend: 2.1 },
];

export const SAC_CATEGORIES: SACCategory[] = [
  { reason: 'Atraso na Entrega', count: 185, trend: 12.5 },
  { reason: 'Produto Avariado/Incorreto', count: 92, trend: 4.2 },
  { reason: 'Erro de Pagamento', count: 74, trend: -2.1 },
  { reason: 'Dúvidas sobre Ofertas', count: 58, trend: 8.4 },
  { reason: 'Cancelamento Solicitado', count: 43, trend: 1.5 },
];

export const TOP_COUPONS: CouponData[] = [
  { code: 'BEMVINDO20', uses: 450, gmv: 12500 },
  { code: 'VERAO25', uses: 320, gmv: 9800 },
  { code: 'MAISSAUDE', uses: 210, gmv: 5400 },
  { code: 'APPFRIDAY', uses: 180, gmv: 4200 },
];

export const CUSTOMER_GROWTH: GrowthData[] = [
  { period: '08:00', count: 120, ticket: 82.50, newRegistrations: 45, push: false },
  { period: '10:00', count: 280, ticket: 95.20, newRegistrations: 82, push: true },
  { period: '12:00', count: 450, ticket: 110.80, newRegistrations: 115, push: false },
  { period: '14:00', count: 620, ticket: 105.40, newRegistrations: 154, push: true },
  { period: '16:00', count: 890, ticket: 118.90, newRegistrations: 210, push: false },
];

export const RECOMMENDATIONS: Recommendation[] = [
  { id: '1', type: 'insight', text: 'Tendência consolidada: Pico de 15% em Suplementos nas últimas 2 janelas.', category: 'Comercial' },
  { id: '2', type: 'alert', text: 'Alerta de SLA: Farmácia HealthHub degradou performance no último ciclo de 30min.', category: 'Logística' },
  { id: '3', type: 'opportunity', text: 'Oportunidade de Conversão: Abandono de carrinho em Beleza subiu no ciclo atual.', category: 'Marketing' },
  { id: '4', type: 'insight', text: 'Qualidade de Dados: Taxa de faturamento estável em 98% nos processamentos de hoje.', category: 'Operacional' },
];

export const MARKETING_CHANNELS: ChannelPerformance[] = [
  { channel: 'CRM / Notificação', sessions: 4500, conversion: 6.2, gmv: 185200 },
  { channel: 'Google Search', sessions: 8200, conversion: 4.1, gmv: 124500 },
  { channel: 'Meta Ads', sessions: 5800, conversion: 3.5, gmv: 89200 },
  { channel: 'Orgânico', sessions: 3100, conversion: 5.8, gmv: 54000 },
];

export const DEVICE_PERFORMANCE: DevicePerformance[] = [
  { device: 'iOS', percentage: 42, orders: 520 },
  { device: 'Android', percentage: 38, orders: 471 },
  { device: 'Web', percentage: 20, orders: 249 },
];

// MONTHLY MOCK DATA
export const MONTHLY_KPIS: KPI[] = [
  { label: 'Receita Entregues', value: '12.450.890', trend: 12.5, prefix: 'R$', color: '#06ABA2' },
  { label: 'Receita Abertos', value: '1.240.400', trend: 8.2, prefix: 'R$', color: '#7A8590' },
  { label: 'Receita Cancelados', value: '852.192', trend: -4.2, prefix: 'R$', color: '#F76F67' },
  { label: 'Meta Mensal', value: '15.000.000', prefix: 'R$' },
  { label: 'Projeção do Mês', value: '14.200.000', trend: -5.3, prefix: 'R$' },
  { label: 'Gap para a Meta', value: '800.000', prefix: 'R$', color: '#F7B66E' },
  { label: 'Pedidos Do Mês', value: '42.150', trend: 10.2 },
  { label: 'Ticket Médio', value: '295,40', trend: 2.1, prefix: 'R$' },
  { label: 'Lojistas Ativos', value: '1.242', trend: 5.5 },
  { label: 'SKUs Ativos', value: '145.802', trend: 12.1 },
  { label: 'MAU (Usuários)', value: '852.450', trend: 8.4 },
];

export const DIARIZED_PERFORMANCE: DailyPerformance[] = Array.from({ length: 31 }, (_, i) => ({
  day: i + 1,
  delivered: 300000 + Math.random() * 150000,
  open: 50000 + Math.random() * 30000,
  cancelled: 20000 + Math.random() * 15000,
  target: 400000,
  orders: 1200 + Math.floor(Math.random() * 400),
  rupture: 2 + Math.random() * 5,
  paymentFailures: 40 + Math.floor(Math.random() * 30),
  sacClaims: 15 + Math.floor(Math.random() * 20)
}));

export const MONTHLY_FORECAST: MonthlyForecast = {
  projectedRevenue: 14200000,
  projectedOrders: 48500,
  projectedCancellations: 3200,
  risks: [
    'Risco de não atingimento da meta em 5.3%',
    'Aumento de cancelamentos na região Sul por logística local',
    'Ruptura em Medicamentos MIPs crescendo 2% na última semana'
  ],
  opportunities: [
    'Potencial de +R$ 400k com campanha de reativação em Perfumaria',
    'Melhoria de conversion rate em Android pode reduzir o GAP em 1.5%',
    'Novos lojistas no Sudeste podem adicionar 3% no GMV'
  ]
};
