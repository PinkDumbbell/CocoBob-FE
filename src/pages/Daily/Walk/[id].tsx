import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import WalkRecordDetail from './components/WalkRecordDetail';

export default function WalkHisotyDetailPage() {
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get('id') ?? 0);
  const walkRecord = {
    walkId: id,
    distance: 1.2,
    totalTime: 48,
    startedAt: '14:05',
    finishedAt: '14:53',
    calcories: 108,
  };
  return (
    <Layout header title="산책기록" canGoBack>
      <div className="flex flex-col w-full h-full max-w-[425px] py-4 space-y-4 px-4">
        <div className="w-full h-1/2 rounded-[10px] bg-slate-300"></div>
        <WalkRecordDetail walkRecord={walkRecord} />
      </div>
    </Layout>
  );
}
