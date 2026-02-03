
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = "", title }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col ${className}`}>
      {title && (
        <h3 className="text-brand-darkGray text-sm font-bold uppercase tracking-wider mb-4 text-left">
          {title}
        </h3>
      )}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};
