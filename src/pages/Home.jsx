import React from 'react';
import Navbar from '../components/Navbar';
import AnimalCard from '../components/AnimalCard';

const Home = () => {

  const tempAnimal = {
    name: "סקאי",
    type: "ארנב",
    age: "שנה",
    gender:"נקבה",
    available: true,
    image: null
  };

    return(

    <main className="min-h-screen bg-white">
      
      <Navbar />
      
      <header className="relative text-center">
      
        <img src='src/photos/header.png' className="w-full h-auto"></img>

        <div className="absolute inset-0 flex flex-col justify-center items-center pb-43">
          <h1 className="text-6xl text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">מצילים,מטפלים ומאמצים חיות מחמד בישראל</h1>
          <p className="mt-3 text-2xl text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">עמותת בית מתנאל מחלצת ומשקמת חיות מחמד במצוקה ומוצאת להם בתים אוהבים</p>
          <a href="/adpot_form" 
              className="mt-3 bg-white text-yellow-500 px-3 py-1.5 md:px-6 md:py-2 rounded-full font-bold shadow-md hover:bg-yellow-100 transition-all duration-300 whitespace-nowrap text-xs md:text-base">אני רוצה לאמץ</a>

          <a href="/report" 
              className="mt-3 bg-red-700 text-yellow-500 px-3 py-1.5 md:px-6 md:py-2 rounded-full font-bold shadow-md hover:bg-red-800 transition-all duration-300 whitespace-nowrap text-xs md:text-base">דווח על חיה במצוקה⚠️</a>
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
      <div className="flex flex-col items-center w-full h-auto text-center p-20 gap-3">
        <h1 className="text-3xl">חיות מחמד מחכות לאימוץ</h1>
        <h2>הכירו את חלק מחיות המחמד המקסימות שמחכות למשפחה חדשה</h2>

        {/* Grids-הגלרייה עצמה תהיה מחולקת ל */}
        <div className="grid grid-col-1 md:grid-col-3">
          {/* קופוננטה של הכרטיסיות */}
          <AnimalCard animal={tempAnimal} />
        
        </div>
      </div>

    </main>
  );
};

export default Home;
    


