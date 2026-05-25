import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Search, ClipboardCheck, Home, ArrowLeft } from 'lucide-react';

// תמונת רקע לעמוד
import backgroundImage from '../photos/staffPhoto.png'; 

const AdoptionInfo = () => {

    const navigate = useNavigate();

    // מערך קופסאות הצעדים
    const steps = [
        {
        // אייקון של הצעד
        icon: <Search className="w-8 h-8 text-[#E8A36A]" />,
        // כותרת של הצעד
        title: "מוצאים חבר חדש",
        // תיאור הצעד
        description: "דפדפו בגלריה שלנו ומצאו את הכלב או החתול שהכי מרגש אתכם."
        },
        {
        icon: <ClipboardCheck className="w-8 h-8 text-[#E8A36A]" />,
        title: "ממלאים שאלון",
        description: "בתוך עמוד החיה, לחצו על 'אני רוצה לאמץ' ומלאו שאלון קצר להכרות ראשונית."
        },
        {
        icon: <Heart className="w-8 h-8 text-[#E8A36A]" />,
        title: "נפגשים ומתאהבים",
        description: "הצוות שלנו יחזור אליכם לשיחה טלפונית ולתיאום פגישה בעמותה."
        }
    ];

    return (

        <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">
        
        {/* רקע מטושטש */}
        <div 
            className="absolute inset-0 z-0"
            style={{ 
            backgroundImage: `url(${backgroundImage})`,
            filter: "blur(6px)",
            backgroundSize: "cover",
            backgroundPosition: "center" 
            }}
        />

        {/* תוכן העמוד */}
        <div className="relative z-10 max-w-5xl w-full p-8 md:p-12 bg-white/90 shadow-2xl rounded-3xl text-right" dir="rtl">
            
            <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">הדרך לבית חם מתחילה כאן</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                אנחנו מאמינים שאימוץ הוא לא רק מסירת חיה, אלא יצירת משפחה. הנה השלבים הפשוטים בדרך לחבר החדש שלכם:
            </p>
            </div>

            {/* שלבי התהליך עם חצים */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">

                {/* נעבור על הצעדים מהמערך */}
                {steps.map((step, index) => (
                    // אלמנט רפאים עוטף
                    <React.Fragment key={index}>
                    
                    {/* כרטיסיית מידע */}
                    <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-orange-50 flex flex-col items-center text-center hover:shadow-md transition-shadow w-full">
                        <div className="bg-orange-50 p-4 rounded-full mb-4">
                        {step.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-gray-800">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                    </div>

                    {/* חץ בין הכרטיסיות - מוסתר בנייד ומסתובב למטה, במסך רחב מצביע שמאלה */}
                    {index < steps.length - 1 && (
                        <div className="text-[#E8A36A] mx-2 transform rotate-90 md:rotate-0 my-2 md:my-0">
                        <ArrowLeft className="w-8 h-8" />
                        </div>
                    )}

                    </React.Fragment>
                ))}
            </div>

            {/* מידע נוסף */}
            <div className="bg-[#E8A36A]/10 p-6 rounded-2xl mb-12 border-r-4 border-[#E8A36A]">
                <h2 className="text-xl font-bold mb-3 text-gray-800">דברים שחשוב לדעת:</h2>

                <ul className="list-disc list-inside space-y-2 text-gray-700 mr-2">
                    <li>האימוץ כרוך בתשלום עבור "סל אימוץ" (חיסונים, שבב, עיקור/סירוס).</li>
                    <li>נדרשת התחייבות לטיפול מסור לאורך כל חיי החיה.</li>
                    <li>האימוץ מותנה באישור הצוות המקצועי של העמותה.</li>
                </ul>
            </div>

            {/* כפתורי פעולה */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <button 
                    onClick={() => navigate('/gallery')}
                    className="w-full md:w-auto bg-[#E8A36A] hover:bg-[#d69259] text-white px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-lg active:scale-95"
                >
                    אני רוצה לראות את החיות בגלריה
                </button>
                
                {/* כפתור חזרה לדף הבית */}
                <button 
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-800 font-medium transition-colors"
                >
                    <Home className="w-5 h-5" />
                    חזרה לדף הבית
                </button>
            </div>

        </div>
        </div>
    );
};

export default AdoptionInfo;