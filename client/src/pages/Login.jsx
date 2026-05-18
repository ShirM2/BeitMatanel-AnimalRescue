import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import backgroundImage from '../photos/staffPhoto.png';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        // מונעים רענון אוטומטי של הדף, כדי שהפרטים ישמרו ולא יימחקו
        e.preventDefault();
        // מאתחלים / מאפסים את השגיאה
        setError('');
        // נדליק את הטעינה
        setLoading(true);
        
        try{

            // מגדירים לפיירבייס לשמור את המשתמש רק כל עוד הטאב/דפדפן פתוח
            await setPersistence(auth, browserSessionPersistence);

            // שלוקחת את אובייקט אימות המשתמש firebase של auth פונקציה של
            //  ,האימייל, והסיסמא ושולחת אותם לשרתים לאימות המשתמש
            // במידה והמשתמש קיבל אישור כניסה token ומחזירה
            await signInWithEmailAndPassword(auth, email, password);
            // ננווט את המשתמש לעמוד הפאנל ניהול
            navigate('/admin/dashboard');

        } catch(err) {

          setError('פרטי התחברות שגויים, נסה שוב');
          console.error(err.message);

        } finally{
          // נכבה את הטעינה בכל מצב שקורה
          setLoading(false);
        }
    };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* 1. הדיב של הרקע - שים לב שהוא נסגר בסוף השורה עם /> */}
      <div 
        className="absolute inset-0 z-0"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          filter: "blur(3px)",
          backgroundSize: "cover",
          backgroundPosition: "center" 
        }}
      />

      {/* 2. הטופס - שים לב להסרת הכפילות ב-onSubmit */}
      <form 
        onSubmit={handleLogin} 
        className="relative z-10 max-w-md w-full p-10 bg-white/90 shadow-2xl rounded-3xl"
      >
        <h2 className="text-3xl font-bold text-center mb-8">כניסת צוות</h2>

        {/* הצגת השגיאה בניסיון ההתחברות */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 text-sm font-medium rounded-xl text-center">
            {error}
          </div>
        )}
        
        <div className="mb-4">
          <label className="block mb-1">אימייל</label>
          <input 
            type="email" 
            className="w-full p-3 border rounded-xl" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1">סיסמה</label>
          <input 
            type="password" 
            className="w-full p-3 border rounded-xl" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button 
          disabled={loading}
          className="w-full bg-[#E8A36A] hover:bg-[#d69259] active:scale-[1] disabled:bg-gray-400 text-white p-3 rounded-xl font-bold transition-all duration-200 transform"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              {/* ספינר קטן מובנה בתוך הכפתור בזמן טעינה */}
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              <span>מתחבר...</span>
            </div>
          ) : (
            'התחברות למערכת'
          )}
        </button>

      </form>

    </div>
  );
};

export default Login;