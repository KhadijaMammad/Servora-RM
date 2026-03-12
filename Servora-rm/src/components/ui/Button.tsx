import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'submit';
  isLoading?: boolean;
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className = "", 
  ...props 
}: ButtonProps) => {
  
  const baseStyle = "px-4 py-2.5 rounded-[8px] border font-medium transition-all duration-200";
  
  const variants = {
    primary: "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
    danger: "border-red-500 text-red-500 hover:bg-red-500 hover:text-white",
    submit: "border-green-600 text-green-600 hover:bg-green-600 hover:text-white",
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className} active:scale-[0.98]`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? "Gözləyin..." : children}
    </button>
  );
};