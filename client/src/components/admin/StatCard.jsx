import React from 'react';

export default function StatCard({ title, value, subtitle, valueColor = "text-gray-900", badge, extraText }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border flex flex-col justify-between">
      <p className="text-gray-500 text-sm">{title}</p>
      
      <div className="flex flex-wrap items-center gap-3 my-2">
        <h3 className={`text-3xl font-bold ${valueColor}`}>{value}</h3>
        {badge && (
          <span className={`text-xs font-bold px-2 py-1 rounded-md ${badge.colorClass}`}>
            {badge.text}
          </span>
        )}
      </div>
      
      <div className="flex justify-between items-center mt-1">
        <p className="text-gray-400 text-xs">{subtitle}</p>
        {extraText && <p className="text-gray-400 text-xs font-medium">{extraText}</p>}
      </div>
    </div>
  );
}