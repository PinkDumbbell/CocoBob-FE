/* eslint-disable consistent-return */
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppSelector } from '@/store/config';
import Layout from '@/components/layout/Layout';
import { useConfirm, useKakaoMap, useToastMessage } from '@/utils/hooks';
import { getDateString } from '@/utils/libs/date';
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
  const platform = useAppSelector((state) => state.platform.currentPlatform);
  const isMapAvailable = platform === 'android' || platform === 'ios';

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
    if (!platform || !isMapAvailable) return;

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

export default function WalkRecordMap() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentDateString = searchParams.get('date');
  const [confirm] = useConfirm();
  const platform = useAppSelector((state) => state.platform.currentPlatform);
  const isMapAvailable = platform === 'android' || platform === 'ios';

  const { data: location, isError: locationError } = useLocationWithApp();
  const { latitude, longitude } = location;
  const { mapRef, moveToCurrentPosition } = useKakaoMap(latitude, longitude);

  const goBackGuard = async () => {
    if (!isMapAvailable) {
      navigate(`/daily?date=${searchParams.get('date')}`);
      return;
    }
    const goBackConfirmed = await confirm({
      title: '페이지를 나가시면 기록이 삭제됩니다.',
    });
    if (!goBackConfirmed) return;

    navigate(`/daily?date=${searchParams.get('date')}`);
  };

  useEffect(() => {
    if (currentDateString) return;

    navigate(`/daily/walk/record?date=${getDateString(new Date())}`, { replace: true });
  }, [currentDateString]);

  return (
    <Layout header title="산책하기" canGoBack onClickGoBack={goBackGuard}>
      <div className="bg-white h-full flex flex-col w-full">
        <div className="h-5/6 w-full relative">
          <CurrentPosButton moveToCurrentPosition={moveToCurrentPosition} />
          <KakaoMap mapRef={mapRef} latitude={latitude} longitude={longitude} />
        </div>
        {locationError && (
          <div className="z-10 fixed bottom-32 left-1/2 -translate-x-1/2 w-4/5 h-12 bg-red-500 text-white text-sm rounded-[10px] flex items-center justify-center">
            위치 정보를 가져올 수 없습니다.
          </div>
        )}
        {!isMapAvailable && (
          <div className="fixed top-0 z-10 w-full max-w-[425px] mx-auto h-screen bg-[#00000030] flex flex-col items-center">
            <div className="mt-16 w-4/5 h-12 bg-red-500 text-white text-sm rounded-[10px] flex items-center justify-center">
              애플리케이션을 이용해주세요.
            </div>
          </div>
        )}
        <RecordToolbar location={location} />
      </div>
    </Layout>
  );
}
