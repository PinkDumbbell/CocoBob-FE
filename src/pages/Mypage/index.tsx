import Layout from '@/components/layout/Layout';
import { Outlet, useLocation } from 'react-router-dom';

const headerTitles = {
  '/mypage': '마이페이지',
  '/mypage/wish': '찜한목록',
  '/mypage/profile': '프로필 수정',
  '/mypage/pets': '우리 아이 목록',
} as { [key: string]: string };

export default function Mypage() {
  const location = useLocation();
  const isMain = location.pathname === '/mypage';

  return (
    <Layout header title={headerTitles[location.pathname]} footer={isMain} canGoBack={!isMain}>
      <Outlet />
    </Layout>
  );
}
