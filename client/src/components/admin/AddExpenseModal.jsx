import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import toast from 'react-hot-toast';

export default function AddExpenseModal({ isOpen, onClose, onExpenseAdded }) {
  const [newExpense, setNewExpense] = useState({ name: '', amount: '' });

  if (!isOpen) return null;

  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "expenses"), {
        name: newExpense.name,
        amount: Number(newExpense.amount),
        date: new Date()
      });
      setNewExpense({ name: '', amount: '' });
      onClose(); // סוגרים קודם את המודל
      toast.success('ההוצאה נשמרה בהצלחה!');
      if(onExpenseAdded) onExpenseAdded(); // מפעילים את רענון הנתונים בעמוד הראשי
    } catch (error) {
      console.error("שגיאה בשמירת ההוצאה:", error);
      toast.error('התרחשה שגיאה בשמירת ההוצאה');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">הוספת הוצאה חדשה</h2>
        <form onSubmit={handleAddExpense} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">תיאור ההוצאה</label>
            <input 
              type="text" 
              required 
              value={newExpense.name} 
              onChange={(e) => setNewExpense({...newExpense, name: e.target.value})} 
              className="w-full border rounded-lg p-2" 
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">סכום (₪)</label>
            <input 
              type="number" 
              required 
              value={newExpense.amount} 
              onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})} 
              className="w-full border rounded-lg p-2" 
            />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg">
              ביטול
            </button>
            <button 
              type="submit" 
              className="bg-[#76c082] text-white px-4 py-2 rounded-lg">
              שמור הוצאה
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}