import { IGeolocationOptions, ILocation } from '@/@type/location';
import { useEffect, useRef, useState } from 'react';

const defaultPosition: ILocation = {
  latitude: 37.5036833,
  longitude: 127.0448556,
};

export default function useWatchPosition(options: IGeolocationOptions = {}) {
  const [location, setLocation] = useState<ILocation>(defaultPosition);
  const [error, setError] = useState('');
  const locationWatchId = useRef<number | null>(null);

  const handleSuccess = (position: { coords: ILocation }) => {
    const { latitude, longitude } = position.coords;

    setLocation({
      latitude,
      longitude,
    });
  };

  const handleError = (err: { message: string }) => {
    setError(err.message);
  };

  const cancelWatchLocation = () => {
    const { geolocation } = navigator;
    if (!geolocation || !locationWatchId.current) return;

    geolocation.clearWatch(locationWatchId.current);
  };

  useEffect(() => {
    const { geolocation } = navigator;
    if (!geolocation) {
      setError('Geolocation is not supported');
      return;
    }
    locationWatchId.current = geolocation.watchPosition(handleSuccess, handleError, options);
    // eslint-disable-next-line consistent-return
    return cancelWatchLocation;
  }, [options]);

  return {
    location,
    error,
  };
}
