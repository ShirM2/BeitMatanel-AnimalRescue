import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export default function ReportForm() {

    // שמירת רפרנס של בחירת הקבצים
    const fileInputRef = useRef(null);

    // סטייט לשמירת הטופס והשדות שלו
    const [formData, setFormData] = useState({
        animalType: '', // סוג החיה
        location: '', // מיקום החיה
        condition: '', // מצב החיה
        description: '', // תיאור
        reporterName: '', // שם המדווח
        reporterPhone: '', // טלפון המדווח
        imageBase64: '' // תמונה
    });

    // סטייט של שם הקובץ
    const [fileName, setFileName] = useState(null);

    const navigate = useNavigate();

    // פונקציה שמטפלת בעדכון הסטייט של הטופס בכל פעם שיש שינוי בשדה
    const handleInputChange = (e) => {
        // e.target -> נותן לנו את השדה שבו התרחש האירוע targetפנייה לאירוע שהתקיים ו
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Base64 פונקציה לטיפול בהעלאת התמונה, כיווצה והמרתה לפורמט
    const handleFileChange = (event) => {
        const file = event.target.files[0]; // שליפת הקובץ הראשון שנבחר
        if(file) {
            setFileName(file.name); // נשמור את שם הקובץ לתצוגה

            // FileReader מאפשר לקרוא קבצים מהמחשב של המשתמש דרך הדפדפן
            const reader = new FileReader();
            reader.readAsDataURL(file);

            // מופעל מיד כשהקריאה של הקובץ הסתיימה בהצלחה
            reader.onload = (e) => {
                const img = new Image();
                img.src = e.target.result; // לתוך אובייקט תמונה Base64 - טעינת תוצאת ה
                
                // מופעל לאחר שהתמונה נטענה זיכרון הדפדפן וניתן לקרוא את מידותיה
                img.onload = () => {
                    const canvas = document.createElement('canvas'); // יצירת אלמנט ציור (canvas) נסתר בזיכרון לצורך עריכת התמונה
                    const MAX_SIZE = 500; // הגדרת רוחב/גובה מקסימלי (פיקסלים) כדי להקטין את משקל הנתונים
                    let width = img.width;
                    let height = img.height;

                    // חישוב פרופורציונלי של מידות התמונה כדי שלא תיוצר עיוות (שמירה על יחס גובה-רוחב)
                    if(width > height) {
                        if(width > MAX_SIZE) { height *= MAX_SIZE / width; width = MAX_SIZE; }
                    } else {
                        if(height > MAX_SIZE) { width *= MAX_SIZE / height; height = MAX_SIZE; }
                    }
                    canvas.width = width;
                    canvas.height = height;

                    canvas.getContext('2d').drawImage(img, 0, 0, width, height); // במידות החדשות canvasציור התמונה המוקטנת על גבי ה
                    const compressedBase64 = canvas.toDataURL('image/jpeg', 0.5); // Base64 המרת התמונה מהקנבס למחרוזת בפורמט 
                    setFormData(prev => ({ ...prev, imageBase64: compressedBase64 })); // עדכון הסטייט עם מחרוזת התמונה הדחוסה
                };
            };
        }
    };
    
    // פונקציה לטיפול הגשת הטופס
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const reportData = {
                ...formData,
                status: 'חדש',
                createdAt: serverTimestamp()
            };

            await addDoc(collection(db, "reports"), reportData);

            navigate('/ThankYou', { 
                state: { title: 'הדיווח התקבל!', message: 'תודה שדיווחת לנו, הצוות שלנו יטפל בזה בהקדם.' } 
            });
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("אירעה שגיאה בשליחת הדיווח, אנא נסה שוב.");
        }
    };

    const handleImageClick = () => fileInputRef.current.click();

    return (
        <div>
            <Navbar />
            <div className="text-center pt-10 pb-10">
                <h1 className="text-5xl text-black">דווח על חיה במצוקה</h1>
                <h2 className="text-1xl text-black pt-7">מצאת חיית מחמד נטושה או פצועה? דווח/י לנו ונעשה הכל כדי לעזור</h2>
            </div>

            <div className="max-w-3xl mx-auto px-4 w-full mt-8">
                <div className="flex items-start gap-4 p-5 bg-[#fef2f2] border border-[#fca5a5] rounded-2xl text-right" dir="rtl">
                    <div className="mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-700">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                        </svg>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className="font-bold text-[#4b5563]">חירום?</h3>
                        <p className="text-[#6b7280] text-sm md:text-base leading-relaxed">
                            אם החיה במצב מסכן חיים, אנא התקשר/י מיד ל- <span className="font-bold text-gray-800">050-123-4567</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto my-10 p-8 bg-white border border-gray-100 rounded-3xl shadow-sm text-right" dir="rtl">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">פרטי הדיווח</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-gray-700">* סוג חיה</label>
                        <select name="animalType" required onChange={handleInputChange} value={formData.animalType} className="w-full p-3 bg-gray-50 border-none rounded-xl text-gray-500 outline-none focus:ring-2 focus:ring-green-400">
                            <option value="">בחר/י סוג חיה</option>
                            <option value="ארנב">ארנב</option>
                            <option value="כלב">כלב</option>
                            <option value="חתול">חתול</option>
                            <option value="אחר">אחר</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-gray-700">* מיקום החיה</label>
                        <input name="location" onChange={handleInputChange} required value={formData.location} type="text" placeholder="כתובת מדויקת ככל האפשר" className="w-full p-3 bg-gray-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-green-400" />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-gray-700">* מצב החיה</label>
                        <select name="condition" value={formData.condition} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border-none rounded-xl text-gray-500 outline-none focus:ring-2 focus:ring-green-400" required>
                            <option value="">בחר מצב...</option>
                            <option value="פצוע">פצוע</option>
                            <option value="נטוש">נטוש</option>
                            <option value="כלוב מוזנח">כלוב מוזנח</option>
                            <option value="אחר">אחר</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-gray-700">* תיאור המצב</label>
                        <textarea name="description" onChange={handleInputChange} required value={formData.description} rows="4" placeholder="תארו בפירוט את המצב" className="w-full p-3 bg-gray-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-green-400 resize-none"></textarea>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-gray-700">העלאת תמונה (אופציונלי)</label>
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                        <div onClick={handleImageClick} className="border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                            <span className="text-gray-500 font-medium">לחץ להעלאת תמונה</span>
                        </div>
                        {fileName && (
                            <div className="mt-4 p-3 bg-white border border-gray-200 rounded-xl flex justify-between items-center">
                                <span className="text-sm font-bold truncate">{fileName}</span>
                                <button type="button" onClick={() => { setFileName(null); setFormData(p => ({...p, imageBase64: ''})); }} className="text-xs text-red-500">הסר</button>
                            </div>
                        )}
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-6">פרטי יצירת קשר</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input name="reporterName" onChange={handleInputChange} required value={formData.reporterName} type="text" placeholder="השם שלך" className="w-full p-3 bg-gray-50 border-none rounded-xl" />
                        <input name="reporterPhone" onChange={handleInputChange} required value={formData.reporterPhone} type="tel" placeholder="050-1234567" className="w-full p-3 bg-gray-50 border-none rounded-xl" />
                    </div>

                    <button type="submit" className="w-full py-4 bg-[#74bd81] text-white font-bold rounded-xl shadow-md hover:bg-[#63a86f] transition-all mt-6">
                        שלח דיווח
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
}