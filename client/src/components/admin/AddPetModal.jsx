import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const AddPetModal = ({ onClose, onAdded }) => {

    // הגדרת הבסיס לחיה החדשה
    const [formData, setFormData] = useState({
        name: '', age: '', gender: 'זכר', type: 'כלב', status: 'זמין לאימוץ', imageUrl: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // הוספת מסמך חדש לאוסף animals
            const docRef = await addDoc(collection(db, "animals"), formData);
            // נעדכן את החיה החדשה ונוסיף לה איידי חדש שקיבלנו מפייר סטור
            onAdded({ id: docRef.id, ...formData });
            onClose();
        } catch (error) {
            console.error("Error adding pet: ", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" dir="rtl">
            <div className="bg-white p-8 rounded-3xl w-full max-w-2xl shadow-2xl">
                {/* כותרת */}
                <h2 className="text-2xl font-bold mb-6 text-center">הוספת חיית מחמד חדשה</h2>

                {/* טופס מילוי הפרטים על החיה */}
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField label="שם החיה" value={formData.name} onChange={(val) => setFormData({...formData, name: val})} />
                        <InputField label="גיל" value={formData.age} onChange={(val) => setFormData({...formData, age: val})} />
                        <SelectField label="מין" value={formData.gender} onChange={(val) => setFormData({...formData, gender: val})} options={['זכר', 'נקבה']} />
                        <SelectField label="סוג" value={formData.type} onChange={(val) => setFormData({...formData, type: val})} options={['כלב', 'חתול', 'ארנב']} />
                        <SelectField label="סטטוס" value={formData.status} onChange={(val) => setFormData({...formData, status: val})} options={['זמין לאימוץ', 'בתהליך אימוץ']} />
                        <div className="md:col-span-2">
                        <InputField label="קישור לתמונה" value={formData.imageUrl} onChange={(val) => setFormData({...formData, imageUrl: val})} />
                        </div>
                    </div>
                    
                    <div className="flex gap-4 mt-8">
                        <button type="submit" className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-bold transition-all">הוסף למערכת</button>
                        <button type="button" onClick={onClose} className="flex-1 bg-gray-100 hover:bg-gray-200 py-3 rounded-xl font-bold transition-all">ביטול</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// רכיבי עזר שמטפלים בסוג תיבת השינויים
const InputField = ({ label, value, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input className="w-full p-3 border rounded-xl" value={value || ''} onChange={(e) => onChange(e.target.value)} />
  </div>
);

const SelectField = ({ label, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select className="w-full p-3 border rounded-xl bg-white" value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

export default AddPetModal;