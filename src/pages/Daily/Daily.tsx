import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import Layout from '@/components/layout/Layout';
import { useAppDispatch, useAppSelector } from '@/store/config';
import { getDailyDate, getDailyDateString, setDate, setToday } from '@/store/slices/dailySlice';
import { getDateString } from '@/utils/libs/date';
import { ReactComponent as PencilIcon } from '@/assets/icon/pencil_icon.svg';
import { ReactComponent as CalendarPlusIcon } from '@/assets/icon/calendar_plus.svg';
import { ReactComponent as CalendarPrimary } from '@/assets/icon/calendar_plus_primary.svg';
import { ReactComponent as DogIcon } from '@/assets/icon/dog_icon.svg';
import DailyCalendar from './components/DailyCalendar';
import DailyAddWalkModal from './components/DailyAddWalk';
import DailyAddFeed from './components/DailyAddFeed';
import DailyBodyWeight from './components/DailyAddBodyWeight';

export default function DailyMain() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const currentDate = useAppSelector(getDailyDate);
  const currentDateString = useAppSelector(getDailyDateString);
  const queryStringDate = searchParams.get('date');

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState<'' | 'walk' | 'feed' | 'bodyWeight'>('');
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

  const openDateSelector = () => setCalendarOpen(true);
  const closeDateSelector = () => setCalendarOpen(false);
  const openModal = (content: 'walk' | 'feed' | 'bodyWeight') => setModalOpen(content);
  const closeModal = () => setModalOpen('');

  return (
    <Layout header footer title="데일리 기록">
      <div className="p-4 bg-white flex flex-col items-center justify-center gap-8 w-full h-full">
        <div className="flex flex-col border rounded-[10px] h-3/4 max-h-[600px] w-full bg-white shadow-lg rounded-[10px]">
          <div className="w-full h-16 bg-primary-dark shadow-md rounded-t-[10px] flex items-center justify-center">
            <button onClick={openDateSelector}>
              <h4 className="text-white font-[400] text-lg">
                {dayjs(currentDate).format('YYYY. MM. DD')}
              </h4>
            </button>
          </div>
          <div className="bg-white flex-1 flex flex-col p-2 px-10 relative">
            <div className="flex py-8 border-b flex-col items-start w-full gap-2">
              <h5 className="text-left w-full">안녕하세요 오늘의 기록입니다.</h5>
              <p className="text-gray-500 text-sm">
                저는 오늘 광화문 근천에서 산책을 했어요. 날씨가 너무 더워서 고생했네요
              </p>
            </div>
            <div className="py-2 flex flex-col gap-2">
              <h5 className="text-primary-dark">몸무게</h5>
              <div className="w-full h-12 rounded-[10px] bg-gray-200"></div>
            </div>
            <div className="py-2 flex flex-col gap-2">
              <h5 className="text-primary-dark">급여량</h5>
              <div className="flex gap-1 items-center justify-between">
                <div className="w-3/4 h-3 bg-primary-main rounded-[10px]"></div>
                <span className="text-sm">381 Kcal</span>
              </div>
            </div>
            <div className="py-2 flex flex-col gap-2">
              <h5>산책</h5>
              <div className="flex flex-col gap-2">
                <div className="w-full flex gap-2">
                  <div>
                    <CalendarPrimary />
                  </div>
                  <div className="flex gap-1">
                    <button>
                      <span>산책 01</span>
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-center w-full gap-2">
                  <span>1.6km</span>
                  <span>307cal</span>
                  <span>37min</span>
                </div>
              </div>
            </div>
            {calendarOpen && (
              <DailyCalendar currentDate={currentDate} closeCalendar={closeDateSelector} />
            )}
          </div>
        </div>
        <div className="flex gap-4 items-center w-full justify-center">
          <button
            className="rounded-[10px] shadow-md w-12 h-12 flex items-center justify-center bg-primary-dark"
            onClick={() => openModal('bodyWeight')}
          >
            <PencilIcon />
          </button>
          <button
            className="rounded-[10px] shadow-md w-12 h-12 flex items-center justify-center bg-primary-dark"
            onClick={() => openModal('feed')}
          >
            <CalendarPlusIcon />
          </button>
          <button
            className="rounded-[10px] shadow-md w-12 h-12 flex items-center justify-center bg-primary-dark"
            onClick={() => openModal('walk')}
          >
            <DogIcon />
          </button>
        </div>
      </div>
      {modalOpen === 'walk' && (
        <DailyAddWalkModal
          closeModal={closeModal}
          onSubmit={() => {
            closeModal();
          }}
        />
      )}
      {modalOpen === 'feed' && (
        <DailyAddFeed
          closeModal={closeModal}
          onSubmit={() => {
            closeModal();
          }}
        />
      )}
      {modalOpen === 'bodyWeight' && (
        <DailyBodyWeight
          closeModal={closeModal}
          onSubmit={() => {
            closeModal();
          }}
        />
      )}
    </Layout>
  );
}
