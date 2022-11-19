import dayjs from 'dayjs';
import { Link, useNavigate } from 'react-router-dom';

import { useGetRecentBodyWeightsQuery } from '@/store/api/dailyApi';
import { useAppSelector } from '@/store/config';
import { getCurrentPet } from '@/store/slices/userSlice';
import { getDateString } from '@/utils/libs/date';

import { ReactComponent as WriteIcon } from '@/assets/icon/write_icon.svg';

function useDailySection() {
  const petId = useAppSelector(getCurrentPet);

  const { data: recentBodyWeights } = useGetRecentBodyWeightsQuery(Number(petId), {
    skip: Number.isNaN(petId),
  });
  const bodyWeightKey = Object.keys(recentBodyWeights ?? {})
    .sort()
    .reverse()[0];

  const beforeDays = dayjs(new Date()).diff(dayjs(bodyWeightKey), 'day');

  return {
    beforeDays,
    recentBodyWeight: recentBodyWeights ? recentBodyWeights[bodyWeightKey] : null,
  };
}
export default function DailySection() {
  const navigate = useNavigate();
  const { recentBodyWeight, beforeDays } = useDailySection();

  const recentBodyWeightInfo =
    beforeDays === 0 ? '오늘의 몸무게' : `측정 후 ${beforeDays}일이 지났어요`;
  return (
    <div className="w-full overflow-hidden">
      <div className="p-4 w-full h-22">
        <div className="bg-primary-max w-full p-4 rounded  flex flex-col gap-2">
          {recentBodyWeight ? (
            <>
              <div className="flex justify-between items-center">
                <p className="font-medium">최근몸무게</p>
                <Link to={`/daily/health?date=${getDateString(new Date())}`}>
                  <WriteIcon />
                </Link>
              </div>
              <div>
                <p className="text-caption">{recentBodyWeightInfo}</p>
                <p className="text-h2 text-primary-dark">{recentBodyWeight}kg</p>
              </div>
            </>
          ) : (
            <Link
              className="flex flex-col gap-1 items-center p-4"
              to={`/daily/health?date=${getDateString(new Date())}`}
            >
              <p>
                아직 <strong>몸무게 기록</strong>이 없네요!
              </p>
              <p className="text-caption">기록을 추가하시려면 눌러보세요</p>
            </Link>
          )}
        </div>
      </div>
      <div className="flex w-full items-center overflow-hidden">
        <button
          className="p-2 w-1/2 bg-primary text-white rounded-bl"
          onClick={() => navigate('/products')}
        >
          사료찾기
        </button>
        <button
          className="p-2 w-1/2 bg-primary text-white rounded-br"
          onClick={() => navigate('/daily')}
        >
          생활기록
        </button>
      </div>
    </div>
  );
}
