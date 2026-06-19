import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { useNavigate } from 'react-router-dom';

// React-מול ה LeafLet תיקון לאייקון של הספרייה 
const DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41]
    });
    L.Marker.prototype.options.icon = DefaultIcon;

export default function Contact() {

    // קורדינציות לכתובת העמותה
    const position = [32.0733, 34.7779];

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "contactMessages"), {
                ...formData,
                createdAt: serverTimestamp()
            });

            navigate('/ThankYou', { 
                state: { 
                    title: 'ההודעה התקבלה!', 
                    message: 'תודה שיצרת איתנו קשר , הצוות שלנו יטפל בזה בהקדם.' 
                } 
            });

            setFormData({ name: '', email: '', phone: '', message: '' }); // איפוס
        } catch (error) {
            console.error("Error adding document: ", error);
            alert('אירעה שגיאה בשליחה, נסה שוב מאוחר יותר.');
        }
    };

    

  return (
    <div>
    
      <Navbar />

        <div className="bg-white min-h-screen flex flex-col" dir="rtl">
            {/* כותרת עליונה */}
            <div className="text-center pt-16 pb-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-3">צור קשר</h1>
                <p className="text-gray-500">יש לך שאלה? רוצה להתנדב? נשמח לשמוע ממך</p>
            </div>

            {/* תוכן מרכזי */}
            <div className="max-w-5xl mx-auto px-4 pb-20 w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* צד ימין - טופס ומפה */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                
                {/* טופס */}
                <div className="border border-gray-100 rounded-2xl p-8 bg-white shadow-sm">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">שלח לנו הודעה</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">שם *</label>
                            <input
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleInputChange}
                                type="text"
                                placeholder="השם שלך"
                                className="w-full bg-gray-100 p-3 rounded-lg border-none outline-none focus:ring-2 focus:ring-green-400 text-sm"
                                dir="ltr"
                                />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">אימייל *</label>
                                <input
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    type="email"
                                    placeholder="example@email.com"
                                    className="w-full bg-gray-100 p-3 rounded-lg border-none outline-none focus:ring-2 focus:ring-green-400 text-sm text-left" 
                                    dir="ltr"
                                    />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">טלפון *</label>
                                <input
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    pattern="[0-9]*"
                                    type="tel"
                                    placeholder="050-1234567"
                                    className="w-full bg-gray-100 p-3 rounded-lg border-none outline-none focus:ring-2 focus:ring-green-400 text-sm text-left" 
                                    dir="ltr" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">הודעה *</label>
                            <textarea
                                name="message"
                                required
                                value={formData.message}
                                onChange={handleInputChange}
                                placeholder="כתוב/י את הודעתך כאן..." 
                                rows="4"
                                className="w-full bg-gray-100 p-3 rounded-lg border-none outline-none focus:ring-2 focus:ring-green-400 text-sm">
                            </textarea>
                        </div>

                        <button type="submit" className="w-full bg-[#74bd81] text-white font-bold py-3 rounded-lg hover:bg-[#63a76f] transition-colors mt-2">
                            שלח הודעה
                        </button>
                    </form>
                </div>

                {/* מפה */}
                <div className="bg-[#e5e7eb] rounded-2xl h-64 flex items-center justify-center border border-gray-100 shadow-sm">
                    <MapContainer center={position} zoom={15} style={{ height: "256px", width: "100%" }} className="rounded-2xl">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={position}>
                            <Popup>בית מתנאל - כאן אנחנו נמצאים!</Popup>
                        </Marker>
                    </MapContainer>
                </div>

                </div>

                {/* צד שמאל - כרטיסיות מידע */}
                <div className="flex flex-col gap-4">
                
                {/* טלפון */}
                <div className="border border-gray-100 rounded-2xl p-6 shadow-sm bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#74bd81] mb-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.265-3.965-6.861-6.861l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                    <h3 className="font-bold text-gray-800 mb-1">טלפון</h3>
                    <p className="text-gray-600 text-sm" dir="ltr">050-123-4567</p>
                    <p className="text-gray-400 text-xs mt-1">זמינים 24/7 לחירום</p>
                </div>

                {/* אימייל */}
                <div className="border border-gray-100 rounded-2xl p-6 shadow-sm bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#74bd81] mb-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                    <h3 className="font-bold text-gray-800 mb-1">אימייל</h3>
                    <p className="text-gray-600 text-sm">info@beit-matanel.org</p>
                    <p className="text-gray-400 text-xs mt-1">מענה תוך 24-48 שעות</p>
                </div>

                {/* כתובת */}
                <div className="border border-gray-100 rounded-2xl p-6 shadow-sm bg-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#74bd81] mb-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                    <h3 className="font-bold text-gray-800 mb-1">כתובת</h3>
                    <p className="text-gray-600 text-sm">שדרות רוטשילד 1</p>
                    <p className="text-gray-600 text-sm">תל אביב-יפו, 6512101</p>
                    <p className="text-gray-400 text-xs mt-1">בתיאום מראש בלבד</p>
                </div>

                {/* רשתות חברתיות */}
                <div className="border border-gray-100 rounded-2xl p-6 shadow-sm bg-white">
                    <h3 className="font-bold text-gray-800 mb-3">עקבו אחרינו</h3>
                    <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-[#74bd81] cursor-pointer hover:bg-green-100 transition-colors">
                        {/* אייקון פייסבוק */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                        </svg>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-[#74bd81] cursor-pointer hover:bg-green-100 transition-colors">
                        {/* אייקון אינסטגרם */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                    </div>
                    </div>
                </div>

                </div>

            </div>

        </div>

        <Footer />
    
    </div>
  )
}
