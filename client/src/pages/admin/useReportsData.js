import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';

export default function useReportsData() {
  // סטייט דיווחים
  const [reports, setReports] = useState([]);
  // סטייט טעינה
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      // שליפת הדיווחים מסודרים לפי תאריך
      const q = query(collection(db, "reports"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      // שמירת הדיווחים באובייקט
      const reportsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      setReports(reportsData); // שמירה בסטייט
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return { reports, loading, refreshReports: fetchReports };
}