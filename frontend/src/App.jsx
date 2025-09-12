import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute'; // 1. Import ProtectedRoute
import './App.css';

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      <Routes>
        {/* These routes are public */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* This is our protected route group */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardPage />} />
          {/* Add other protected routes here in the future */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;