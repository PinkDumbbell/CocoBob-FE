import { RootState } from '@/store/config';
import { useSelector } from 'react-redux';
import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import useLogout from '@/utils/hooks/useLogout';

export default function Main() {
  const user = useSelector((state: RootState) => state.user.user);
  const onClickLogout = useLogout();

  return (
    <Layout footer header title="메인">
      <div className="flex flex-col gap-2 p-4">
        <span>메인페이지</span>
        <span>{user?.name}</span>
        <Link to="/register">반려동물 등록</Link>
        <button type="button" className="p-2 w-3/4 bg-red-300 rounded-md" onClick={onClickLogout}>
          로그아웃
        </button>
      </div>
    </Layout>
  );
}
