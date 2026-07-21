import React from 'react';

const FooterSettings = ({ footerData, handleFooterChange, saveFooterSettings, isSaving }) => {
    return (
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm lg:col-span-2">
            <h2 className="text-xl font-bold text-gray-800 mb-6">תוכן הפוטר (תחתית האתר)</h2>
            <form onSubmit={saveFooterSettings} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">טלפון מוקד חירום (לפוטר)</label>
                        <input 
                            type="text" 
                            name="phoneSupport"
                            value={footerData.phoneSupport}
                            onChange={handleFooterChange}
                            placeholder="050-0000000"
                            className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">שעות פעילות (לפוטר)</label>
                        <input 
                            type="text" 
                            name="openingHours"
                            value={footerData.openingHours}
                            onChange={handleFooterChange}
                            placeholder="ימים א׳-ה׳: 09:00 - 18:00"
                            className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        />
                    </div>
                </div>
                <button 
                    type="submit" 
                    disabled={isSaving}
                    className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-2.5 rounded-xl transition-colors disabled:opacity-50 mt-2"
                >
                    {isSaving ? 'שומר...' : 'שמור הגדרות פוטר'}
                </button>
            </form>
        </div>
    );
};

export default FooterSettings;