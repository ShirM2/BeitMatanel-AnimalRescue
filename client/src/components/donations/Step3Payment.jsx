import React from 'react';

export default function Step3Payment({ donorDetails, finalAmount, handleInputChange, handleProcessDonation, setCurrentStep }) {

    const handleSubmit = (e) => {
        e.preventDefault();
        handleProcessDonation();
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-8 bg-white border border-gray-100 rounded-3xl shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-right">פרטי תשלום בטוח</h2>
            
            <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-200 text-right">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">מספר כרטיס אשראי</label>
                    <input type="text" name="cardNumber" required maxLength="16" pattern="[0-9]{16}" placeholder="0000 0000 0000 0000" value={donorDetails.cardNumber} onChange={handleInputChange} className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-[#74bd81]" dir="ltr" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">תוקף (MM/YY)</label>
                        <input
                            type="text"
                            name="expiry"
                            required
                            maxLength="5"
                            placeholder="MM/YY"
                            value={donorDetails.expiry}
                            onChange={(e) => {
                                let val = e.target.value.replace(/\D/g, ''); // רק ספרות
                                if (val.length > 2) {
                                    val = val.slice(0, 2) + '/' + val.slice(2, 4);
                                }
                                handleInputChange({ target: { name: 'expiry', value: val } });
                            }}
                            className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-[#74bd81]"
                            dir="ltr"
                            // שיניתי מעט את ה-pattern כדי לאפשר התאמה לכל פורמט MM/YY תקין
                            pattern="(0[1-9]|1[0-2])\/([0-9]{2})"
                            title="נא להזין בפורמט MM/YY"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                        <input type="text" name="cvv" required maxLength="3" placeholder="123" value={donorDetails.cvv} onChange={handleInputChange} className="w-full p-3 border border-gray-200 rounded-xl outline-none focus:border-[#74bd81]" dir="ltr" />
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                <button type="submit" className="flex-1 py-4 bg-[#74bd81] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#62a46e] transition-colors">
                בצע תרומה (₪{finalAmount})
                </button>
                <button type="button" onClick={() => setCurrentStep(2)} className="py-4 px-8 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors">
                חזור
                </button>
            </div>
        </form>
    );
}