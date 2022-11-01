import { Navigate, useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useGetWalkQuery } from '@/store/api/dailyApi';
import { useEffect } from 'react';
import { useToastMessage } from '@/utils/hooks';
import WalkRecordDetail from './components/WalkRecordDetail';

function useWalkHitoryDetail(id: number) {
  const toast = useToastMessage();
  const { data, isError } = useGetWalkQuery(id, { skip: Number.isNaN(id) });

  useEffect(() => {
    if (!isError) {
      return;
    }
    toast('기록을 불러오지 못했습니다.');
  }, [isError]);
  return {
    walkHistory: data,
  };
}
export default function WalkHisotyDetailPage() {
  const { id } = useParams();
  const walkId = Number(id);
  const { walkHistory } = useWalkHitoryDetail(walkId);

  if (Number.isNaN(walkId)) {
    return <Navigate to="/404" />;
  }
  return (
    <Layout header title="산책기록" canGoBack>
      <div className="flex flex-col w-full h-full max-w-[425px] py-4 space-y-4 px-4">
        {walkHistory && <WalkRecordDetail walkRecord={walkHistory} />}
      </div>
    </Layout>
  );
}
