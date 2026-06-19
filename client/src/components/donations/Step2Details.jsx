import React from 'react';

export default function Step2Details({ donorDetails, handleInputChange, setCurrentStep }) {

    // הפונקציה הזו תופעל רק אם כל השדות תקינים
    const handleSubmit = (e) => {
        e.preventDefault(); 
        setCurrentStep(3);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-8 bg-white border border-gray-100 rounded-3xl shadow-sm">
            <div className="max-w-3xl mx-auto p-8 bg-white border border-gray-100 rounded-3xl shadow-sm">

                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-right">פרטים אישיים</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-right">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">שם פרטי</label>
                        <input type="text" name="firstName" required value={donorDetails.firstName} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#74bd81]" />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">שם משפחה</label>
                        <input type="text" name="lastName" required value={donorDetails.lastName} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#74bd81]" />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">דואר אלקטרוני (לקבלת קבלה)</label>
                        <input type="email" name="email" required value={donorDetails.email} onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#74bd81]" dir="ltr" />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">מספר טלפון</label>
                        <input type="tel" name="phone" required value={donorDetails.phone} pattern="[0-9]*" onChange={handleInputChange} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#74bd81]" dir="ltr" />
                    </div>

                </div>

                <div className="flex gap-4">
                    <button type="submit" className="flex-1 py-4 bg-[#74bd81] text-white font-bold rounded-xl hover:bg-[#62a46e] transition-colors">
                        המשך לתשלום
                    </button>
                    <button type="button" onClick={() => setCurrentStep(1)} className="py-4 px-8 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors">
                        חזור
                    </button>
                </div>
            </div>
        </form>
    );
}
