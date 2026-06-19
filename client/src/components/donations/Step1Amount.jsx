import React from 'react';

export default function Step1Amount({ amounts, selectedAmount, customAmount, finalAmount, handleAmountClick, handleCustomAmountChange, setCurrentStep }) {
    return (
        <div>
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

            {/* טופס בחירת הסכום */}
            <div className="max-w-3xl mx-auto p-8 bg-white border border-gray-100 rounded-3xl shadow-sm text-right">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">בחרו סכום תרומה</h2>
                
                <div className="mb-6">
                    <label className="text-sm font-bold text-gray-600 block mb-3">סכומים מוצעים</label>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                        {amounts.map((amount) => (
                        <button
                            key={amount}
                            onClick={() => handleAmountClick(amount)}
                            className={`py-3 border rounded-xl font-medium transition-all ${
                            selectedAmount === amount ? 'border-[#74bd81] bg-[#f0f9f1] text-[#74bd81]' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                            }`}
                        >
                            ₪{amount}
                        </button>
                        ))}
                    </div>
                </div>

                <div className="mb-10">
                    <label className="text-sm font-bold text-gray-600 block mb-2">או הזן סכום אחר</label>
                    <input
                        type="number" min="1" value={customAmount}
                        onChange={(e) => { if (e.target.value >= 0) handleCustomAmountChange(e); }}
                        placeholder="הכנס סכום ₪"
                        className="w-full p-3 bg-gray-50 border-none rounded-xl outline-none focus:ring-2 focus:ring-[#74bd81]"
                    />
                </div>

                {/* כפתור מעבר לשלב 2 */}
                <button 
                onClick={() => setCurrentStep(2)}
                disabled={finalAmount <= 0}
                className={`w-full py-4 text-white font-bold rounded-xl flex items-center justify-center transition-colors ${
                    finalAmount > 0 ? 'bg-[#74bd81] hover:bg-[#62a46e]' : 'bg-gray-300 cursor-not-allowed'
                }`}
                >
                המשך לשלב הבא
                </button>
            </div>
        </div>
  );
}
