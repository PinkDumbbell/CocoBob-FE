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
import { useAppDispatch } from './store/config';
import { setPlatform } from './store/slices/platformSlice';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    flutter_inappwebview: {
      // eslint-disable-next-line no-unused-vars
      callHandler: (handlerName: string, args?: any[]) => any;
    };
  }
}

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const setVh = () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
  };

  const getPlatform = async () => {
    if (window?.flutter_inappwebview) {
      const data = await window.flutter_inappwebview.callHandler('platformHandler');
      dispatch(setPlatform(data.platform));
    }
  };
  // fix mobile 100vh error
  useEffect(() => {
    window.addEventListener('resize', setVh);
    getPlatform();
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
