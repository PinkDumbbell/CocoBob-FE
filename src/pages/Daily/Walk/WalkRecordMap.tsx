import { MutableRefObject } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { ReactComponent as LocationIcon } from '@/assets/icon/location_icon.svg';

export function CurrentPosButton({ moveToCurrentPosition }: { moveToCurrentPosition: () => void }) {
  return (
    <button
      type="button"
      onClick={moveToCurrentPosition}
      className="flex justify-center items-center absolute top-4 right-4 z-10 bg-white text-primary-main w-9 h-9 rounded-full border border-gray-400 shadow-md"
    >
      <LocationIcon />
    </button>
  );
}

type WalkMapPropsType = {
  mapRef: MutableRefObject<null>;
  latitude: number;
  longitude: number;
  level?: number;
  maxLevel?: number;
};
export function KakaoMap({
  mapRef,
  latitude,
  longitude,
  level = 2,
  maxLevel = 5,
}: WalkMapPropsType) {
  return (
    <Map
      ref={mapRef}
      draggable
      center={{
        lat: latitude,
        lng: longitude,
      }}
      level={level}
      maxLevel={maxLevel}
      style={{ width: '100%', height: '100%' }}
    >
      <MapMarker position={{ lat: latitude, lng: longitude }}></MapMarker>
    </Map>
  );
}
