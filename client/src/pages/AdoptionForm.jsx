import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

export default function AdoptionForm() {

  // נשלוף את האיידי של החיה מהכתובת של האתר
  const { id } = useParams();
  const navigate = useNavigate();

  // יצירת משתני סטייט לשמירת המידע מהטופס
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    residenceType: '',
    hasOtherPets: '',
    reason: ''
  });

  // פונקציה שמטפלת בעדכון הסטייט
  // אי אפשר לשנות את הסטייט אז אנחנו ניצור עותק שלו ונשתמש
  // שמטפלת בכל השדות של הטופס e.target.name  בפונקציה 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // פונקציה שמטפלת בשליחת הטופס
  const handleSubmit = async (e) => {
    console.log("Submit clicked");
    e.preventDefault();

    try{
      // הוספת מסמך חדש לאוסף שנקרא adoption_requests
      // ונגדיר בתוכו את המידע מהטופס
      await addDoc(collection(db, "adoption_requests"), {
        animalId: id,
        ...formData,
        createdAt: new Date() // תאריך יצירת הבקשה
      });

      // ננווט את המשתמש לעמוד התודה
      navigate('/ThankYou');

    }catch (error) {
      console.error("Error adding document: ", error);
      alert("הייתה שגיאה בשליחת הטופס, נסה שוב מאוחר יותר.");
    }
    
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex justify-center items-center p-6" dir="rtl">
      <div className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-lg">
        {/* הכפתור החדש */}
        <Link 
          to="/Gallery"
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 font-medium transition-colors"
        >
          &rarr; חזרה לגלריה
        </Link>
        {/* כותרת הטופס */}
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">טופס בקשת אימוץ</h1>

        {/* הטופס */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* שדות הטופס */}
          {/* שם */}
          <input 
            type="text" name="fullName" placeholder="שם מלא" required
            className="p-3 border border-gray-300 rounded-xl w-full"
            onChange={handleChange}
          />
          {/* טלפון */}
          <input 
            type="tel" name="phone" placeholder="מספר טלפון" required
            className="p-3 border border-gray-300 rounded-xl w-full"
            onChange={handleChange}
          />

          {/* סוג מגורים */}
          <select name="residenceType" onChange={handleChange} className="p-3 border border-gray-300 rounded-xl w-full text-gray-500" required>
            <option value="">סוג מגורים</option>
            <option value="apartment">דירה</option>
            <option value="house">בית פרטי עם חצר</option>
          </select>

          {/* אם יש חיות נוספות */}
          <select name="hasOtherPets" onChange={handleChange} className="p-3 border border-gray-300 rounded-xl w-full text-gray-500" required>
            <option value="">האם יש חיות נוספות בבית?</option>
            <option value="yes">כן</option>
            <option value="no">לא</option>
          </select>

          {/* פירוט על למה אתם רוצים לאמץ */}
          <textarea 
            name="reason" placeholder="למה אתם רוצים לאמץ ואיך תטפלו בחיה?" required
            className="p-3 border border-gray-300 rounded-xl w-full h-32"
            onChange={handleChange}
          />

          {/* כפתור שליחת בקשת האימוץ */}
          <button type="submit" className="bg-[#76c082] hover:bg-[#65a870] text-white font-bold py-3 rounded-xl transition-all mt-4">
            שלח בקשת אימוץ
          </button>
        </form>
      </div>
    </div>
  );
}