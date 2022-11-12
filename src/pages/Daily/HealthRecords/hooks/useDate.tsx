import { getDateString } from '@/utils/libs/date';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function useDate() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentDate = searchParams.get('date');
  useEffect(() => {
    if (currentDate) {
      return;
    }
    navigate(`/daily/health?date=${getDateString(new Date())}`, { replace: true });
  }, [currentDate]);

  return {
    currentDate,
  };
}
