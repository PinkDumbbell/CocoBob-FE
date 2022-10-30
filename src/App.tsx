import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import PrivateRoutes from '@/routes/PrivateRoutes';
import LoginPage from '@/pages/Login';
import GoogleRedirectHandler from '@/pages/Redirect/google';
import KakaoRedirectHandler from '@/pages/Redirect/kakao';
import AppleRedirectHandler from '@/pages/Redirect/apple';

import { ConfirmModal, ConfirmPortal } from '@/components/Confirm';
import { SelectModalPortal, SelectModal } from '@/components/SelectModal';
import PageTransition from '@/components/transition/PageTransition';
import ToastMessage from '@/components/Toast/ToastMessage';
import { getPlatformInfo } from '@/store/slices/platformSlice';
import { useVh } from '@/utils/hooks';
import { useAppDispatch } from './store/config';

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
  const location = useLocation();
  const dispatch = useAppDispatch();

  useVh();

  useEffect(() => {
    const platformHandler = () => {
      dispatch(getPlatformInfo());
    };
    window.addEventListener('flutterInAppWebViewPlatformReady', platformHandler);

    return () => {
      window.removeEventListener('flutterInAppWebViewPlatformReady', platformHandler);
    };
  }, []);

  return (
    <>
      <ToastMessage />
      <ConfirmPortal>
        <ConfirmModal />
      </ConfirmPortal>
      <SelectModalPortal>
        <SelectModal />
      </SelectModalPortal>
      <PageTransition transitionKey={location.pathname}>
        <Routes key={location.pathname} location={location}>
          <Route element={<PrivateRoutes />} path="/*" />
          <Route element={<LoginPage />} path="/login" />
          <Route element={<GoogleRedirectHandler />} path="/auth/google/callback" />
          <Route element={<KakaoRedirectHandler />} path="/auth/kakao/callback" />
          <Route element={<AppleRedirectHandler />} path="/auth/apple/callback" />
        </Routes>
      </PageTransition>
    </>
  );
}

export default App;
