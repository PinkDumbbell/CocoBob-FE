import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import WalkRecordDetail from './components/WalkRecordDetail';

export default function WalkHisotyDetailPage() {
  const [searchParams] = useSearchParams();
  const id = Number(searchParams.get('id') ?? 0);

  return (
    <Layout header title="산책기록" canGoBack>
      <div className="flex flex-col w-full h-full max-w-[425px] py-4 space-y-4 px-4">
        <div className="w-full h-1/2 rounded-[10px] bg-slate-300"></div>
        <WalkRecordDetail
          walkRecord={{
            id,
            date: new Date(),
            calcories: 104,
            startTime: '15:48',
            endTime: '16:16',
            walkDistance: 0.63,
            walkTime: 28,
          }}
        />
      </div>
    </Layout>
  );
}
