import { Dispatch, SetStateAction, useState } from 'react';
import Calendar from 'react-calendar';
import Layout from '@/components/layout/Layout';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import './index.style.css';
import { Link } from 'react-router-dom';

const CalendarWrapper = ({
  currentDate,
  onChangeDate,
}: {
  currentDate: Date;
  onChangeDate: Dispatch<SetStateAction<Date>>;
}) => (
  <div>
    <div
      className={
        'overflow-hidden transition-all flex items-start justify-center rounded-t-lg w-full '
      }
    >
      <Calendar
        value={currentDate}
        defaultValue={currentDate}
        onChange={onChangeDate}
        formatDay={(locale, date) => dayjs(date).format('DD')}
        minDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        maxDetail="month" // 상단 네비게이션에서 '월' 단위만 보이게 설정
        tileContent={({ date }) => {
          // 날짜 타일에 컨텐츠 추가하기 (html 태그)
          // 추가할 html 태그를 변수 초기화
          const html = [];
          if (dayjs(date).format('YYYY/MM/DD') === dayjs(currentDate).format('YYYY/MM/DD')) {
            html.push(
              <div
                key={dayjs(date).format('YYYY/MM/DD')}
                className="h-1.5 w-1.5 rounded-full bg-emerald-400"
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

export default function DailyMain() {
  const [calendarDate, setCalendarDate] = useState(new Date());

  const menus = [
    {
      title: '산책하기',
      path: '/daily/walk',
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

  return (
    <Layout header footer title="데일리 기록">
      <div className="py-4 bg-white">
        <div className="p-4 border-b border-b-slate-200">
          <CalendarWrapper currentDate={calendarDate} onChangeDate={setCalendarDate} />
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