import React, { useState, useEffect } from 'react';
// ייבוא פונקציות מ-Firebase
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';
// שימי לב: ודאי שהנתיב לקובץ ה-firebase שלך נכון
import { db } from '../../firebase';

const ContactForms = () => {
  // המערך מתחיל ריק, כי הנתונים יגיעו מפיירבייס
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  // משיכת הנתונים מפיירבייס בזמן אמת
  useEffect(() => {
    // מצביעים על האוסף במסד הנתונים
    const messagesRef = collection(db, 'contactMessages');
    
    // onSnapshot מאזין לשינויים בזמן אמת
    const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setInquiries(messagesData);
      setLoading(false);
    });

    // ניקוי ההאזנה כשהקומפוננטה נסגרת
    return () => unsubscribe();
  }, []);

  // לוגיקת המיון שלנו (עובדת מושלם עם ה-Timestamp של פיירבייס!)
  const sortedInquiries = [...inquiries].sort((a, b) => {
    const convertDateToNumber = (date) => {
      if (!date) return 0;
      return typeof date.toDate === 'function' ? date.toDate().getTime() : new Date(date).getTime();
    };
    return convertDateToNumber(b.date) - convertDateToNumber(a.date);
  });

  // פונקציה לעדכון סטטוס הטיפול ב-Firebase עצמו
  const toggleHandleStatus = async (id, currentStatus) => {
    try {
      // יצירת הפניה למסמך הספציפי שרוצים לעדכן
      const messageDocRef = doc(db, 'contactMessages', id);
      // עדכון השדה isHandled (הופך ל-true אם היה false, ולהפך)
      await updateDoc(messageDocRef, {
        isHandled: !currentStatus
      });
    } catch (error) {
      console.error("שגיאה בעדכון הסטטוס: ", error);
      alert("אירעה שגיאה בעדכון הסטטוס");
    }
  };

  // חישוב כמה פניות ממתינות לטיפול
  const pendingCount = inquiries.filter(inq => !inq.isHandled).length;

  if (loading) {
    return <div className="text-center p-10">טוען הודעות...</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto" dir="rtl">
      {/* כותרת העמוד וסטטיסטיקה קצרה */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">פניות צור קשר</h1>
          <p className="text-gray-500">
            יש לך <span className="font-bold text-[#E8A36A]">{pendingCount}</span> פניות חדשות שממתינות לטיפול.
          </p>
        </div>
      </div>

      {/* רשימת הפניות */}
      <div className="space-y-4">
        {sortedInquiries.map((inquiry) => {
          // עיבוד התאריך לתצוגה
          const displayDate = inquiry.date 
            ? (typeof inquiry.date.toDate === 'function' ? inquiry.date.toDate() : new Date(inquiry.date)).toLocaleDateString('he-IL', {
                hour: '2-digit', minute: '2-digit'
              })
            : 'תאריך חסר';

          return (
            <div 
              key={inquiry.id} 
              className={`bg-white p-6 rounded-2xl shadow-sm border transition-all ${
                inquiry.isHandled ? 'border-gray-200 opacity-75' : 'border-[#E8A36A] border-l-4 shadow-md'
              }`}
            >
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                
                {/* פרטי השולח וההודעה */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {/* שימי לב: השתמשתי בשם השדה name, אם קראת לזה fullName בפיירבייס, תשני כאן */}
                    <h3 className="text-lg font-bold text-gray-800">{inquiry.name || inquiry.fullName || 'שם חסר'}</h3>
                    <span className="text-sm text-gray-400">•</span>
                    <span className="text-sm text-gray-500">{displayDate}</span>
                    
                    {/* תגית סטטוס */}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      inquiry.isHandled ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {inquiry.isHandled ? 'טופל' : 'ממתין לטיפול'}
                    </span>
                  </div>

                  <div className="flex gap-6 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <span>📞</span> {inquiry.phone || 'לא הוזן טלפון'}
                    </div>
                    <div className="flex items-center gap-1">
                      <span>✉️</span> {inquiry.email || 'לא הוזן אימייל'}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl text-gray-700">
                    {inquiry.message}
                  </div>
                </div>

                {/* אזור כפתור הפעולה */}
                <div className="flex-shrink-0 pt-2">
                  <button 
                    // מעבירים לפונקציה את ה-ID ואת הסטטוס הנוכחי
                    onClick={() => toggleHandleStatus(inquiry.id, inquiry.isHandled)}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                      inquiry.isHandled 
                        ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                        : 'bg-[#76c082] text-white hover:bg-green-600 shadow-sm'
                    }`}
                  >
                    {inquiry.isHandled ? 'סמן כלא טופל' : 'סמן כטופל ✓'}
                  </button>
                </div>

              </div>
            </div>
          );
        })}

        {/* מצב שבו אין פניות כלל */}
        {sortedInquiries.length === 0 && !loading && (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
            <div className="text-4xl mb-4">📭</div>
            <h3 className="text-xl font-medium text-gray-800">אין פניות כרגע</h3>
            <p className="text-gray-500">כל ההודעות מהאתר יופיעו כאן.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForms;