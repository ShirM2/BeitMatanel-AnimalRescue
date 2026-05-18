import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


const Sidebar = ({ onLogout }) => {
    const navigate = useNavigate();
    const location = useLocation();


    // רשימת כפתורי הניווט
    const menuItems = [
        { id: 'dashboard', text: 'דשבורד', path: '/admin/dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z' },
        { id: 'reports', text: 'קריאות חילוץ', path: '/admin/reports', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
        { id: 'pets', text: 'ניהול חיות מחמד', path: '/admin/PetsManagement', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
        { id: 'adoptions', text: 'בקשות אימוץ', path: '/admin/adoptions', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
        { id: 'donations', text: 'תרומות ודוחות', path: '/admin/donations', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
        { id: 'settings', text: 'הגדרות', path: '/admin/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z' },
    ];

  return (
    <div className="w-64 h-screen bg-white border-l border-gray-200 flex flex-col justify-between p-6 fixed right-0 top-0 z-20">
      
      {/* חלק עליון: לוגו ושם המערכת */}
      <div>
        <div className="flex items-center gap-3 mb-8 px-2">
          
          <div className="text-green-500 text-3xl">🐾</div> 
          <div>
            <h2 className="text-xl font-bold text-gray-800">בית מתנאל</h2>
            <p className="text-xs text-gray-400">מערכת ניהול</p>
          </div>
        </div>

        {/* תפריט הניווט */}
        <nav className="space-y-2">
            {/* נעבור על רשימת הכפתורים ונציג אותם */}
            {menuItems.map((item) => {
                // isActive -> אחראי על בדיקה על איזה כתובת אנחנו נמצאים בפאנל
                // וסימון בירוק של הכפתור שעליו אנחנו נמצאים כרגע
                const isActive = location.pathname === item.path;
                return (
                    // נחזיר את הכפתור מהרשימה
                    <button
                        key={item.id}
                        onClick={() => navigate(item.path)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 
                        ${isActive 
                            ? 'bg-[#E8A36A] hover:bg-[#d48e55] text-white shadow-md' 
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                        </svg>
                        <span>{item.text}</span>
                    </button>
                    );
                })}
        </nav>
      </div>

      {/* חלק תחתון */}
      <div className="border-t border-gray-100 pt-4 space-y-2">
        {/* צפה באתר הציבורי */}
        <button 
          onClick={() => navigate('/')}
          className="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-600 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          <span>צפה באתר הציבורי</span>
        </button>

        {/* התנתק */}
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-500 hover:text-red-600 rounded-xl text-sm font-medium transition-colors"
        >
          <svg className="w-5 h-5 transform rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>התנתק</span>
        </button>
      </div>

    </div>
  );
};

export default Sidebar;