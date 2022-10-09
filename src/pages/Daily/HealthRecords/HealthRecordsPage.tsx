import { useEffect } from 'react';
import dayjs from 'dayjs';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Layout from '@/components/layout/Layout';
import { getDateString } from '@/utils/libs/date';
import { useCurrentPet } from '@/utils/hooks';
import { useAppSelector } from '@/store/config';
import { getCurrentPet } from '@/store/slices/userSlice';
import { DailyItemType } from '@/store/api/dailyApi';

import useBodyWeight from './hooks/useBodyWeightModal';

export default function HealthRecordsPage() {
  const currentPetId = useAppSelector(getCurrentPet);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentDate = searchParams.get('date');

  if (!currentDate || !currentPetId) {
    return null;
  }

  const healthData: DailyItemType = {
    dailyId: 1,
    data: {
      bodyWeight: 5.3,
    },
    date: currentDate,
  };
  const {
    modalOpen: bodyWeightModal,
    openModal: openBodyWeightModal,
    Modal: BodyWeightModal,
  } = useBodyWeight(currentPetId, new Date(currentDate), healthData);
  const { data: currentPet, isLoading } = useCurrentPet();

  const goDailyPage = () => navigate(`/daily?date=${searchParams.get('date')}`);

  useEffect(() => {
    if (currentDate) {
      return;
    }
    navigate(`/daily/health?date=${getDateString(new Date())}`, { replace: true });
  }, [currentDate]);

  return (
    <Layout header title="건강일지" canGoBack onClickGoBack={goDailyPage}>
      <div className="w-full max-w-[425px] h-full max-auto flex flex-col p-4 space-y-4">
        <div className="flex flex-col space-y-1">
          <h3 className="font-semibold">{dayjs(currentDate).format('MM월DD일')}</h3>
          <p className="font-semibold">
            <span className="text-primary-main">{isLoading ? '로딩중' : currentPet?.name}</span>의
            건강 상태에요
          </p>
        </div>
        <div></div>
        <div className="space-y-3">
          <h4 className="font-semibold text-lg">몸무게</h4>
          <div className="flex items-center justify-between">
            {healthData.data.bodyWeight ? (
              <p className="font-bold">
                <span className="text-primary-main text-2xl">{healthData.data.bodyWeight}</span>
                <span className="ml-1 ">kg</span>
              </p>
            ) : (
              <p>오늘 무게를 측정해주세요</p>
            )}
            <button type="button" onClick={openBodyWeightModal}>
              {healthData.data.bodyWeight ? '수정' : '추가'}
            </button>
          </div>
          <div className="rounded-[10px] border border-primary-light p-3"></div>
        </div>
        <div className="space-y-3">
          <h4 className="font-semibold text-lg">급여량</h4>
          <div className="rounded-[10px] border border-primary-light p-3"></div>
        </div>
      </div>
      {bodyWeightModal && <BodyWeightModal />}
    </Layout>
  );
}
