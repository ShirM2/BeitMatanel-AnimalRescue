import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      {/* כותרת */}
      <div className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">הסיפור של בית מתנאל</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            אנחנו עמותה המוקדשת להצלה, שיקום ומציאת בתים חמים לחיות מחמד במצוקה.
            האמונה שלנו היא שלכל חיה מגיע סיכוי שני לחיים מלאים באהבה.
          </p>
        </div>
      </div>

      
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* תמונה */}
          <div className="bg-gray-200 rounded-3xl h-[400px] flex items-center justify-center overflow-hidden shadow-inner">
            
            <img 
                src="src/photos/staffPhoto.png" 
                alt="סקי או פעילות העמותה" 
                className="w-full h-full object-cover" 
            />
          </div>

          {/* הסבר על העמותה */}
          <div className="text-right" dir="rtl">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">איך הכל התחיל?</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed text-lg">
              <p>
                בית מתנאל הוקם מתוך אהבה עמוקה לבעלי חיים והבנה שיש המון חיות מחמד שזקוקות לעזרה
                ולא תמיד מוצאות את המענה הנכון.
              </p>
              <p>
                מה שהתחיל כיוזמה קטנה של הצלת חיות בודדות, צמח לפרויקט רחב הכולל רשת של מתנדבים,
                טיפולים וטרינריים מתקדמים ומערך אימוץ אחראי ומקצועי.
              </p>
              <p className="font-medium text-[#74bd81]">
                בזכות התרומות שלכם, אנחנו מצליחים להעניק טיפול רפואי, מזון ובעיקר תקווה.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}