import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import ReportForm from './pages/ReportForm';
import Donations from './pages/Donations';
import About from './pages/About';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';
import Login from './pages/Login';

function App() {
  return (
    <Router>

      <ScrollToTop />
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/Gallery" element={<Gallery />} />
        <Route path="/ReportForm" element={<ReportForm />} />
        <Route path="/Donations" element={<Donations />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Login" element={<Login/>} />

      </Routes>
    </Router>
  );
}

export default App;