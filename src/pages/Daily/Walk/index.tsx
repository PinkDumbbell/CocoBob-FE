/* eslint-disable no-new */
import Layout from '@/components/layout/Layout';
// import useCurrentLocation from '@/utils/hooks/useCurrentPosition';
import useWatchPosition from '@/utils/hooks/useWatchPosition';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

export default function DailyWalk() {
  // const { location:, error } = useCurrentLocation({
  //   enableHighAccuracy: true,
  //   maximumAge: 10000,
  //   timeout: 5000,
  // });
  const { location, error } = useWatchPosition({
    enableHighAccuracy: false,
    maximumAge: 10000,
    timeout: 5000,
  });
  const { latitude, longitude } = location;

  return (
    <Layout header title="산책하기" canGoBack>
      <div className="bg-white h-full flex flex-col w-full">
        <div className="h-4/5 w-full">
          {error && (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              GPS를 사용할 수 없습니다!
            </div>
          )}
          {!error && (
            <Map
              center={{
                lat: latitude,
                lng: longitude,
              }}
              maxLevel={5}
              style={{ width: '100%', height: '100%' }}
            >
              <MapMarker position={{ lat: latitude, lng: longitude }}></MapMarker>
            </Map>
          )}
        </div>
        <div className="h-1/5 w-full bg-white flex items-center justify-around">
          <button
            type="button"
            className="rounded-full w-24 h-24 bg-primary-bright flex items-center justify-center"
          >
            <span className="text-white font-medium text-[18px]">시작</span>
          </button>
        </div>
      </div>
    </Layout>
  );
}
