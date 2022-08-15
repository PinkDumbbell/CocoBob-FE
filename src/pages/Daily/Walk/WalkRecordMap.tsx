import { useRef, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Layout from '@/components/layout/Layout';
import useWatchPosition from '@/utils/hooks/useWatchPosition';
import { ReactComponent as LocationIcon } from '@/assets/icon/location_icon.svg';

const useKakaoMap = (lat: number, lng: number) => {
  const { kakao } = window;
  const mapRef = useRef(null);

  const moveToCurrentPosition = () => {
    if (!mapRef.current) return;
    const map = mapRef.current as any;
    const bounds = new kakao.maps.LatLngBounds();
    bounds.extend(new kakao.maps.LatLng(lat, lng));
    map.setBounds(bounds);
    map.setLevel(3);
  };

  return {
    mapRef,
    moveToCurrentPosition,
  };
};

const geolocationOptions = {
  enableHighAccuracy: false,
  maximumAge: 10000,
  timeout: 5000,
};
export default function WalkRecordMap() {
  const [isRecording, setIsRecording] = useState(false);
  const {
    location: { latitude, longitude },
    error,
  } = useWatchPosition(geolocationOptions);
  const { mapRef, moveToCurrentPosition } = useKakaoMap(latitude, longitude);

  const toggleRecording = () => setIsRecording((prev) => !prev);

  return (
    <Layout header title="산책하기" canGoBack>
      <div className="bg-white h-full flex flex-col w-full">
        <div className="h-5/6 w-full relative">
          <button
            type="button"
            onClick={moveToCurrentPosition}
            className="flex justify-center items-center absolute top-4 right-4 z-10 bg-white text-primary-main w-9 h-9 rounded-full border border-gray-400 shadow-md"
          >
            <LocationIcon />
          </button>
          {error && (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              GPS를 사용할 수 없습니다!
            </div>
          )}
          {!error && (
            <Map
              ref={mapRef}
              draggable
              center={{
                lat: latitude,
                lng: longitude,
              }}
              level={3}
              maxLevel={5}
              style={{ width: '100%', height: '100%' }}
            >
              <MapMarker position={{ lat: latitude, lng: longitude }}></MapMarker>
            </Map>
          )}
        </div>
        <div className="h-1/6 w-full bg-white flex items-center justify-around">
          <div className="flex flex-col items-center">
            <p className="text-lg font-semibold text-gray-800">32m</p>
            <span className="text-sm text-gray-500">거리</span>
          </div>
          <button
            type="button"
            onClick={toggleRecording}
            className="rounded-[40%] w-16 h-16 bg-primary-bright flex items-center justify-center"
          >
            <span className="text-white font-medium text-[18px]">
              {isRecording ? '정지' : '시작'}
            </span>
          </button>
          <div className="flex flex-col items-center">
            <p className="text-lg font-semibold text-gray-800">0:12</p>
            <span className="text-sm text-gray-500">시간</span>
          </div>
        </div>
      </div>
    </Layout>
  );
}
