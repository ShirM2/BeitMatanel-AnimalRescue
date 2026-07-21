import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Footer = () => {
  // סטייט לקישורים, טלפון ושעות פעילות מהפיירבייס
  const [socials, setSocials] = useState({
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    whatsapp: 'https://whatsapp.com',
    phoneSupport: '050-123-4567',
    openingHours: 'ימים א׳-ה׳: 09:00 - 18:00'
  });

  useEffect(() => {
    // איסוף קישורי הרשתות חברתיות מההגדרות
    const fetchFooterSocials = async () => {
      try {
        const docRef = doc(db, 'settings', 'social_links');
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
          const data = docSnap.data();
          setSocials(prev => ({
            ...prev,
            ...data,
            phoneSupport: data.phoneSupport || prev.phoneSupport,
            openingHours: data.openingHours || prev.openingHours,
            facebook: data.facebook || prev.facebook,
            instagram: data.instagram || prev.instagram,
            whatsapp: data.whatsapp || prev.whatsapp
          }));
        }
      } catch (error) {
        console.error("Error fetching social links for footer:", error);
      }
    };

    fetchFooterSocials();
  }, []);

  return (
    <footer className="w-full bg-white pt-16 pb-8 px-4 border-t border-gray-100 text-right" dir="rtl">
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-12">
        
        {/* לוגו ותיאור */}
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

        {/* קישורים מהירים */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold text-gray-700">קישורים מהירים</h3>
          <ul className="flex flex-col gap-2 text-gray-400 text-sm">
            <li>
              <Link to="/gallery" className="hover:text-gray-600 transition-colors">חיות מחמד לאימוץ</Link>
            </li>
            <li>
              <Link to="/reportForm" className="hover:text-gray-600 transition-colors">דווח על חיה במצוקה</Link>
            </li>
            <li>
              <Link to="/donations" className="hover:text-gray-600 transition-colors">תרומות</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-600 transition-colors">צור קשר</Link>
            </li>
          </ul>
        </div>

        {/* שעות פעילות */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold text-gray-700">שעות פעילות</h3>
          <div className="text-gray-400 text-sm leading-relaxed">
            <p>{socials.openingHours}</p>
            <p className="text-xs text-gray-400 mt-1">מענה טלפוני לחירום: 24/7</p>
          </div>
        </div>

        {/* צור קשר ורשתות חברתיות */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-bold text-gray-700">צור קשר</h3>
          <div className="flex flex-col gap-3 text-gray-400 text-sm">
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a12.035 12.035 0 0 1-7.143-7.143c-.155-.441.011-.928.387-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
              <span>{socials.phoneSupport}</span>
            </div>
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              <span>info@beit-netanel.org</span>
            </div>
            
            {/* לוגואים רשמיים של רשתות חברתיות (SVG) */}
            <div className="flex gap-4 mt-2 items-center">
               {/* פייסבוק */}
               <a 
                 href={socials.facebook} 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 title="פייסבוק"
                 className="text-gray-400 hover:text-blue-600 transition-colors"
               >
                 <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                   <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                 </svg>
               </a>

               {/* אינסטגרם */}
               <a 
                 href={socials.instagram} 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 title="אינסטגרם"
                 className="text-gray-400 hover:text-pink-600 transition-colors"
               >
                 <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                   <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                 </svg>
               </a>

               {/* ווטסאפ */}
               <a 
                 href={socials.whatsapp} 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 title="ווטסאפ"
                 className="text-gray-400 hover:text-green-600 transition-colors"
               >
                 <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                   <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.124-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                 </svg>
               </a>
            </div>
          </div>
        </div>

      </div>

      {/* שורת זכויות יוצרים וכניסה לניהול */}
      <div className="max-w-6xl mx-auto mt-4 pt-8 border-t border-gray-100 flex flex-col items-center gap-2 text-gray-400 text-xs">
        <p>בית מתנאל. כל הזכויות שמורות 2025 ©</p>
        <a href="https://www.flaticon.com/free-animated-icons/care" title="care animated icons">Care animated icons created by Freepik - Flaticon</a>
        <button className="flex items-center gap-1 hover:text-gray-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
          <Link to="/Login">כניסת למערכת הניהול</Link>
        </button>
      </div>
    </footer>
  );
};

export default Footer;