import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Contact from './pages/Contact';
import LoginPage from './pages/LoginPage';
import CowsPage from './pages/cow/CowsPage';
import NotfoundPage from './pages/NotfoundPage';
import Footer from './components/Footer';

function App() {
  const url = window.location.href.split("/")[3];
  return (
    <Router>
      {/* if url has login dont diisplay navbar */}
      {url.startsWith("login") ? null : <Navbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cows" element={<CowsPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotfoundPage />} />
      </Routes>

      {url.startsWith("login") ? null : <Footer />}
    </Router>
  );
}

export default App;