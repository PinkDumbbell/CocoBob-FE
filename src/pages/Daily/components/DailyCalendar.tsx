import { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import Calendar from 'react-calendar';

import { RecordIdOfDateType } from '@/store/api/dailyApi';
import { getDateString } from '@/utils/libs/date';

import 'react-calendar/dist/Calendar.css';
import '../calendar.css';

type DailyCalendarProps = {
  currentDate: Date;
  recordIds?: RecordIdOfDateType;
  setActiveStartDate: Dispatch<SetStateAction<Date>>;
};
export default function DailyCalendar({
  currentDate,
  recordIds,
  setActiveStartDate,
}: DailyCalendarProps) {
  const navigate = useNavigate();
  const changeDate = (selectedDate: Date) => {
    const dateString = getDateString(selectedDate);
    navigate(`/daily?date=${dateString}`, { replace: true });
  };

  return (
    <Calendar
      calendarType="US"
      value={currentDate}
      defaultValue={currentDate}
      onChange={changeDate}
      onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate)}
      formatDay={(locale, date) => dayjs(date).format('DD')}
      minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
      maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
      tileContent={({ date }) => {
        if (!recordIds)
          return <div className="h-full flex flex-col justify-around items-center"></div>;

        const dateString = getDateString(date);
        const isExist = recordIds[dateString];
        // 날짜 타일에 컨텐츠 추가하기 (html 태그)
        // 추가할 html 태그를 변수 초기화
        const html = [];
        if (isExist) {
          html.push(
            <div
              key={dateString}
              className="z-0 opacity-50 rounded-full absolute w-10 h-10 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2  bg-primary-light"
            ></div>,
          );
        }
        // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
        return <div className="h-full flex flex-col justify-around items-center">{html}</div>;
      }}
    />
  );
}
