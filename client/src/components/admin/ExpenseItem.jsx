import React from 'react';

export default function ExpenseItem({ name, date, amount }) {
  return (
    <div className="flex justify-between items-center border-b pb-3">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-xs text-gray-400">{date}</p>
      </div>
      <span className="text-red-500 font-medium">{amount}</span>
    </div>
  );
}