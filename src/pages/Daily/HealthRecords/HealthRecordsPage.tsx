import dayjs from 'dayjs';
import { Navigate, useNavigate } from 'react-router-dom';

import Layout from '@/components/layout/Layout';

import { Spinner } from '@/Animation';
import { useCurrentPet } from '@/utils/hooks';
import { useAppSelector } from '@/store/config';
import { getCurrentPet } from '@/store/slices/userSlice';
import {
  useGetDailyRecordOverviewQuery,
  useGetHealthRecordQuery,
  useGetRecentBodyWeightsQuery,
} from '@/store/api/dailyApi';
import { ReactComponent as PlusIcon } from '@/assets/icon/plus_icon.svg';

import BodyWeightHistory from './components/BodyWeightChart';

import { useBodyWeightModal } from './hooks/useBodyWeightModal';
import useDate from './hooks/useDate';
import useFeedModal from './hooks/useFeedModal';

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
  const { data: recentBodyWeights } = useGetRecentBodyWeightsQuery(Number(currentPetId), {
    skip: Number.isNaN(currentPetId),
  });
  const { Modal: BodyWeightModal, openModal: openBodyWeightModal } = useBodyWeightModal();
  const { Component: FeedModal, openModal: openFeedModal } = useFeedModal(currentDate);

  const goDailyPage = () => navigate(`/daily?date=${currentDate}`);

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
              <span className="text-primary">{isLoading ? <Spinner /> : currentPet?.name}</span>의
              건강 상태에요
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-lg">몸무게</h4>
            <div className="flex items-center justify-between">
              {healthRecord?.bodyWeight ? (
                <p className="font-bold">
                  <span className="text-primary text-h2">{healthRecord.bodyWeight}</span>
                  <span className="ml-1 ">kg</span>
                </p>
              ) : (
                <p className="text-md text-gray">몸무게를 기록해주세요</p>
              )}
              <button onClick={openBodyWeightModal}>
                <PlusIcon />
              </button>
            </div>
            <div className="rounded border border-primary-bright min-h-[100px] w-full flex items-center justify-center">
              {recentBodyWeights ? (
                <BodyWeightHistory data={recentBodyWeights} />
              ) : (
                <p className="text-md text-gray text-p">최근 기록이 없습니다.</p>
              )}
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-end justify-between">
              <h4 className="font-semibold text-lg">급여량</h4>
              <button type="button" onClick={openFeedModal}>
                <PlusIcon />
              </button>
            </div>
            {(!healthRecord?.meals || healthRecord.meals.length === 0) && (
              <div className="rounded border border-primary-bright p-3 min-h-[100px] flex items-center justify-center">
                <p className="text-p text-gray">오늘의 급여를 기록해보세요!</p>
              </div>
            )}
            {healthRecord?.meals &&
              healthRecord.meals.map((meal) => (
                <div
                  key={meal.mealId}
                  className="p-main rounded border border-primary-bright min-h-section flex items-center"
                >
                  <div>
                    <p>{meal.productInfo.productName}</p>
                    <p className="text-h3 text-primary">{meal.amount}g</p>
                  </div>
                </div>
              ))}
            <div className="rounded border border-primary-max p-3"></div>
          </div>
        </div>
      </Layout>
      <BodyWeightModal />
      <FeedModal />
    </>
  );
}
