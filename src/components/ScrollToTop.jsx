import React from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// פונקציה שמטפלת בגלילה ומחזירה אותה למעלה אחרי כל פתיחת עמוד חדש
export default function ScrollToTop() {
    //  הנוכחית URL ההוק יחזיר אובייקט עם מידע על הכתובת
    const { pathname } = useLocation();

    // הקוד יופעל ברגע שהכתובת תתחלף
    // pathname - "/about"
    useEffect(()=>{
        window.scrollTo(0,0);
    }, [pathname]);

    // כי אין לה תצוגה וויזואלית להחזיר null הקומפוננטה תמיד תחזיר
    return null;
}
