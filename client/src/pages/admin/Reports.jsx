import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import useReportsData from './useReportsData';
import ReportModal from '../../components/admin/ReportModal'; // מודל להצגת דיווחים
import AddReportModal from '../../components/admin/AddReportModal'; // מודל להוספת דיווח חדש

const Reports = () => {
    // Outlet Context - קבלת פונקציות ניהול משתמש גלובליות מתוך ה
    const { handleLogout } = useOutletContext();
    
    // החדש Hook - שליפת הנתונים מה
    const { reports, loading, refreshReports } = useReportsData();

    // ניהול הסטייט של המודאלים
    const [selectedReport, setSelectedReport] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false); // סטייט למודאל הוספת הדיווח

    // פונקציית עזר לעיצוב צבע הסטטוס של הדיווח
    const getStatusColor = (status) => {
        switch(status) {
            case 'חדש': return 'bg-red-500 text-white';
            case 'בטיפול': return 'bg-[#E8A36A] text-white';
            case 'טופל': return 'bg-green-500 text-white';
            default: return 'bg-gray-400 text-white';
        }
    };

    // פונקציות לפתיחה וסגירה של מודאל דיווח קיים
    const openModal = (report) => {
        setSelectedReport(report);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedReport(null);
    };

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

            {/* כפתור הוספת דיווח חדש */}
            <div className="flex justify-end mb-6">
                <button 
                    onClick={() => setIsAddModalOpen(true)} // פותח את המודאל הוספת דיווח חדש
                    className="bg-[#5CB85C] hover:bg-[#4cae4c] text-white px-5 py-2 rounded-xl text-sm font-medium flex items-center gap-2 shadow-sm transition-colors"
                >
                    <span>דיווח חדש</span>
                    <span className="text-lg font-bold">+</span>
                </button>
            </div>

            {/* כרטיסייה מרכזית שמכילה את הטבלה */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 relative z-0">
                <h3 className="text-gray-700 font-bold mb-6 text-base px-2">כל הקריאות</h3>
                
                {loading ? (
                    <div className="text-center py-10 text-gray-400">טוען קריאות מהמערכת...</div>
                ) : (
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
                            {/* נעבור על הדיווחים מהמסד */}
                            {reports.map((report) => {
                                // המרת אובייקט התאריך לתאריך בפורמט תקני
                                const displayDate = report.createdAt 
                                    ? (typeof report.createdAt.toDate === 'function' ? report.createdAt.toDate() : new Date(report.createdAt)).toLocaleDateString('he-IL')
                                    : 'תאריך חסר';

                                return (
                                    <tr key={report.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="py-4 px-4 font-medium text-gray-400">{report.id.slice(-4)}</td>
                                        <td className="py-4 px-4">{displayDate}</td>
                                        <td className="py-4 px-4">{report.animalType || 'לא צוין'}</td>
                                        <td className="py-4 px-4 text-gray-800 font-medium">{report.location || 'לא צוין'}</td>
                                        <td className="py-4 px-4">{report.condition || 'לא צוין'}</td>
                                        <td className="py-4 px-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${getStatusColor(report.status)}`}>
                                                {report.status || 'חדש'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            {/* פתיחת מודל פרטי הדיווח */}
                                            <button 
                                                onClick={() => openModal(report)} 
                                                className="inline-flex items-center gap-1.5 border border-gray-200 text-gray-600 px-4 py-1.5 rounded-xl text-xs font-medium hover:bg-gray-50 transition-colors shadow-sm"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                <span>פתח</span>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* מודאל צפייה בדיווח */}
            <ReportModal
                report={selectedReport}
                isOpen={isModalOpen}
                onClose={closeModal}
                onRefresh={refreshReports}
            />

            {/* מודאל הוספת דיווח ידני */}
            <AddReportModal 
                isOpen={isAddModalOpen} 
                onClose={() => setIsAddModalOpen(false)} 
                onRefresh={refreshReports}
            />

        </div>
    );
};

export default Reports;