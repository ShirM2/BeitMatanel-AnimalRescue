import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link  } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; 
import noPhoto from '../photos/noPhoto.png';

export default function AnimalDetails() {
    // נשלוף את האיידי של החיה מהכתובת של האתר
    const { id } = useParams();
    const navigate = useNavigate();

    // יצירת משתני סטייט לחיה ולטעינה של העמוד
    const [animal, setAnimal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // נטען את המידע על החיה
        const fetchAnimal = async () => {

            try {
                // נשלוף את המידע של החיה מהאוסף באמצעות האיידי
                const docRef = doc(db, "animals", id);
                const docSnap = await getDoc(docRef);
                // אם יש לנו את המידע על החיה
                if (docSnap.exists()) {
                    // נשמור את המידע של החיה
                    setAnimal({ id: docSnap.id, ...docSnap.data() });
                } else {
                    // אחרת נחזיר שלא קיימת חיה כזאת
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching animal:", error);
            } finally {
                setLoading(false);
            }
    };

        fetchAnimal();
    // כשהאיידי ישתנה נטען שוב
    }, [id]);

    // אם יש טעינה
    if (loading) {
        // נחזיר את העמוד טעינה
        return <div className="h-screen flex justify-center items-center text-xl">טוען נתונים...</div>;
    }
    // אם אין טעינה
    if (!animal) {
        // נחזיר את העמוד שגיאה שהחיה לא נמצאה
        return <div className="h-screen flex justify-center items-center text-xl">החיה לא נמצאה.</div>;
    }

    return (
        
        <div className="h-screen bg-[#F9FAFB] flex justify-center items-center p-4" dir="rtl">
            
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg w-full max-w-2xl relative">
                {/* כפתור חזרה לעמוד הקודם */}
                <button 
                    onClick={() => navigate(-1)}
                    className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 font-medium transition-colors"
                    >
                    {/* &rarr - חץ ימינה */}
                    &rarr; חזרה
                </button>

                {/* תמונת החיה */}
                <div className="flex justify-center mb-4">
                    <div className="w-40 h-40 md:w-48 md:h-48 bg-gray-100 rounded-full overflow-hidden shadow-inner border-4 border-white ring-1 ring-gray-200">
                        <img 
                        src={animal.imageUrl || noPhoto} 
                        alt={animal.name} 
                        className="w-full h-full object-cover" 
                        />
                    </div>
                </div>
                
                {/* קופסת המידע */}
                <div className="text-center flex flex-col items-center">

                    {/* כותרת שם החיה */}
                    <h1 className="text-3xl font-extrabold text-gray-900">{animal.name}</h1>
                    
                    {/* מידע על החיה */}
                    <div className="flex items-center justify-center gap-3 text-sm font-medium text-gray-600 bg-gray-50 px-5 py-2 rounded-full mt-3 border border-gray-100 shadow-sm">
                        <span>{animal.type}</span>
                        <span className="text-gray-300">•</span>
                        <span>{animal.age}</span>
                        <span className="text-gray-300">•</span>
                        <span>{animal.gender}</span>
                    </div>
                    
                    {/* תיאור החיה */}
                    <div className="mt-5 text-gray-700 leading-relaxed text-base max-w-lg">
                        <p>
                        {animal.description || "אין תיאור זמין כרגע."}
                        </p>
                    </div>

                    {/* כפתור האימוץ */}
                    <Link 
                        to={`/AdoptionForm/${animal.id}`}
                        className="mt-6 bg-[#76c082] hover:bg-[#65a870] text-white font-bold py-3 px-10 rounded-full transition-all shadow-md text-lg w-full md:w-auto text-center block"
                    >
                        אני רוצה לאמץ!
                    </Link>
                </div>
                
            </div>
        </div>
    );
}