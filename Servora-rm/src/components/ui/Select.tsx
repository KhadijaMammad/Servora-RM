import React from 'react';

interface Option {
  label: string;
  value: string | number;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  error?: string;
}

export const Select = ({ label, options, error, className = "", ...props }: SelectProps) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
      <select
        className={`w-full px-4 py-2.5 rounded-lg border bg-white transition-all duration-200 outline-none appearance-none cursor-pointer
          ${error 
            ? "border-red-400 focus:border-red-500" 
            : "border-slate-300 focus:border-blue-500"
          }
          ${className}`}
        {...props}
      >
        <option value="" disabled selected>Seçin...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
    </div>
  );
};