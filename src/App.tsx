import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from '@/pages/Login';
import PrivateRoutes from './routes/PrivateRoutes';
import PageTransition from './components/transition/PageTransition';
import ToastMessage from './components/Toast/ToastMessage';
import ToastConfirm from './components/Toast/ToastConfirm';
import GoogleRedirectHandler from './pages/Redirect/google';
import KakaoRedirectHandler from './pages/Redirect/kakao';
import AppleRedirectHandler from './pages/Redirect/apple';

function App() {
  const location = useLocation();
  const setVh = () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
  };
  // fix mobile 100vh error
  useEffect(() => {
    window.addEventListener('resize', setVh);
    setVh();
    return () => {
      window.removeEventListener('resize', setVh);
    };
  }, []);
  return (
    <PageTransition transitionKey={location.pathname}>
      <ToastMessage />
      <ToastConfirm />
      <Routes key={location.pathname} location={location}>
        <Route element={<PrivateRoutes />} path="/*" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<GoogleRedirectHandler />} path="/auth/google/callback" />
        <Route element={<KakaoRedirectHandler />} path="/auth/kakao/callback" />
        <Route element={<AppleRedirectHandler />} path="/auth/apple/callback" />
      </Routes>
    </PageTransition>
  );
}

export default App;
