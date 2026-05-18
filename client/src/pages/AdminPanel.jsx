import React from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const AdminPanel = () => {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">ברוכים הבאים לפאנל הניהול של עמותת בית מתנאל!</h1>
            <button 
                onClick={() => signOut(auth)} 
                className="mt-4 bg-red-500 text-white p-2 rounded-xl"
            >
                התנתקות
            </button>
        </div>
    );
};

export default AdminPanel;