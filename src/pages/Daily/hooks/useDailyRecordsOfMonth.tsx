import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import { useToastMessage } from '@/utils/hooks';
import { getDateString } from '@/utils/libs/date';
import { useGetDailyRecordIdListOfMonthQuery } from '@/store/api/dailyApi';

const useDailyRecordsOfMonth = (currentPetId: number, currentDateString: string) => {
  const openToast = useToastMessage();
  const navigate = useNavigate();

  const currentDate = new Date(currentDateString);

  const [activeStartDate, setActiveStartDate] = useState<Date>(currentDate);
  const activeStartDateString = dayjs(activeStartDate).format('YYYY-MM');

  const { data, isError, isLoading } = useGetDailyRecordIdListOfMonthQuery({
    date: activeStartDateString,
    petId: currentPetId,
    sessionId: Date.now(),
  });

  useEffect(() => {
    const _activeStartDateString = getDateString(new Date(activeStartDate));
    if (currentDateString === _activeStartDateString) {
      return;
    }
    navigate(`/daily?date=${_activeStartDateString}`, { replace: true });
  }, [activeStartDate]);

  useEffect(() => {
    if (!isError) {
      return;
    }
    openToast('기록을 불러오지 못했습니다.');
  }, [isError]);

  return {
    currentDate,
    recordIdList: data,
    isRecordIdListLoading: isLoading,
    isRecordIdListError: isError,
    setActiveStartDate,
  };
};
export default useDailyRecordsOfMonth;
