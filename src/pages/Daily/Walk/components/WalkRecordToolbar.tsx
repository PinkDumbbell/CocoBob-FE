import RecordButtonGroup from './ToolbarRecordButtonGroup';
import DistanceText from './DistanceText';
import TimeText from './TimeText';

type RecordToolbarType = {
  distance: number;
  onSave: () => void;
  onReset: () => void;
  onRecord: () => void;
  totalCount: number;
  runningStatus: 'reset' | 'running' | 'paused';
};
export default function RecordToolbar({
  distance,
  onSave,
  onReset,
  onRecord,
  totalCount,
  runningStatus,
}: RecordToolbarType) {
  const canSave = totalCount && runningStatus === 'paused';
  const seconds = totalCount % 60;
  const minutes = Math.floor(totalCount / 60);
  const hours = Math.floor(totalCount / 3600);

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
          onClick={onRecord}
          className="rounded-full w-[6rem] h-[6rem] bg-primary-dark flex items-center justify-center"
        >
          <span className="text-white font-medium text-lg">
            {runningStatus === 'running' ? '정지' : '시작'}
          </span>
        </button>
        {canSave ? <RecordButtonGroup resetRecord={onReset} saveRecord={onSave} /> : null}
      </div>
      <div className="flex flex-col items-center">
        <TimeText hours={hours} minutes={minutes} seconds={seconds} />
      </div>
    </div>
  );
}
