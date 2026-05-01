import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import ReportForm from './pages/ReportForm';
import Donations from './pages/Donations';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/Gallery" element={<Gallery />} />
        <Route path="/ReportForm" element={<ReportForm />} />
        <Route path="/Donations" element={<Donations />} />
        <Route path="/About" element={<About />} />

      </Routes>
    </Router>
  );
}

export default App;