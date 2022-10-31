import { LocationType } from '@/@type/location';
import { useAppSelector } from '@/store/config';
import { useConfirm } from '@/utils/hooks';
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
  const [confirm] = useConfirm();

  const platform = useAppSelector((state) => state.platform.currentPlatform);
  const isMapAvailable = platform === 'android' || platform === 'ios';

  const [locationAvailable, setLocationAvailable] = useState(false);
  const [location, setLocation] = useState<LocationType>(defaultPosition);
  const [error, setError] = useState('');

  /**
   *
   *  위치 권한 확인 => 있다. => 그대로 위치 정보 interval
   *                => 없다. => 위치 정보 권한 확인 popup => true => 위치 정보 interval
   *                                                      => false => 사용할 수 없음.
   *
   */

  const getLocationPermission = async () => {
    if (
      !window?.flutter_inappwebview ||
      typeof window.flutter_inappwebview.callHandler !== 'function'
    ) {
      return;
    }

    const permission = await window.flutter_inappwebview.callHandler('getLocationPermission');
    if (!permission) {
      return;
    }

    setLocationAvailable(true);
  };

  const checkLocationPermission = async () => {
    if (
      !window?.flutter_inappwebview ||
      typeof window.flutter_inappwebview.callHandler !== 'function'
    ) {
      return;
    }
    const permission = await window.flutter_inappwebview.callHandler('checkLocaionPermission');

    if (!permission) {
      const agreed = await confirm({
        title: <h3>위치권한 요청</h3>,
        contents: (
          <p className="py-10 break-words">
            펫탈로그는 앱이 사용 중이 아닐때도 위치 정보를 수집하여 산책 경로 자동 기록 기능을
            제공합니다.
          </p>
        ),
      });
      if (!agreed) {
        setError('위치 권한을 거부하였습니다.');
        return;
      }

      await getLocationPermission();
    } else {
      setLocationAvailable(true);
    }
  };

  const setCurrentLocationHandler = (currentLocation: LocationType) => {
    const { latitude, longitude } = currentLocation;
    console.log(currentLocation.latitude);
    if (latitude !== location.latitude && longitude !== location.longitude) {
      setLocation({ latitude, longitude });
    }
  };

  const getLocationPermissionHandler = async () => {
    const permissionResponse: LocationPermissionResponseType =
      await window.flutter_inappwebview.callHandler('locationPermissionHandler');

    if (permissionResponse.success && permissionResponse?.location) {
      setCurrentLocationHandler(permissionResponse.location);
    } else {
      setError('위치 정보를 불러오는데에 실패하였습니다.');
    }
  };

  useEffect(() => {
    if (!isMapAvailable) {
      return;
    }
    checkLocationPermission();
  }, [isMapAvailable]);

  useEffect(() => {
    if (!locationAvailable) {
      return;
    }
    const intervalId = setInterval(getLocationPermissionHandler, 500);
    // eslint-disable-next-line consistent-return
    return () => {
      clearInterval(intervalId);
    };
  }, [locationAvailable]);

  return { locationAvailable, data: location, isError: !!error, errorMessage: error };
}
