import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, className = "", ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
      <input
        className={`w-full px-4 py-2.5 rounded-lg border transition-all duration-200 outline-none
          ${error 
            ? "border-red-400 focus:border-red-500" 
            : "border-slate-300 focus:border-blue-500"
          }
          ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
    </div>
  );
};