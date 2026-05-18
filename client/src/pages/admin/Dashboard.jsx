import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import Sidebar from '../../components/admin/Sidebar';

const Dashboard = () => {

    const navigate = useNavigate();

    // פונקציה שתנהל את היציאה מהמערכת
        const handleLogout = async () => {
            try {
                // נפעיל את פעולת היציאה
                await signOut(auth);
                // ננווט חזרה לעמוד ההתחברות
                navigate('/login', { replace: true });
            } catch (err) {
                console.error("שגיאה בהתנתקות:", err.message);
            }
        };
    const stats = [
        { id: 1, title: 'תרומות החודש', value: '₪3,650', desc: 'מהחודש הקודם 12%+', color: 'text-green-600', bgIcon: 'bg-green-50' },
        { id: 2, title: 'בקשות אימוץ ממתינות', value: '2', desc: 'דורשות בדיקה', color: 'text-orange-500', bgIcon: 'bg-orange-50' },
        { id: 3, title: 'חיות מחמד בטיפול', value: '4', desc: 'בהליך שיקום/אימוץ', color: 'text-blue-500', bgIcon: 'bg-blue-50' },
        { id: 4, title: 'קריאות חילוץ פתוחות', value: '2', desc: 'דורשות טיפול', color: 'text-red-500', bgIcon: 'bg-red-50' },
    ];

    const recentReports = [
        { id: 1, title: 'רחוב הרצל 45, תל אביב', status: 'חדש', statusColor: 'bg-red-50 text-red-500', type: 'פצוע' },
        { id: 2, title: 'פארק הירקון', status: 'בטיפול', statusColor: 'bg-orange-50 text-orange-500', type: 'נטוש' },
    ];

    const recentAdoptions = [
        { id: 1, name: 'דנה כהן', animal: 'עבור מקס', status: 'חדש', statusColor: 'bg-green-50 text-green-500' },
        { id: 2, name: 'יוסי לוי', animal: 'עבור לונה', status: 'בבדיקה', statusColor: 'bg-orange-50 text-orange-400' },
    ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex text-right font-sans" dir="rtl">
      
      {/*תפריט צד*/}
      <Sidebar onLogout={handleLogout} />

      
      <div className="flex-1 pr-64 w-full">
        <div className="max-w-7xl mx-auto p-10 w-full">
          
          {/* כותרת עליונה */}
          <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-5">
            <div>
              <p className="text-gray-500 text-sm">שלום, מנהל/ת</p>
              <h1 className="text-4xl font-bold text-gray-800 mt-1">דשבורד</h1>
              <p className="text-gray-400 text-xs mt-1">סקירה כללית של פעילות העמותה</p>
            </div>
            {/* כפתור יציאה */}
            <button onClick={handleLogout}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors text-sm font-medium">
              <span>יציאה</span>
              <svg className="w-5 h-5 transform rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7" />
              </svg>
            </button>
          </div>

          {/* שורת כרטיסי המידע */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* רשימת כרטיסיות סטטוסים */}
            {stats.map((stat) => (
              <div key={stat.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-40">
                <div className="flex justify-between items-start">
                  <span className="text-gray-500 text-sm font-medium">{stat.title}</span>
                  <div className={`w-8 h-8 rounded-full ${stat.bgIcon} flex items-center justify-center ${stat.color}`}>
                    <span className="w-2 h-2 rounded-full bg-current"></span>
                  </div>
                </div>
                <div className="mt-4">
                  <h2 className="text-3xl font-bold text-gray-800">{stat.value}</h2>
                  <p className="text-gray-400 text-xs mt-1">{stat.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/*  בלוק אמצעי: קריאות חילוץ מימין, בקשות אימוץ משמאל  */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            
            {/* קריאות חילוץ אחרונות */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-gray-700 font-bold mb-4 text-base">קריאות חילוץ אחרונות</h3>
                <div className="divide-y divide-gray-100">
                  {/* נעבור על רשימת 2 קריאות החילוץ האחרונות */}
                  {recentReports.map((report) => (
                    <div key={report.id} className="py-4 flex justify-between items-center">
                      <div>
                        <h4 className="text-gray-800 font-medium text-sm">{report.title}</h4>
                        <p className="text-gray-400 text-xs mt-0.5">{report.type}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${report.statusColor}`}>
                        {report.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {/* ננווט את עמוד קריאות החילוץ */}
              <button className="w-full text-center py-2.5 mt-4 border border-gray-100 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors">
                צפה בכל הקריאות
              </button>
            </div>

            {/* בקשות אימוץ אחרונות */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-gray-700 font-bold mb-4 text-base">בקשות אימוץ אחרונות</h3>
                <div className="divide-y divide-gray-100">
                  {/* נעבור על רשימת 2 בקשות האימוץ האחרונות */}
                  {recentAdoptions.map((adoption) => (
                    <div key={adoption.id} className="py-4 flex justify-between items-center">
                      <div>
                        <h4 className="text-gray-800 font-medium text-sm">{adoption.name}</h4>
                        <p className="text-gray-400 text-xs mt-0.5">{adoption.animal}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${adoption.statusColor}`}>
                        {adoption.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {/* ננווט אל עמוד בקשות האימוץ */}
              <button className="w-full text-center py-2.5 mt-4 border border-gray-100 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors">
                צפה בכל הבקשות
              </button>
            </div>

          </div>

          {/* בלוק תחתון: גרף אימוצים ותרומות */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-4">
            <h3 className="text-gray-700 font-bold mb-6 text-base">אימוצים ותרומות בשנה האחרונה</h3>
            
            <div className="w-full h-64 border-b border-r border-gray-200 relative flex items-end justify-between px-4 pb-2">
              <div className="absolute left-0 bottom-0 top-0 flex flex-col justify-between text-[10px] text-gray-400 transform -translate-x-6 pt-2">
                <span>22000</span>
                <span>16500</span>
                <span>11000</span>
                <span>5500</span>
                <span>0</span>
              </div>
              
              {['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני'].map((month, idx) => (
                <div key={idx} className="text-[11px] text-gray-400 text-center w-full mt-2">
                  {month}
                </div>
              ))}
              
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-orange-300"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;