import React from 'react';

const SocialSettings = ({ socialLinks, handleSocialChange, saveSocialLinks, isSaving }) => {
    return (
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-6">רשתות חברתיות וקישורים</h2>
            <form onSubmit={saveSocialLinks} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">קישור לעמוד פייסבוק</label>
                    <input 
                        type="url" 
                        name="facebook"
                        value={socialLinks.facebook}
                        onChange={handleSocialChange}
                        placeholder="https://facebook.com/..."
                        className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-left"
                        dir="ltr"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">קישור לעמוד אינסטגרם</label>
                    <input 
                        type="url" 
                        name="instagram"
                        value={socialLinks.instagram}
                        onChange={handleSocialChange}
                        placeholder="https://instagram.com/..."
                        className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-left"
                        dir="ltr"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">קישור לוואטסאפ (לפניות)</label>
                    <input 
                        type="url" 
                        name="whatsapp"
                        value={socialLinks.whatsapp}
                        onChange={handleSocialChange}
                        placeholder="https://wa.me/972..."
                        className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-left"
                        dir="ltr"
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={isSaving}
                    className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-2.5 rounded-xl transition-colors disabled:opacity-50 mt-4"
                >
                    {isSaving ? 'שומר...' : 'שמור קישורים'}
                </button>
            </form>
        </div>
    );
};

export default SocialSettings;