import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import {
    ResponsiveContainer,
    ComposedChart,
    Line,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from 'recharts'; // ספרייה של גרף

const Dashboard = () => {
    const navigate = useNavigate();
    const { handleLogout } = useOutletContext();

    // סטייט של הכרטיסיות מידע
    const [stats, setStats] = useState([
        { id: 1, title: 'תרומות החודש', value: '₪0', desc: 'סך הכל לחודש זה', color: 'text-green-600', bgIcon: 'bg-green-50' },
        { id: 2, title: 'בקשות אימוץ ממתינות', value: '0', desc: 'דורשות בדיקה', color: 'text-orange-500', bgIcon: 'bg-orange-50' },
        { id: 3, title: 'חיות מחמד במערכת', value: '0', desc: 'סך הכל חיות', color: 'text-blue-500', bgIcon: 'bg-blue-50' },
        { id: 4, title: 'קריאות חילוץ פתוחות', value: '0', desc: 'דורשות טיפול', color: 'text-red-500', bgIcon: 'bg-red-50' },
    ]);
    // סטייט של קריאות החילוץ האחרונות
    const [recentReports, setRecentReports] = useState([]);
    // סטייט של בקשות האימוץ האחרונות
    const [recentAdoptions, setRecentAdoptions] = useState([]);
    // סטייט של המידע בגרף
    const [chartData, setChartData] = useState([]);
    // סטייט עבור הטעינה של העמוד
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // שליפת קריאות חילוץ
                const reportsSnap = await getDocs(collection(db, 'reports'));
                const allReports = reportsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                const openReportsCount = allReports.filter(r => r.status === 'חדש' || r.status === 'בטיפול').length;
                
                const latestReports = allReports
                    .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
                    .slice(0, 2)
                    .map(report => ({
                        id: report.id,
                        title: report.location || 'ללא מיקום',
                        status: report.status || 'חדש',
                        statusColor: report.status === 'חדש' ? 'bg-red-50 text-red-500' : 'bg-orange-50 text-orange-500',
                        type: report.condition || report.animalType || 'אחר'
                    }));

                // שליפת בקשות אימוץ
                const adoptionsSnap = await getDocs(collection(db, 'adoption_requests'));
                const allAdoptions = adoptionsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                const pendingAdoptionsCount = allAdoptions.filter(a => a.status === 'חדש' || !a.status).length;

                const latestAdoptions = allAdoptions
                    .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0))
                    .slice(0, 2)
                    .map(adoption => ({
                        id: adoption.id,
                        name: adoption.fullName || 'ללא שם',
                        animal: adoption.animalId ? `מזהה חיה: ${adoption.animalId.slice(-4)}` : 'חיה לא ידועה',
                        status: adoption.status || 'חדש',
                        statusColor: 'bg-green-50 text-green-500'
                    }));

                // שליפת כמות חיות במערכת
                const animalsSnap = await getDocs(collection(db, 'animals'));
                const animalsCount = animalsSnap.size;

                // שליפת תרומות ועיבוד נתונים לגרף חצי שנתי
                const donationsSnap = await getDocs(collection(db, 'donations'));
                let totalDonations = 0;
                
                // אתחול מערך נתונים ל-6 החודשים האחרונים
                const monthsData = [];
                for(let i = 5; i >= 0; i--) {
                    const d = new Date();
                    d.setMonth(d.getMonth() - i);
                    monthsData.push({
                        name: d.toLocaleString('he-IL', { month: 'short' }),
                        monthNum: d.getMonth(),
                        year: d.getFullYear(),
                        'תרומות': 0,
                        'בקשות אימוץ': 0
                    });
                }

                // סיכום התרומות
                donationsSnap.forEach(doc => {
                    const data = doc.data();
                    const amount = Number(data.amount || 0);
                    totalDonations += amount;

                    if(data.date) {
                        const docDate = typeof data.date.toDate === 'function' ? data.date.toDate() : new Date(data.date);
                        const monthIndex = monthsData.findIndex(m => m.monthNum === docDate.getMonth() && m.year === docDate.getFullYear());
                        if(monthIndex !== -1) {
                            monthsData[monthIndex]['תרומות'] += amount;
                        }
                    }
                });

                // סיכום בקשות האימוץ
                allAdoptions.forEach(adoption => {
                    if(adoption.createdAt) {
                        const date = typeof adoption.createdAt.toDate === 'function' ? adoption.createdAt.toDate() : new Date(adoption.createdAt);
                        const monthIndex = monthsData.findIndex(m => m.monthNum === date.getMonth() && m.year === date.getFullYear());
                        if(monthIndex !== -1) {
                            monthsData[monthIndex]['בקשות אימוץ'] += 1;
                        }
                    }
                });

                // עיבוד סופי של הנתונים לגרף (העלמת עמודות 0)
                const fixedChartData = monthsData.map(item => ({
                    ...item,
                    'תרומות': item['תרומות'] === 0 ? null : item['תרומות']
                }));
                
                setChartData(fixedChartData);
                
                setStats([
                    { id: 1, title: 'תרומות סך הכל', value: `₪${totalDonations.toLocaleString()}`, desc: 'מכל הזמנים', color: 'text-green-600', bgIcon: 'bg-green-50' },
                    { id: 2, title: 'בקשות אימוץ ממתינות', value: pendingAdoptionsCount.toString(), desc: 'דורשות בדיקה', color: 'text-orange-500', bgIcon: 'bg-orange-50' },
                    { id: 3, title: 'חיות מחמד במערכת', value: animalsCount.toString(), desc: 'סך הכל חיות', color: 'text-blue-500', bgIcon: 'bg-blue-50' },
                    { id: 4, title: 'קריאות חילוץ פתוחות', value: openReportsCount.toString(), desc: 'פעילות/בטיפול', color: 'text-red-500', bgIcon: 'bg-red-50' },
                ]);

                setRecentReports(latestReports);
                setRecentAdoptions(latestAdoptions);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="max-w-7xl mx-auto p-10 w-full font-sans text-right" dir="rtl">
            
            {/* כותרת עליונה */}
            <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-5">
                <div>
                    <p className="text-gray-500 text-sm">שלום, מנהל/ת</p>
                    <h1 className="text-4xl font-bold text-gray-800 mt-1">דשבורד</h1>
                    <p className="text-gray-400 text-xs mt-1">סקירה כללית של פעילות העמותה</p>
                </div>
                <button onClick={handleLogout} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors text-sm font-medium">
                    <span>יציאה</span>
                    <svg className="w-5 h-5 transform rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7" />
                    </svg>
                </button>
            </div>

            {loading ? (
                <div className="text-center py-10 text-gray-400">טוען נתונים...</div>
            ) : (
                <>
                    {/* כרטיסיות מידע */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat) => (
                            <div key={stat.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between h-40">
                                <div className="flex justify-between items-start">
                                    <span className="text-gray-500 text-sm font-medium">{stat.title}</span>
                                    <div className={`w-8 h-8 rounded-full ${stat.bgIcon} flex items-center justify-center ${stat.color}`}>
                                        <span className="w-2 h-2 rounded-full bg-current"></span>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h2 className="text-3xl font-bold text-gray-800">{stat.value}</h2>
                                    <p className="text-gray-400 text-xs mt-1">{stat.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* רשימות אחרונות */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        
                        {/* קריאות חילוץ */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                            <div>
                                <h3 className="text-gray-700 font-bold mb-4 text-base">קריאות חילוץ אחרונות</h3>
                                <div className="divide-y divide-gray-100">
                                    {recentReports.length > 0 ? recentReports.map((report) => (
                                        <div key={report.id} className="py-4 flex justify-between items-center">
                                            <div>
                                                <h4 className="text-gray-800 font-medium text-sm">{report.title}</h4>
                                                <p className="text-gray-400 text-xs mt-0.5">{report.type}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${report.statusColor}`}>
                                                {report.status}
                                            </span>
                                        </div>
                                    )) : <div className="py-4 text-sm text-gray-400">אין קריאות חילוץ אחרונות</div>}
                                </div>
                            </div>
                            <button onClick={() => navigate('/admin/reports')} className="w-full text-center py-2.5 mt-4 border border-gray-100 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors">
                                צפה בכל הקריאות
                            </button>
                        </div>

                        {/* בקשות אימוץ */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                            <div>
                                <h3 className="text-gray-700 font-bold mb-4 text-base">בקשות אימוץ אחרונות</h3>
                                <div className="divide-y divide-gray-100">
                                    {recentAdoptions.length > 0 ? recentAdoptions.map((adoption) => (
                                        <div key={adoption.id} className="py-4 flex justify-between items-center">
                                            <div>
                                                <h4 className="text-gray-800 font-medium text-sm">{adoption.name}</h4>
                                                <p className="text-gray-400 text-xs mt-0.5">{adoption.animal}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${adoption.statusColor}`}>
                                                {adoption.status}
                                            </span>
                                        </div>
                                    )) : <div className="py-4 text-sm text-gray-400">אין בקשות אימוץ אחרונות</div>}
                                </div>
                            </div>
                            <button onClick={() => navigate('/admin/Adoptions')} className="w-full text-center py-2.5 mt-4 border border-gray-100 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors">
                                צפה בכל הבקשות
                            </button>
                        </div>
                    </div>

                    {/* תצוגת גרף */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-4">
                        <h3 className="text-gray-700 font-bold mb-6 text-base">בקשות אימוץ ותרומות - חצי שנה אחרונה</h3>
                        <div className="w-full h-80" dir="ltr">
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                    <CartesianGrid stroke="#f5f5f5" strokeDasharray="3 3" />
                                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                    <YAxis yAxisId="left" orientation="left" stroke="#4ade80" />
                                    <YAxis yAxisId="right" orientation="right" stroke="#f97316" />
                                    <Tooltip />
                                    <Legend />
                                    <Bar yAxisId="left" dataKey="תרומות" barSize={30} fill="#4ade80" radius={[4, 4, 0, 0]} minPointSize={5} />
                                    <Line yAxisId="right" type="monotone" dataKey="בקשות אימוץ" stroke="#f97316" strokeWidth={3} />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;