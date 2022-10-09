import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';

import useUser from '@/utils/hooks/useUser';
import MainPage from '@/pages/Main';
import RegisterPet from '@/pages/RegisterPet';
import ProductsPage from '@/pages/Products';

import Mypage from '@/pages/Mypage';
import MypageMain from '@/pages/Mypage/Main';
import ProfilePage from '@/pages/Mypage/Profile';
import WishPage from '@/pages/Mypage/Wish';
import PetsPage from '@/pages/Mypage/pets/index';
import PetEdit from '@/pages/Mypage/pets/[id]';

import NotFound from '@/pages/404';
import ProductDetailPage from '@/pages/Products/ProductDetail';
import Daily from '@/pages/Daily';
import DailyMain from '@/pages/Daily/DailyPage';
import DailyWalk from '@/pages/Daily/Walk';
import WalkRecordPage from '@/pages/Daily/Walk/WalkRecordPage';
import RecommendProducts from '@/pages/Products/Recoomend';
import NoteAddPage from '@/pages/Daily/Note/NoteWritePage';
import NotePage from '@/pages/Daily/Note/NotePage';
import WalkHistoryPage from '@/pages/Daily/Walk/WalkHistoryPage';
import WalkHisotyDetailPage from '@/pages/Daily/Walk/[id]';
import HealthRecords from '@/pages/Daily/HealthRecords';
import HealthRecordsPage from '@/pages/Daily/HealthRecords/HealthRecordsPage';

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
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/products/recommend" element={<RecommendProducts />} />
        <Route path="/mypage" element={<Mypage />}>
          <Route index element={<MypageMain />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="wish" element={<WishPage />} />
          <Route path="pets" element={<PetsPage />} />
          <Route path="pets/:id" element={<PetEdit />} />
        </Route>
        <Route path="/daily" element={<Daily />}>
          <Route index element={<DailyMain />} />
          <Route path="walk" element={<DailyWalk />}>
            <Route index element={<WalkHistoryPage />} />
            <Route path="record" element={<WalkRecordPage />} />
            <Route path="record/:id" element={<WalkHisotyDetailPage />} />
          </Route>
          <Route path="health" element={<HealthRecords />}>
            <Route index element={<HealthRecordsPage />} />
          </Route>
          <Route path="note/:id" element={<NotePage />} />
          <Route path="note/edit" element={<NoteAddPage />} />
          <Route path="note/new" element={<NoteAddPage />} />
        </Route>
      </Route>
      <Route element={<NotFound />} path="*" />
    </Routes>
  );
}
export default PrivateRoutes;
