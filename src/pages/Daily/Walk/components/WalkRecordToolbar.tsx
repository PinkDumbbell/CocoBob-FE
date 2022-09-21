import { useCounter } from '@/utils/hooks';
import { LocationType } from '@/@type/location';
import useDistanceWithLocation from '@/pages/Daily/Walk/hooks/useDistanceWithLocation';

import RecordButtonGroup from './ToolbarRecordButtonGroup';
import DistanceText from './DistanceText';
import TimeText from './TimeText';

type RecordToolbarType = {
  location: LocationType;
  canRecord: boolean;
  onSave: () => void;
  onReset: () => Promise<boolean>;
};
export default function RecordToolbar({ location, canRecord, onSave, onReset }: RecordToolbarType) {
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
    if (!canRecord) {
      return;
    }
    if (status === 'running') {
      pause();
    } else {
      start();
    }
  };

  const handleReset = async () => {
    const isConfirmed = await onReset();
    if (!isConfirmed) {
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
          className="rounded-full w-[6rem] h-[6rem] bg-primary-dark flex items-center justify-center"
        >
          <span className="text-white font-medium text-lg">
            {status === 'running' ? '정지' : '시작'}
          </span>
        </button>
        {canSave ? <RecordButtonGroup resetRecord={handleReset} saveRecord={onSave} /> : null}
      </div>
      <div className="flex flex-col items-center">
        <TimeText hours={hours} minutes={minutes} seconds={seconds} />
      </div>
    </div>
  );
}
