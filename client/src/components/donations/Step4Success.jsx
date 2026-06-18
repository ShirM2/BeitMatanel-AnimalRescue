import React from 'react';

export default function Step4Success({ donorDetails, finalAmount, resetForm }) {
  return (
    <div className="max-w-3xl mx-auto text-center py-12 bg-white border border-gray-100 rounded-3xl shadow-sm">

      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-4">תודה רבה{donorDetails.firstName ? `, ${donorDetails.firstName}` : ''}!</h2>

      <p className="text-gray-600 mb-8">תרומתך על סך ₪{finalAmount} התקבלה בהצלחה ותעזור לנו להציל חיים.</p>

      <button onClick={resetForm} className="py-3 px-8 border-2 border-[#74bd81] text-[#74bd81] font-bold rounded-xl hover:bg-green-50 transition-colors">
        חזרה לתרומה חדשה
      </button>

    </div>
  );
}