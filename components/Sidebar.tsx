
import React from 'react';
import { LayoutDashboard, CalendarDays, LogOut } from 'lucide-react';

interface SidebarProps {
  activeTab: 'intraday' | 'monthly';
  setActiveTab: (tab: 'intraday' | 'monthly') => void;
  onLogout: () => void;
}

const LogoText: React.FC = () => (
  <div className="flex items-baseline gap-1 select-none mb-10 px-2">
    <span className="text-2xl font-bold text-white tracking-tight">Farmácias</span>
    <span className="text-2xl font-light text-brand-turquoise tracking-tight">app</span>
  </div>
);

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
  const menuItems = [
    { id: 'intraday', label: 'Monitor Intradiário', icon: <LayoutDashboard size={20} /> },
    { id: 'monthly', label: 'Consolidado Mensal', icon: <CalendarDays size={20} /> },
  ];

  return (
    <div className="w-64 h-screen bg-brand-darkGray text-white flex flex-col p-6 fixed left-0 top-0 z-50">
      <LogoText />

      <nav className="flex-1 space-y-2">
        <p className="text-[10px] font-black text-brand-teal uppercase tracking-widest mb-4 opacity-50 px-2">Analytics Principais</p>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as any)}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-bold text-sm ${
              activeTab === item.id 
                ? 'bg-brand-turquoise text-white shadow-lg shadow-brand-turquoise/20' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      <button
        onClick={onLogout}
        className="mt-auto flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm text-gray-400 hover:text-brand-salmon hover:bg-brand-salmon/5"
      >
        <LogOut size={20} />
        Sair da Conta
      </button>
    </div>
  );
};
