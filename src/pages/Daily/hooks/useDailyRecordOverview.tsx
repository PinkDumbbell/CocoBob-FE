import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

import { useToastMessage } from '@/utils/hooks';
import { useGetDailyRecordOverviewQuery } from '@/store/api/dailyApi';

const useDailyRecordOverview = (currentPetId: number, currentDateString: string) => {
  const openToast = useToastMessage();
  const currentDate = new Date(currentDateString);
  const [idCount, setIdCount] = useState(0);

  const { data, isLoading, isError } = useGetDailyRecordOverviewQuery({
    date: dayjs(currentDate).format('YYYY-MM-DD'),
    petId: currentPetId,
  });

  useEffect(() => {
    setIdCount(0);
    if (!data) {
      return;
    }
    if (data.dailyId) setIdCount((prev) => prev + 1);
    if (data.mealCount) setIdCount((prev) => prev + 1);
    if (data.walkTotalDistance > 0) setIdCount((prev) => prev + 1);
  }, [data]);

  useEffect(() => {
    if (!isError) {
      return;
    }
    openToast('기록을 불러오지 못했습니다.');
  }, [isError]);

  return {
    numberOfOverviewItmes: idCount,
    recordOverview: data,
    isRecordOverviewLoading: isLoading,
    isRecordOverviewError: isError,
  };
};
export default useDailyRecordOverview;
