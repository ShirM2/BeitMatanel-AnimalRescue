import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

export default function useDonationsData() {
  const [data, setData] = useState({
    donations: [],
    expenses: [],
    stats: { total: 0, thisMonth: 0, count: 0, netBalance: 0, avgDonation: 0, percentChange: 0 },
    expenseBreakdown: []
  });

  const fetchData = async () => {
    try {
      // Firebase -שליפת נתונים מ
      const donationsSnapshot = await getDocs(collection(db, "donations"));
      const donationsData = donationsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const expensesSnapshot = await getDocs(collection(db, "expenses"));
      const expensesData = expensesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // --- חישוב נתונים כלליים ---
      const totalAmount = donationsData.reduce((sum, d) => sum + Number(d.amount || 0), 0);
      const totalExpensesAmount = expensesData.reduce((sum, e) => sum + Number(e.amount || 0), 0);
      const netBalanceAmount = totalAmount - totalExpensesAmount;

      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      // --- חישוב נתוני החודש הנוכחי ---
      const thisMonthDonations = donationsData.filter(d => {
        if (!d.date) return false;
        const dDate = typeof d.date.toDate === 'function' ? d.date.toDate() : new Date(d.date);
        return dDate.getMonth() === currentMonth && dDate.getFullYear() === currentYear;
      });

      const monthAmount = thisMonthDonations.reduce((sum, d) => sum + Number(d.amount || 0), 0);
      const avgAmount = thisMonthDonations.length > 0 ? Math.round(monthAmount / thisMonthDonations.length) : 0;

      // --- חישוב שינוי לעומת חודש קודם ---
      const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const yearOfLastMonth = currentMonth === 0 ? currentYear - 1 : currentYear;
      
      const lastMonthDonations = donationsData.filter(d => {
        if (!d.date) return false;
        const dDate = typeof d.date.toDate === 'function' ? d.date.toDate() : new Date(d.date);
        return dDate.getMonth() === lastMonth && dDate.getFullYear() === yearOfLastMonth;
      });

      const lastMonthAmount = lastMonthDonations.reduce((sum, d) => sum + Number(d.amount || 0), 0);
      const change = lastMonthAmount > 0 
        ? Math.round(((monthAmount - lastMonthAmount) / lastMonthAmount) * 100) 
        : (monthAmount > 0 ? 100 : 0);

      // --- חישוב פילוח הוצאות לפי קטגוריות ---
      const expensesByCategory = expensesData.reduce((acc, e) => {
        const name = e.name || 'אחר';
        acc[name] = (acc[name] || 0) + Number(e.amount || 0);
        return acc;
      }, {});

      const breakdownData = Object.keys(expensesByCategory).map(key => ({
        name: key,
        amount: expensesByCategory[key],
        percentage: totalExpensesAmount > 0 ? Math.round((expensesByCategory[key] / totalExpensesAmount) * 100) : 0
      })).sort((a, b) => b.amount - a.amount);

      setData({
        donations: donationsData,
        expenses: expensesData,
        stats: {
          total: totalAmount,         // סך כל התרומות בכל הזמנים
          thisMonth: monthAmount,     // סך התרומות לחודש הנוכחי
          count: thisMonthDonations.length, // מספר התורמים החודש
          netBalance: netBalanceAmount,     // יתרה (הכנסות פחות הוצאות)
          avgDonation: avgAmount,           // ממוצע תרומה לתורם החודש
          percentChange: change             // אחוז שינוי בתרומות לעומת חודש שעבר
        },
        expenseBreakdown: breakdownData
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // שליפת נתונים בטעינת הקומפוננטה
  useEffect(() => {
    fetchData();
  }, []);

  return { ...data, refreshData: fetchData };
}