import React from 'react';

export default function Input({ id, name, label, type = 'text', icon: Icon, placeholder, required = false, value, onChange, disabled = false, rightElement }) {
  return (
    <div className="space-y-1.5 text-left">
      {label && (
        <label htmlFor={id} className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-slate-400 pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full py-2.5 text-sm text-slate-900 bg-slate-50/80 border border-slate-200 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all duration-200 ${Icon ? 'pl-10' : 'pl-3.5'} ${rightElement ? 'pr-10' : 'pr-3.5'} ${disabled ? 'opacity-60 cursor-not-allowed bg-slate-100' : ''}`}
        />
        {rightElement && (
          <div className="absolute right-3.5">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
}
