import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import ReportForm from './pages/ReportForm';
import Donations from './pages/Donations';
import About from './pages/About';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';
import Login from './pages/Login';
import Admin from './pages/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>

      <ScrollToTop />
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/reportForm" element={<ReportForm />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login/>} />

        <Route 
          path="/admin" 
          element={ 
                    <ProtectedRoute>
                        <Admin />
                    </ProtectedRoute>
                  } 
        />
      </Routes>
    </Router>
  );
}

export default App;