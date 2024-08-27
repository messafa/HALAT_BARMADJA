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
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/cows"
          element={
            <Layout>
              <CowsPage />
            </Layout>
          }
        />
        <Route
          path="/milk"
          element={
            <Layout>
              <MilkPage />
            </Layout>
          }
        />
        <Route
          path="/births"
          element={
            <Layout>
              <BirthsPage />
            </Layout>
          }
        />
        <Route
          path="/exams"
          element={
            <Layout>
              <ExamsPage />
            </Layout>
          }
        />
        <Route path="*" element={<NotfoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
