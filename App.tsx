
import React, { useState, useEffect } from 'react';
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

const LogoText: React.FC = () => (
  <div className="flex items-baseline gap-1 select-none">
    <span className="text-4xl font-bold text-brand-darkGray tracking-tight">Farmácias</span>
    <span className="text-4xl font-light text-brand-teal opacity-60 tracking-tight">app</span>
  </div>
);

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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

  if (!isAuthenticated) {
    return <Login onLogin={setIsAuthenticated} />;
  }

  return (
    <div className="min-h-screen bg-brand-bgGray p-4 md:p-6 lg:p-8">
      <div className="max-w-[1700px] mx-auto">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
          <div className="flex flex-col gap-2">
            <LogoText />
            <div className="flex items-center gap-2 mt-1">
              <span className="h-px w-8 bg-brand-turquoise"></span>
              <div className="flex items-center gap-4">
                <p className="text-[11px] text-brand-teal font-bold uppercase tracking-widest">
                  Intradiário <span className="text-brand-darkGray opacity-30">•</span> Ciclo de 30 Minutos
                </p>
                <button 
                  onClick={() => setIsAuthenticated(false)}
                  className="text-[9px] font-black text-brand-salmon uppercase border border-brand-salmon/20 px-2 py-0.5 rounded hover:bg-brand-salmon hover:text-white transition-all"
                >
                  Sair
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-8 text-left md:text-right border-l-2 border-brand-turquoise/20 pl-8">
            <div>
              <p className="text-[10px] font-bold text-brand-teal uppercase tracking-widest mb-1 opacity-70">Última Sincronização</p>
              <p className="text-xl font-bold text-brand-darkGray tabular-nums tracking-tight">{lastSync}</p>
            </div>
            <div className="hidden sm:block">
              <p className="text-[10px] font-bold text-brand-teal uppercase tracking-widest mb-1 opacity-70">Próxima Carga</p>
              <div className="flex items-center gap-2 justify-end">
                <span className="text-sm font-bold text-brand-darkGray tabular-nums tracking-tight">em {nextSync} min</span>
                <div className="w-2.5 h-2.5 rounded-full bg-brand-turquoise/40 relative">
                    <div className="absolute inset-0 rounded-full bg-brand-turquoise animate-ping opacity-20" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* KPIs & Funnel */}
        <HeaderKPIs />
        <PurchaseFunnel />

        {/* Main Operational Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
          
          <div className="lg:col-span-8">
            <PharmacyTable />
          </div>
          
          <div className="lg:col-span-4">
            <AnomalyDetection />
          </div>

          <div className="lg:col-span-4">
            <SalesByCategory />
          </div>
          <div className="lg:col-span-4">
            <LogisticsStatus />
          </div>
          <div className="lg:col-span-4">
            <CancellationStats />
          </div>

          <div className="lg:col-span-12">
            <MarketingHub />
          </div>

          <div className="lg:col-span-12">
            <AIRecommendations />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 pt-6 border-t border-gray-200 flex flex-col md:row justify-between items-center gap-4 text-brand-teal text-[10px] font-bold uppercase tracking-widest">
          <p>© 2024 Farmácias app Tecnologia • Dados consolidados por janelas de 30min</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-brand-turquoise transition-colors">Log de Integração</a>
            <a href="#" className="hover:text-brand-turquoise transition-colors">Exportar Relatório</a>
            <a href="#" className="hover:text-brand-turquoise transition-colors">Status da API</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
