/* eslint-disable consistent-return */
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppSelector } from '@/store/config';
import Layout from '@/components/layout/Layout';
import { useConfirm, useKakaoMap } from '@/utils/hooks';
import { getDateString } from '@/utils/libs/date';

import { CurrentPosButton, KakaoMap } from './components/WalkRecordMap';
import RecordToolbar from './components/WalkRecordToolbar';
import useLocationWithApp from './hooks/useLocationInApp';

export default function WalkRecordMap() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [confirm] = useConfirm();
  const platform = useAppSelector((state) => state.platform.currentPlatform);
  const isMapAvailable = platform === 'android' || platform === 'ios';
  const { data: location, isError: locationError } = useLocationWithApp();
  const { latitude, longitude } = location;
  const { mapRef, moveToCurrentPosition } = useKakaoMap(latitude, longitude);

  const currentDateString = searchParams.get('date');

  const goBackGuard = async () => {
    if (!isMapAvailable) {
      navigate(`/daily/walk?date=${searchParams.get('date')}`);
      return;
    }
    const goBackConfirmed = await confirm({
      title: '페이지를 나가시면 기록이 삭제됩니다.',
    });
    if (!goBackConfirmed) return;

    navigate(`/daily/walk?date=${searchParams.get('date')}`);
  };

  useEffect(() => {
    if (currentDateString) return;

    navigate(`/daily/walk/record?date=${getDateString(new Date())}`, { replace: true });
  }, [currentDateString]);

  return (
    <Layout header title="산책하기" canGoBack onClickGoBack={goBackGuard}>
      <div className="bg-white h-full flex flex-col w-full">
        <div className="h-full w-full relative">
          <CurrentPosButton moveToCurrentPosition={moveToCurrentPosition} />
          <KakaoMap mapRef={mapRef} latitude={latitude} longitude={longitude} />
        </div>
        {locationError && (
          <div className="z-10 fixed bottom-32 left-1/2 -translate-x-1/2 w-4/5 h-12 bg-red-500 text-white text-sm rounded-[10px] flex items-center justify-center">
            위치 정보를 가져올 수 없습니다.
          </div>
        )}
        {!isMapAvailable && (
          <div className="fixed top-0 z-10 w-full max-w-[425px] mx-auto h-screen bg-[#00000030] flex flex-col items-center">
            <div className="mt-16 w-4/5 h-12 bg-red-500 text-white text-sm rounded-[10px] flex items-center justify-center">
              애플리케이션을 이용해주세요.
            </div>
          </div>
        )}
        <RecordToolbar location={location} />
      </div>
    </Layout>
  );
}
