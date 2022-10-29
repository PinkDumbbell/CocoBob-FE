/* global kakao */
import { forwardRef, Ref } from 'react';
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
  latitude: number;
  longitude: number;
  level?: number;
  maxLevel?: number;
};
const styles = { width: '100%', height: '100%' };
export const KakaoMap = forwardRef(
  (
    { latitude, longitude, level = 2, maxLevel = 5 }: WalkMapPropsType,
    mapRef: Ref<kakao.maps.Map>,
  ) => {
    const center = {
      lat: latitude,
      lng: longitude,
    };
    return (
      <Map ref={mapRef} draggable center={center} level={level} maxLevel={maxLevel} style={styles}>
        <MapMarker position={center}></MapMarker>
      </Map>
    );
  },
);
KakaoMap.displayName = 'KakaoMap';
