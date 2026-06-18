import React from 'react';

export default function Step1Amount({ amounts, selectedAmount, customAmount, finalAmount, handleAmountClick, handleCustomAmountChange, setCurrentStep }) {
    return (
        <div>

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
