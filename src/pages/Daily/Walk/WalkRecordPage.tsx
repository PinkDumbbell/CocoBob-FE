/* global kakao */
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Layout from '@/components/layout/Layout';
import { useConfirm, useCounter, useCurrentPet, useKakaoMap, useToastMessage } from '@/utils/hooks';
import { useAppSelector } from '@/store/config';
import { getCurrentPlatform } from '@/store/slices/platformSlice';
import { useCreateWalkMutation } from '@/store/api/dailyApi';
import { getDateString, getTimeString } from '@/utils/libs/date';
import { LocationType } from '@/@type/location';
import { WalkRecordType } from '@/@type/walk';

import { CurrentPosButton, KakaoMap } from './components/WalkRecordMap';
import RecordToolbar from './components/WalkRecordToolbar';
import SaveWalkModal from './components/SaveWalkRecordModal';

import useLocationWithApp from './hooks/useLocationInApp';
import useLocationDistance from './hooks/useDistanceWithLocation';

function useWalkRecord(isMapAvailable: boolean, location: LocationType) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [confirm] = useConfirm();
  const openToast = useToastMessage();
  const { data: currentPet } = useCurrentPet();

  const dateString = searchParams.get('date');

  const [isSaveModalOn, setIsSaveModalOn] = useState(false);

  const [saveWalk, { isSuccess, isError }] = useCreateWalkMutation();
  const { status, totalCount, start, pause, reset, recordStartTime, recordEndTime } = useCounter();

  const { distance, resetDistance, locationRecords } = useLocationDistance({
    location,
    isRunning: status === 'running',
  });

  const walkSaveData: WalkRecordType = {
    distance,
    finishedAt: getTimeString(recordEndTime ?? new Date()),
    startedAt: getTimeString(recordStartTime ?? new Date()),
    totalTime: Math.ceil(totalCount / 60),
  };

  const goWalkHistoryPage = () => navigate(`/daily/walk?date=${searchParams.get('date')}`);

  const saveWalkRecord = () => {
    if (!currentPet?.id || !recordStartTime || !recordEndTime || !dateString) {
      return;
    }
    const saveParams = {
      petId: currentPet.id,
      date: dateString,
      ...walkSaveData,
    };
    saveWalk(saveParams);
  };

  const resetRecordState = async () => {
    const isConfirmed = await confirm({
      contents: <p className="py-10">기록을 지우시겠습니까?</p>,
    });
    if (!isConfirmed) return;

    reset();
    resetDistance();
  };

  const startRecord = () => {
    if (!isMapAvailable) {
      return;
    }
    if (status === 'running') {
      pause();
    } else {
      start();
    }
  };

  const openSaveModal = () => {
    setIsSaveModalOn(true);
  };
  const closeWalkModal = () => {
    setIsSaveModalOn(false);
  };

  useEffect(() => {
    if (!isSuccess) {
      return;
    }
    openToast('산책이 저장되었습니다.', 'success');
    closeWalkModal();
    goWalkHistoryPage();
  }, [isSuccess]);

  useEffect(() => {
    if (!isError) {
      return;
    }
    openToast('저장에 실패하였습니다.');
  }, [isError]);

  return {
    status,
    distance,
    totalCount,
    startRecord,
    resetRecordState,
    saveWalkRecord,
    locationRecords,
    isSaveModalOn,
    openSaveModal,
    closeWalkModal,
    walkSaveData,
  };
}
export default function WalkRecordMap() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [confirm] = useConfirm();
  const platform = useAppSelector(getCurrentPlatform);

  const isMapAvailable = platform === 'android' || platform === 'ios';
  const currentDateString = searchParams.get('date');

  const { locationAvailable, data: location, isError: locationError } = useLocationWithApp();
  const { mapRef, moveToCurrentPosition } = useKakaoMap(location.latitude, location.longitude);
  const {
    status,
    distance,
    totalCount,
    startRecord,
    resetRecordState,
    saveWalkRecord,
    locationRecords,
    isSaveModalOn,
    openSaveModal,
    closeWalkModal,
    walkSaveData,
  } = useWalkRecord(isMapAvailable, location);

  const goWalkHistoryPage = () => navigate(`/daily/walk?date=${searchParams.get('date')}`);

  const goBackGuard = async () => {
    if (!isMapAvailable) {
      goWalkHistoryPage();
      return;
    }
    const goBackConfirmed = await confirm({
      contents: <p className="py-10">페이지를 나가시면 기록이 삭제됩니다.</p>,
    });
    if (!goBackConfirmed) return;

    goWalkHistoryPage();
  };

  useEffect(() => {
    if (currentDateString) {
      return;
    }

    navigate(`/daily/walk/record?date=${getDateString(new Date())}`, { replace: true });
  }, [currentDateString]);

  useEffect(() => {
    if (!isMapAvailable || !mapRef.current || locationRecords.length === 0) {
      return;
    }

    const linePath = locationRecords.map(
      (record) => new kakao.maps.LatLng(record.latitude, record.longitude),
    );
    const polyline = new kakao.maps.Polyline({
      path: linePath,
      strokeWeight: 5,
      strokeColor: '#FFAE00',
      strokeOpacity: 0.6, // 0 ~ 1
      strokeStyle: 'solid',
    });
    polyline.setMap(mapRef.current);
  }, [isMapAvailable, locationRecords]);

  return (
    <Layout header title="산책하기" canGoBack onClickGoBack={goBackGuard}>
      <div className="bg-white h-full flex flex-col w-full">
        <div className="h-full w-full relative">
          <CurrentPosButton moveToCurrentPosition={moveToCurrentPosition} />
          {isMapAvailable && locationAvailable ? (
            <KakaoMap ref={mapRef} latitude={location.latitude} longitude={location.longitude} />
          ) : (
            <div className="bg-white w-full h-full flex flex-col items-center justify-center">
              <h4 className="text-lg ">지도를 이용할 수 없습니다</h4>
            </div>
          )}
        </div>
        {locationError && (
          <div className="z-10 fixed bottom-32 left-1/2 -translate-x-1/2 w-4/5 h-12 bg-red-500 text-white text-sm rounded flex items-center justify-center">
            위치 정보를 가져올 수 없습니다.
          </div>
        )}
        {!isMapAvailable && (
          <div className="fixed top-0 z-10 w-full max-w-[425px] mx-auto h-screen bg-[#00000030] flex flex-col items-center">
            <div className="mt-16 w-4/5 h-12 bg-red-500 text-white text-sm rounded flex items-center justify-center">
              모바일 디바이스에서 이용할 수 있습니다
            </div>
          </div>
        )}

        <RecordToolbar
          isAvailable={locationAvailable}
          distance={distance}
          onSave={openSaveModal}
          onReset={resetRecordState}
          onRecord={startRecord}
          totalCount={totalCount}
          runningStatus={status}
        />
      </div>
      {isSaveModalOn && (
        <SaveWalkModal close={closeWalkModal} save={saveWalkRecord} walkData={walkSaveData} />
      )}
    </Layout>
  );
}
