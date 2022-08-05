import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';

import useUser from '@/utils/hooks/useUser';
import MainPage from '@/pages/Main';
import RegisterPet from '@/pages/RegisterPet';
import ProductsPage from '@/pages/Products';
import SearchPage from '@/pages/Search';
import NotFound from '@/pages/404';

import Mypage from '@/pages/Mypage';
import MypageMain from '@/pages/Mypage/Main';
import ProfilePage from '@/pages/Mypage/Profile';
import WishPage from '@/pages/Mypage/Wish';
import PetsPage from '@/pages/Mypage/Pets';

function PrivateRoute() {
  const { isLoggedIn } = useUser();

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}

function PrivateRoutes() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<RegisterPet />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/search" element={<SearchPage />} />
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
