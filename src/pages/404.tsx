import Layout from '@/components/layout/Layout';

import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Layout header title="Not Found">
      <div className="h-full flex flex-col justify-center items-center">
        <div className="flex flex-col gap-4 items-center">
          <h2>잘 못된 접근입니다.</h2>
          <Link to="/">돌아가기</Link>
        </div>
      </div>
    </Layout>
  );
}
