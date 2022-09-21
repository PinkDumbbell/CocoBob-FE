import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Button from '@/components/Button';
import Layout from '@/components/layout/Layout';
import { useAppSelector } from '@/store/config';
import { getCurrentPet } from '@/store/slices/userSlice';
import DailyAddWalkModal from '../components/DailyAddWalk';
import WalkHistoryList, { WalkHistoryItemType } from './components/WalkHistoryList';

const AddWalkButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button type="button" onClick={onClick}>
      추가
    </button>
  );
};
const TodayWalkInfo = ({
  totalDistance,
  totalTime,
}: {
  totalDistance: number;
  totalTime: number;
}) => {
  return (
    <>
      <h4>오늘은 이만큼 걸었어요!</h4>
      <div className="flex space-x-5 font-semibold">
        <div className="flex  items-end">
          <span className="text-2xl">{totalDistance}</span>
          <span className="text-primary-dark">KM</span>
        </div>
        <div className="flex space-x-1">
          <div className="flex items-end">
            <span className="text-2xl">{Math.floor(totalTime / 60)}</span>
            <span className="text-primary-dark">시간</span>
          </div>
          <div className="flex items-end">
            <span className="text-2xl">{totalTime % 60}</span>
            <span className="text-primary-dark">분</span>
          </div>
        </div>
      </div>
    </>
  );
};
const mockWalkHistory: WalkHistoryItemType[] = [
  {
    id: 1,
    date: new Date(),
    walkDistance: 1.4,
    endTime: '16:54',
    startTime: '16:12',
    walkTime: 42,
  },
  {
    id: 2,
    date: new Date(),
    walkDistance: 2.8,
    endTime: '12:54',
    startTime: '14:02',
    walkTime: 52,
  },
  {
    id: 3,
    date: new Date(),
    walkDistance: 1.2,
    endTime: '13:08',
    startTime: '13:42',
    walkTime: 34,
  },
  {
    id: 4,
    date: new Date(),
    walkDistance: 1.2,
    endTime: '13:08',
    startTime: '13:42',
    walkTime: 34,
  },
];
export default function WalkHistoryPage() {
  const currentPetId = useAppSelector(getCurrentPet);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const date = searchParams.get('date');
  const [addWalkModal, setAddWalkModal] = useState(false);
  const [walkHistory, setWalkHistory] = useState(mockWalkHistory);
  const isWalkHistoryExist = walkHistory.length > 0;

  const initWalkTotalInfo = new Map<'totalTime' | 'totalDistance', number>([
    ['totalTime', 0],
    ['totalDistance', 0],
  ]);
  const walkTotalInfo = useMemo(
    () =>
      walkHistory.reduce((walkTotal, currentHistory) => {
        const newTotalTime = (walkTotal.get('totalTime') ?? 0) + currentHistory.walkTime;
        const newTotalDistance =
          (walkTotal.get('totalDistance') ?? 0) + currentHistory.walkDistance;
        walkTotal.set('totalTime', newTotalTime);
        walkTotal.set('totalDistance', newTotalDistance);
        return walkTotal;
      }, initWalkTotalInfo),
    walkHistory,
  );

  const totalDistance = walkTotalInfo.get('totalDistance') ?? 0;
  const totalTime = walkTotalInfo.get('totalTime') ?? 0;

  const goDailyPage = () => navigate(`/daily?date=${date}`);
  const goWalkRecordPage = () => navigate(`/daily/walk/record?date=${date}`);

  const addWalkRecord = (newWalkRecord: WalkHistoryItemType) => {
    setWalkHistory((prevHistory) => [newWalkRecord].concat(prevHistory));
  };

  if (!currentPetId)
    return (
      <Layout header title="산책일지" canGoBack onClickGoBack={goDailyPage}>
        <div className="p-4">반려동물 등록이 필요합니다.</div>
      </Layout>
    );
  return (
    <Layout
      header
      title="산책일지"
      canGoBack
      onClickGoBack={goDailyPage}
      customRightChild={
        <div className="flex space-x-4">
          <AddWalkButton onClick={() => setAddWalkModal(true)} />
        </div>
      }
    >
      <div className="w-full max-w-[425px] h-full max-auto flex flex-col p-4 space-y-4">
        <div className="w-full p-4 rounded-[10px] bg-gray-300 flex flex-col items-center space-y-4">
          {!isWalkHistoryExist && <h4>아직 산책기록이 없어요</h4>}
          {isWalkHistoryExist && (
            <TodayWalkInfo totalDistance={totalDistance} totalTime={totalTime} />
          )}
          <Button label="산책하기" onClick={goWalkRecordPage} />
        </div>
        <div className="w-full overflow-y-auto">
          <WalkHistoryList walkHistory={walkHistory} />
        </div>
      </div>
      {addWalkModal && (
        <DailyAddWalkModal
          closeModal={() => setAddWalkModal(false)}
          onSave={addWalkRecord}
          date={new Date(date ?? new Date())}
          petId={currentPetId}
        />
      )}
    </Layout>
  );
}
