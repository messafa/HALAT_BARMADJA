import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Home from "./pages/dashboard/Home";
import LoginPage from "./pages/workers/LoginPage";
import CowsPage from "./pages/cows/CowsPage";
import NotfoundPage from "./pages/notfound/NotfoundPage";
import MilkPage from "./pages/milk/MilkPage";
import BirthsPage from "./pages/births/BirthsPage";
import ExamsPage from "./pages/exams/ExamsPage";

function App() {
  const token = localStorage.getItem("token");
  return (
    <Router>
        <Routes>
          <Route path="/" element={token ? <Layout><Home /></Layout> : <LoginPage />} />
          <Route path="/cows" element={token ? <Layout><CowsPage /></Layout> : <LoginPage />} />
          <Route path="/milk" element={token ? <Layout><MilkPage /></Layout> : <LoginPage />} />
          <Route path="/births" element={token ? <Layout><BirthsPage /> </Layout>: <LoginPage />} />
          <Route path="/births/cow/:id" element={token ? <Layout><BirthsPage  /></Layout> : <LoginPage />} />
          <Route path="/exams" element={token ? <Layout><ExamsPage  /></Layout> : <LoginPage />} />
          <Route path="/exams/cow/:id" element={token ? <Layout><ExamsPage   /></Layout> : <LoginPage />} />
          <Route path="*" element={token ? <NotfoundPage /> : <LoginPage/>} />
          <Route path="/login" element={token ?  <Layout><Home /></Layout> : <LoginPage/>} />
        </Routes>
      
    </Router>
  );
}

export default App;
