import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import AnimalCard from '../components/AnimalCard';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import { collection, query, limit, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Home = () => {
  // משתנה סטייט לחיות
  const [previewAnimals, setPreviewAnimals] = useState([]);
  
  // משתנה סטייט להודעת מערכת
  const [announcement, setAnnouncement] = useState({ text: '', isActive: false, bgColor: 'bg-amber-500' });

  useEffect(() => {
    const fetchPreviewAnimals = async () => {
      try {
        const q = query(collection(db, "animals"), limit(3));
        const querySnapshot = await getDocs(q);
        const animalsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPreviewAnimals(animalsData);
      } catch (error) {
        console.error("Error fetching animals: ", error);
      }
    };

    // פונקציה לשליפת הודעת המערכת
    const fetchAnnouncement = async () => {
      try {
        const docRef = doc(db, 'settings', 'site_announcement');
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
          setAnnouncement(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching announcement:", error);
      }
    };

    fetchPreviewAnimals();
    fetchAnnouncement();
  }, []);

  return(

    <main className="min-h-screen bg-white">
      
      <Navbar />

      {/* באנר הודעת מערכת (יופיע רק אם המנהל הפעיל אותו בהגדרות) */}
      {announcement.isActive && announcement.text && (
        <div className={`${announcement.bgColor || 'bg-amber-500'} text-white text-center py-3 px-4 font-medium shadow-inner flex items-center justify-center gap-2 transition-colors duration-300`}>
          <span>📢</span>
          <span>{announcement.text}</span>
        </div>
      )}
      
      <header className="relative text-center">
      
        <img src='src/photos/header.png' className="w-full h-auto"></img>

        <div className="absolute inset-0 flex flex-col justify-center items-center pb-43">
          <h1 className="text-6xl text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">מצילים,מטפלים ומאמצים חיות מחמד בישראל</h1>
          <p className="mt-3 text-2xl text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">עמותת בית מתנאל מחלצת ומשקמת חיות מחמד במצוקה ומוצאת להם בתים אוהבים</p>
          <Link to="/AdoptionInfo"
              className="mt-3 bg-white text-yellow-500 px-3 py-1.5 md:px-6 md:py-2 rounded-full font-bold shadow-md hover:bg-yellow-100 transition-all duration-300 whitespace-nowrap text-xs md:text-base">אני רוצה לאמץ</Link>

          <Link to="/ReportForm" 
              className="mt-3 bg-red-700 text-yellow-500 px-3 py-1.5 md:px-6 md:py-2 rounded-full font-bold shadow-md hover:bg-red-800 transition-all duration-300 whitespace-nowrap text-xs md:text-base">דווח על חיה במצוקה⚠️</Link>
        </div>
      </header>

      {/* אודות העמותה */}
      <div className="flex flex-col items-center bg-[#F9FAFB] w-full h-auto text-center p-20 gap-3">
        {/* אייקון */}
        {/* mix-blend-multiply - מעלים את הרקע הלבן של הגיף וממזג אותו עם הרקע של האתר */}
        {/* hue-rotate-[210deg] - משנה את גוון התכלת של האייקון לצבע הכתום כדי להתאים למיתוג העמותה */}
        <img className="w-25 h-25 mix-blend-multiply hue-rotate-[210deg]" src="src/photos/icon.gif"></img>
       
        <h1 className="text-4xl text-black">על בית  מתנאל</h1>
    
        <div className="max-w-2xl mx-auto px-6 md:px-12">
          <span className="text-center"> 
            עמותת בית מתנאל הוקמה מתוך אהבה עמוקה לחיות ורצון לעזור להן.
             אנחנו מחלצים חיות מחמד במצוקה. מספקים להן טיפול וטרינרי מלא,
             מעניקים להן מקום בטוח להתאושש,ועובדים למצוא להן משפחות אוהבות ואחראיות לכל החיים.
          </span>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mx-auto mt-12">
          <div>
            <h1 className="text-yellow-600 text-3xl">300+</h1>
            <h2>חיות שחולצו</h2>
          </div>

          <div>
            <h1 className="text-yellow-600 text-3xl">250+</h1>
            <h2> אימוצים מוצלחים</h2>
          </div>

          <div>
            <h1 className="text-yellow-600 text-3xl">24/7</h1>
            <h2> זמינות לחירום</h2>
          </div>
        </div>
      </div>

      {/* מיני גלריה */}
      <div className="flex flex-col items-center w-full h-auto text-center p-20">
        <h1 className="text-3xl">חיות מחמד מחכות לאימוץ</h1>
        <h2>הכירו את חלק מחיות המחמד המקסימות שמחכות למשפחה חדשה</h2>

        {/* Grids-הגלרייה עצמה תהיה מחולקת ל */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {/* מעבר על המערך חיות ויצירת קומפוננטות מהמערך*/}
            {previewAnimals.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}

        </div>

        {/* כפתור כניסה לגלרייה */}
        <div className="w-full flex justify-center mt-12">
          <Link to="/Gallery" className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 text-gray-800 font-semibold rounded-full shadow-sm hover:border-gray-300 hover:bg-gray-200 transition-all duration-300">
            
            {/* האייקון (SVG מתוך Heroicons) */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
            </svg>

            <span className="text-lg">צפה בכל חיות המחמד</span>
          </Link>

        </div>
      </div>

        {/* תרומות */}
        <div className="w-screen relative bg-[#6dbb7d] py-20 px-4 mt-6 text-white text-center flex flex-col items-center gap-6">
          {/* כותרת גדולה */}
          <h2 className="text-4xl font-bold">עזרו לנו להציל עוד חיות מחמד</h2>
          
          {/* טקסט הסבר */}
          <p className="text-xl max-w-2xl leading-relaxed">
            התרומות שלכם מאפשרות לנו להמשיך ולהציל חיות, לספק להן טיפול רפואי ומזון איכותי
          </p>

          {/* כפתורי פעולה */}
          <div className="flex gap-4 mt-4">
            <Link 
              to="/donations" 
              className="flex items-center justify-center gap-2 bg-white text-[#74bd81] px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:bg-green-50 transition-all transform hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
              תרמו עכשיו
            </Link>
            
            {/* #why-donate --> מפנה לחלק מסוים של הדף תרומות */}
          <HashLink 
            to="/donations#why-donate"
            smooth
            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-white hover:text-[#74bd81] transition-all">
            לפרטים נוספים
          </HashLink>

          </div>
        </div>
      
      <Footer />
      

    </main>
  );
};

export default Home;