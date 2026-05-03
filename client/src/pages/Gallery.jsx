import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar';
import AnimalCard from '../components/AnimalCard';


export default function Gallery() {

    const previewAnimals = [
    { id: 1, name: "סקאי", type: "ארנב", age: "שנה", gender: "נקבה", available: true, image: null },
    { id: 2, name: "לונה", type: "חתול", age: "שנה וחצי", gender: "נקבה", available: true, image: null },
    { id: 3, name: "רקס", type: "כלב", age: "שנתיים", gender: "זכר", available: false, image: null },
    { id: 1, name: "סקאי", type: "ארנב", age: "שנה", gender: "נקבה", available: true, image: null },
    { id: 2, name: "לונה", type: "חתול", age: "שנה וחצי", gender: "נקבה", available: true, image: null },
    { id: 3, name: "רקס", type: "כלב", age: "שנתיים", gender: "זכר", available: false, image: null }
  ];

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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* סוג חיה */}
                <div className="flex flex-col gap-2 text-right">
                <label className="text-sm font-medium text-gray-600 mr-1">סוג חיה</label>
                <div className="relative">
                    <select className="w-full p-3 bg-gray-50 border-none rounded-2xl text-gray-700 appearance-none focus:ring-2 focus:ring-[#6dbb7d] outline-none cursor-pointer">
                    <option>כל הסוגים</option>
                    <option>כלבים</option>
                    <option>חתולים</option>
                    <option>ארנבים</option>
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
                    <select className="w-full p-3 bg-gray-50 border-none rounded-2xl text-gray-700 appearance-none focus:ring-2 focus:ring-[#6dbb7d] outline-none cursor-pointer">
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
                    <select className="w-full p-3 bg-gray-50 border-none rounded-2xl text-gray-700 appearance-none focus:ring-2 focus:ring-[#6dbb7d] outline-none cursor-pointer">
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

            </div>
            </div>

        <div className="flex flex-col items-center w-full h-auto text-center pb-10">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8" >
                {/* מעבר על המערך חיות ויצירת קומפוננטות מהמערך*/}
                            {previewAnimals.map((animal) => (
                            <AnimalCard key={animal.id} animal={animal} />
                            ))}
            </div>

        </div>
        

        <Footer />
    </div>
  )
}
