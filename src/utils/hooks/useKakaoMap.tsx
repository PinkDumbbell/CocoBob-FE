import { useRef } from 'react';

export default function useKakaoMap(lat: number, lng: number) {
  const { kakao } = window;
  const mapRef = useRef(null);

  const moveToCurrentPosition = () => {
    if (!mapRef.current) {
      return;
    }

    const map = mapRef.current as any;
    const bounds = new kakao.maps.LatLngBounds();
    bounds.extend(new kakao.maps.LatLng(lat, lng));
    map.setBounds(bounds);
    map.setLevel(2);
  };

  const resetPoliline = () => {
    if (!mapRef.current) {
      return;
    }

    const emptyPolyline = new kakao.maps.Polyline({
      path: [],
      strokeWeight: 5,
      strokeColor: '#FFAE00',
      strokeOpacity: 0.7, // 0 ~ 1
      strokeStyle: 'solid',
    });
    emptyPolyline.setMap(mapRef.current);
  };

  return {
    mapRef,
    moveToCurrentPosition,
    resetPoliline,
  };
}
