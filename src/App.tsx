import { Routes, Route } from 'react-router-dom';

import './App.css';
import MainPage from '@/pages/Main';
import LoginPage from '@/pages/Login';
import PrivateRoute from './routes/PrivateRoute';
import EmailLoginPage from './pages/Login/email';

function App() {
  return (
    <Routes>
      <Route
        element={
          <PrivateRoute>
            <MainPage />
          </PrivateRoute>
        }
        path={'/'}
      />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<EmailLoginPage />} path="/login/email" />
    </Routes>
  );
}

export default App;
