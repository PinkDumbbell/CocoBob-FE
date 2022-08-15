import Layout from '@/components/layout/Layout';
import { useAppSelector } from '@/store/config';
import { getDailyDateString } from '@/store/slices/dailySlice';
import { Link } from 'react-router-dom';
import WalkRecordItem from './WalkRecordItem';

export default function WalkRecordList() {
  const currentDate = useAppSelector(getDailyDateString);

  return (
    <Layout header canGoBack title="산책기록">
      <div className="px-4 py-2 space-y-2">
        <div className="flex justify-between items-end">
          <h2>오늘의 산책</h2>
          <span>{currentDate}</span>
        </div>
        <div className="flex items-center justify-evenly gap-4">
          <button
            type="button"
            className="flex-1 p-2 bg-primary-main text-white rounded-[10px] shadow-md"
          >
            <Link to={`/daily/walk/record?date=${currentDate}`}>산책하기</Link>
          </button>
          <button type="button" className="flex-1 p-2 text-black rounded-[10px] shadow-md">
            간단기록
          </button>
        </div>
        <div>
          {Array(8)
            .fill(0)
            .map((_, idx) => (
              <WalkRecordItem key={idx} date={currentDate ? new Date(currentDate) : new Date()} />
            ))}
        </div>
      </div>
    </Layout>
  );
}
