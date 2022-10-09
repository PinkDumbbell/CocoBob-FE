import { LocationType } from '@/@type/location';
import { useAppSelector } from '@/store/config';
import { useToastMessage } from '@/utils/hooks';
import { useEffect, useState } from 'react';

const defaultPosition: LocationType = {
  latitude: 37.5036833,
  longitude: 127.0448556,
};

type LocationPermissionResponseType = {
  success: boolean;
  error: string;
  location?: LocationType;
};

export default function useLocationWithApp() {
  const platform = useAppSelector((state) => state.platform.currentPlatform);
  const isMapAvailable = platform === 'android' || platform === 'ios';

  const openToast = useToastMessage();
  const [location, setLocation] = useState<LocationType>(defaultPosition);
  const [error, setError] = useState('');

  const getLocationPermissionHandler = async () => {
    const permissionResponse: LocationPermissionResponseType =
      await window.flutter_inappwebview.callHandler('locationPermissionHandler');

    if (permissionResponse.error) {
      setError(permissionResponse.error);
    }
    if (permissionResponse.success) {
      setError('');
      return permissionResponse.location;
    }
    return null;
  };

  const setCurrentLocationHandler = (currentLocation: LocationType) => {
    const { latitude, longitude } = currentLocation;
    if (latitude !== location.latitude && longitude !== location.longitude) {
      setLocation({ latitude, longitude });
    }
  };
  const getCurrentLocation = async () => {
    if (
      !window?.flutter_inappwebview ||
      typeof window.flutter_inappwebview.callHandler !== 'function'
    )
      return;

    const currentLocation = await getLocationPermissionHandler();
    if (!currentLocation) {
      setError('위치 권한을 얻는데 실패하였습니다.');
      return;
    }
    setCurrentLocationHandler(currentLocation);
  };

  useEffect(() => {
    if (!platform || !isMapAvailable) return undefined;

    const intervalId = setInterval(() => {
      getCurrentLocation();
    }, 2000);
    return () => {
      clearInterval(intervalId);
    };
  }, [platform]);

  useEffect(() => {
    if (!error) return;
    openToast(error);
  }, [error]);

  return { data: location, isError: !!error, errorMessage: error };
}
