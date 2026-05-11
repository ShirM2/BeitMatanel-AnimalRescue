import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import backgroundImage from '../photos/staffPhoto.png';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        // מונעים רענון אוטומטי של הדף, כדי שהפרטים ישמרו ולא יימחקו
        e.preventDefault();
        // מאתחלים / מאפסים את השגיאה
        setError('');
        
        try{
            // שלוקחת את אובייקט אימות המשתמש ,האימייל, והסיסמא ושולחת אותם לשרתים לאימות המשתמש firebase של auth פונקציה של
            // במידה והמשתמש קיבל אישור כניסה token ומחזירה
            await signInWithEmailAndPassword(auth, email, password);
            // ננווט את המשתמש לעמוד הפאנל ניהול
            navigate('/admin');

        } catch(err) {

        setError('פרטי התחברות שגויים, נסה שוב');
        console.error(err.message);
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

        <button className="w-full bg-[#E8A36A] text-white p-3 rounded-xl font-bold">
          התחברות למערכת
        </button>
      </form>

    </div>
  );
};

export default Login;