import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import ReportForm from './pages/ReportForm';
import Donations from './pages/Donations';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/Gallery" element={<Gallery />} />
        <Route path="/ReportForm" element={<ReportForm />} />
        <Route path="/Donations" element={<Donations />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        
      </Routes>
    </Router>
  );
}

export default App;