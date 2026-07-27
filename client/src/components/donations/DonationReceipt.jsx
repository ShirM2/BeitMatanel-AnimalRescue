import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default function DonationReceipt({ donorDetails, finalAmount }) {
  const receiptRef = useRef(null);

  const downloadPDF = () => {
    const element = receiptRef.current;
    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('donation-receipt.pdf');
    });
  };

  return (
    <div className="flex flex-col items-center mt-6 gap-6">
      {/* אזור הקבלה - שימוש ב-style עבור הצבעים כדי ש-html2canvas יעבוד */}
      <div 
        ref={receiptRef}
        style={{ backgroundColor: '#ffffff', borderColor: '#f3f4f6', borderWidth: '1px', borderStyle: 'solid' }}
        className="p-8 rounded-2xl shadow-sm w-full max-w-sm mx-auto" 
        dir="rtl"
      >
        <div className="flex justify-center mb-6">
          <div style={{ backgroundColor: '#f3f4f6' }} className="w-16 h-16 rounded-full flex items-center justify-center">
            {/* הוספתי הזזה של 4 פיקסלים למעלה כדי למרכז את האמוג'י */}
            <span className="text-3xl" style={{ transform: 'translateY(-4px)' }}>🐾</span>
          </div>
        </div>

        <h2 style={{ color: '#1f2937' }} className="text-lg font-semibold mb-6 text-center">
          בית מתנאל - אישור תרומה
        </h2>
        
        <div style={{ color: '#374151' }} className="space-y-4 text-sm">
          <div style={{ borderBottom: '1px solid #e5e7eb' }} className="flex justify-between items-center pb-2">
            <strong>שם התורם:</strong>
            <span className="font-medium">{donorDetails.firstName ? `${donorDetails.firstName} ${donorDetails.lastName || ''}` : 'תורם אנונימי'}</span>
          </div>
          
          <div style={{ borderBottom: '1px solid #e5e7eb' }} className="flex justify-between items-center pb-2">
            <strong>תאריך:</strong>
            <span className="font-medium">{new Date().toLocaleDateString('he-IL')}</span>
          </div>

          <div style={{ borderBottom: '1px solid #e5e7eb' }} className="flex justify-between items-center pb-2">
            <strong>שעת תרומה:</strong>
            <span className="font-medium">{new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          
          <div style={{ borderBottom: '1px solid #e5e7eb' }} className="flex justify-between items-center pb-2 pt-4">
            <strong>סכום תרומה:</strong>
            <span style={{ color: '#111827' }} className="text-xl font-bold">
              {finalAmount} ₪
            </span>
          </div>
          
          <p style={{ color: '#6b7280', borderTop: '1px solid #e5e7eb' }} className="mt-8 text-center text-xs font-medium pt-5">
            תודה רבה על תרומתך! <br /> בית מתנאל - עמותה רשומה
          </p>
        </div>
      </div>

      {/* כפתור ההורדה נשאר אותו דבר */}
      <button 
        onClick={downloadPDF} 
        className="w-full max-w-xs mx-auto bg-[#76c082] hover:bg-green-600 text-white px-8 py-3 rounded-full font-bold transition-colors shadow-sm"
      >
        הורד קבלה כ-PDF
      </button>
    </div>
  );
}