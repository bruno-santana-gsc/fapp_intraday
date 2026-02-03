
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
import { Login } from './components/Login';
import { RegionFilter } from './components/RegionFilter';
import { 
  PHARMACY_PERFORMANCE, 
  HEADER_KPIS, 
  FUNNEL_DATA, 
  SALES_BY_CATEGORY, 
  ANOMALIES_DATA,
  MARKETING_CHANNELS
} from './constants';

const LogoText: React.FC = () => (
  <div className="flex items-baseline gap-1 select-none">
    <span className="text-4xl font-bold text-brand-darkGray tracking-tight">Farmácias</span>
    <span className="text-4xl font-light text-brand-turquoise tracking-tight opacity-80">app</span>
  </div>
);

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

  // Synthetic filtering logic to make all data reflect the selected region
  const regionalData = useMemo(() => {
    const isGeral = selectedRegion === 'Brasil (Geral)';
    
    // Weighting factor based on region size/importance
    const weights: Record<string, number> = {
      'Brasil (Geral)': 1.0,
      'Sudeste': 0.45,
      'Nordeste': 0.20,
      'Sul': 0.18,
      'Centro-Oeste': 0.12,
      'Norte': 0.05
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
      anomalies: isGeral ? ANOMALIES_DATA : ANOMALIES_DATA.filter(a => !a.details?.location || a.details.location.includes(selectedRegion) || Math.random() > 0.6),
      marketingChannels: MARKETING_CHANNELS.map(ch => ({
        ...ch,
        sessions: isGeral ? ch.sessions : Math.floor(ch.sessions * w),
        gmv: isGeral ? ch.gmv : Math.floor(ch.gmv * w)
      }))
    };
  }, [selectedRegion]);

  if (!isAuthenticated) {
    return <Login onLogin={setIsAuthenticated} />;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-6 lg:p-10">
      <div className="max-w-[1700px] mx-auto">
        {/* Header Section */}
        <header className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
          <div className="flex flex-col gap-4">
            <LogoText />
            <div className="flex items-center gap-3">
              <span className="h-1 w-1 rounded-full bg-brand-turquoise animate-pulse"></span>
              <p className="text-[11px] text-brand-teal font-bold uppercase tracking-[0.2em] opacity-70">
                Painel Intradiário <span className="mx-2 text-gray-300">|</span> Janela de 30m
              </p>
              <button 
                onClick={() => setIsAuthenticated(false)}
                className="ml-2 text-[9px] font-black text-brand-salmon uppercase hover:opacity-70 transition-all underline underline-offset-4 decoration-brand-salmon/30"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-start lg:items-center">
            <RegionFilter 
              regions={REGIONS} 
              selectedRegion={selectedRegion} 
              onRegionChange={setSelectedRegion} 
            />
          </div>
          
          <div className="flex items-center gap-10 border-l border-gray-200 pl-10 h-14">
            <div>
              <p className="text-[10px] font-black text-brand-teal uppercase tracking-widest mb-1 opacity-40">Última Carga</p>
              <p className="text-2xl font-black text-brand-darkGray tabular-nums tracking-tighter">{lastSync}</p>
            </div>
            <div className="hidden sm:block">
              <p className="text-[10px] font-black text-brand-teal uppercase tracking-widest mb-1 opacity-40">Próximo Ciclo</p>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-brand-darkGray tabular-nums">em {nextSync} min</span>
                <div className="relative flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-turquoise/20 animate-ping absolute" />
                  <div className="w-2 h-2 rounded-full bg-brand-turquoise shadow-[0_0_8px_rgba(98,217,209,0.5)]" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Passing filtered data to ALL components */}
        <HeaderKPIs data={regionalData.kpis} />
        <PurchaseFunnel data={regionalData.funnel} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          <div className="lg:col-span-8">
            <PharmacyTable pharmacies={regionalData.pharmacies} regionName={selectedRegion} />
          </div>
          <div className="lg:col-span-4">
            <AnomalyDetection data={regionalData.anomalies} />
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
              regionWeight={selectedRegion === 'Brasil (Geral)' ? 1 : (regionalData.kpis[0].value as any).length / 7} 
            />
          </div>

          <div className="lg:col-span-12">
            <AIRecommendations />
          </div>
        </div>

        <footer className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-brand-teal text-[10px] font-bold uppercase tracking-widest gap-4">
          <p className="opacity-40">© 2026 Farmácias app Tecnologia • Core Analytics Engine • {selectedRegion}</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
