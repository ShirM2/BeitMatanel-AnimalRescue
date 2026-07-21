import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import Gallery from './pages/Gallery';
import ReportForm from './pages/ReportForm';
import PublicDonations from './pages/Donations';
import About from './pages/About';
import Contact from './pages/Contact';
import AdoptionInfo from './pages/AdoptionInfo';
import ScrollToTop from './components/ScrollToTop';
import AnimalDetails from './pages/AnimalDetails';
import AdoptionForm from './pages/AdoptionForm';
import ThankYou from './pages/ThankYou';



import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import Reports from './pages/admin/Reports';
import PetsManagement from './pages/admin/PetsManagement';
import Adoptions from './pages/admin/Adoptions';
import AdminDonations from './pages/admin/Donations';


import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';

function App() {
  return (
    <Router>

      <ScrollToTop />
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/reportForm" element={<ReportForm />} />
        <Route path="/donations" element={<PublicDonations />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/AdoptionInfo" element={<AdoptionInfo />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/AnimalDetails/:id" element={<AnimalDetails />} />
        <Route path="/AdoptionForm/:id" element={<AdoptionForm />} />
        <Route path="/ThankYou" element={<ThankYou />} />

        {/* /admin הגדרתי ראוט בסיסי למערכת הניהול  */}
        {/* הגנת אבטחה ומעטפת קבועה לכל עמודי הניהול */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* ניתוב אוטומטי מכתובת הבסיס ישירות לדשבורד */}
          <Route index element={<Navigate to="dashboard" replace />} />

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="reports" element={<Reports />} />
          <Route path="PetsManagement" element={<PetsManagement />} />
          <Route path="Adoptions" element={<Adoptions />} />
          <Route path="Donations" element={<AdminDonations />} />

        </Route>

      </Routes>

      <ToastContainer position="bottom-right" />
    </Router>
  );
}

export default App;