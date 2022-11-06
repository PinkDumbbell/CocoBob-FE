import { LocationType } from '@/@type/location';
import { useAppDispatch, useAppSelector } from '@/store/config';
import { getCurrentPlatform, getPlatformInfo } from '@/store/slices/platformSlice';
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
  const dispatch = useAppDispatch();
  const platform = useAppSelector(getCurrentPlatform);

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
      return false;
    }

    const permission = await window.flutter_inappwebview.callHandler('getLocationPermission');
    if (!permission) {
      return false;
    }

    return true;
  };

  const checkLocationPermission = async () => {
    if (
      !window?.flutter_inappwebview ||
      typeof window.flutter_inappwebview.callHandler !== 'function'
    ) {
      return;
    }
    const permission = await window.flutter_inappwebview.callHandler('checkLocationPermission');

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
        setLocationAvailable(false);
        return;
      }

      const permissionAllowed = await getLocationPermission();
      if (!permissionAllowed) {
        setError('위치 권한을 거부하였습니다.');
        setLocationAvailable(false);
        return;
      }
    }
    setLocationAvailable(true);
  };

  const setCurrentLocationHandler = (currentLocation: LocationType) => {
    const { latitude, longitude } = currentLocation;
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
    if (platform === null) {
      dispatch(getPlatformInfo());
    }
  }, [platform]);
  useEffect(() => {
    if (!isMapAvailable || platform === null) {
      return;
    }
    checkLocationPermission();
  }, [platform, isMapAvailable]);

  useEffect(() => {
    if (!locationAvailable || error) {
      return;
    }

    const intervalId = setInterval(getLocationPermissionHandler, 500);
    // eslint-disable-next-line consistent-return
    return () => {
      clearInterval(intervalId);
    };
  }, [locationAvailable, error]);

  useEffect(() => {
    if (!error) {
      return;
    }

    alert("'설정 > 앱 목록 > 권한'에서 위치 권한을 변경할 수 있습니다.");
  }, [error]);

  return { locationAvailable, data: location, isError: !!error, errorMessage: error };
}
