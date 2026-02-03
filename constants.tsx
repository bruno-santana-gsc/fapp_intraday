
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
  DevicePerformance
} from './types';

export const HEADER_KPIS: KPI[] = [
  { label: 'GMV Janela Atual', value: '452.890', trend: 12.5, prefix: 'R$' },
  { label: 'Pedidos Consolidados', value: '1.240', trend: 8.2 },
  { label: 'Pedidos Aprovados', value: '1.192' },
  { label: 'Pedidos Faturados', value: '1.050' },
  { label: 'Taxa de Conversão', value: '4,8', trend: -1.2, prefix: '%' },
  { label: 'Farmácias com Venda', value: '342' },
  { label: 'Usuários com compra', value: '12.450' },
  { label: 'Ofertas Ativas', value: '8.902' },
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
  { name: 'Beleza & Cosméticos', value: 124500, percentage: 32 },
  { name: 'Cuidados Pessoais', value: 89000, percentage: 23 },
  { name: 'Vitaminas & Suplementos', value: 156000, percentage: 38 },
  { name: 'MIPs (OTC)', value: 72000, percentage: 18 },
  { name: 'Medicamentos Prescritos', value: 41390, percentage: 11 },
];

export const TOP_PRODUCTS: TopProduct[] = [
  { name: 'Doralgina 20 Comprimidos', category: 'MIPs (OTC)', sales: 452, gmv: 8588 },
  { name: 'Protetor Solar FPS 60 200ml', category: 'Beleza', sales: 312, gmv: 24960 },
  { name: 'Vitamina C 1g 10 eferv.', category: 'Vitaminas', sales: 284, gmv: 5680 },
  { name: 'Sabonete Líquido Neutro 400ml', category: 'Cuidado', sales: 215, gmv: 4300 },
  { name: 'Omega 3 1000mg 60 Cáps.', category: 'Vitaminas', sales: 198, gmv: 11880 },
];

export const PHARMACY_PERFORMANCE: PharmacyPerformance[] = [
  { name: 'PharmaPlus Matriz', gmv: 42500, gmvDelta: 15.2, orders: 156, cancellations: 2, cancellationDelta: -1, deliveryTime: '22 min', deliveryTimeDelta: -3 },
  { name: 'MediCare Central', gmv: 38200, gmvDelta: 8.4, orders: 142, cancellations: 5, cancellationDelta: 2, deliveryTime: '28 min', deliveryTimeDelta: 2 },
  { name: 'HealthHub Sul', gmv: 31000, gmvDelta: -12.5, orders: 128, cancellations: 12, cancellationDelta: 8, deliveryTime: '45 min', deliveryTimeDelta: 12 },
  { name: 'WellPharm Direct', gmv: 28400, gmvDelta: 5.1, orders: 110, cancellations: 3, cancellationDelta: 0, deliveryTime: '24 min', deliveryTimeDelta: -1 },
  { name: 'QuickMeds Express', gmv: 21200, gmvDelta: 18.2, orders: 98, cancellations: 2, cancellationDelta: 0, deliveryTime: '20 min', deliveryTimeDelta: -2 },
  { name: 'BioSaúde Premium', gmv: 18900, gmvDelta: 12.5, orders: 92, cancellations: 4, cancellationDelta: 1, deliveryTime: '31 min', deliveryTimeDelta: 3 },
  { name: 'DrogaLuz Online', gmv: 16400, gmvDelta: -4.2, orders: 85, cancellations: 7, cancellationDelta: 3, deliveryTime: '35 min', deliveryTimeDelta: 5 },
  { name: 'VidaFarma Matriz', gmv: 14200, gmvDelta: 22.1, orders: 78, cancellations: 1, cancellationDelta: -1, deliveryTime: '19 min', deliveryTimeDelta: -4 },
  { name: 'Nossa Farma Centro', gmv: 12800, gmvDelta: 3.8, orders: 65, cancellations: 3, cancellationDelta: 0, deliveryTime: '26 min', deliveryTimeDelta: 0 },
  { name: 'FarmaPopular 24h', gmv: 11500, gmvDelta: 7.4, orders: 58, cancellations: 1, cancellationDelta: -2, deliveryTime: '23 min', deliveryTimeDelta: -2 },
  { name: 'Drogaria do Povo', gmv: 10200, gmvDelta: -2.1, orders: 49, cancellations: 4, cancellationDelta: 1, deliveryTime: '38 min', deliveryTimeDelta: 4 },
  { name: 'Farmácia Popular Viva', gmv: 9800, gmvDelta: -45.0, orders: 42, cancellations: 15, cancellationDelta: 10, deliveryTime: '58 min', deliveryTimeDelta: 25 },
];

export const LOGISTICS_STATUS: LogisticStatus[] = [
  { status: 'Waiting Approval', count: 45, color: '#F7B66E' },
  { status: 'In Preparation', count: 128, color: '#7A8590' },
  { status: 'Out for Delivery', count: 82, color: '#62D9D1' },
  { status: 'Delivered', count: 985, color: '#62D9D1' },
];

export const DELIVERY_TIMES = [
  { label: 'Logística Própria (Farmácia)', time: '42 min', trend: -5 },
  { label: 'Farmácias App Delivery', time: '26 min', trend: -12 }
];

export const CANCELLATION_DATA = [
  { reason: 'Falta de Estoque', value: 42, percentage: 55 },
  { reason: 'Arrependimento', value: 18, percentage: 24 },
  { reason: 'Erro de Pagamento', value: 12, percentage: 16 },
  { reason: 'Logística/Atraso', value: 4, percentage: 5 },
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
    type: 'value',
    severity: 'info',
    title: 'Ticket Médio Atípico (H.V.)',
    description: 'Pedido único com valor extremamente alto identificado.',
    time: 'Ciclo Atual',
    details: {
      pharmacy: 'PharmaPlus Matriz',
      consumerId: 'USR-***-9421',
      impact: 'R$ 2.450,00 em um pedido'
    }
  },
  {
    id: 'a4',
    type: 'cancellation',
    severity: 'critical',
    title: 'Anomalia de Cancelamento',
    description: 'Taxa de quebra em nível crítico detectada em ponto focal.',
    time: 'Última Carga',
    details: {
      pharmacy: 'HealthHub Sul',
      location: 'Curitiba / PR',
      impact: '40% de cancelamento na hora'
    }
  }
];

export const TOP_COUPONS: CouponData[] = [
  { code: 'BEMVINDO20', uses: 450, gmv: 12500 },
  { code: 'VERAO25', uses: 320, gmv: 9800 },
  { code: 'MAISSAUDE', uses: 210, gmv: 5400 },
  { code: 'APPFRIDAY', uses: 180, gmv: 4200 },
];

export const CUSTOMER_GROWTH: GrowthData[] = [
  { period: '08:00', count: 120, ticket: 82.50 },
  { period: '10:00', count: 280, ticket: 95.20 },
  { period: '12:00', count: 450, ticket: 110.80 },
  { period: '14:00', count: 620, ticket: 105.40 },
  { period: '16:00', count: 890, ticket: 118.90 },
];

export const RECOMMENDATIONS: Recommendation[] = [
  { id: '1', type: 'insight', text: 'Tendência consolidada: Pico de 15% em Suplementos nas últimas 2 janelas.' },
  { id: '2', type: 'alert', text: 'Alerta de SLA: Farmácia HealthHub degradou performance no último ciclo de 30min.' },
  { id: '3', type: 'opportunity', text: 'Oportunidade de Conversão: Abandono de carrinho em Beleza subiu no ciclo atual.' },
  { id: '4', type: 'insight', text: 'Qualidade de Dados: Taxa de faturamento estável em 98% nos processamentos de hoje.' },
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
