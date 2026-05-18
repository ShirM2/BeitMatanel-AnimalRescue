import React from 'react';
import { useOutletContext } from 'react-router-dom';


const Reports = () => {
    // נשלוף את הפונקציה לשימוש בעמוד
    const { handleLogout } = useOutletContext();

    // נתונים סטטיים זמניים עבור טבלת קריאות החילוץ
    const reports = [
        { id: 1, number: '#1', date: '17.11.2025', animalType: 'כלב', location: 'רחוב הרצל 45, תל אביב', condition: 'פצוע', status: 'חדש', statusColor: 'bg-red-500 text-white' },
        { id: 2, number: '#2', date: '16.11.2025', animalType: 'חתול', location: 'פארק הירקון', condition: 'נטוש', status: 'בטיפול', statusColor: 'bg-[#E8A36A] text-white' },
    ];

    return (
        <div className="max-w-7xl mx-auto p-10 w-full font-sans text-right" dir="rtl">
        
            {/* כותרת עליונה */}
            <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-5">
                <div>
                <p className="text-gray-500 text-sm">שלום, מנהל/ת</p>
                <h1 className="text-4xl font-bold text-gray-800 mt-1">קריאות חילוץ</h1>
                <p className="text-gray-400 text-xs mt-1">ניהול וטיפול בדיווחים על חיות במצוקה</p>
                </div>
                
                {/* כפתור יציאה עליון */}
                <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors text-sm font-medium"
                >
                <span>יציאה</span>
                <svg className="w-5 h-5 transform rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7" />
                </svg>
                </button>
            </div>

            {/* שורת פעולות: כפתור דיווח חדש */}
            <div className="flex justify-end mb-6">
                <button className="bg-[#5CB85C] hover:bg-[#4cae4c] text-white px-5 py-2 rounded-xl text-sm font-medium flex items-center gap-2 shadow-sm transition-colors">
                <span>דיווח חדש</span>
                <span className="text-lg font-bold">+</span>
                </button>
            </div>

            {/* כרטיסייה מרכזית שמכילה את הטבלה */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-gray-700 font-bold mb-6 text-base px-2">כל הקריאות</h3>
                
                <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse">
                    <thead>
                    <tr className="text-gray-400 text-sm border-b border-gray-100">
                        <th className="pb-4 font-medium px-4">מספר</th>
                        <th className="pb-4 font-medium px-4">תאריך</th>
                        <th className="pb-4 font-medium px-4">סוג חיה</th>
                        <th className="pb-4 font-medium px-4">מיקום</th>
                        <th className="pb-4 font-medium px-4">מצב</th>
                        <th className="pb-4 font-medium px-4">סטטוס</th>
                        <th className="pb-4 font-medium px-4 text-center">פעולות</th>
                    </tr>
                    </thead>
                    <tbody className="text-gray-700 text-sm divide-y divide-gray-50">
                    {reports.map((report) => (
                        <tr key={report.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 px-4 font-medium text-gray-400">{report.number}</td>
                        <td className="py-4 px-4">{report.date}</td>
                        <td className="py-4 px-4">{report.animalType}</td>
                        <td className="py-4 px-4 text-gray-800 font-medium">{report.location}</td>
                        <td className="py-4 px-4">{report.condition}</td>
                        <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${report.statusColor}`}>
                            {report.status}
                            </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                            <button className="inline-flex items-center gap-1.5 border border-gray-200 text-gray-600 px-4 py-1.5 rounded-xl text-xs font-medium hover:bg-gray-50 transition-colors shadow-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span>פתח</span>
                            </button>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>

            </div>

        </div>
  );
};

export default Reports;