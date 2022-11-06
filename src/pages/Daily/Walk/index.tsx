import { getDateString } from '@/utils/libs/date';
import { Navigate, Outlet, useSearchParams } from 'react-router-dom';

export default function Walk() {
  const [searchParams] = useSearchParams();
  const currentDate = searchParams.get('date');
  if (!currentDate) {
    searchParams.set('date', getDateString(new Date()));
  }
  const isInValidDate = currentDate && new Date(currentDate).toString() === 'Invalid Date';

  return isInValidDate ? <Navigate to="/404" /> : <Outlet />;
}
