import { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar';
import AnimalCard from '../components/AnimalCard';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';


export default function Gallery() {

    // מערך חיות
    const [animals, setAnimals] = useState([]);

    // מערך פילטרים
    const [filters, setFilters] = useState({
        type: 'כל הסוגים',
        age: 'כל הגילאים',
        gender: 'הכל'
    });

    // מערך פילטרים פעילים
    const [activeFilters, setActiveFilters] = useState({
        type: 'כל הסוגים',
        age: 'כל הגילאים',
        gender: 'הכל'
    });

    useEffect(() => {
        // נשלוף את החיות מהמסד נתונים
        const fetchAnimals = async () => {
            // בשביל לייבא מהקולקציה את החיות Firestore פונים ל
            const querySnapshot = await getDocs(collection(db, "animals"));
            // עוברים על המסמכים מהמידע שקיבלנו
            const animalsData = querySnapshot.docs.map(doc => ({
                id: doc.id, // שליפת המזהה
                ...doc.data() // שליפת השדות
            }));
            // נשים את המידע במערך הסטייס
            setAnimals(animalsData);
        };
        
        fetchAnimals();
    }, []);

    // פונקציה לניהול הסינון
    const handleFilterSubmit = () => {
        setActiveFilters(filters);
    };

    // פונקציה שעוברת על מערך החיות ובודקת חיה חיה אם היא עומדת בכל דרישות הפילטרים
    // אם החיה החזירה אמת בכל הפילטרים אז נחזיר אמת, והחיה תוצג בגלרייה
    // אחרת אם נחזיר שקר החיה לא תוצג אחרי הסינון
    const filteredAnimals = animals.filter(animal => {
        // נבדוק אם הסוג חיה תואם למה שנמצא בפילטר
        const matchType = activeFilters.type === 'כל הסוגים' || animal.type === activeFilters.type;
        // נבודק אם המגדר תואם למה שנמצא בפילטר
        const matchGender = activeFilters.gender === 'הכל' || animal.gender === activeFilters.gender;
        
        let matchAge = true;
        // נבדוק אם הגיל של החיה תואם לזה שיש בפילטר
        if (activeFilters.age !== 'כל הגילאים') {
            if (activeFilters.age === 'גור (עד שנה)') matchAge = animal.age < 1;
                else if (activeFilters.age === 'צעיר (1-3 שנים)') matchAge = animal.age >= 1 && animal.age <= 3;
                    else if (activeFilters.age === 'בוגר (3+ שנים)') matchAge = animal.age > 3;
        }
        // נחזיר אמת במקרה וכל הפילטרים החזירו אמת
        return matchType && matchGender && matchAge;
    });

  return (
    <div>
        <Navbar />
        <div className="pt-10 pb-10 text-center">
            <h1 className="text-5xl text-black">חיות מחמד לאימוץ</h1>
            <h2 className="text-1xl text-black pt-7">כל חיות המחמד שלנו מעוקרות, מחוסנות ומוכנות למשפחה חדשה</h2>
        </div>
        {/* תיבת סינון חיפוש */}
        <div className="max-w-6xl mx-auto my-12 p-8 bg-gray-100 border border-gray-100 rounded-3xl shadow-sm" dir="rtl">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-right">סינון חיות מחמד</h2>
            
            {/* שינוי ל-4 עמודות במסך רחב כדי להוסיף את הכפתור בשורה אחת */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                
                {/* סוג חיה */}
                <div className="flex flex-col gap-2 text-right">
                <label className="text-sm font-medium text-gray-600 mr-1">סוג חיה</label>
                <div className="relative">
                    <select 
                        value={filters.type}
                        onChange={(e) => setFilters({...filters, type: e.target.value})}
                        className="w-full p-3 bg-gray-50 border-none rounded-2xl text-gray-700 appearance-none focus:ring-2 focus:ring-[#6dbb7d] outline-none cursor-pointer">

                        <option value="כל הסוגים">כל הסוגים</option>
                        <option value="כלב">כלבים</option>
                        <option value="חתול">חתולים</option>
                        <option value="ארנב">ארנבים</option>
                        
                    </select>
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                    </div>
                </div>
                </div>

                {/* גיל */}
                <div className="flex flex-col gap-2 text-right">
                <label className="text-sm font-medium text-gray-600 mr-1">גיל</label>
                <div className="relative">
                    <select 
                        value={filters.age}
                        onChange={(e) => setFilters({...filters, age: e.target.value})}
                        className="w-full p-3 bg-gray-50 border-none rounded-2xl text-gray-700 appearance-none focus:ring-2 focus:ring-[#6dbb7d] outline-none cursor-pointer">

                        <option>כל הגילאים</option>
                        <option>גור (עד שנה)</option>
                        <option>צעיר (1-3 שנים)</option>
                        <option>בוגר (3+ שנים)</option>
                    </select>
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                    </div>
                </div>
                </div>

                {/* מין */}
                <div className="flex flex-col gap-2 text-right">
                <label className="text-sm font-medium text-gray-600 mr-1">מין</label>
                <div className="relative">
                    <select 
                        value={filters.gender}
                        onChange={(e) => setFilters({...filters, gender: e.target.value})}
                        className="w-full p-3 bg-gray-50 border-none rounded-2xl text-gray-700 appearance-none focus:ring-2 focus:ring-[#6dbb7d] outline-none cursor-pointer">
                        <option>הכל</option>
                        <option>זכר</option>
                        <option>נקבה</option>
                    </select>
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                    </div>
                </div>
                </div>

                {/* כפתור סינון - התווסף כאן */}
                <div className="w-full">
                  <button 
                    type="button"
                    onClick={handleFilterSubmit}
                    className="w-full p-3 bg-[#6dbb7d] hover:bg-[#5aa36a] text-white font-bold rounded-2xl shadow-md transition-all duration-200 active:scale-[0.98]"
                  >
                    סנן תוצאות
                  </button>
                </div>

            </div>
        </div>

        <div className="flex flex-col items-center w-full h-auto text-center pb-10">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8" >
                {/* מעבר על המערך חיות ויצירת קומפוננטות מהמערך*/}
                            {filteredAnimals.length > 0 ? (
                                filteredAnimals.map((animal) => (
                                    <AnimalCard key={animal.id} animal={animal} />
                                ))
                            ) : (
                                <div className="col-span-full text-center text-gray-500 py-8">
                                    לא נמצאו חיות העונות על סינון זה.
                                </div>
                            )}
            </div>

        </div>
        

        <Footer />
    </div>
  )
}
