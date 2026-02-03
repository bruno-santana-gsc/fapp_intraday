
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
    <div className="flex flex-col gap-1.5 relative" ref={dropdownRef}>
      <label className="text-[9px] font-black text-brand-teal uppercase tracking-[0.2em] opacity-50 px-1">
        Filtrar Região
      </label>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-between w-64 px-4 py-2.5 bg-white rounded-xl border border-gray-200 
          shadow-sm hover:border-brand-turquoise transition-all duration-300 group
          ${isOpen ? 'ring-2 ring-brand-turquoise/20 border-brand-turquoise' : ''}
        `}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-turquoise shadow-[0_0_8px_rgba(98,217,209,0.5)]" />
          <span className="text-[11px] font-extrabold text-brand-darkGray uppercase tracking-wider">
            {selectedRegion}
          </span>
        </div>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-4 w-4 text-brand-teal transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-[calc(100%+8px)] left-0 w-64 bg-white rounded-2xl border border-gray-100 shadow-2xl shadow-black/5 z-[100] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="py-1.5">
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
                    flex items-center justify-between w-full px-4 py-3 text-[11px] font-bold uppercase tracking-widest transition-colors
                    ${isActive 
                      ? 'bg-brand-turquoise/5 text-brand-turquoise' 
                      : 'text-brand-teal hover:bg-gray-50 hover:text-brand-darkGray'
                    }
                  `}
                >
                  {region}
                  {isActive && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
