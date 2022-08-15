import { useEffect } from 'react';
import Calendar from 'react-calendar';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import Layout from '@/components/layout/Layout';
import { useAppDispatch, useAppSelector } from '@/store/config';
import { getDailyDate, getDailyDateString, setDate, setToday } from '@/store/slices/dailySlice';
import { getDateString } from '@/utils/libs/date';

import 'react-calendar/dist/Calendar.css';
import './calendar.css';

const CalendarWrapper = ({ currentDate }: { currentDate: Date }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const changeDate = (selectedDate: Date) => {
    const dateString = getDateString(selectedDate);
    dispatch(setDate({ date: dateString }));
    navigate(`/daily?date=${dateString}`);
  };
  return (
    <div>
      <div
        className={
          'overflow-hidden transition-all flex items-start justify-center rounded-[10px] w-full'
        }
      >
        <Calendar
          value={currentDate}
          defaultValue={currentDate}
          onChange={changeDate}
          formatDay={(locale, date) => dayjs(date).format('DD')}
          minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
          maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
          tileContent={({ date }) => {
            // 날짜 타일에 컨텐츠 추가하기 (html 태그)
            // 추가할 html 태그를 변수 초기화
            const html = [];
            if (dayjs(date).format('YYYY/MM/DD') <= dayjs(new Date()).format('YYYY/MM/DD')) {
              html.push(
                <div
                  key={dayjs(date).format('YYYY/MM/DD')}
                  className="z-0 opacity-50 rounded-full absolute w-10 h-10 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2  bg-primary-light"
                ></div>,
              );
            }
            // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
            return (
              <>
                <div className="h-full flex flex-col justify-around items-center">{html}</div>
              </>
            );
          }}
        />
      </div>
      <div className="mt-2 text-sm">{dayjs(currentDate).format('YYYY년 MM월 DD일')}</div>
    </div>
  );
};

export default function DailyMain() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const currentDate = useAppSelector(getDailyDate);
  const currentDateString = useAppSelector(getDailyDateString);
  const queryStringDate = searchParams.get('date');
  const menus: { title: string; path: string }[] = [
    {
      title: '산책하기',
      path: `/daily/walk?date=${currentDateString}`,
    },
    {
      title: '급여량 기록',
      path: '/daily/feeds',
    },
    {
      title: '몸무게 기록',
      path: '/daily/bodyWeight',
    },
  ];

  /**
   * url 접속 시, getDateString(currentDate) !== queryStringDate, queryStringDate로 날짜 설정
   */
  useEffect(() => {
    if (queryStringDate === 'Invalid Date') navigate('/404');
    if (!queryStringDate) {
      dispatch(setToday());
      navigate(`/daily?date=${currentDateString}`);
      return;
    }
    if (queryStringDate !== currentDateString) {
      const newDate = new Date(queryStringDate.toString());
      if (Number.isNaN(newDate.getTime())) navigate('/404');
      dispatch(setDate({ date: getDateString(newDate) }));
      navigate(`/daily?date=${getDateString(newDate)}`);
    }
  }, [queryStringDate]);

  return (
    <Layout header footer title="데일리 기록">
      <div className="py-4 bg-white">
        <div className="p-4 border-b border-b-slate-200">
          <CalendarWrapper currentDate={currentDate} />
        </div>
        <div>
          {menus.map((menu) => (
            <div key={menu.title} className="w-full py-3 px-4 border-b-slate-200 border-b">
              <Link to={menu.path} className="block">
                {menu.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
