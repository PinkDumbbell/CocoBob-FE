/* eslint-disable consistent-return */
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useConfirm, useKakaoMap, usePlatform, useToastMessage } from '@/utils/hooks';

import { useEffect, useState } from 'react';
import { ILocation } from '@/@type/location';
import { CurrentPosButton, KakaoMap } from './WalkRecordMap';
import RecordToolbar from './WalkRecordToolbar';

const defaultPosition: ILocation = {
  latitude: 37.5036833,
  longitude: 127.0448556,
};

type LocationPermissionResponseType = {
  success: boolean;
  error: string;
  location?: ILocation;
};

function useLocationWithApp() {
  const platform = usePlatform();
  const openToast = useToastMessage();
  const [location, setLocation] = useState<ILocation>(defaultPosition);
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

  const setCurrentLocationHandler = (currentLocation: ILocation) => {
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
    if (!platform) return;

    if (platform !== 'android' && platform !== 'ios') {
      setError('산책하기는 애플리케이션에서만 이용가능합니다.');
      return;
    }
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

  useEffect(() => {
    if (!location) return;
    console.log(location);
  }, [location]);

  return { data: location, isError: !!error, errorMessage: error };
}

export default function WalkRecordMap() {
  const navigate = useNavigate();
  const [confirm] = useConfirm();

  const { data: location, isError } = useLocationWithApp();
  const { latitude, longitude } = location;
  const { mapRef, moveToCurrentPosition } = useKakaoMap(latitude, longitude);

  const goBackGuard = async () => {
    const goBackConfirmed = await confirm({
      title: '페이지를 나가시면 기록이 삭제됩니다.',
    });
    if (!goBackConfirmed) return;

    navigate(-1);
  };

  return (
    <Layout header title="산책하기" canGoBack onClickGoBack={goBackGuard}>
      <div className="bg-white h-full flex flex-col w-full">
        <div className="h-5/6 w-full relative">
          <CurrentPosButton moveToCurrentPosition={moveToCurrentPosition} />
          {isError && (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              GPS를 사용할 수 없습니다
            </div>
          )}
          {!isError && <KakaoMap mapRef={mapRef} latitude={latitude} longitude={longitude} />}
        </div>
        <RecordToolbar />
      </div>
    </Layout>
  );
}
