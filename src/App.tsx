import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import LoginPage from '@/pages/Login';
import PrivateRoutes from './routes/PrivateRoutes';
import PageTransition from './components/transition/PageTransition';
import NotFound from './pages/404';
import ToastMessage from './components/Toast/ToastMessage';

function App() {
  const location = useLocation();
  return (
    <PageTransition transitionKey={location.pathname}>
      <ToastMessage />
      <Routes key={location.pathname} location={location}>
        <Route element={<PrivateRoutes />} path="/*" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<NotFound />} path="/404" />
        <Route element={<Navigate to="/404" />} path="*" />
      </Routes>
    </PageTransition>
  );
}

export default App;
