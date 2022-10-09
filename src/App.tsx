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
import { usePlatform, useVh } from '@/utils/hooks';

function App() {
  const location = useLocation();
  usePlatform();
  useVh();

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
