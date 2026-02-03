
import React, { useState, useRef, useEffect } from 'react';

interface RegionFilterProps {
  regions: string[];
  selectedRegion: string;
  onRegionChange: (region: string) => void;
}

export const RegionFilter: React.FC<RegionFilterProps> = ({ regions, selectedRegion, onRegionChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-2.5 relative" ref={dropdownRef}>
      <label className="text-[9px] font-black text-brand-teal uppercase tracking-[0.3em] opacity-40 px-1 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
        </svg>
        Segmentação de Dados
      </label>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-between w-[320px] px-6 py-4 bg-white rounded-2xl border border-gray-200 
          shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:border-brand-turquoise/60 
          transition-all duration-500 group relative
          ${isOpen ? 'ring-4 ring-brand-turquoise/10 border-brand-turquoise' : ''}
        `}
      >
        <div className="flex items-center gap-4 z-10">
          <div className="relative">
            <div className={`w-3 h-3 rounded-full transition-all duration-500 ${selectedRegion === 'Brasil (Geral)' ? 'bg-brand-turquoise shadow-[0_0_12px_rgba(98,217,209,0.8)]' : 'bg-brand-orange shadow-[0_0_12px_rgba(247,182,110,0.8)]'}`} />
            <div className="absolute inset-0 rounded-full bg-current opacity-20 animate-ping" />
          </div>
          <span className="text-[13px] font-black text-brand-darkGray uppercase tracking-widest">
            {selectedRegion}
          </span>
        </div>
        
        <div className="flex items-center gap-3">
            <span className="text-[9px] font-bold text-brand-teal uppercase opacity-40 group-hover:opacity-100 transition-opacity">Alterar</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-4 w-4 text-brand-teal transition-all duration-500 ease-in-out ${isOpen ? 'rotate-180 text-brand-turquoise' : 'opacity-40'}`} 
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
            </svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+14px)] left-0 w-full bg-white/95 backdrop-blur-2xl rounded-3xl border border-gray-100 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.2)] z-[100] overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-top-6 duration-300">
          <div className="p-2.5">
            {regions.map((region) => {
              const isActive = selectedRegion === region;
              return (
                <button
                  key={region}
                  onClick={() => {
                    onRegionChange(region);
                    setIsOpen(false);
                  }}
                  className={`
                    flex items-center justify-between w-full px-5 py-4.5 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all
                    ${isActive 
                      ? 'bg-brand-darkGray text-white shadow-lg shadow-black/10' 
                      : 'text-brand-teal hover:bg-brand-turquoise/5 hover:text-brand-turquoise'
                    }
                  `}
                >
                  <span className="flex items-center gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-brand-turquoise' : 'bg-transparent'}`} />
                    {region}
                  </span>
                  {isActive && (
                    <div className="bg-brand-turquoise/20 p-1.5 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-brand-turquoise" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          <div className="bg-gray-50/80 p-4 border-t border-gray-100">
             <p className="text-[9px] font-bold text-brand-teal uppercase tracking-widest text-center opacity-60">
                Seleção refina os indicadores consolidados do ciclo
             </p>
          </div>
        </div>
      )}
    </div>
  );
};
