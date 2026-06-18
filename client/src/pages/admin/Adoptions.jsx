import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import { useOutletContext } from 'react-router-dom';

export default function Adoptions() {

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const { handleLogout } = useOutletContext();

    useEffect(() => {

        const fetchRequests = async () => {

        try {
            // נשלוף את המידע על הבקשות אימוץ
            const q = query(collection(db, "adoption_requests"), orderBy("createdAt", "desc"));
            const querySnapshot = await getDocs(q);

            const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
            }));
            // נשמור את המידע
            setRequests(data);

        } catch (error) {
            console.error("Error fetching requests: ", error);
        } finally {
            setLoading(false);
        }
    };

    fetchRequests();
  }, []);

  return (

    <div className="p-6" dir="rtl">
        {/* כותרת עליונה ויציאה */}
        <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-5">
            <div>
            <p className="text-gray-500 text-sm">שלום, מנהל/ת</p>
            <h1 className="text-4xl font-bold text-gray-800 mt-1">בקשות האימוץ שהתקבלו</h1>
            <p className="text-gray-400 text-xs mt-1">כל בקשות האימוץ במערכת</p>
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
      
        {loading ? (
            <p className="text-center mt-10">טוען בקשות...</p>
                ) : requests.length > 0 ? (
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-right">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="p-4">שם מלא</th>
                        <th className="p-4">טלפון</th>
                        <th className="p-4">סוג מגורים</th>
                        <th className="p-4">סיבה</th>
                    </tr>
                    </thead>
                    <tbody>
                    {requests.map(req => (
                        <tr key={req.id} className="border-t">
                        <td className="p-4">{req.fullName}</td>
                        <td className="p-4">{req.phone}</td>
                        <td className="p-4 whitespace-nowrap">
                            {req.residenceType === 'apartment' ? 'דירה' : 'בית פרטי'}
                        </td>
                        <td className="p-4 max-w-xs break-words">{req.reason}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </div>
                ) : (
                    <div className="text-center mt-10 p-10 bg-gray-50 rounded-xl border border-dashed">
                        <p className="text-gray-500 text-lg">אין בקשות אימוץ חדשות כרגע</p>
                    </div>
                )}
    
    </div>
  );
}