import { Routes, Route, useLocation } from 'react-router-dom';

import './App.css';
import MainPage from '@/pages/Main';
import LoginPage from '@/pages/Login';
import PrivateRoute from './routes/PrivateRoute';
import EmailLoginPage from './pages/Login/email';
import PageTransition from './components/transition/PageTransition';

function App() {
  const location = useLocation();
  return (
    <PageTransition transitionKey={location.key}>
      <Routes location={location}>
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
    </PageTransition>
  );
}

export default App;
