import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

// ייבוא השלבים המפוצלים
import ProgressBar from '../components/donations/ProgressBar';
import Step1Amount from '../components/donations/Step1Amount';
import Step2Details from '../components/donations/Step2Details';
import Step3Payment from '../components/donations/Step3Payment';
import Step4Success from '../components/donations/Step4Success';

export default function Donations() {

    // ניהול השלבים: 1 = סכום, 2 = פרטים, 3 = אשראי, 4 = הצלחה
    const [currentStep, setCurrentStep] = useState(1);

    // בחירת סכום קבוע
    const [selectedAmount, setSelectedAmount] = useState(null);
    // בחירת סכום מעוצב אישית
    const [customAmount, setCustomAmount] = useState('');
    // סכומים קבועים מראש
    const amounts = [50, 100, 200, 300, 500];
    // חישוב הסכום הסופי
    const finalAmount = customAmount || selectedAmount || 0;
    // הגדרת מיקום הגלילה
    const formTopRef = useRef(null);

    // אובייקט חדש לשמירת כל פרטי התורם והתשלום
    const [donorDetails, setDonorDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });

    // פונקציה שמטפלת במקרה של קבלת סכום קבוע
    const handleAmountClick = (amount) => {
        //  null אם הסכום שנלחץ נבחר כבר נחזיר 
        setSelectedAmount(selectedAmount === amount ? null : amount);
        setCustomAmount(''); // מאפס את הסכום החופשי אם נבחר סכום קבוע
    };

    // פונקציה שמטפלת במקרה של קבלת סכום חופשי
    const handleCustomAmountChange = (e) => {
        setCustomAmount(e.target.value);
        setSelectedAmount(null); // מאפס את הבחירה הקבועה אם הוקלד סכום חופשי
    };

    // פונקציה לעדכון פרטי התורם
    const handleInputChange = (e) => {
      
      const { name, value } = e.target;
      // prev -> מחזיר את הסטייט העדכני
      setDonorDetails(prev => ({ ...prev, [name]: value }));
    };

    // פונקציה לשמירת התרומה במסד הנתונים
    const handleProcessDonation = async () => {
      try {
        const donationData = {
          amount: Number(finalAmount),
          firstName: donorDetails.firstName,
          lastName: donorDetails.lastName,
          email: donorDetails.email,
          phone: donorDetails.phone,
          last4Digits: donorDetails.cardNumber.slice(-4), // שומרים רק 4 ספרות אחרונות לבטיחות
          date: serverTimestamp(),
        };

        await addDoc(collection(db, "donations"), donationData);
        handleStepChange(4); // מעבר למסך ההצלחה וגלילה למעלה
      } catch (error) {
        console.error("Error processing donation: ", error);
        alert("אירעה שגיאה בעיבוד התרומה. אנא נסה שוב.");
      }
    };

    // פונקציה לאיפוס הטופס
    const resetForm = () => {
      handleStepChange(1); // חזרה לשלב 1 וגלילה למעלה
      setDonorDetails({firstName:'', lastName:'', email:'', phone:'', cardNumber:'', expiry:'', cvv:''});
      setSelectedAmount(null);
      setCustomAmount('');
    };
  
    const handleStepChange = (newStep) => {
      setCurrentStep(newStep);
      // חצי שנייה ואז גלילה עד לסרגל במקרה הצורך
      setTimeout(() => {
        if(formTopRef.current) {
          formTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      
      {/* כותרת ראשית */}
      <div className="text-center pt-10 pb-6">
        <h1 className="text-5xl text-black font-bold">תרמו לעמותה</h1>
        <h2 className="text-xl text-gray-600 pt-4 px-4">כל תרומה עוזרת לנו להציל עוד חיים ולספק טיפול איכותי לחיות מחמד במצוקה</h2>
      </div>

      <br></br>

      {/* נקודת עוגן לגלילה עד לסרגל השלבים*/}
      <div ref={formTopRef} className="scroll-mt-32"></div>

      {/* סרגל התקדמות */}
      { currentStep > 1 && currentStep < 4 && <ProgressBar currentStep={currentStep} />}

      {/* מתחם הטופס המשתנה */}
      <div className="max-w-6xl mx-auto px-4 pb-12" dir="rtl">

      {/* כרטיסיות מעוצבות */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <div className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-[#74bd81] mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                    </svg>
                </div>
                <span className="text-xl font-bold text-gray-800 mb-2">₪100</span>
                <p className="text-gray-400 text-sm leading-relaxed">טיפול ווטרינרי בסיסי לחיית מחמד אחת</p>
              </div>

              <div className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-[#74bd81] mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                  </svg>
                </div>
                  <span className="text-xl font-bold text-gray-800 mb-2">₪200</span>
                  <p className="text-gray-400 text-sm leading-relaxed">מזון איכותי לחודש שלם</p>
                </div>

                <div className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-[#74bd81] mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                      </svg>
                  </div>
                  <span className="text-xl font-bold text-gray-800 mb-2">₪300</span>
                  <p className="text-gray-400 text-sm leading-relaxed">הכנת מקלט זמני לחיה שחולצה</p>
                </div>

              <div className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-[#74bd81] mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-[#74bd81]">
                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-gray-800 mb-2">₪500+</span>
                <p className="text-gray-400 text-sm leading-relaxed">חילוץ ושיקום מלא של חיית מחמד</p>
              </div>
          </div>
        
        {/* =========================================
            שלב 1: בחירת סכום התרומה
            ========================================= */}
        {currentStep === 1 && (
          
          <Step1Amount 
            amounts={amounts}
            selectedAmount={selectedAmount}
            customAmount={customAmount}
            finalAmount={finalAmount}
            handleAmountClick={handleAmountClick}
            handleCustomAmountChange={handleCustomAmountChange}
            setCurrentStep={handleStepChange}
          />
        )}

        {/* =========================================
            שלב 2: פרטים אישיים
            ========================================= */}
        {currentStep === 2 && (
          <Step2Details 
            donorDetails={donorDetails}
            handleInputChange={handleInputChange}
            setCurrentStep={handleStepChange}
          />
        )}

        {/* =========================================
            שלב 3: תשלום (סימולציה)
            ========================================= */}
        {currentStep === 3 && (
          <Step3Payment 
            donorDetails={donorDetails}
            finalAmount={finalAmount}
            handleInputChange={handleInputChange}
            handleProcessDonation={handleProcessDonation}
            setCurrentStep={handleStepChange}
          />
        )}

        {/* =========================================
            שלב 4: מסך הצלחה
            ========================================= */}
        {currentStep === 4 && (
          <Step4Success 
            donorDetails={donorDetails}
            finalAmount={finalAmount}
            resetForm={resetForm}
          />
        )}

      </div>

      {/* הסבר ללמה כדאי לתרום */}
      <div className="max-w-3xl mx-auto mb-10 p-10 bg-white border border-gray-100 rounded-3xl shadow-sm text-right" dir="rtl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">למה לתרום?</h2>
        <ul className="space-y-4">
          <li className="flex items-start gap-2 text-gray-600">
            <span className="text-green-500 shrink-0 select-none">•</span>
            <p><span className="font-bold text-gray-800">טיפול וטרינרי:</span> חיות מחמד שמחולצות זקוקות לטיפול רפואי מיידי - בדיקות, חיסונים, עיקורים וטיפולים נוספים.</p>
          </li>
          <li className="flex items-start gap-2 text-gray-600">
            <span className="text-green-500 shrink-0 select-none">•</span>
            <p><span className="font-bold text-gray-800">מזון איכותי:</span> תזונה נכונה היא קריטית לבריאות החיה - ירקות טריים, מזון איכותי ותוספי מזון מתאימים.</p>
          </li>
          <li className="flex items-start gap-2 text-gray-600">
            <span className="text-green-500 shrink-0 select-none">•</span>
            <p><span className="font-bold text-gray-800">מקלט ושיקום:</span> כל חיית מחמד זקוקה למקום בטוח להשתקם בו עד שהיא מוכנה לאימוץ.</p>
          </li>
          <li className="flex items-start gap-2 text-gray-600">
            <span className="text-green-500 shrink-0 select-none">•</span>
            <p><span className="font-bold text-gray-800">חינוך והדרכה:</span> אנחנו מלמדים מאמצים כיצד לטפל בחיות מחמד בצורה נכונה ואחראית.</p>
          </li>
        </ul>
      </div>

      <Footer />
    </div>
  );
}