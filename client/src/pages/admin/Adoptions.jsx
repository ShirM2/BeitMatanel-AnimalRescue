import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';

export default function Adoptions() {

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

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
        {/* כותרת */}
        <h1 className="text-2xl font-bold mb-6">בקשות אימוץ שהתקבלו</h1>
      
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