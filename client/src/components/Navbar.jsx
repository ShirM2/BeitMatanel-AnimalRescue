import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  // ניהול המצב של תפריט המובייל - פתוח או סגור
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#F0EAD4] sticky top-0 z-50" dir="rtl">
      <div className="max-w-9xl mx-auto px-6 py-4 flex items-center justify-between relative">
        
        {/* 1. לוגו האתר - מוצג תמיד */}
        <div className="flex-1 flex items-center gap-2 md:gap-3">
          <img src="/src/photos/logo.png" alt="לוגו" className="h-16 w-16 md:h-20 md:w-20" />
          <div className="text-xl font-bold text-[#E8A36A]">בית מתנאל</div>
        </div>

        {/* 2. קישורי ניווט - מוסתרים בטלפון, מוצגים במסך גדול (lg) */}
        <div className="hidden lg:flex flex-1 gap-3 xl:gap-10 justify-center">
          <Link to="/" className="whitespace-nowrap text-gray-700 hover:text-orange-300 font-medium transition-colors text-base">דף הבית</Link>
          <Link to="/Gallery" className="whitespace-nowrap text-gray-700 hover:text-orange-300 font-medium transition-colors text-base">החיות שלנו</Link>
          <Link to="/ReportForm" className="whitespace-nowrap text-gray-700 hover:text-orange-300 font-medium transition-colors text-base">דווח על חיה במצוקה</Link>
          <Link to="/Donations" className="whitespace-nowrap text-gray-700 hover:text-orange-300 font-medium transition-colors text-base">תרומות</Link>
          <Link to="/About" className="whitespace-nowrap text-gray-700 hover:text-orange-300 font-medium transition-colors text-base">אודות</Link>
          <Link to="/Contact" className="whitespace-nowrap text-gray-700 hover:text-orange-300 font-medium transition-colors text-base">צור קשר</Link>
        </div>

        {/* 3. קישור לאימוץ - מוסתר בטלפון, מוצג במסך גדול (lg) */}
        <div className="hidden lg:flex flex-1 justify-end">
           <Link to="/AdoptionInfo" 
              className="bg-[#E8A36A] text-white px-6 py-2 rounded-full font-bold shadow-md hover:bg-[#d48e55] transition-all duration-300 whitespace-nowrap text-base">
              אני רוצה לאמץ
           </Link>
        </div>

        {/* כפתור המבורגר לטלפון - מוצג בטלפון, מוסתר במסך גדול (lg) */}
        <button 
          className="lg:hidden text-[#E8A36A] focus:outline-none"
          onClick={() => setIsMenuOpen(true)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* --- אזור תפריט המובייל (פופ-אפ מהצד) --- */}
      
      {/* רקע כהה שקוף - נסגר בלחיצה */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* התפריט הנגלל מהצד הימני */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#F0EAD4] z-50 transform transition-transform duration-300 ease-in-out lg:hidden shadow-2xl ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          {/* כפתור סגירה */}
          <button 
            className="text-gray-500 mb-8 self-end focus:outline-none"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* רשימת הקישורים בטלפון */}
          <div className="flex flex-col gap-6 text-lg font-medium">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-orange-300">דף הבית</Link>
            <Link to="/Gallery" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-orange-300">החיות שלנו</Link>
            <Link to="/ReportForm" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-orange-300">דווח על חיה במצוקה</Link>
            <Link to="/Donations" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-orange-300">תרומות</Link>
            <Link to="/About" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-orange-300">אודות</Link>
            <Link to="/Contact" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-orange-300">צור קשר</Link>
            
            <Link to="/AdoptionInfo" 
              onClick={() => setIsMenuOpen(false)}
              className="mt-4 text-center bg-[#E8A36A] text-white px-6 py-3 rounded-full font-bold shadow-md hover:bg-[#d48e55] transition-all">
              אני רוצה לאמץ
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}