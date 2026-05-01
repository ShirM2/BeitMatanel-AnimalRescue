import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-[#F0EAD4] sticky top-0 z-50">
      <div className="max-w-9xl mx-auto px-6 py-4 flex items-center justify-between relative">
        {/* לוגו האתר */}
        <div className="flex-1 flex items-center gap-2 md:gap-3">
          <img src="/src/photos/logo.png" alt="לוגו" className="h-16 w-16 md:h-20 md:w-20" />
          <div className="text-xl font-bold text-[#E8A36A]">בית מתנאל</div>
        </div>

        {/* קישורי ניווט */}
        <div className="flex-1 flex gap-3 xl:gap-10 justify-center">
          <Link to="/" className="whitespace-nowrap text-gray-700 hover:text-orange-300 font-medium transition-colors text-xs md:text-sm lg:text-base">
            דף הבית
          </Link>

          <Link to="/Gallery" className="whitespace-nowrap text-gray-700 hover:text-orange-300 font-medium transition-colors text-xs md:text-sm lg:text-base">
            החיות שלנו
          </Link>

          <Link to="/ReportForm" className="whitespace-nowrap text-gray-700 hover:text-orange-300 font-medium transition-colors text-xs md:text-sm lg:text-base">
            דווח על חיה במצוקה
          </Link>

          <Link to="/donations" className="whitespace-nowrap text-gray-700 hover:text-orange-300 font-medium transition-colors text-xs md:text-sm lg:text-base">
            תרומות
          </Link>

          <Link to="/about" className="whitespace-nowrap text-gray-700 hover:text-orange-300 font-medium transition-colors text-xs md:text-sm lg:text-base">
            אודות
          </Link>

          <Link to="/contact" className="whitespace-nowrap text-gray-700 hover:text-orange-300 font-medium transition-colors text-xs md:text-sm lg:text-base">
            צור קשר
          </Link>
        </div>

        {/* קישור לאימוץ */}
        <div className="flex-1 flex justify-center">
           <a href="/adpot_form" 
              className="bg-[#E8A36A] text-white px-3 py-1.5 md:px-6 md:py-2 rounded-full font-bold shadow-md hover:bg-[#d48e55] transition-all duration-300 whitespace-nowrap text-xs md:text-base">אני רוצה לאמץ</a>
        </div>
      </div>
    </nav>
  )
}
