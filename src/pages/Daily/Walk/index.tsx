import { useEffect } from 'react';
import { useAppDispatch } from '@/store/config';
import { setPlatform } from '@/store/slices/platformSlice';
import { getDateString } from '@/utils/libs/date';
import { Navigate, Outlet, useSearchParams } from 'react-router-dom';

export default function Walk() {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const currentDate = searchParams.get('date');
  if (!currentDate) {
    searchParams.set('date', getDateString(new Date()));
  }
  const isInValidDate = currentDate && new Date(currentDate).toString() === 'Invalid Date';

  useEffect(() => {
    dispatch(setPlatform);
  }, []);

  return isInValidDate ? <Navigate to="/404" /> : <Outlet />;
}
