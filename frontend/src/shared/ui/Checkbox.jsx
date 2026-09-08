import React from 'react';

export default function Checkbox({ id, name, label, checked, onChange, disabled = false }) {
  return (
    <div className="flex items-center space-x-2">
      <input
        id={id}
        name={name}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="w-4 h-4 text-brand-600 border-slate-300 rounded focus:ring-brand-500 cursor-pointer"
      />
      {label && (
        <label htmlFor={id} className="text-xs text-slate-600 font-medium cursor-pointer select-none">
          {label}
        </label>
      )}
    </div>
  );
}
