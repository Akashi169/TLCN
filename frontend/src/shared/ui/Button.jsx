import React from 'react';

export default function Button({ children, type = 'button', onClick, disabled = false, variant = 'primary', className = '' }) {
  const baseStyles = 'w-full py-3.5 px-4 rounded-xl font-bold text-sm shadow-md transition-all duration-200 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    primary: 'bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-600 text-white shadow-brand-500/25 focus:ring-brand-500 active:scale-[0.99]',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 focus:ring-slate-400',
    danger: 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/25 focus:ring-rose-500'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    >
      {children}
    </button>
  );
}
