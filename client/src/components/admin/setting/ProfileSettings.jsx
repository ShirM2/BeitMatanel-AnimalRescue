import React from 'react';

const ProfileSettings = ({ profileData, handleProfileChange, saveProfile, isSaving }) => {
    return (
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-6">פרופיל אישי</h2>
            <form onSubmit={saveProfile} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">שם מלא</label>
                    <input 
                        type="text" 
                        name="fullName"
                        value={profileData.fullName}
                        onChange={handleProfileChange}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">אימייל (לקריאה בלבד)</label>
                    <input 
                        type="email" 
                        name="email"
                        value={profileData.email}
                        disabled
                        className="w-full border border-gray-200 bg-gray-50 text-gray-500 rounded-xl px-4 py-2.5 cursor-not-allowed"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">טלפון</label>
                    <input 
                        type="tel" 
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                </div>
                <button 
                    type="submit" 
                    disabled={isSaving}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl transition-colors disabled:opacity-50"
                >
                    {isSaving ? 'שומר...' : 'שמור שינויי פרופיל'}
                </button>
            </form>
        </div>
    );
};

export default ProfileSettings;