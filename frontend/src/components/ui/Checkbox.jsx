import React from 'react';

export default function Checkbox({ id, label, name, checked, onChange }) {
  return (
    <div className="flex items-center space-x-2.5">
      <input 
        type="checkbox" 
        id={id} 
        name={name || id}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-slate-300 rounded cursor-pointer" 
      />
      {label && (
        <label 
          htmlFor={id} 
          className="block text-xs font-medium text-slate-800 cursor-pointer select-none"
        >
          {label}
        </label>
      )}
    </div>
  );
}
