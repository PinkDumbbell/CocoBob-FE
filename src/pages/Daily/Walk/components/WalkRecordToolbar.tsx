import { useNavigate } from 'react-router-dom';
import { useConfirm, useCounter, useToastMessage } from '@/utils/hooks';
import { LocationType } from '@/@type/location';
import useDistanceWithLocation from '@/pages/Daily/Walk/hooks/useDistanceWithLocation';

import RecordButtonGroup from './ToolbarRecordButtonGroup';
import DistanceText from './DistanceText';
import TimeText from './TimeText';

type RecordToolbarType = {
  location: LocationType;
};
export default function RecordToolbar({ location }: RecordToolbarType) {
  const navigate = useNavigate();
  const openToast = useToastMessage();
  const [confirm] = useConfirm();

  const { status, totalCount, start, pause, reset } = useCounter();
  const { distance, resetDistance } = useDistanceWithLocation({
    location,
    isRunning: status === 'running',
  });

  const canSave = totalCount && status === 'paused';
  const seconds = totalCount % 60;
  const minutes = Math.floor(totalCount / 60);
  const hours = Math.floor(totalCount / 3600);

  const resetRecordState = () => {
    reset();
    resetDistance();
  };
  const handleRecording = () => {
    if (status === 'running') pause();
    else start();
  };
  const saveWalkRecord = async () => {
    const isSaveConfirmed = await confirm({
      title: '저장 하시겠습니까?',
    });
    if (!isSaveConfirmed) {
      return;
    }

    openToast('산책 기록을 성공적으로 저장했습니다.', 'success');
    resetRecordState();
    navigate(-1);
  };
  const resetWalkRecord = async () => {
    const resetConfirmed = await confirm({
      title: '기록을 지우시겠습니까?',
    });
    if (!resetConfirmed) {
      return;
    }
    resetRecordState();
  };

  return (
    <div className="h-[6rem] w-full bg-[#F2F8FF] rounded-t-[10px] shadow-md -mt-1 flex items-center justify-between px-10 relative">
      <div className="flex flex-col items-center">
        <p className="text-lg font-semibold text-primary-dark">
          <DistanceText distance={distance} />
        </p>
      </div>
      <div className="z-[5] flex flex-col gap-2 absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 items-center">
        <button
          type="button"
          onClick={handleRecording}
          className="rounded-full w-[5rem] h-[5rem] bg-primary-dark flex items-center justify-center"
        >
          <span className="text-white font-medium text-md">
            {status === 'running' ? '정지' : '시작'}
          </span>
        </button>
        {canSave ? (
          <RecordButtonGroup resetRecord={resetWalkRecord} saveRecord={saveWalkRecord} />
        ) : null}
      </div>
      <div className="flex flex-col items-center">
        <TimeText hours={hours} minutes={minutes} seconds={seconds} />
      </div>
    </div>
  );
}
