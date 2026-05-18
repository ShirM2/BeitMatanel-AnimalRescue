import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import Sidebar from '../../components/admin/Sidebar';

// מעטפה קבועה לכל העמודים במערכת הניהול
const AdminLayout = () => {

    const navigate = useNavigate();
    // פונקציה לניהול יציאה מהמערכת ניהול
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login', { replace: true });
        } catch (err) {
            console.error("שגיאה בהתנתקות:", err.message);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] flex text-right font-sans" dir="rtl">
            {/* הסיידבר קבוע ומוצג בכל עמודי הניהול */}
            <Sidebar onLogout={handleLogout} />

            {/* כאן יוזרק התוכן של העמוד הספציפי (דשבורד/קריאות וכו') */}
            <div className="flex-1 pr-64 w-full">
                {/* אנחנו מעבירים את handleLogout דרך ה-context כדי שכל עמוד יוכל להשתמש בו */}
                <Outlet context={{ handleLogout }} />
            </div>
        </div>
    );
};

export default AdminLayout;