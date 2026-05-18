import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const PetsManagement = () => {
  
  const { handleLogout } = useOutletContext();

  // סטייטים זמניים עבור החיפוש והסינונים
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  // מערך זמני
  const [pets, setPets] = useState([
    { id: 1, name: 'מקס', age: 'שנתיים', gender: 'זכר', type: 'כלב', status: 'זמין לאימוץ', statusColor: 'bg-gray-100 text-gray-600', image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=100&auto=format&fit=crop&q=60' },
    { id: 2, name: 'לונה', age: 'שנה וחצי', gender: 'נקבה', type: 'חתול', status: 'זמין לאימוץ', statusColor: 'bg-green-50 text-green-600', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=100&auto=format&fit=crop&q=60' },
    { id: 3, name: 'שוקו', age: 'שנה', gender: 'זכר', type: 'ארנבון', status: 'זמין לאימוץ', statusColor: 'bg-green-50 text-green-600', image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=100&auto=format&fit=crop&q=60' },
    { id: 4, name: 'צ\'יקי', age: 'חודשים 6', gender: 'נקבה', type: 'אוגר', status: 'בתהליך אימוץ', statusColor: 'bg-orange-50 text-orange-500', image: 'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?w=100&auto=format&fit=crop&q=60' },
  ]);

  return (
    <div className="max-w-7xl mx-auto p-10 w-full font-sans text-right" dir="rtl">
      
      {/* כותרת עליונה ויציאה */}
      <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-5">
        <div>
          <p className="text-gray-500 text-sm">שלום, מנהל/ת</p>
          <h1 className="text-4xl font-bold text-gray-800 mt-1">ניהול חיות מחמד</h1>
          <p className="text-gray-400 text-xs mt-1">כל חיות המחמד במערכת</p>
        </div>
        
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors text-sm font-medium"
        >
          <span>יציאה</span>
          <svg className="w-5 h-5 transform rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7" />
          </svg>
        </button>
      </div>

      {/* כפתור הוספת חיית מחמד חדשה למאגר*/}
      <div className="flex justify-between items-center mb-6">
        <div></div>
        <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl flex items-center gap-2 text-sm font-medium shadow-sm transition-colors">
          <span>הוסף חיית מחמד חדשה</span>
          <span className="text-lg font-bold">+</span>
        </button>
      </div>

      {/* כותרת ראשית ושורת חיפוש ופילטרים*/}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-gray-700 font-bold mb-4 text-base">רשימת חיות מחמד</h3>

        {/* שורת פילטרים וחיפוש */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="...חיפוש לפי שם"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-200"
          />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm text-gray-400 focus:outline-none focus:border-gray-200"
          >
            <option value="">כל הסוגים</option>
            <option value="dog">כלבים</option>
            <option value="cat">חתולים</option>
            <option value="rabbit">ארנבים</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm text-gray-400 focus:outline-none focus:border-gray-200"
          >
            <option value="">כל הסטטוסים</option>
            <option value="available">זמין לאימוץ</option>
            <option value="process">בתהליך אימוץ</option>
          </select>
        </div>

        {/* טבלת נתונים */}
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 text-xs font-semibold">
                <th className="pb-3 pt-2 font-medium w-20">תמונה</th>
                <th className="pb-3 pt-2 font-medium">שם</th>
                <th className="pb-3 pt-2 font-medium">גיל</th>
                <th className="pb-3 pt-2 font-medium">מין</th>
                <th className="pb-3 pt-2 font-medium">סוג</th>
                <th className="pb-3 pt-2 font-medium">סטטוס</th>
                <th className="pb-3 pt-2 font-medium text-center w-28">פעולות</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {pets.map((pet) => (
                <tr key={pet.id} className="text-sm text-gray-700 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4">
                    <img 
                      src={pet.image} 
                      alt={pet.name} 
                      className="w-12 h-12 rounded-xl object-cover border border-gray-100"
                    />
                  </td>
                  <td className="py-4 font-medium text-gray-800">{pet.name}</td>
                  <td className="py-4 text-gray-500">{pet.age}</td>
                  <td className="py-4 text-gray-500">{pet.gender}</td>
                  <td className="py-4 text-gray-500">{pet.type}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${pet.statusColor}`}>
                      {pet.status}
                    </span>
                  </td>
                  <td className="py-4 text-center">
                    <button className="border border-gray-200 hover:border-gray-300 text-gray-700 px-4 py-1.5 rounded-xl text-xs font-medium inline-flex items-center gap-1.5 transition-colors shadow-sm">
                      <span>ערוך</span>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default PetsManagement;