import React from 'react';

export default function Step3Payment({ donorDetails, finalAmount, handleInputChange, handleProcessDonation, setCurrentStep }) {
    return (
        <div className="max-w-3xl mx-auto p-8 bg-white border border-gray-100 rounded-3xl shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-right">פרטי תשלום בטוח</h2>
        
        <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-200 text-right">
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">מספר כרטיס אשראי</label>
                <input type="text" name="cardNumber" maxLength="16" placeholder="0000 0000 0000 0000" value={donorDetails.cardNumber} onChange={handleInputChange} className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-[#74bd81]" dir="ltr" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">תוקף (MM/YY)</label>
                    <input type="text" name="expiry" maxLength="5" placeholder="12/25" value={donorDetails.expiry} onChange={handleInputChange} className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-[#74bd81]" dir="ltr" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input type="text" name="cvv" maxLength="3" placeholder="123" value={donorDetails.cvv} onChange={handleInputChange} className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-[#74bd81]" dir="ltr" />
                </div>
            </div>
        </div>

        <div className="flex gap-4">
            <button onClick={handleProcessDonation} className="flex-1 py-4 bg-[#74bd81] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#62a46e] transition-colors">
            בצע תרומה (₪{finalAmount})
            </button>
            <button onClick={() => setCurrentStep(2)} className="py-4 px-8 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors">
            חזור
            </button>
        </div>
        </div>
    );
}