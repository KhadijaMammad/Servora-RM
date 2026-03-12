import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div className={`bg-white border border-slate-200 rounded-[10px] p-5 ${className}`}>
      {children}
    </div>
  );
};