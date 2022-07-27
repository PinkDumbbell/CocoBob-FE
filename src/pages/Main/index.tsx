import { RootState } from '@/store/config';
import { useSelector } from 'react-redux';
import Layout from '@/components/layout/Layout';
import useLogout from '@/utils/hooks/useLogout';

export default function Main() {
  const user = useSelector((state: RootState) => state.user.user);
  const onClickLogout = useLogout();

  return (
    <Layout footer header={false}>
      <div>
        <span>메인페이지</span>
        <span>{user?.name}</span>
        <button type="button" className="p-2 w-3/4 bg-red-300 rounded-md" onClick={onClickLogout}>
          로그아웃
        </button>
      </div>
    </Layout>
  );
}
