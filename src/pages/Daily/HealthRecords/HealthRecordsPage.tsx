import { useEffect } from 'react';
import dayjs from 'dayjs';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Layout from '@/components/layout/Layout';

import { Spinner } from '@/Animation';

import { getDateString } from '@/utils/libs/date';
import { useCurrentPet } from '@/utils/hooks';
import { useAppSelector } from '@/store/config';
import { getCurrentPet } from '@/store/slices/userSlice';
import {
  useLazyGetDailyRecordOverviewQuery,
  useLazyGetHealthRecordQuery,
} from '@/store/api/dailyApi';

import useBodyWeight from './hooks/useBodyWeightModal';
import useFeedModal from './hooks/useFeecModal';

export default function HealthRecordsPage() {
  const currentPetId = useAppSelector(getCurrentPet);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentDate = searchParams.get('date');

  if (!currentDate || !currentPetId) {
    return null;
  }
  const [getDailyOverview, { data: overview }] = useLazyGetDailyRecordOverviewQuery();
  const [getHealthRecord, { data: healthRecord }] = useLazyGetHealthRecordQuery();

  const {
    modalOpen: bodyWeightModal,
    openModal: openBodyWeightModal,
    Modal: BodyWeightModal,
  } = useBodyWeight(currentPetId, new Date(currentDate), healthRecord);
  const {
    modalOpen: feedModal,
    FeedModal,
    openModal: openFeedModal,
  } = useFeedModal(currentPetId, new Date(currentDate));
  const { data: currentPet, isLoading } = useCurrentPet();

  const goDailyPage = () => navigate(`/daily?date=${searchParams.get('date')}`);

  useEffect(() => {
    if (currentDate) {
      if (new Date(currentDate).toString() === 'Invalid Date') {
        return;
      }
      getDailyOverview({ date: currentDate, petId: currentPetId, sessionId: Date.now() });
      return;
    }
    navigate(`/daily/health?date=${getDateString(new Date())}`, { replace: true });
  }, [currentDate]);

  useEffect(() => {
    if (!overview || !overview.healthRecordId) {
      return;
    }
    getHealthRecord({ healthRecordId: overview.healthRecordId, sessionId: Date.now() });
  }, [overview]);

  return (
    <Layout header title="건강일지" canGoBack onClickGoBack={goDailyPage}>
      <div className="w-full max-w-[425px] h-full max-auto flex flex-col p-4 space-y-4">
        <div className="flex flex-col space-y-1">
          <h3 className="font-semibold">{dayjs(currentDate).format('MM월DD일')}</h3>
          <p className="font-semibold">
            <span className="text-primary">{isLoading ? <Spinner /> : currentPet?.name}</span>의
            건강 상태에요
          </p>
        </div>
        <div></div>
        <div className="space-y-3">
          <h4 className="font-semibold text-lg">몸무게</h4>
          <div className="flex items-center justify-between">
            {healthRecord?.bodyWeight ? (
              <p className="font-bold">
                <span className="text-primary text-2xl">{healthRecord.bodyWeight}</span>
                <span className="ml-1 ">kg</span>
              </p>
            ) : (
              <p>오늘 무게를 측정해주세요</p>
            )}
            <button type="button" onClick={openBodyWeightModal}>
              {healthRecord?.bodyWeight ? '수정' : '추가'}
            </button>
          </div>
          <div className="rounded border border-primary-max p-3"></div>
        </div>
        <div className="space-y-3">
          <div className="flex items-end justify-between">
            <h4 className="font-semibold text-lg">급여량</h4>
            <button type="button" onClick={openFeedModal}>
              추가
            </button>
          </div>
          <div className="rounded border border-primary-max  p-3"></div>
        </div>
      </div>
      {bodyWeightModal && <BodyWeightModal />}
      {feedModal && <FeedModal />}
    </Layout>
  );
}
