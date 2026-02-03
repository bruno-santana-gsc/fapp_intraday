
export interface KPI {
  label: string;
  value: string | number;
  trend?: number;
  prefix?: string;
  color?: string;
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
  rupture?: number;
  growth?: number;
}

export interface TopProduct {
  name: string;
  category: string;
  sales: number;
  gmv: number;
  trend?: 'up' | 'down' | 'stable';
}

export interface PharmacyPerformance {
  name: string;
  region: 'Norte' | 'Nordeste' | 'Centro-Oeste' | 'Sudeste' | 'Sul';
  gmv: number;
  gmvDelta: number;
  orders: number;
  cancellations: number;
  cancellationDelta: number;
  deliveryTime: string;
  deliveryTimeDelta: number;
  rupture?: number;
  complaints?: number;
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
  category?: string;
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
    consumerId?: string;
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
  newRegistrations: number;
  push?: boolean;
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

export interface SACCategory {
  reason: string;
  count: number;
  trend: number;
}

// Monthly Specific Types
export interface DailyPerformance {
  day: number;
  delivered: number;
  open: number;
  cancelled: number;
  target: number;
  orders: number;
  rupture: number;
  paymentFailures: number;
  sacClaims: number;
}

export interface MonthlyForecast {
  projectedRevenue: number;
  projectedOrders: number;
  projectedCancellations: number;
  risks: string[];
  opportunities: string[];
}
