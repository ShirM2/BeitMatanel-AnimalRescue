import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

const ProtectedRoute = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        // הפונקציה בודקת אם התרחש שינוי, ואם כן משנה בהתאם
        // onAuthStateChanged -> פונקציה של פיירבייס שברגע שמתבצע שינוי(משתמש נכנס/יצא),
        // הפונקציה מפעילה את הפונקציה הפנימית שהתקבלה
        //=========================================================================================
        // אנחנו שומרים את האפשרות להפסיק את ההאזנה ולסגור אותה בהפעלה של הפונקציה unsubscribe בשמירת הפונקציה בערך
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            // מגדירים את המשתמש החדש
            setUser(currentUser);
            // מפסיקים את מסך הטעינה
            setLoading(false);
        });
        // Cleanup Function -> קוראים לפונקציה ובכך סוגרים את ההאזנה
        return () => unsubscribe();
    }, []);

    // אם הטעינה מתקיימת נחזיר את העמוד טעינה
    if(loading) return <div className="flex h-screen items-center justify-center">טוען...</div>;

    // אם אין משתמש , נוציא אותו חזרה לעמוד ההתחברות
    if(!user) {
        return <Navigate to="/login" />;
    }

    // אם יש משתמש - תראה לו את מה שביקש (ה-children)
    return children;
};

export default ProtectedRoute;