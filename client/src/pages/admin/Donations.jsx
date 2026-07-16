import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import AddExpenseModal from '../../components/admin/AddExpenseModal';
import { Toaster } from 'react-hot-toast';
import StatCard from '../../components/admin/StatCard';
import ExpenseItem from '../../components/admin/ExpenseItem';
import useDonationsData from './useDonationsData'; // הייבוא של ההוק שמנהל את הנתונים

export default function Donations() {

  // שליפת כל הנתונים והפונקציות מההוק הייעודי
  const { donations, expenses, stats, expenseBreakdown, refreshData } = useDonationsData();

  // חישוב החודש והשנה העדכני להצגה בכרטיסיית הסיכום
  const monthNames = ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"];
  const currentDate = new Date();
  const currentMonthText = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

  // ניהול מצב הפתיחה/סגירה של מודל הוספת הוצאה חדשה
  const [isModalOpen, setIsModalOpen] = useState(false);

  // שימוש בקונטקסט המשותף לביצוע ההתנתקות מהמערכת
  const { handleLogout } = useOutletContext();

  return (
    <div className="p-8 bg-[#F9FAFB] min-h-screen" dir="rtl">
      {/* כותרת */}
      <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-5">
        <div>
          <p className="text-gray-500 text-sm">שלום, מנהל/ת</p>
          <h1 className="text-4xl font-bold text-gray-800 mt-1">תרומות וחשבונות</h1>
          <p className="text-gray-400 text-xs mt-1">ניהול תרומות, הוצאות והתזרים הכספי של העמותה</p>
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

      {/* כרטיסיות סיכום */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title='סה"כ תרומות'
          value={`₪${stats.total.toLocaleString()}`}
          subtitle="כל הזמנים"
        />
        <StatCard
          title="תרומות החודש"
          value={`₪${stats.thisMonth.toLocaleString()}`}
          subtitle={currentMonthText}
          badge={{
            text: (
              <span className="flex flex-col items-center justify-center leading-tight">
                <span dir="ltr" className="font-bold">
                  {stats.percentChange > 0 && Math.abs(stats.percentChange) <= 999 ? '+' : (stats.percentChange < 0 ? '-' : '')}
                  {Math.abs(stats.percentChange) > 999 ? "999+" : Math.abs(stats.percentChange || 0)}%
                </span>
                <span className="text-[10px] font-normal">מחודש קודם</span>
              </span>
            ),
            colorClass: (stats.percentChange || 0) >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }}
        />
        <StatCard
          title="מספר תורמים"
          value={stats.count}
          subtitle={currentMonthText}
          extraText={`ממוצע: ₪${stats.avgDonation.toLocaleString()}`}
        />
        <StatCard
          title="תזרים נטו"
          value={`₪${stats.netBalance.toLocaleString()}`}
          subtitle="הכנסות פחות הוצאות"
          valueColor={stats.netBalance >= 0 ? "text-green-600" : "text-red-500"}
        />
      </div>

      {/* אזור הטבלאות והוצאות */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

        {/* טבלת תרומות אחרונות */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="font-bold mb-4">תרומות אחרונות</h2>
          <div className="space-y-4">
            {donations.map((donation) => {
              // המרת התאריך לתצוגה נכונה
              const displayDate = donation.date
                ? (typeof donation.date.toDate === 'function' ? donation.date.toDate() : new Date(donation.date)).toLocaleDateString('he-IL')
                : 'תאריך חסר';

              // טיפול בשם חסר או חלקי
              const fullName = `${donation.firstName || ''} ${donation.lastName || ''}`.trim();
              const displayName = fullName ? fullName : 'תורם אנונימי';

              return (
                <div key={donation.id} className="grid grid-cols-3 border-b pb-2 items-center">
                  <span className="text-gray-600 text-right">{displayDate}</span>
                  <span className="text-center font-medium truncate px-2" dir="auto">
                    {displayName}
                  </span>
                  <span className="text-green-600 font-medium text-left">
                    ₪{Number(donation.amount).toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* רשימת הוצאות */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold">הוצאות</h2>
            <button onClick={() => setIsModalOpen(true)} className="bg-[#76c082] text-white px-4 py-2 rounded-lg text-sm">+ הוסף הוצאה</button>
          </div>

          <div className="space-y-4">
            {expenses.map((expense) => {
              // המרת תאריך ההוצאה
              const displayDate = expense.date
                ? (typeof expense.date.toDate === 'function' ? expense.date.toDate() : new Date(expense.date)).toLocaleDateString('he-IL')
                : 'תאריך חסר';

              return (
                <ExpenseItem
                  key={expense.id}
                  name={expense.name}
                  date={displayDate}
                  amount={`₪${Number(expense.amount).toLocaleString()}`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* התפלגות הוצאות */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <h2 className="font-bold mb-6">פילוח הוצאות</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {expenseBreakdown.map((item, index) => {
            const colors = ["bg-[#76c082]", "bg-blue-400", "bg-orange-400", "bg-purple-400"];
            const barColor = colors[index % colors.length];

            return (
              <div key={index}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700">{item.name}</span>
                  <span className="text-gray-500">{item.percentage}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className={`${barColor} h-2.5 rounded-full`} style={{ width: `${item.percentage}%` }}></div>
                </div>
                <p className="text-xs text-gray-400 mt-2">₪{item.amount.toLocaleString()}</p>
              </div>
            );
          })}
        </div>
      </div>

      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onExpenseAdded={refreshData} // הפעלת פונקציית הרענון מההוק
      />
      <Toaster position="top-center" />
    </div>
  );
}