import React from 'react';

export default function Input({
  id,
  label,
  type = 'text',
  placeholder,
  icon: Icon,
  required = false,
  name,
  value,
  onChange,
  rightElement
}) {
  return (
    <div>
      {label && (
        <label className="block text-xs font-bold text-slate-900 mb-1.5" htmlFor={id}>
          {label}
        </label>
      )}
      <div className="relative rounded-xl shadow-sm">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
            <Icon className="h-4 w-4" />
          </div>
        )}
        <input
          id={id}
          name={name || id}
          type={type}
          required={required}
          className={`block w-full ${Icon ? 'pl-10' : 'pl-4'} ${rightElement ? 'pr-11' : 'pr-4'} py-2.5 sm:text-xs text-slate-900 placeholder-slate-500 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition shadow-sm`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {rightElement && (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
}
