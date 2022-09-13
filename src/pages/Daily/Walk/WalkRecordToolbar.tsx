import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useConfirm, useCounter, useToastMessage } from '@/utils/hooks';

type LocationType = {
  latitude: number;
  longitude: number;
};

const toRadian = (num: number) => {
  return (num * Math.PI) / 180;
};
const EARTH_RADIUS = 6371;

const getHaversineDistance = (from: LocationType, to: LocationType) => {
  const lat = to.latitude - from.latitude;
  const lng = to.longitude - from.longitude;
  const dLat = toRadian(lat);
  const dLng = toRadian(lng);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadian(from.latitude)) * Math.cos(toRadian(to.latitude)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = EARTH_RADIUS * c;
  return distance;
};

function useDistanceWithLocation({
  location,
  isRunning,
}: {
  location: LocationType;
  isRunning: boolean;
}) {
  const [distance, setDistance] = useState<number>(0);
  const [locationRecords, setLocationRecords] = useState<LocationType[]>([]);

  const resetDistance = () => {
    setDistance(0);
    setLocationRecords([]);
  };
  useEffect(() => {
    console.log(location.latitude, location.longitude, isRunning);
    if (!location || !isRunning) {
      console.log('!location || !isRunnign');
      return;
    }

    const lastLocation = locationRecords[locationRecords.length - 1];
    // km 단위
    if (!lastLocation) {
      console.log('not lastLocation');
      setLocationRecords((prev) => [...prev, location]);
      setDistance(0);
      return;
    }
    const hiversineDistance = getHaversineDistance(lastLocation, location);
    console.log('hiversine result', hiversineDistance);
    if (hiversineDistance >= 0.001) {
      // 3m 이상 움직였을 때 기록
      setLocationRecords((prev) => [...prev, location]);
      setDistance((prev) => Math.round((prev + hiversineDistance) * 1e2) / 1e2);
    }
  }, [location]);

  return {
    distance,
    locationRecords,
    resetDistance,
  };
}

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
  const distanceInMeter = distance * 1000;
  const isKM = distance >= 1;

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
    console.log('distance', distance, 'time', totalCount);
    reset();
    resetDistance();
    navigate(-1);
  };

  return (
    <div className="h-1/6 w-full bg-white flex items-center justify-between px-10 relative">
      <div className="flex flex-col items-center">
        <p className="text-lg font-semibold text-gray-800">
          {isKM ? `${distance.toFixed(2)}KM` : `${distanceInMeter}M`}
        </p>
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
                resetDistance();
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
