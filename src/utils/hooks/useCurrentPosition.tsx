import { IGeolocationOptions, ILocation } from '@/@type/location';
import { useState, useEffect, useCallback } from 'react';

const defaultPosition: ILocation = {
  latitude: 37.5036833,
  longitude: 127.0448556,
};

const useCurrentPosition = (options: IGeolocationOptions = {}) => {
  const [location, setLocation] = useState<ILocation>(defaultPosition);
  const [error, setError] = useState<string>();

  // Geolocation의 `getCurrentPosition` 메소드에 대한 성공 callback 핸들러
  const handleSuccess = useCallback((pos: { coords: ILocation }) => {
    const { latitude, longitude } = pos.coords;
    setLocation({
      latitude,
      longitude,
    });
  }, []);

  // getCurrentPosition 실패 callback 핸들러
  const handleError = useCallback((err: { message: string }) => {
    setError(err.message);
  }, []);

  useEffect(() => {
    const { geolocation } = navigator;
    // 사용된 브라우저에서 Geolocation이 정의되지 않은 경우 오류로 처리
    if (!geolocation) {
      setError('Geolocation is not supported.');
      return;
    }
    geolocation.getCurrentPosition(handleSuccess, handleError, options);
  }, [options]);

  return { location, error };
};

export default useCurrentPosition;
