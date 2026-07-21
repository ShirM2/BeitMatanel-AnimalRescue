import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import ProfileSettings from '../../components/admin/setting/ProfileSettings';
import SocialSettings from '../../components/admin/setting/SocialSettings';
import FooterSettings from '../../components/admin/setting/FooterSettings';
import AnnouncementSettings from '../../components/admin/setting/AnnouncementSettings';

const Settings = () => {
    // סטייט להגדרות הפרופיל האישי
    const [profileData, setProfileData] = useState({
        fullName: 'מנהל מערכת',
        email: 'admin@beitmatanel.com',
        phone: '050-1234567'
    });

    // סטייט לרשתות חברתיות וקישורים בלבד
    const [socialLinks, setSocialLinks] = useState({
        facebook: '',
        instagram: '',
        whatsapp: ''
    });

    // סטייט לנתוני הפוטר (טלפון ושעות פעילות)
    const [footerData, setFooterData] = useState({
        phoneSupport: '',
        openingHours: ''
    });

    // סטייט להודעת מערכת ללקוחות
    const [announcement, setAnnouncement] = useState({
        text: '',
        isActive: true,
        bgColor: 'bg-amber-500'
    });

    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const colorOptions = [
        { id: 'bg-amber-500', name: 'כתום חם', hexClass: 'bg-amber-500' },
        { id: 'bg-red-600', name: 'אדום חירום', hexClass: 'bg-red-600' },
        { id: 'bg-emerald-600', name: 'ירוק עמותה', hexClass: 'bg-emerald-600' },
        { id: 'bg-blue-600', name: 'כחול מידע', hexClass: 'bg-blue-600' },
        { id: 'bg-purple-600', name: 'סגול מיוחד', hexClass: 'bg-purple-600' },
    ];

    // טעינת ההגדרות מהפיירבייס בעליית העמוד
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                // שליפת הודעת מערכת
                const announceRef = doc(db, 'settings', 'site_announcement');
                const announceSnap = await getDoc(announceRef);
                if(announceSnap.exists()) {
                    setAnnouncement(announceSnap.data());
                }

                // שליפת רשתות חברתיות
                const socialRef = doc(db, 'settings', 'social_links');
                const socialSnap = await getDoc(socialRef);
                if(socialSnap.exists()) {
                    setSocialLinks(socialSnap.data());
                }

                // שליפת נתוני הפוטר
                const footerRef = doc(db, 'settings', 'footer_settings');
                const footerSnap = await getDoc(footerRef);
                if(footerSnap.exists()) {
                    setFooterData(footerSnap.data());
                }
            } catch (error) {
                console.error("Error fetching settings:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSettings();
    }, []);

    // טיפול בכל הקומפוננטות של ההגדרות

    const handleProfileChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handleSocialChange = (e) => {
        setSocialLinks({ ...socialLinks, [e.target.name]: e.target.value });
    };

    const handleFooterChange = (e) => {
        setFooterData({ ...footerData, [e.target.name]: e.target.value });
    };

    const handleAnnouncementChange = (e) => {
        setAnnouncement({ ...announcement, [e.target.name]: e.target.value });
    };
    // פונקציה לעדכון ושמירת פרטי הפרופיל
    const saveProfile = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 800));
            toast.success("פרטי הפרופיל עודכנו בהצלחה");
        } catch (error) {
            toast.error("שגיאה בעדכון הפרופיל");
        } finally {
            setIsSaving(false);
        }
    };

    // שמירת רשתות חברתיות לפיירבייס
    const saveSocialLinks = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await setDoc(doc(db, 'settings', 'social_links'), socialLinks);
            toast.success("קישורי הרשתות החברתיות עודכנו בהצלחה!");
        } catch (error) {
            console.error("Error saving social links:", error);
            toast.error("שגיאה בשמירת הקישורים");
        } finally {
            setIsSaving(false);
        }
    };

    // שמירת נתוני הפוטר לפיירבייס
    const saveFooterSettings = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await setDoc(doc(db, 'settings', 'footer_settings'), footerData);
            toast.success("הגדרות הפוטר עודכנו בהצלחה!");
        } catch (error) {
            console.error("Error saving footer settings:", error);
            toast.error("שגיאה בשמירת הגדרות הפוטר");
        } finally {
            setIsSaving(false);
        }
    };

    // עדכון ושמירת הודעת המערכת
    const saveAnnouncement = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await setDoc(doc(db, 'settings', 'site_announcement'), announcement);
            toast.success("שינויי ההודעה נשמרו בהצלחה!");
        } catch (error) {
            console.error("Error saving announcement:", error);
            toast.error("שגיאה בשמירת ההודעה");
        } finally {
            setIsSaving(false);
        }
    };
    // פרסום הודעת המערכת
    const publishAnnouncement = async () => {
        setIsSaving(true);
        try {
            const updatedAnnouncement = { ...announcement, isActive: true };
            setAnnouncement(updatedAnnouncement);
            await setDoc(doc(db, 'settings', 'site_announcement'), updatedAnnouncement);
            toast.success("ההודעה פורסמה בהצלחה באתר!");
        } catch (error) {
            console.error("Error publishing announcement:", error);
            toast.error("שגיאה בפרסום ההודעה");
        } finally {
            setIsSaving(false);
        }
    };
    // הסרת הודעת המערכת
    const removeAnnouncement = async () => {
        setIsSaving(true);
        try {
            const updatedAnnouncement = { ...announcement, isActive: false };
            setAnnouncement(updatedAnnouncement);
            await setDoc(doc(db, 'settings', 'site_announcement'), updatedAnnouncement);
            toast.success("הבאנר הוסר בהצלחה מעמוד הבית!");
        } catch (error) {
            console.error("Error removing announcement:", error);
            toast.error("שגיאה בהסרת הבאנר");
        } finally {
            setIsSaving(false);
        }
    };
    // הצגת טעינת העמוד במידה ובטעינה
    if(isLoading) {
        return <div className="text-center py-20 text-gray-400">טוען הגדרות...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-10 w-full font-sans text-right" dir="rtl">
            <div className="mb-8 border-b border-gray-100 pb-5">
                <h1 className="text-4xl font-bold text-gray-800">הגדרות מערכת</h1>
                <p className="text-gray-400 text-sm mt-2">ניהול הפרופיל האישי, רשתות חברתיות והודעות לציבור המבקרים</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* קומפוננטת פרופיל אישי */}
                <ProfileSettings 
                    profileData={profileData} 
                    handleProfileChange={handleProfileChange} 
                    saveProfile={saveProfile} 
                    isSaving={isSaving} 
                />

                {/* קומפוננטת רשתות חברתיות */}
                <SocialSettings 
                    socialLinks={socialLinks} 
                    handleSocialChange={handleSocialChange} 
                    saveSocialLinks={saveSocialLinks} 
                    isSaving= {isSaving} 
                />

                {/* קומפוננטת תוכן הפוטר */}
                <FooterSettings 
                    footerData={footerData} 
                    handleFooterChange={handleFooterChange} 
                    saveFooterSettings={saveFooterSettings} 
                    isSaving={isSaving} 
                />

            </div>

            {/* קומפוננטת ניהול הודעה ראשית למבקרים */}
            <AnnouncementSettings 
                announcement={announcement}
                handleAnnouncementChange={handleAnnouncementChange}
                saveAnnouncement={saveAnnouncement}
                publishAnnouncement={publishAnnouncement}
                removeAnnouncement={removeAnnouncement}
                colorOptions={colorOptions}
                isSaving={isSaving}
            />
        </div>
    );
};

export default Settings;