import { lazy, Suspense } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';

import { Spinner } from '@/Animation';
import useUser from '@/utils/hooks/useUser';

import Daily from '@/pages/Daily';
import DailyMain from '@/pages/Daily/DailyPage';
import MainPage from '@/pages/Main';
import Mypage from '@/pages/Mypage';
import RegisterPet from '@/pages/RegisterPet';
import RecommendProducts from '@/pages/Products/Recoomend';

const DailyWalk = lazy(() => import('@/pages/Daily/Walk'));
const HealthRecords = lazy(() => import('@/pages/Daily/HealthRecords'));
const MypageMain = lazy(() => import('@/pages/Mypage/Main'));
const ProfilePage = lazy(() => import('@/pages/Mypage/Profile'));
const WishPage = lazy(() => import('@/pages/Mypage/Wish'));
const PetsPage = lazy(() => import('@/pages/Mypage/pets'));
const PetInfo = lazy(() => import('@/pages/Mypage/pets/[id]'));
const PetInfoEdit = lazy(() => import('@/pages/Mypage/pets/[id]/edit'));
const ProductsPage = lazy(() => import('@/pages/Products'));
const ProductDetailPage = lazy(() => import('@/pages/Products/ProductDetail'));
const NoteAddPage = lazy(() => import('@/pages/Daily/Note/NoteWritePage'));
const NotePage = lazy(() => import('@/pages/Daily/Note/NotePage'));
const WalkHistoryPage = lazy(() => import('@/pages/Daily/Walk/WalkHistoryPage'));
const WalkHisotyDetailPage = lazy(() => import('@/pages/Daily/Walk/[id]'));
const WalkRecordPage = lazy(() => import('@/pages/Daily/Walk/WalkRecordPage'));
const HealthRecordsPage = lazy(() => import('@/pages/Daily/HealthRecords/HealthRecordsPage'));
const NotFound = lazy(() => import('@/pages/404'));

function PrivateRoute() {
  const { isLoggedIn } = useUser();

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
}

function PrivateRoutes() {
  const location = useLocation();
  return (
    <Suspense fallback={<Spinner />}>
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
            <Route path="pets/:id" element={<PetInfo />} />
            <Route path="pets/:id/edit" element={<PetInfoEdit />} />
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
    </Suspense>
  );
}
export default PrivateRoutes;
