import React from 'react';

export default function Button({ 
  children, 
  type = 'button', 
  className = '', 
  variant = 'primary',
  ...props 
}) {
  if (variant === 'social-steam') {
    return (
      <button 
        type={type}
        className={`w-full flex items-center justify-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition shadow-sm hover:shadow-md active:scale-[0.99] border border-slate-800 ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }

  if (variant === 'social-outline') {
    return (
      <button 
        type={type}
        className={`flex items-center justify-center space-x-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 transition shadow-sm active:scale-[0.99] ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }

  // Primary variant
  return (
    <button 
      type={type}
      className={`w-full relative group overflow-hidden rounded-xl p-[1px] font-semibold text-white transition-all shadow-md shadow-brand-500/25 hover:shadow-glow-cyan active:scale-[0.99] ${className}`}
      {...props}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-brand-500 via-sky-500 to-blue-600 group-hover:opacity-95 transition-opacity"></span>
      <div className="relative flex items-center justify-center space-x-3 px-6 py-3 rounded-[11px] bg-gradient-to-r from-brand-600 to-sky-600 group-hover:from-brand-500 group-hover:to-sky-500 transition-all text-sm font-bold tracking-wide">
        {children}
      </div>
    </button>
  );
}
