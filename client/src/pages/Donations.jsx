import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Donations() {
  // בחירת סכום קבוע
  const [selectedAmount, setSelectedAmount] = useState(null);
  // בחירת סכום מעוצב אישית
  const [customAmount, setCustomAmount] = useState('');

  const amounts = [50, 100, 200, 300, 500];

  // פונקציה שמטפלת במקרה של קבלת סכום קבוע
  const handleAmountClick = (amount) => {

    //  null אם הסכום שנלחץ נבחר כבר נחזיר 
    setSelectedAmount(selectedAmount === amount ? null : amount);

    setCustomAmount(''); // מאפס את הסכום החופשי אם נבחר סכום קבוע
  };

  // פונקציה שמטפלת במקרה של קבלת סכום חופשי
  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null); // מאפס את הבחירה הקבועה אם הוקלד סכום חופשי
  };

  return (
    <div>
        <Navbar />
        <div className="text-center pt-10 pb-10">
            <h1 className="text-5xl text-black">תרמו לעמותה</h1>
            <h2 className="text-1xl text-black pt-7">כל תרומה עוזרת לנו להציל עוד חיים ולספק טיפול איכותי לחיות מחמד במצוקה</h2>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12" dir="rtl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* כרטיס 100 ש"ח */}
                <div className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-[#74bd81] mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                    </svg>
                </div>
                <span className="text-xl font-bold text-gray-800 mb-2">₪100</span>
                <p className="text-gray-400 text-sm leading-relaxed">טיפול ווטרינרי בסיסי לחיית מחמד אחת</p>
                </div>

                {/* כרטיס 200 ש"ח */}
                <div className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-[#74bd81] mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                </div>
                <span className="text-xl font-bold text-gray-800 mb-2">₪200</span>
                <p className="text-gray-400 text-sm leading-relaxed">מזון איכותי לחודש שלם</p>
                </div>

                {/* כרטיס 300 ש"ח */}
                <div className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-[#74bd81] mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                </div>
                <span className="text-xl font-bold text-gray-800 mb-2">₪300</span>
                <p className="text-gray-400 text-sm leading-relaxed">הכנת מקלט זמני לחיה שחולצה</p>
                </div>

                {/* כרטיס 500+ ש"ח */}
                <div className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-[#74bd81] mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-[#74bd81]">
                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                </div>
                <span className="text-xl font-bold text-gray-800 mb-2">₪500+</span>
                <p className="text-gray-400 text-sm leading-relaxed">חילוץ ושיקום מלא של חיית מחמד</p>
                </div>

            </div>
        </div>

        {/* טופס בחירת סכום התרומה */}
        <div className="max-w-3xl mx-auto my-10 p-8 bg-white border border-gray-100 rounded-3xl shadow-sm text-right" dir="rtl">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">בחרו סכום תרומה</h2>

        {/* בחירת סכומים קבועים */}
        <div className="mb-6">
            <label className="text-sm font-bold text-gray-600 block mb-3">סכומים מוצעים</label>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
            {amounts.map((amount) => (
                <button
                key={amount}
                onClick={() => handleAmountClick(amount)}
                className={`py-3 border rounded-xl font-medium transition-all ${
                    selectedAmount === amount
                    ? 'border-[#74bd81] bg-[#f0f9f1] text-[#74bd81]'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
                >
                ₪{amount}
                </button>
            ))}
            </div>
        </div>

        {/* סכום אחר */}
        <div className="mb-10">
            <label className="text-sm font-bold text-gray-600 block mb-2">או הזן סכום אחר</label>
            <input
            type="number"
            min="1"
            value={customAmount}
            onChange={(e) => {
                // בודק שהערך שהוקלד אינו שלילי לפני שמעדכנים
                if (e.target.value >= 0) {
                handleCustomAmountChange(e);
                }
            }  }
            placeholder="הכנס סכום ₪"
            className="w-full p-3 bg-gray-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-green-400"
            />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">פרטי תשלום</h2>
        
        {/* תיבת דמו לתשלום */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-8 flex flex-col items-center justify-center border border-dashed border-gray-200 text-gray-400">
            <p className="mb-4 text-center">זהו דמו - בגרסת הייצור יהיה כאן אינטגרציה עם שער תשלומים</p>
            <div className="flex gap-4 items-center opacity-60">
            <span>bit</span>
            <span className="text-gray-300">|</span>
            <span>PayPal</span>
            <span className="text-gray-300">|</span>
            <span>אשראי</span>
            </div>
        </div>

        {/* כפתור תרומה */}
        <button className="w-full py-4 bg-[#b8daba] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#a6c9a8] transition-colors mb-6">
            תרומו ₪{customAmount || selectedAmount || 0}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
        </button>

        {/* פוטר טופס */}
        <div className="text-center text-gray-400 text-xs space-y-1">
            <p>עמותת בית מתנאל היא עמותה רשומה (ע"ר 580123456)</p>
            <p>כל התרומות מוכרות לצרכי מס</p>
        </div>

    </div>

        {/* הסבר ללמה כדאי לתרום */}
        <div className="max-w-3xl mx-auto my-10 p-10 bg-white border border-gray-100 rounded-3xl shadow-sm text-right" dir="rtl">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">למה לתרום?</h2>
            
            <ul className="space-y-4">
                <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 shrink-0 select-none">•</span>
                    <p>
                        <span className="font-bold text-gray-800">טיפול וטרינרי:</span> חיות מחמד שמחולצות זקוקות לטיפול רפואי מיידי - בדיקות, חיסונים, עיקורים וטיפולים נוספים.
                    </p>
                </li>
                
                <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 shrink-0 select-none">•</span>
                    <p>
                        <span className="font-bold text-gray-800">מזון איכותי:</span> תזונה נכונה היא קריטית לבריאות החיה - ירקות טריים, מזון איכותי ותוספי מזון מתאימים.
                    </p>
                </li>
                
                <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 shrink-0 select-none">•</span>
                    <p>
                        <span className="font-bold text-gray-800">מקלט ושיקום:</span> כל חיית מחמד זקוקה למקום בטוח להשתקם בו עד שהיא מוכנה לאימוץ.
                    </p>
                </li>
                
                <li className="flex items-start gap-2 text-gray-600">
                    <span className="text-green-500 shrink-0 select-none">•</span>
                    <p>
                        <span className="font-bold text-gray-800">חינוך והדרכה:</span> אנחנו מלמדים מאמצים כיצד לטפל בחיות מחמד בצורה נכונה ואחראית.
                    </p>
                </li>
            </ul>
        </div>

        <Footer />
        
    </div>
  )
}
