
import React, { useState, useEffect, useMemo } from 'react';
import { HeaderKPIs } from './components/HeaderKPIs';
import { PurchaseFunnel } from './components/PurchaseFunnel';
import { SalesByCategory } from './components/SalesByCategory';
import { PharmacyTable } from './components/PharmacyTable';
import { LogisticsStatus } from './components/LogisticsStatus';
import { AIRecommendations } from './components/AIRecommendations';
import { CancellationStats } from './components/CancellationStats';
import { AnomalyDetection } from './components/AnomalyDetection';
import { MarketingHub } from './components/MarketingHub';
import { CustomerService } from './components/CustomerService';
import { Login } from './components/Login';
import { RegionFilter } from './components/RegionFilter';
import { 
  PHARMACY_PERFORMANCE, 
  HEADER_KPIS, 
  FUNNEL_DATA, 
  SALES_BY_CATEGORY, 
  ANOMALIES_DATA,
  MARKETING_CHANNELS,
  CUSTOMER_GROWTH
} from './constants';

const REGIONS = ['Brasil (Geral)', 'Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'];

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('Brasil (Geral)');
  const [lastSync, setLastSync] = useState('');
  const [nextSync, setNextSync] = useState(30);

  useEffect(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - 2);
    setLastSync(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));

    const timer = setInterval(() => {
      setNextSync((prev) => (prev <= 1 ? 30 : prev - 1));
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  const regionalData = useMemo(() => {
    const isGeral = selectedRegion === 'Brasil (Geral)';
    const weights: Record<string, number> = {
      'Brasil (Geral)': 1.0,
      'Sudeste': 0.55,
      'Nordeste': 0.18,
      'Sul': 0.15,
      'Centro-Oeste': 0.08,
      'Norte': 0.04
    };
    const w = weights[selectedRegion];

    return {
      pharmacies: isGeral ? PHARMACY_PERFORMANCE : PHARMACY_PERFORMANCE.filter(p => p.region === selectedRegion),
      kpis: HEADER_KPIS.map(kpi => {
        const val = typeof kpi.value === 'string' ? parseFloat(kpi.value.replace(/\./g, '').replace(',', '.')) : kpi.value;
        const regionalVal = isGeral ? kpi.value : Math.floor(val * w).toLocaleString('pt-BR');
        return { ...kpi, value: regionalVal };
      }),
      funnel: FUNNEL_DATA.map(step => ({
        ...step,
        count: isGeral ? step.count : Math.floor(step.count * w)
      })),
      categorySales: SALES_BY_CATEGORY.map(cat => ({
        ...cat,
        value: isGeral ? cat.value : Math.floor(cat.value * w)
      })),
      anomalies: isGeral ? ANOMALIES_DATA : ANOMALIES_DATA.filter(a => !a.details?.location || a.details.location.includes(selectedRegion)),
      marketingChannels: MARKETING_CHANNELS.map(ch => ({
        ...ch,
        sessions: isGeral ? ch.sessions : Math.floor(ch.sessions * w),
        gmv: isGeral ? ch.gmv : Math.floor(ch.gmv * w)
      })),
      growthData: CUSTOMER_GROWTH.map(g => ({
        ...g,
        count: isGeral ? g.count : Math.floor(g.count * w),
        newRegistrations: isGeral ? g.newRegistrations : Math.floor(g.newRegistrations * w),
        pushValue: g.push ? (isGeral ? g.count : Math.floor(g.count * w)) : null
      }))
    };
  }, [selectedRegion]);

  if (!isAuthenticated) {
    return <Login onLogin={setIsAuthenticated} />;
  }

  return (
    <div className="min-h-screen bg-brand-bgGray">
      <main className="p-8 overflow-y-auto h-screen custom-scrollbar">
        <div className="max-w-[1600px] mx-auto">
          
          {/* Top Bar Navigation & Context */}
          <header className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-8">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-black text-brand-darkGray tracking-tighter">
                Monitor de Operações
              </h1>
              <p className="text-[11px] text-brand-teal font-bold uppercase tracking-[0.2em] opacity-70 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-turquoise" />
                CICLO OPERACIONAL • ATUALIZAÇÃO A CADA 30 MINUTOS
              </p>
            </div>

            <div className="flex items-center gap-10">
              <RegionFilter 
                regions={REGIONS} 
                selectedRegion={selectedRegion} 
                onRegionChange={setSelectedRegion} 
              />

              <div className="flex items-center gap-8 border-l border-gray-200 pl-8 h-12">
                <div className="text-right">
                  <p className="text-[9px] font-black text-brand-teal uppercase tracking-widest opacity-40 mb-1">Carga de Dados</p>
                  <p className="text-xl font-black text-brand-darkGray tabular-nums tracking-tighter">{lastSync}</p>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-[9px] font-black text-brand-teal uppercase tracking-widest opacity-40 mb-1">Próximo Ciclo</p>
                  <p className="text-xl font-black text-brand-darkGray tabular-nums tracking-tighter">{nextSync}m</p>
                </div>
              </div>
            </div>
          </header>

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <HeaderKPIs data={regionalData.kpis} />
            <PurchaseFunnel data={regionalData.funnel} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
              <div className="lg:col-span-8">
                <PharmacyTable pharmacies={regionalData.pharmacies} regionName={selectedRegion} />
              </div>
              <div className="lg:col-span-4">
                <AnomalyDetection data={regionalData.anomalies} />
              </div>
              
              <div className="lg:col-span-12">
                <CustomerService />
              </div>

              <div className="lg:col-span-4">
                <SalesByCategory data={regionalData.categorySales} />
              </div>
              <div className="lg:col-span-4">
                <LogisticsStatus pharmacies={regionalData.pharmacies} />
              </div>
              <div className="lg:col-span-4">
                <CancellationStats pharmacies={regionalData.pharmacies} />
              </div>
              
              <div className="lg:col-span-12">
                <MarketingHub 
                  channels={regionalData.marketingChannels} 
                  growthData={regionalData.growthData}
                  regionName={selectedRegion}
                />
              </div>
              <div className="lg:col-span-12">
                <AIRecommendations />
              </div>
            </div>
          </div>

          <footer className="mt-20 pt-8 border-t border-gray-100 flex justify-between items-center text-brand-teal text-[10px] font-black uppercase tracking-widest opacity-40">
            <p>© 2026 FARMÁCIAS APP TECNOLOGIA S.A. • OPERAÇÕES {selectedRegion}</p>
            <div className="flex gap-6">
              <span>SECURITY LEVEL: ENTERPRISE</span>
              <span>LATENCY: 12ms</span>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default App;
