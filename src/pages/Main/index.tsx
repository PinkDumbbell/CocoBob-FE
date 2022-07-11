import { RootState } from '@/store/config';
import { useSelector } from 'react-redux';
import Layout from '@/components/layout/Layout';

export default function Main() {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <Layout footer header={false}>
      <div>
        <span>메인페이지</span>
        <span>{user?.name}</span>
      </div>
    </Layout>
  );
}
