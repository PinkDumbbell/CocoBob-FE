import { useConfirm, useCounter, useToastMessage } from '@/utils/hooks';
import { useNavigate } from 'react-router-dom';

export default function RecordToolbar() {
  const navigate = useNavigate();
  const openToast = useToastMessage();
  const [confirm] = useConfirm();

  const { status, totalCount, start, pause, reset } = useCounter();
  const canSave = totalCount && status === 'paused';
  const seconds = totalCount % 60;
  const minutes = Math.floor(totalCount / 60);
  const hours = Math.floor(totalCount / 3600);

  const handleRecording = () => {
    if (status === 'running') pause();
    else start();
  };
  const handleSave = async () => {
    const isSaveConfirmed = await confirm({
      title: '저장 하시겠습니까?',
    });
    if (!isSaveConfirmed) return;

    openToast('산책 기록을 성공적으로 저장했습니다.', 'success');
    navigate(-1);
  };

  return (
    <div className="h-1/6 w-full bg-white flex items-center justify-between px-8 relative">
      <div className="flex flex-col items-center">
        <p className="text-lg font-semibold text-gray-800">32m</p>
        <span className="text-sm text-gray-500">거리</span>
      </div>
      <div className="flex gap-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <button
          type="button"
          onClick={handleRecording}
          className="rounded-[10px] w-16 h-16 bg-primary-bright flex items-center justify-center"
        >
          <span className="text-white font-medium text-[18px]">
            {status === 'running' ? '정지' : '시작'}
          </span>
        </button>
        {canSave ? (
          <div className="flex flex-col justify-between">
            <button
              type="button"
              onClick={handleSave}
              className="rounded-[10px] w-16 h-7 bg-gray-600 flex items-center justify-center text-white font-medium text-sm"
            >
              종료
            </button>
            <button
              type="button"
              onClick={async () => {
                const resetConfirmed = await confirm({
                  title: '기록을 지우시겠습니까?',
                });
                if (!resetConfirmed) return;
                reset();
              }}
              className="rounded-[10px] w-16 h-7 bg-gray-600 flex items-center justify-center text-white font-medium text-sm"
            >
              초기화
            </button>
          </div>
        ) : null}
      </div>
      <div className="flex flex-col items-center">
        <p className="text-lg font-semibold text-gray-800">
          {hours ? `${`0${hours}`.slice(-2)}:` : ''}
          {`0${minutes}`.slice(-2)} : {`0${seconds}`.slice(-2)}
        </p>
        <span className="text-sm text-gray-500">시간</span>
      </div>
    </div>
  );
}
