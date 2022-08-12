import { Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from '@/pages/Login';
import PrivateRoutes from './routes/PrivateRoutes';
import PageTransition from './components/transition/PageTransition';
import ToastMessage from './components/Toast/ToastMessage';
import ToastConfirm from './components/Toast/ToastConfirm';
import GoogleRedirectHandler from './pages/Redirect/google';
import KakaoRedirectHandler from './pages/Redirect/kakao';

function App() {
  const location = useLocation();
  return (
    <PageTransition transitionKey={location.pathname}>
      <ToastMessage />
      <ToastConfirm />
      <Routes key={location.pathname} location={location}>
        <Route element={<PrivateRoutes />} path="/*" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<GoogleRedirectHandler />} path="/auth/google/callback" />
        <Route element={<KakaoRedirectHandler />} path="/auth/kakao/callback" />
      </Routes>
    </PageTransition>
  );
}

export default App;
