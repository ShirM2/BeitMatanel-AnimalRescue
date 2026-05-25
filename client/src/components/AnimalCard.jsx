import React from 'react'
import noPhoto from '../photos/noPhoto.png';

export default function AnimalCard({animal}) {
    
  return (
    <div className="w-[350px] bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden text-right flex flex-col" dir="rtl">
      
      {/* אזור התמונה והתגיות שמעליה */}
      <div className="relative">
        <img 
          className="w-full h-[230px] object-cover object-center" 
          src={animal.imageUrl || noPhoto} 
          alt={animal.name} 
        />
        
        {/* תגית ימנית (זמין לאימוץ) */}
        <span className={`absolute top-3 right-3 bg-[#5cb85c] text-white text-sm font-medium px-3 py-1 rounded-full ${animal.available ? 'bg-[#5cb85c]' : 'bg-red-500' }`}>
         {animal.available ? 'זמין לאימוץ' : 'לא זמין לאימוץ'}
        </span>
        
        {/* תגית שמאלית (סוג החיה) */}
        <span className="absolute top-3 left-3 bg-white text-gray-700 text-sm font-medium px-3 py-1 rounded-full shadow-sm">
          {animal.type}
        </span>
      </div>
      
      {/* תוכן הכרטיסייה */}
      <div className="p-4 flex flex-col flex-grow">

        <h3 className="p-3 text-2xl font-bold text-gray-900">{animal.name}</h3>
        
        {/* גיל ומין */}
        <p className="p-4 text-sm text-gray-500 mt-1">
          {animal.age} • {animal.gender}
        </p>
        
        {/* כפתור */}
        <button className="mt-auto w-full bg-[#76c082] hover:bg-[#65a870] text-white font-medium py-2 px-4 rounded-full transition-colors">
          פרטים נוספים
        </button>
      </div>
    </div>
  )
}
