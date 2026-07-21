import React, { useState, useEffect } from 'react';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const ReportModal = ({ report, isOpen, onClose, onRefresh }) => {

    // סטייט שנועד לנעול את כפתורי הפעולה בזמן שמתבצע עדכון מול מסד הנתונים למניעת לחיצות כפולות
    const [isUpdating, setIsUpdating] = useState(false);
    
    // סטייטים חדשים לעריכה
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});

    // עדכון שדות העריכה ברגע שהמודאל נפתח עם דיווח חדש
    useEffect(() => {
        if (report) {
            setEditData({
                animalType: report.animalType || '',
                location: report.location || '',
                condition: report.condition || '',
                description: report.description || '',
                reporterName: report.reporterName || '',
                reporterPhone: report.reporterPhone || ''
            });
        }
        setIsEditing(false); // תמיד נפתח במצב צפייה ולא בעריכה
    }, [report, isOpen]);

    if(!isOpen || !report) return null;

    // פונקציה לעדכון סטטוס הדיווח במסד הנתונים (Firestore)
    const handleStatusChange = async (newStatus) => {
        setIsUpdating(true); // נעילת ממשק המשתמש למניעת לחיצות נוספות בזמן העדכון
        try {
            // יצירת הפניה ישירה למסמך הספציפי לפי ה-ID שלו באוסף ה-reports
            const reportRef = doc(db, "reports", report.id);
            
            // עדכון שדה הסטטוס במסד הנתונים לערך החדש
            await updateDoc(reportRef, {
                status: newStatus
            });
            
            // רענון הטבלה ברקע (טעינה מחדש של הנתונים) וסגירת חלון המודאל
            if (onRefresh) await onRefresh();
            toast.success("הסטטוס עודכן בהצלחה");
            onClose();
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("שגיאה בעדכון הסטטוס");
        } finally {
            setIsUpdating(false); // שחרור נעילת הממשק בכל מקרה (הצלחה או כישלון)
        }
    };

    // --- פונקציה למחיקת דיווח ---
    const handleDelete = async () => {
        const result = await Swal.fire({
            title: 'האם את בטוחה?',
            text: "פעולה זו תמחק את הדיווח לצמיתות ולא ניתן יהיה לשחזר אותו.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'כן, מחק דיווח',
            cancelButtonText: 'ביטול',
            reverseButtons: true // הופך את סדר הכפתורים שיתאים לעברית
        });

        if (!result.isConfirmed) return;

        setIsUpdating(true);
        try {
            await deleteDoc(doc(db, "reports", report.id));
            if(onRefresh) await onRefresh();
            toast.success("הדיווח נמחק בהצלחה");
            onClose();
        } catch (error) {
            console.error("Error deleting report:", error);
            toast.error("שגיאה במחיקת הדיווח");
        } finally {
            setIsUpdating(false);
        }
    };

    // --- פונקציה לשמירת העריכה ---
    const handleSaveEdit = async () => {
        // חסימת שמירה במידה ואחד השדות נותר ריק (טלפון הוא חובה רק אם המדווח אינו "צוות המערכת")
        if (!editData.animalType || !editData.location || !editData.condition || !editData.description || !editData.reporterName || (!editData.reporterPhone && editData.reporterName !== 'צוות המערכת')) {
            toast.warning("נא למלא את כל השדות");
            return; // עוצר את הפונקציה ולא ממשיך לעדכון
        }

        setIsUpdating(true); // נעילת כפתורים בזמן העדכון
        try {
            const reportRef = doc(db, "reports", report.id); // יצירת הפנייה ישירה למסמך ספציפי
            await updateDoc(reportRef, editData);
            if(onRefresh) await onRefresh();
            toast.success("הדיווח עודכן בהצלחה");
            setIsEditing(false); // חזרה למצב צפייה אחרי השמירה
        } catch (error) {
            console.error("Error updating report:", error);
            toast.error("שגיאה בעדכון הדיווח");
        } finally {
            setIsUpdating(false);
        }
    };

    // פונקציה שמטפלת בעדכון ה-State של הטופס בכל שינוי שדה במצב עריכה
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                
                {/* כותרת המודאל */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">
                            {isEditing ? `עריכת דיווח #${report.id.slice(-4)}` : `פרטי דיווח #${report.id.slice(-4)}`}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            דווח ב: {report.createdAt ? (typeof report.createdAt.toDate === 'function' ? report.createdAt.toDate() : new Date(report.createdAt)).toLocaleString('he-IL') : 'תאריך לא ידוע'}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        {/* כפתורי מחיקה ועריכה למעלה */}
                        {!isEditing && (
                            <>
                                <button onClick={() => setIsEditing(true)} disabled={isUpdating} className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors" title="ערוך דיווח">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.89 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.89l12.683-12.683z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 7.125L16.862 4.487" /></svg>
                                </button>
                                <button onClick={handleDelete} disabled={isUpdating} className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors" title="מחק דיווח">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
                                </button>
                            </>
                        )}
                        {/* כפתור לסגירת המודל */}
                        <button onClick={onClose} disabled={isUpdating} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
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
                            {isEditing ? (
                                <div className="space-y-2">
                                    <input type="text" name="reporterName" value={editData.reporterName} onChange={handleInputChange} className="w-full p-2 rounded-xl border border-blue-200 text-sm outline-none" placeholder="שם המדווח" />
                                    <input type="text" name="reporterPhone" value={editData.reporterPhone} onChange={handleInputChange} className="w-full p-2 rounded-xl border border-blue-200 text-sm outline-none text-right" placeholder="טלפון" />
                                </div>
                            ) : (
                                <>
                                    <p className="text-gray-700 font-medium">{report.reporterName || 'לא צוין שם'}</p>
                                    <p className="text-blue-600 font-bold mt-1" dir="ltr">{report.reporterPhone || 'אין טלפון'}</p>
                                </>
                            )}
                        </div>

                        {/* פרטי מיקום ומצב */}
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                            <h3 className="font-bold text-gray-700 mb-3 text-sm">מידע תפעולי</h3>
                            {isEditing ? (
                                <div className="space-y-2">
                                    <select name="animalType" value={editData.animalType} onChange={handleInputChange} className="w-full p-2 rounded-xl border border-gray-200 text-sm outline-none">
                                        <option value="ארנב">ארנב</option>
                                        <option value="כלב">כלב</option>
                                        <option value="חתול">חתול</option>
                                        <option value="אחר">אחר</option>
                                    </select>
                                    <input type="text" name="location" value={editData.location} onChange={handleInputChange} className="w-full p-2 rounded-xl border border-gray-200 text-sm outline-none" placeholder="מיקום" />
                                    <select name="condition" value={editData.condition} onChange={handleInputChange} className="w-full p-2 rounded-xl border border-gray-200 text-sm outline-none">
                                        <option value="פצוע">פצוע</option>
                                        <option value="נטוש">נטוש</option>
                                        <option value="כלוב מוזנח">כלוב מוזנח</option>
                                        <option value="אחר">אחר</option>
                                    </select>
                                </div>
                            ) : (
                                <>
                                    <p className="text-sm mb-1"><span className="text-gray-500">סוג חיה:</span> <span className="font-medium text-gray-800">{report.animalType}</span></p>
                                    <p className="text-sm mb-1"><span className="text-gray-500">מיקום:</span> <span className="font-medium text-gray-800">{report.location}</span></p>
                                    <p className="text-sm"><span className="text-gray-500">מצב החיה:</span> <span className="font-medium text-red-500">{report.condition}</span></p>
                                </>
                            )}
                        </div>
                    </div>

                    {/* תיאור מורחב */}
                    <div className="mb-6">
                        <h3 className="font-bold text-gray-700 mb-2 text-sm">תיאור המקרה</h3>
                        {isEditing ? (
                            <textarea name="description" value={editData.description} onChange={handleInputChange} rows="3" className="w-full p-3 rounded-xl border border-gray-200 text-sm outline-none resize-none" placeholder="תיאור המקרה..."></textarea>
                        ) : (
                            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-gray-700 text-sm leading-relaxed">
                                {report.description || 'לא צורף תיאור מילולי.'}
                            </div>
                        )}
                    </div>

                    {/* תמונה במידה ויש - רק במצב צפייה */}
                    {!isEditing && report.imageBase64 && (
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
                    {!isEditing ? (
                        <>
                            <span className="text-sm text-gray-500 font-medium">
                                סטטוס נוכחי: <span className="text-gray-800 font-bold">{report.status || 'חדש'}</span>
                            </span>
                            
                            <div className="flex gap-3">
                                {/* הצגת כפתור 'בטיפול' רק אם הסטטוס אינו 'בטיפול' */}
                                {report.status !== 'בטיפול' && (
                                    <button onClick={() => handleStatusChange('בטיפול')} disabled={isUpdating} className="px-5 py-2 text-white bg-[#E8A36A] rounded-xl hover:bg-[#d69259] font-medium transition-colors text-sm disabled:opacity-50">
                                        סמן בטיפול
                                    </button>
                                )}
                                
                                {/* הצגת כפתור 'טופל' רק אם הסטטוס אינו 'טופל' */}
                                {report.status !== 'טופל' && (
                                    <button onClick={() => handleStatusChange('טופל')} disabled={isUpdating} className="px-5 py-2 text-white bg-green-500 rounded-xl hover:bg-green-600 font-medium transition-colors text-sm disabled:opacity-50">
                                        סמן כטופל
                                    </button>
                                )}

                                <button onClick={onClose} disabled={isUpdating} className="px-5 py-2 text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 font-medium transition-colors text-sm disabled:opacity-50">
                                    סגור
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex w-full justify-end gap-3">
                            <button onClick={handleSaveEdit} disabled={isUpdating} className="px-6 py-2 text-white bg-blue-500 rounded-xl hover:bg-blue-600 font-bold transition-colors text-sm disabled:opacity-50">
                                שמור שינויים
                            </button>
                            <button onClick={() => setIsEditing(false)} disabled={isUpdating} className="px-5 py-2 text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 font-medium transition-colors text-sm disabled:opacity-50">
                                ביטול
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default ReportModal;