import { Routes, Route } from 'react-router-dom';

import './App.css';
import LoginPage from '@/pages/Login';
import EmailLoginPage from './pages/Login/email';
import PrivateRoutes from './routes/PrivateRoutes';

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />} path="/*" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<EmailLoginPage />} path="/login/email" />
    </Routes>
  );
}

export default App;
