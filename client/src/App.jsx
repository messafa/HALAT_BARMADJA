import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/dashboard/Home';
import LoginPage from './pages/workers/LoginPage';
import CowsPage from './pages/cows/CowsPage';
import NotfoundPage from './pages/notfound/NotfoundPage';
import MilkPage from './pages/milk/MilkPage';
import BirthsPage from './pages/births/BirthsPage';
import ExamsPage from './pages/exams/ExamsPage';



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
        <Route path="/milk" element={<MilkPage />} />
        <Route path="/births" element={<BirthsPage />} />  
        <Route path="/exams" element={<ExamsPage />} />
        <Route path="*" element={<NotfoundPage />} />
      </Routes>

      {url.startsWith("login") ? null : <Footer />}
    </Router>
  );
}

export default App;