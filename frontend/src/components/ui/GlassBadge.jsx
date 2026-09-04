import React from 'react';

export default function GlassBadge({ children, className = '' }) {
  return (
    <div className={`glass-badge ${className}`}>
      {children}
    </div>
  );
}
