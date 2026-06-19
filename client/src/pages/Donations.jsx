import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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

    const { hash } = useLocation();

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

    useEffect(() => {
      if (hash === '#why-donate') {
        const element = document.getElementById('why-donate');
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 300); // עיכוב קטן כדי לוודא שהדף רונדר
        }
      }
    }, [hash]);

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
      { currentStep > 1 && currentStep < 3 && <ProgressBar currentStep={currentStep} />}

      {/* מתחם הטופס המשתנה */}
      <div className="max-w-6xl mx-auto px-4 pb-12" dir="rtl">
        
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
      <div id="why-donate" className="scroll-mt-24 max-w-3xl mx-auto mb-10 p-10 bg-white border border-gray-100 rounded-3xl shadow-sm text-right" dir="rtl">
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