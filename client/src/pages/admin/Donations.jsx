import React from 'react';

export default function Donations() {

  return (

    <div className="p-8 bg-[#F9FAFB] min-h-screen" dir="rtl">
      {/* כותרת */}
      <h1 className="text-2xl font-bold mb-6">תרומות וחשבונות</h1>
      <p className="text-gray-500 mb-8">ניהול תרומות והוצאות העמותה</p>

      {/* כרטיסיות סיכום */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title='סה"כ תרומות' value="₪3,650" subtitle="כל הזמנים" />
        <StatCard title="תרומות החודש" value="₪0" subtitle="נובמבר 2025" />
        <StatCard title="מספר תורמים" value="8" subtitle="החודש" />
      </div>

      {/* אזור הטבלאות והוצאות */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* טבלת תרומות אחרונות */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="font-bold mb-4">תרומות אחרונות</h2>
          {/* מיפוי נתוני התרומות האחרונות*/}
          <div className="space-y-4">
             {/* דוגמה לשורה */}
             <div className="flex justify-between border-b pb-2">
               <span className="text-gray-600">15.11.2025</span>
               <span>אברהם לוי</span>
               <span className="text-green-600 font-medium">₪500</span>
             </div>
          </div>
        </div>

        {/* רשימת הוצאות */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <div className="flex justify-between items-center mb-4">

            <h2 className="font-bold">הוצאות</h2>
            <button className="bg-[#76c082] text-white px-4 py-2 rounded-lg text-sm">+ הוסף הוצאה</button>
          </div>
          
          <div className="space-y-4">
            <ExpenseItem name="טיפול וטרינרי" date="15 נובמבר 2025" amount="₪450" />
            <ExpenseItem name="מזון - חציר ואוכל" date="12 נובמבר 2025" amount="₪280" />
            <ExpenseItem name="ציוד - כלובים" date="8 נובמבר 2025" amount="₪600" />
          </div>
        </div>
      </div>
    </div>
  );
}

// רכיבים קטנים לעזרה בסידור
function StatCard({ title, value, subtitle }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border">
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-3xl font-bold my-2">{value}</h3>
      <p className="text-gray-400 text-xs">{subtitle}</p>
    </div>
  );
}

function ExpenseItem({ name, date, amount }) {
  return (
    <div className="flex justify-between items-center border-b pb-3">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-xs text-gray-400">{date}</p>
      </div>
      <span className="text-red-500 font-medium">{amount}</span>
    </div>
  );
}