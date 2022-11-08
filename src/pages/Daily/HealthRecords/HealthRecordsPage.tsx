import { useEffect } from 'react';
import dayjs from 'dayjs';
import { Navigate, useNavigate } from 'react-router-dom';

import Layout from '@/components/layout/Layout';
import { useCurrentPet } from '@/utils/hooks';
import { useAppSelector } from '@/store/config';
import { getCurrentPet } from '@/store/slices/userSlice';
import { useGetDailyRecordOverviewQuery, useGetHealthRecordQuery } from '@/store/api/dailyApi';
import { ReactComponent as PlusIcon } from '@/assets/icon/plus_icon.svg';

import { useBodyWeightModal } from './hooks/useBodyWeightModal';
import useDate from './hooks/useDate';
import BodyWeightHistory from './components/BodyWeightChart';

export default function HealthRecordsPage() {
  const currentPetId = useAppSelector(getCurrentPet);
  const navigate = useNavigate();
  const { currentDate } = useDate();

  const { data: currentPet, isLoading } = useCurrentPet();
  const { data: overview } = useGetDailyRecordOverviewQuery(
    { date: String(currentDate), petId: currentPetId! },
    { skip: !currentDate || !currentPetId },
  );
  const healthRecordId = overview?.healthRecordId;

  const { data: healthRecord } = useGetHealthRecordQuery(Number(healthRecordId), {
    skip: !healthRecordId,
  });

  const { Modal: BodyWeightModal, openModal } = useBodyWeightModal();

  const goDailyPage = () => navigate(`/daily?date=${currentDate}`);

  useEffect(() => {
    if (!healthRecord) {
      return;
    }
    console.log('healthRecord', healthRecord);
  }, [healthRecord]);

  if (!currentDate || !currentPetId) {
    return <Navigate to="/404" />;
  }

  return (
    <>
      <Layout header title="건강일지" canGoBack onClickGoBack={goDailyPage}>
        <div className="w-full max-w-[425px] h-full max-auto flex flex-col p-4 space-y-4">
          <div className="flex flex-col space-y-1">
            <h3 className="font-semibold">{dayjs(currentDate).format('MM월DD일')}</h3>
            <p className="font-semibold">
              <span className="text-primary-main">{isLoading ? '로딩중' : currentPet?.name}</span>의
              건강 상태에요
            </p>
          </div>

          <div className="space-y-3 w-full">
            <h4 className="font-semibold text-lg">몸무게</h4>
            <div className="flex items-end justify-between">
              <p className="text-gray-800 text-lg align-baseline">
                {healthRecord?.bodyWeight ? (
                  <>
                    <span className="text-2xl text-primary-main">{healthRecord.bodyWeight}</span>
                    <span>kg</span>
                  </>
                ) : (
                  <span className="text-lg text-primary-main">몸무게를 기록해주세요</span>
                )}
              </p>
              <button onClick={openModal}>
                <PlusIcon />
              </button>
            </div>
            <div className="rounded-[10px] border border-primary-bright min-h-[100px] w-full flex items-center justify-center">
              {healthRecord?.bodyWeights && healthRecord.bodyWeights.length > 0 ? (
                <BodyWeightHistory data={healthRecord.bodyWeights} />
              ) : (
                <p className="text-md text-gray-400">최근 기록이 없습니다</p>
              )}
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-end justify-between">
              <h4 className="font-semibold text-lg">급여량</h4>
              <button type="button" onClick={() => {}}>
                <PlusIcon />
              </button>
            </div>
            <div className="rounded-[10px] border border-primary-bright p-3 min-h-[100px] flex items-center justify-center">
              <p className="text-md text-gray-400">오늘의 급여를 기록해보세요!</p>
            </div>
          </div>
        </div>
      </Layout>
      <BodyWeightModal />
    </>
  );
}
