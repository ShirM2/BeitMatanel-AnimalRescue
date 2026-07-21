import React from 'react';

const AnnouncementSettings = ({ 
    announcement, 
    handleAnnouncementChange, 
    saveAnnouncement, 
    publishAnnouncement, 
    removeAnnouncement, 
    colorOptions, 
    isSaving 
}) => {
    return (
        <div className="mt-8 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-2">הודעה ראשית למבקרים באתר</h2>
            <p className="text-gray-400 text-sm mb-6">כתיבת הודעה שתוצג בבאנר בעמוד הבית של האתר ובחירת צבע הרקע שלה.</p>
            
            <form onSubmit={saveAnnouncement} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">תוכן ההודעה</label>
                    <textarea 
                        name="text"
                        rows="3"
                        value={announcement.text}
                        onChange={handleAnnouncementChange}
                        placeholder="הקלדי כאן את ההודעה שתרצי שתוצג ללקוחות..."
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    ></textarea>
                </div>

                {/* בחירת צבע רקע לבאנר באמצעות קוביות צבע */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">צבע רקע לבאנר</label>
                    <div className="flex flex-wrap gap-3">
                        {colorOptions.map((color) => {
                            const isSelected = (announcement.bgColor || 'bg-amber-500') === color.id;
                            return (
                                <button
                                    type="button"
                                    key={color.id}
                                    onClick={() => handleAnnouncementChange({ target: { name: 'bgColor', value: color.id } })}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all font-medium text-sm ${
                                        isSelected 
                                            ? 'border-gray-900 shadow-md scale-105' 
                                            : 'border-transparent opacity-75 hover:opacity-100'
                                    }`}
                                >
                                    <span className={`w-5 h-5 rounded-lg ${color.hexClass} inline-block shadow-inner`}></span>
                                    <span className="text-gray-800">{color.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* אזור הכפתורים */}
                <div className="flex flex-wrap gap-4 pt-2">
                    <button 
                        type="submit" 
                        disabled={isSaving}
                        className="bg-gray-700 hover:bg-gray-800 text-white font-medium px-6 py-2.5 rounded-xl transition-colors disabled:opacity-55"
                    >
                        {isSaving ? 'שומר...' : 'שמור שינויים'}
                    </button>

                    <button 
                        type="button" 
                        onClick={publishAnnouncement}
                        disabled={isSaving}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-2.5 rounded-xl transition-colors disabled:opacity-50"
                    >
                        {isSaving ? 'מפרסם...' : 'פרסם הודעה באתר 🚀'}
                    </button>

                    <button 
                        type="button" 
                        onClick={removeAnnouncement}
                        disabled={isSaving}
                        className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2.5 rounded-xl transition-colors disabled:opacity-50"
                    >
                        {isSaving ? 'מעדכן...' : 'הסר באנר מהאתר ❌'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AnnouncementSettings;