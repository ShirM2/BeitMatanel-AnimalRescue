import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';

export default function AddReportModal({ isOpen, onClose, onRefresh }) {
    // סטייט לשמירת הטופס והשדות שלו
    const [formData, setFormData] = useState({
        animalType: '',
        location: '',
        condition: '',
        description: '',
        reporterName: 'צוות המערכת',
        reporterPhone: ''
    });
    // סטייט לניהול מצב השליחה של הטופס
    const [isSubmitting, setIsSubmitting] = useState(false);

    if(!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await addDoc(collection(db, "reports"), {
                ...formData,
                status: 'חדש',
                createdAt: serverTimestamp(),
                imageBase64: ''
            });
            if (onRefresh) await onRefresh();
            onClose();
        } catch (error) {
            console.error("Error adding report: ", error);
            alert("שגיאה בהוספת הדיווח");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-xl p-6 text-right" dir="rtl">
                <h2 className="text-xl font-bold text-gray-800 mb-6">הוספת דיווח ידני</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <select name="animalType" required onChange={handleInputChange} value={formData.animalType} className="w-full p-3 bg-gray-50 rounded-xl outline-none">
                        <option value="">סוג חיה...</option>
                        <option value="ארנב">ארנב</option>
                        <option value="כלב">כלב</option>
                        <option value="חתול">חתול</option>
                        <option value="אחר">אחר</option>
                    </select>
                    
                    <input name="location" onChange={handleInputChange} required value={formData.location} type="text" placeholder="מיקום" className="w-full p-3 bg-gray-50 rounded-xl outline-none" />
                    
                    <select name="condition" onChange={handleInputChange} required value={formData.condition} className="w-full p-3 bg-gray-50 rounded-xl outline-none">
                        <option value="">מצב...</option>
                        <option value="פצוע">פצוע</option>
                        <option value="נטוש">נטוש</option>
                        <option value="כלוב מוזנח">כלוב מוזנח</option>
                        <option value="אחר">אחר</option>
                    </select>
                    
                    <textarea name="description" onChange={handleInputChange} required value={formData.description} placeholder="תיאור המקרה" className="w-full p-3 bg-gray-50 rounded-xl outline-none resize-none"></textarea>
                    
                    <div className="flex gap-3 mt-6">
                        <button type="submit" disabled={isSubmitting} className="flex-1 bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600 disabled:opacity-50">
                            שמור דיווח
                        </button>
                        <button type="button" onClick={onClose} disabled={isSubmitting} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 disabled:opacity-50">
                            ביטול
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}