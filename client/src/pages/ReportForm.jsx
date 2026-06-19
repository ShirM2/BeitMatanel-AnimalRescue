import React, { useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export default function ReportForm() {

    // יצירת רפרנס שיחזיק את ה-input הנסתר
    const fileInputRef = useRef(null);

    // ניהול הסטייט של הטופס
    const [formData, setFormData] = useState({
        animalType: '',
        location: '',
        status: '',
        description: '',
        reporterName: '',
        reporterPhone: '',
        imageBase64: ''
    });

    const [fileName, setFileName] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // פונקציית השליחה לפיירסטור
    const handleSubmit = async (e) => {

        e.preventDefault();

        // נשלח את הנתונים לפיירסטור
        try{

            await addDoc(collection(db, "reports"), {
                ...formData,
                createdAt: serverTimestamp()
            });

            alert("הדיווח נשלח בהצלחה!");

            // איפוס הטופס
            setFormData({ animalType: '', location: '', status: '', description: '', reporterName: '', reporterPhone: '', imageBase64: '' });
            setFileName(null);
            if(fileInputRef.current) fileInputRef.current.value = "";

        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    // פונקציה שמופעלת כשלוחצים על הדיב המעוצב
    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    // פונקציה שמופעלת אחרי שהמשתמש בחר קובץ
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, imageBase64: reader.result }));
                setFileName(file.name);
            };
            reader.readAsDataURL(file);
        }
    };

    

  return (
    <div>
        <Navbar />
        <div className="text-center pt-10 pb-10">
            <h1 className="text-5xl text-black" >דווח על חיה במצוקה</h1>
            <h2 className="text-1xl text-black pt-7">מצאת חיית מחמד נטושה או פצועה? דווח/י לנו ונעשה הכל כדי לעזור</h2>
        </div>

        <div className="max-w-3xl mx-auto px-4 w-full mt-8">
            <div className="flex items-start gap-4 p-5 bg-[#fef2f2] border border-[#fca5a5] rounded-2xl text-right" dir="rtl">
                {/* אייקון התראה */}
                <div className="mt-1">
                    <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className="w-6 h-6 text-gray-700"
                    >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                </div>

                {/* תוכן הטקסט */}
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
                    {/* סוג חיה */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-gray-700">* סוג חיה</label>
                        <select name="animalType" onChange={handleInputChange} value={formData.animalType} className="w-full p-3 bg-gray-50 border-none rounded-xl text-gray-500 outline-none focus:ring-2 focus:ring-green-400">
                            <option>בחר/י סוג חיה</option>
                            <option>ארנב</option>
                            <option>כלב</option>
                            <option>חתול</option>
                            <option>אחר</option>
                        </select>
                    </div>

                    {/* מיקום החיה */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-gray-700">* מיקום החיה</label>
                        <input 
                            name="location"
                            onChange={handleInputChange}
                            value={formData.location}
                            type="text" 
                            placeholder="כתובת מדויקת ככל האפשר" 
                            className="w-full p-3 bg-gray-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-green-400"
                        />
                        <p className="text-xs text-gray-400 mr-1">למשל: רחוב הרצל 45, תל אביב או ליד הספסלים בפארק הירקון</p>
                    </div>

                    {/* מצב החיה */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-gray-700">* מצב החיה</label>
                        <input 
                            name="status"
                            onChange={handleInputChange}
                            value={formData.status}
                            type="text" 
                            placeholder="...פצוע / נטוש / כלוב מוזנח / אחר" 
                            className="w-full p-3 bg-gray-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    {/* תיאור המצב */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-gray-700">* תיאור המצב</label>
                        <textarea 
                            name="description"
                            onChange={handleInputChange}
                            value={formData.description}
                            rows="4" 
                            placeholder="תארו בפירוט את המצב - כל פרט יכול לעזור" 
                            className="w-full p-3 bg-gray-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-green-400 resize-none"
                        ></textarea>
                        <p className="text-xs text-gray-400 mr-1 italic">כולל: גודל החיה, צבע, האם יכולה לזוז, האם יש פצעים נראים לעין, כמה זמן היא שם וכו'</p>
                    </div>

                    {/* העלאת תמונה */}
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-gray-700">העלאת תמונה (אופציונלי)</label>

                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/*" // מאפשר רק תמונות
                        />

                        <div onClick={handleImageClick} 
                            className="border-2 border-dashed border-gray-200 rounded-2xl p-10 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                                
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400 group-hover:text-gray-500 transition-colors mb-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                            </svg>

                            <span className="text-gray-500 font-medium">לחץ להעלאת תמונה</span>
                            <span className="text-xs text-gray-400 mt-1">תמונה יכולה לעזור לנו להעריך את המצב ולהגיע מוכנים</span>
                        </div>
                        
                        {/* הצגת קוביה של התמונה שהעלו */}
                        {fileName && (
                            <div className="mt-4 flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl shadow-sm">
                                <div className="flex items-center gap-3">
                                    {/* הקוביה של התמונה */}
                                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
                                        <img 
                                            src={formData.imageBase64} 
                                            alt="preview" 
                                            className="w-full h-full object-cover" 
                                        />
                                    </div>
                                    
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-gray-700 truncate max-w-[150px]">{fileName}</span>
                                        <span className="text-xs text-gray-400">קובץ מוכן לשליחה</span>
                                    </div>
                                </div>

                                <button 
                                    type="button" 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setFileName(null);
                                        setFormData(prev => ({ ...prev, imageBase64: '' }));
                                        if (fileInputRef.current) fileInputRef.current.value = "";
                                    }}
                                    className="text-xs text-red-500 hover:bg-red-50 px-2 py-1 rounded transition-colors"
                                >
                                    הסר
                                </button>
                            </div>
                        )}
                    </div>

                    <hr className="border-gray-100 my-8" />
                    {/* פרטי קשר */}
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">פרטי יצירת קשר</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-700">* שם</label>
                            <input 
                            name="reporterName"
                            onChange={handleInputChange}
                            value={formData.reporterName}
                            type="text" 
                            placeholder="השם שלך" 
                            className="w-full p-3 bg-gray-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-700">* טלפון</label>
                            <input 
                            name="reporterPhone"
                            onChange={handleInputChange}
                            value={formData.reporterPhone}
                            type="tel" 
                            placeholder="050-1234567" 
                            className="w-full p-3 bg-gray-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </div>
                    </div>
                    <p className="text-xs text-gray-400 mr-1">נשתמש בפרטים אלו רק כדי לתאם את החילוץ</p>

                    <button 
                    type="submit" 
                    className="w-full py-4 bg-[#74bd81] text-white font-bold rounded-xl shadow-md hover:bg-[#63a86f] transition-all mt-6"
                    >
                    שלח דיווח
                    </button>
                </form>

        </div>
        
        <Footer />
    </div>
  )
}
