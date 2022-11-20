import dayjs from 'dayjs';

import {
  useGetDailyRecordOverviewQuery,
  useGetHealthRecordQuery,
  useGetRecentBodyWeightsQuery,
} from '@/store/api/dailyApi';
import { useAppSelector } from '@/store/config';
import { getCurrentPet } from '@/store/slices/userSlice';
import { getDateString } from '@/utils/libs/date';
import { BodyWeightInfo, FeedInfo, NavigateMenu } from './DailySectionContents';

function useDailySection() {
  const petId = useAppSelector(getCurrentPet);

  const { data: recentBodyWeights } = useGetRecentBodyWeightsQuery(Number(petId), {
    skip: Number.isNaN(petId),
  });
  const { data: overview } = useGetDailyRecordOverviewQuery(
    { date: getDateString(new Date()), petId: Number(petId) },
    {
      skip: Number.isNaN(petId),
    },
  );

  const { data: healthRecord } = useGetHealthRecordQuery(Number(overview?.healthRecordId), {
    skip: !overview?.healthRecordId,
  });
  const bodyWeightKey = Object.keys(recentBodyWeights ?? {})
    .sort()
    .reverse()[0];

  const beforeDays = dayjs(new Date()).diff(dayjs(bodyWeightKey), 'day');

  return {
    beforeDays,
    recentBodyWeight: recentBodyWeights ? recentBodyWeights[bodyWeightKey] : null,
    healthRecord,
  };
}

export default function DailySection() {
  const { recentBodyWeight, beforeDays, healthRecord } = useDailySection();

  return (
    <div className="w-full overflow-hidden">
      <div className="p-4 w-full h-22 gap-4 flex flex-col">
        <BodyWeightInfo beforeDays={beforeDays} recentBodyWeight={recentBodyWeight} />
        <FeedInfo healthRecord={healthRecord} />
      </div>
      <NavigateMenu
        leftButton={{ link: '/products', label: '사료찾기' }}
        rightButton={{ link: '/daily', label: '생활기록' }}
      />
    </div>
  );
}
