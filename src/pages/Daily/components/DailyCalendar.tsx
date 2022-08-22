import dayjs from 'dayjs';
import Calendar from 'react-calendar';
import { useAppDispatch } from '@/store/config';
import { getDateString } from '@/utils/libs/date';
import { useNavigate } from 'react-router-dom';
import { setDate } from '@/store/slices/dailySlice';

import 'react-calendar/dist/Calendar.css';
import '../calendar.css';

type DailyCalendarProps = {
  currentDate: Date;
  closeCalendar: () => void;
};
export default function DailyCalendar({ currentDate, closeCalendar }: DailyCalendarProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const changeDate = (selectedDate: Date) => {
    const dateString = getDateString(selectedDate);
    dispatch(setDate({ date: dateString }));
    navigate(`/daily?date=${dateString}`, { replace: true });
    closeCalendar();
  };

  return (
    <div className="z-10 bg-white absolute top-0 w-full left-0 bottom-0">
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
            return <div className="h-full flex flex-col justify-around items-center">{html}</div>;
          }}
        />
      </div>
    </div>
  );
}
