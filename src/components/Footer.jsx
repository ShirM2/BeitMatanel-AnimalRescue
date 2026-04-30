import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-white pt-16 pb-8 px-4 border-t border-gray-100 text-right" dir="rtl">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 pb-12">
        
        {/* עמודה 1: לוגו ותיאור */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#6dbb7d" className="w-6 h-6">
                <path d="m11.645 20.91-.007-.003c-.022-.012-.045-.025-.07-.04-.051-.032-.115-.074-.194-.132a11.334 11.334 0 0 1-1.455-1.221c-1.314-1.232-2.425-2.521-3.213-3.675C5.926 14.654 5.5 13.43 5.5 12.188c0-2.39 1.988-4.328 4.438-4.328 1.132 0 2.164.418 2.937 1.107l.125.113.125-.113c.773-.689 1.805-1.107 2.937-1.107 2.45 0 4.438 1.938 4.438 4.328 0 1.242-.426 2.466-1.213 3.626-.788 1.154-1.899 2.443-3.213 3.675a11.334 11.334 0 0 1-1.455 1.221 3.51 3.51 0 0 1-.264.172l-.007.003-.001.001Z" />
             </svg>
            <span className="text-xl font-bold text-gray-700">בית מתנאל</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            עמותה להצלה, שיקום ואימוץ חיות מחמד בישראל
          </p>
        </div>

        {/* עמודה 2: קישורים מהירים */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold text-gray-700">קישורים מהירים</h3>
          <ul className="flex flex-col gap-2 text-gray-400 text-sm">
            <li className="hover:text-gray-600 cursor-pointer transition-colors">חיות מחמד לאימוץ</li>
            <li className="hover:text-gray-600 cursor-pointer transition-colors">דווח על חיה במצוקה</li>
            <li className="hover:text-gray-600 cursor-pointer transition-colors">תרומות</li>
            <li className="hover:text-gray-600 cursor-pointer transition-colors">צור קשר</li>
          </ul>
        </div>

        {/* עמודה 3: צור קשר ורשתות חברתיות */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold text-gray-700">צור קשר</h3>
          <div className="flex flex-col gap-3 text-gray-400 text-sm">
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a12.035 12.035 0 0 1-7.143-7.143c-.155-.441.011-.928.387-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
              <span>050-123-4567</span>
            </div>
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              <span>info@beit-netanel.org</span>
            </div>
            
            {/* אייקונים חברתיים */}
            <div className="flex gap-4 mt-2">
               <i className="fab fa-facebook text-xl hover:text-gray-600 cursor-pointer"></i>
               <i className="fab fa-instagram text-xl hover:text-gray-600 cursor-pointer"></i>
            </div>
          </div>
        </div>
      </div>

      {/* שורת זכויות יוצרים וכניסה לניהול */}
      <div className="max-w-6xl mx-auto mt-4 pt-8 border-t border-gray-100 flex flex-col items-center gap-2 text-gray-400 text-xs">
        <p>בית מתנאל. כל הזכויות שמורות 2025 ©</p>
        <button className="flex items-center gap-1 hover:text-gray-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
          כניסה למערכת ניהול
        </button>
      </div>
    </footer>
  );
};

export default Footer;