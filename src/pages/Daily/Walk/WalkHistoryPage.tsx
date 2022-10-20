import { useState, useMemo, useRef, useEffect } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import Button from '@/components/Button';
import Layout from '@/components/layout/Layout';
import { useAppSelector } from '@/store/config';
import { getCurrentPet } from '@/store/slices/userSlice';
import { useCreateWalkMutation, useGetWalkListQuery } from '@/store/api/dailyApi';
import { useToastMessage } from '@/utils/hooks';
import { getDateString } from '@/utils/libs/date';

import DailyAddWalkModal, { WalkRecordType } from './components/DailyAddWalk';
import WalkHistoryList from './components/WalkHistoryList';

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
          <span className="text-2xl">{totalDistance.toFixed(2)}</span>
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

const useWalkHistory = (petId: number, date: string) => {
  const timestamp = useRef(Date.now()).current;
  const { data, isError, isLoading } = useGetWalkListQuery({ date, petId, sessionId: timestamp });

  const openToast = useToastMessage();

  useEffect(() => {
    if (!isError) {
      return;
    }
    openToast('산책 기록을 불러오는데 실패하였습니다.');
  }, [isError]);

  return {
    walkHistory: data,
    isWalkHistoryLoading: isLoading,
  };
};

export default function WalkHistoryPage() {
  const navigate = useNavigate();
  const currentPetId = useAppSelector(getCurrentPet);
  const [searchParams] = useSearchParams();
  const date = searchParams.get('date');

  const goDailyPage = () => navigate(`/daily?date=${date}`);

  if (!currentPetId) {
    return (
      <Layout header title="산책일지" canGoBack onClickGoBack={goDailyPage}>
        <div className="p-4">반려동물 등록이 필요합니다.</div>
      </Layout>
    );
  }
  if (!date) {
    return <Navigate to={`daily/walk?date=${getDateString(new Date())}`} />;
  }

  const [addWalkModal, setAddWalkModal] = useState(false);
  const openToast = useToastMessage();

  const { isWalkHistoryLoading, walkHistory } = useWalkHistory(currentPetId, date);
  const isWalkHistoryExist = walkHistory && walkHistory.length > 0;

  const initWalkTotalInfo = new Map<'totalTime' | 'totalDistance', number>([
    ['totalTime', 0],
    ['totalDistance', 0],
  ]);
  const walkTotalInfo = useMemo(() => {
    if (!walkHistory) {
      return initWalkTotalInfo;
    }

    return walkHistory.reduce((walkTotal, currentHistory) => {
      const newTotalTime = (walkTotal.get('totalTime') ?? 0) + currentHistory.totalTime;
      const newTotalDistance = (walkTotal.get('totalDistance') ?? 0) + currentHistory.distance;
      walkTotal.set('totalTime', newTotalTime);
      walkTotal.set('totalDistance', Number(newTotalDistance.toFixed(2)));
      return walkTotal;
    }, initWalkTotalInfo);
  }, [walkHistory]);

  const totalDistance = walkTotalInfo.get('totalDistance') ?? 0;
  const totalTime = walkTotalInfo.get('totalTime') ?? 0;

  const goWalkRecordPage = () => navigate(`/daily/walk/record?date=${date}`);

  const [createWalkRecord, { isSuccess }] = useCreateWalkMutation();
  const addWalkRecord = (newWalk: WalkRecordType) => {
    createWalkRecord({
      ...newWalk,
      date,
      petId: currentPetId,
    });
  };

  useEffect(() => {
    if (!isSuccess) {
      return;
    }
    setAddWalkModal(false);
    openToast('산책 기록이 등록되었습니다.', 'success');
  }, [isSuccess]);

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
      <div className="w-full max-w-[425px] h-full max-auto flex flex-col p-4 space-y-2">
        <div className="w-full p-4 rounded-[10px] bg-gray-300 flex flex-col items-center justify-around space-y-4 min-h-[150px]">
          {!isWalkHistoryLoading && !isWalkHistoryExist && <h4>아직 산책기록이 없어요</h4>}
          {isWalkHistoryExist && (
            <TodayWalkInfo totalDistance={totalDistance} totalTime={totalTime} />
          )}
          <Button label="산책하기" onClick={goWalkRecordPage} />
        </div>
        <div className="w-full overflow-y-auto">
          <h3 className="pb-2">{date}</h3>
          <WalkHistoryList isLoading={isWalkHistoryLoading} walkHistory={walkHistory ?? []} />
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
