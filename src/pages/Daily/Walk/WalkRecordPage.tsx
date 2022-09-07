import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useConfirm, useKakaoMap, useWatchPosition } from '@/utils/hooks';

import { CurrentPosButton, KakaoMap } from './WalkRecordMap';
import RecordToolbar from './WalkRecordToolbar';

const geolocationOptions = {
  enableHighAccuracy: false,
  maximumAge: 10000,
  timeout: 5000,
};
export default function WalkRecordMap() {
  const navigate = useNavigate();
  const [confirm] = useConfirm();

  const {
    location: { latitude, longitude },
    error,
  } = useWatchPosition(geolocationOptions);
  const { mapRef, moveToCurrentPosition } = useKakaoMap(latitude, longitude);

  const goBackGuard = async () => {
    const goBackConfirmed = await confirm({
      title: '페이지를 나가시면 기록이 삭제됩니다.',
    });
    if (!goBackConfirmed) return;

    navigate(-1);
  };

  return (
    <Layout header title="산책하기" canGoBack onClickGoBack={goBackGuard}>
      <div className="bg-white h-full flex flex-col w-full">
        <div className="h-5/6 w-full relative">
          <CurrentPosButton moveToCurrentPosition={moveToCurrentPosition} />
          {error && (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              GPS를 사용할 수 없습니다
            </div>
          )}
          {!error && <KakaoMap mapRef={mapRef} latitude={latitude} longitude={longitude} />}
        </div>
        <RecordToolbar />
      </div>
    </Layout>
  );
}
