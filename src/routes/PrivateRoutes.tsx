import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';

import useUser from '@/utils/hooks/useUser';
import MainPage from '@/pages/Main';
import RegisterPet from '@/pages/RegisterPet';

import Mypage from '@/pages/Mypage';
import MypageMain from '@/pages/Mypage/Main';
import ProfilePage from '@/pages/Mypage/Profile';
import WishPage from '@/pages/Mypage/Wish';
import PetsPage from '@/pages/Mypage/Pets';

function PrivateRoute() {
  const { isLoggedIn } = useUser();
  const location = useLocation();

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}

function PrivateRoutes() {
  const location = useLocation();
  return (
    <Routes location={location}>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<RegisterPet />} />
        <Route path="/mypage" element={<Mypage />}>
          <Route index element={<MypageMain />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="wish" element={<WishPage />} />
          <Route path="pets" element={<PetsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
export default PrivateRoutes;
