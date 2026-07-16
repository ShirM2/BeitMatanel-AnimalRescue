import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function ThankYou() {

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
        // בודקים אם יש סטייט למשתמש, אם לא סימן שהמשתמש הגיע מהכתובת
        if (!location.state) {
            navigate('/'); // החזרה לעמוד הבית
        }
  }, [location, navigate]);

  // נעשה דיסטרקטינג לסטייט שקיבלנו מהניווט
  const { message, title } = location.state || { 
    title: 'תודה רבה!', 
    message: 'הפנייה שלך התקבלה בהצלחה.' 
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col justify-center items-center p-6" dir="rtl">

      <div className="bg-white p-10 rounded-3xl shadow-lg text-center max-w-md">
        
        <h1 className="text-3xl font-bold text-[#76c082] mb-4">{title}</h1>
        <p className="text-gray-600 mb-8">{message}</p>
        <Link to="/" className="bg-gray-900 text-white py-3 px-8 rounded-full font-bold hover:bg-gray-800 transition-all">
          חזרה לעמוד הבית
        </Link>
        
      </div>
    </div>
  );
}