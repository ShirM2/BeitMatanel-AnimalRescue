import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const ReportModal = ({ report, isOpen, onClose, onRefresh }) => {

    // סטייט שנועד לנעול את כפתורי הפעולה בזמן שמתבצע עדכון מול מסד הנתונים למניעת לחיצות כפולות
    const [isUpdating, setIsUpdating] = useState(false);

    if(!isOpen || !report) return null;

    // פונקציה לעדכון סטטוס הדיווח במסד הנתונים
    const handleStatusChange = async (newStatus) => {

        setIsUpdating(true); // נעילת ממשק המשתמש למניעת לחיצות נוספות בזמן העדכון

        try {
            const reportRef = doc(db, "reports", report.id); // יצירת הפנייה ישירה למסמך ספציפי
            await updateDoc(reportRef, {
                status: newStatus
            });
            
            // רענון הטבלה ברקע וסגירת המודאל
            if(onRefresh) await onRefresh();
            onClose();
        } catch (error) {
            console.error("Error updating status:", error);
            alert("שגיאה בעדכון הסטטוס");
        } finally {
            setIsUpdating(false); // שחרור נעילת הממשק
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                
                {/* כותרת המודאל */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">פרטי דיווח #{report.id.slice(-4)}</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            דווח ב: {report.createdAt ? (typeof report.createdAt.toDate === 'function' ? report.createdAt.toDate() : new Date(report.createdAt)).toLocaleString('he-IL') : 'תאריך לא ידוע'}
                        </p>
                    </div>
                    {/* כפתור לסגירת המודל */}
                    <button 
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* תוכן המודאל */}
                <div className="p-6 overflow-y-auto flex-1 text-right">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* פרטי יצירת קשר */}
                        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                            <h3 className="font-bold text-blue-800 mb-3 text-sm flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                                פרטי מדווח
                            </h3>
                            <p className="text-gray-700 font-medium">{report.reporterName || 'לא צוין שם'}</p>
                            <p className="text-blue-600 font-bold mt-1" dir="ltr">{report.reporterPhone || 'אין טלפון'}</p>
                        </div>

                        {/* פרטי מיקום ומצב */}
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                            <h3 className="font-bold text-gray-700 mb-3 text-sm">מידע תפעולי</h3>
                            <p className="text-sm mb-1"><span className="text-gray-500">סוג חיה:</span> <span className="font-medium text-gray-800">{report.animalType}</span></p>
                            <p className="text-sm mb-1"><span className="text-gray-500">מיקום:</span> <span className="font-medium text-gray-800">{report.location}</span></p>
                            <p className="text-sm"><span className="text-gray-500">מצב החיה:</span> <span className="font-medium text-red-500">{report.condition}</span></p>
                        </div>
                    </div>

                    {/* תיאור מורחב */}
                    <div className="mb-6">
                        <h3 className="font-bold text-gray-700 mb-2 text-sm">תיאור המקרה</h3>
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-gray-700 text-sm leading-relaxed">
                            {report.description || 'לא צורף תיאור מילולי.'}
                        </div>
                    </div>

                    {/* תמונה במידה ויש */}
                    {report.imageBase64 && (
                        <div className="mb-6">
                            <h3 className="font-bold text-gray-700 mb-2 text-sm">תמונה מצורפת</h3>
                            <div className="rounded-2xl overflow-hidden border border-gray-200">
                                <img src={report.imageBase64} alt="תמונת דיווח" className="w-full h-auto object-cover max-h-64" />
                            </div>
                        </div>
                    )}

                </div>

                {/* תחתית המודאל */}
                <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
                    <span className="text-sm text-gray-500 font-medium">
                        סטטוס נוכחי: <span className="text-gray-800 font-bold">{report.status || 'חדש'}</span>
                    </span>
                    
                    <div className="flex gap-3">
                        {/* הצגת כפתור 'בטיפול' רק אם הסטטוס אינו 'בטיפול' */}
                        {report.status !== 'בטיפול' && (
                            <button 
                                onClick={() => handleStatusChange('בטיפול')}
                                disabled={isUpdating}
                                className="px-5 py-2 text-white bg-[#E8A36A] rounded-xl hover:bg-[#d69259] font-medium transition-colors text-sm disabled:opacity-50"
                            >
                                סמן בטיפול
                            </button>
                        )}
                        
                        {/* הצגת כפתור 'טופל' רק אם הסטטוס אינו 'טופל' */}
                        {report.status !== 'טופל' && (
                            <button 
                                onClick={() => handleStatusChange('טופל')}
                                disabled={isUpdating}
                                className="px-5 py-2 text-white bg-green-500 rounded-xl hover:bg-green-600 font-medium transition-colors text-sm disabled:opacity-50"
                            >
                                סמן כטופל
                            </button>
                        )}

                        <button 
                            onClick={onClose} 
                            disabled={isUpdating}
                            className="px-5 py-2 text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 font-medium transition-colors text-sm disabled:opacity-50"
                        >
                            סגור
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ReportModal;