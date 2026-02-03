
export interface KPI {
  label: string;
  value: string | number;
  trend?: number;
  prefix?: string;
}

export interface FunnelStep {
  label: string;
  count: number;
  percentage: number;
}

export interface CategoryData {
  name: string;
  value: number;
  percentage: number;
}

export interface TopProduct {
  name: string;
  category: string;
  sales: number;
  gmv: number;
}

export interface PharmacyPerformance {
  name: string;
  gmv: number;
  gmvDelta: number; // Porcentagem de variação vs ciclo anterior
  orders: number;
  cancellations: number;
  cancellationDelta: number; // Variação absoluta de cancelamentos
  deliveryTime: string;
  deliveryTimeDelta: number; // Variação em minutos vs média
}

export interface LogisticStatus {
  status: 'Waiting Approval' | 'In Preparation' | 'Out for Delivery' | 'Delivered';
  count: number;
  color: string;
}

export interface Recommendation {
  id: string;
  type: 'alert' | 'insight' | 'opportunity';
  text: string;
}

export interface Anomaly {
  id: string;
  type: 'price' | 'volume' | 'cancellation' | 'value';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  time: string;
  details?: {
    pharmacy?: string;
    product?: string;
    location?: string;
    impact?: string;
    consumerId?: string; // LGPD Compliant: Masked ID (e.g. USR-***-123)
  };
}

export interface CouponData {
  code: string;
  uses: number;
  gmv: number;
}

export interface GrowthData {
  period: string;
  count: number;
  ticket: number;
}

export interface ChannelPerformance {
  channel: string;
  sessions: number;
  conversion: number;
  gmv: number;
}

export interface DevicePerformance {
  device: 'iOS' | 'Android' | 'Web';
  percentage: number;
  orders: number;
}
