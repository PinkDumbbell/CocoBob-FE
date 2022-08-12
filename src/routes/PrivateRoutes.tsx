import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';

import useUser from '@/utils/hooks/useUser';
import MainPage from '@/pages/Main';
import RegisterPet from '@/pages/RegisterPet';
import ProductsPage from '@/pages/Products';
import SearchPage from '@/pages/Search';

import Mypage from '@/pages/Mypage';
import MypageMain from '@/pages/Mypage/Main';
import ProfilePage from '@/pages/Mypage/Profile';
import WishPage from '@/pages/Mypage/Wish';
import PetsPage from '@/pages/Mypage/pets/index';
import PetEdit from '@/pages/Mypage/pets/[id]';

import NotFound from '@/pages/404';
import ProductDetailPage from '@/pages/Products/ProductDetail';

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
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/mypage" element={<Mypage />}>
          <Route index element={<MypageMain />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="wish" element={<WishPage />} />
          <Route path="pets" element={<PetsPage />} />
          <Route path="pets/:id" element={<PetEdit />} />
        </Route>
      </Route>
      <Route element={<NotFound />} path="*" />
    </Routes>
  );
}
export default PrivateRoutes;
