import React from 'react';

export default function ProgressBar({ currentStep }) {

  return (

    <div className="max-w-3xl mx-auto px-8 mb-4" dir="rtl">

      <div className="flex justify-between items-center border-b border-gray-100 pb-6">

        {['בחירת סכום', 'פרטים אישיים', 'תשלום'].map((step, index) => (

          <div key={index} className={`flex items-center gap-2 ${currentStep >= index + 1 ? 'text-[#74bd81]' : 'text-gray-300'}`}>

            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${currentStep >= index + 1 ? 'bg-[#e7f5e9]' : 'bg-gray-100'}`}>
              {index + 1}
            </div>

            <span className="font-medium hidden md:block">{step}</span>

          </div>

        ))}
      </div>
    </div>
  );
}
