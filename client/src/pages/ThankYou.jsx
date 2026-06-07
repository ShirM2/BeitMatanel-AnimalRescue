import React from 'react';
import { Link } from 'react-router-dom';

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col justify-center items-center p-6" dir="rtl">

      <div className="bg-white p-10 rounded-3xl shadow-lg text-center max-w-md">
        
        <h1 className="text-3xl font-bold text-[#76c082] mb-4">תודה רבה!</h1>
        <p className="text-gray-600 mb-8">בקשת האימוץ שלך התקבלה בהצלחה. נציג מהעמותה יצור איתך קשר בהקדם.</p>
        <Link to="/Gallery" className="bg-gray-900 text-white py-3 px-8 rounded-full font-bold hover:bg-gray-800 transition-all">
          חזרה לגלריה
        </Link>
        
      </div>
    </div>
  );
}