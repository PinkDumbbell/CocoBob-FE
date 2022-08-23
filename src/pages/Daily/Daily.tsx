import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import Layout from '@/components/layout/Layout';
import { useAppSelector } from '@/store/config';
import { getDateString } from '@/utils/libs/date';
import { ReactComponent as FoodIcon } from '@/assets/icon/dog_food.svg';
import { ReactComponent as PencilIcon } from '@/assets/icon/pencil_icon.svg';
import { ReactComponent as WeightIcon } from '@/assets/icon/weight_icon.svg';
import { ReactComponent as CalendarPrimary } from '@/assets/icon/calendar_plus_primary.svg';
import { ReactComponent as DogIcon } from '@/assets/icon/dog_icon.svg';
import { getCurrentPet } from '@/store/slices/userSlice';
import {
  DailyItemType,
  useLazyGetDailyListQuery,
  useLazyGetDailyQuery,
} from '@/store/api/dailyApi';
import DailyCalendar from './components/DailyCalendar';
import DailyAddWalkModal from './components/DailyAddWalk';
import DailyAddFeed from './components/DailyAddFeed';
import DailyBodyWeight from './components/DailyAddBodyWeight';
import DailyAddNoteModal from './components/DailyAddNoteModal';

export default function DailyMain() {
  const navigate = useNavigate();
  const currentPetId = useAppSelector(getCurrentPet);
  const [searchParams] = useSearchParams();
  const queryStringDate = searchParams.get('date');
  const [currentDate, setCurrentDate] = useState<Date>();
  const [listDate, setListDate] = useState<Date>();
  const [getDailyList, { data: dailyList, isSuccess: dailyListSuccess }] =
    useLazyGetDailyListQuery();
  const [getDaily, { data: daily, isSuccess: dailySuccess }] = useLazyGetDailyQuery();

  const [todayDaily, setTodayDaily] = useState<DailyItemType | undefined>();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState<'' | 'note' | 'walk' | 'feed' | 'bodyWeight'>('');

  const openDateSelector = () => setCalendarOpen(true);
  const closeDateSelector = () => setCalendarOpen(false);
  const openModal = (content: 'note' | 'walk' | 'feed' | 'bodyWeight') => setModalOpen(content);
  const closeModal = () => setModalOpen('');

  useEffect(() => {
    if (!queryStringDate) {
      const today = new Date();
      navigate(`/daily?date=${dayjs(today).format('YYYY-MM-DD')}`, { replace: true });
      return;
    }

    const date = new Date(queryStringDate);
    if (date.toString() === 'Invalid Date') navigate('/404');
    else if (currentPetId) {
      const todayDateString = dayjs(date).format('YYYY-MM');
      const listDateString = dayjs(listDate).format('YYYY-MM');

      if (!listDate || !dailyList || listDateString !== todayDateString) {
        setListDate(date);
        getDailyList({ petId: currentPetId, date: todayDateString });
      }
      setCurrentDate(date);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!currentDate || !dailyList || !currentPetId || !dailyListSuccess) return;

    const foundTodayDailyInfo = dailyList.idAndDates.find(
      (dailyItem) => dailyItem.date === getDateString(currentDate),
    );
    if (foundTodayDailyInfo && foundTodayDailyInfo.id === daily?.dailyId) {
      setTodayDaily(daily);
    } else if (foundTodayDailyInfo && foundTodayDailyInfo.id !== daily?.dailyId) {
      getDaily(foundTodayDailyInfo.id);
    } else {
      setTodayDaily(undefined);
    }
  }, [currentDate, dailyList]);

  useEffect(() => {
    if (!currentPetId || !daily) return;

    setTodayDaily(daily);
  }, [dailySuccess, daily]);
  if (!currentPetId) return null;
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
          <div className="bg-white flex-1 flex flex-col gap-4 p-2 px-10 relative rounded-b-[10px]">
            <div className="flex pt-8 pb-4 flex-col items-start w-full gap-2">
              <h5 className="text-left text-md w-full text-primary-dark">오늘의 일기</h5>
              {todayDaily?.data.note && (
                <p className="text-gray-500 text-sm">{todayDaily.data.note}</p>
              )}
              {!todayDaily?.data.note && (
                <p className="text-gray-500 text-sm">작성 된 일기가 없어요. 일기를 작성해보세요!</p>
              )}
            </div>
            <div className="py-4 flex flex-col gap-2">
              <h5 className="text-primary-dark">몸무게</h5>
              <div className="w-full rounded-[10px] ">
                {!todayDaily?.data.bodyWeight && (
                  <p className="text-gray-500 text-sm">오늘 몸무게를 측정하지 않으셨어요!</p>
                )}
                {todayDaily?.data.bodyWeight && (
                  <p className="text-gray-500 text-sm">{todayDaily?.data.bodyWeight}kg</p>
                )}
              </div>
            </div>
            <div className="py-4 flex flex-col gap-2">
              <h5 className="text-primary-dark">급여량</h5>
              <div className="flex gap-1 items-center justify-between">
                {todayDaily?.data.feed && (
                  <>
                    <div className="w-3/4 h-3 bg-primary-main rounded-[10px]"></div>
                    <span className="text-sm">{todayDaily.data.feed}g</span>
                  </>
                )}
                {!todayDaily?.data.feed && (
                  <p className="text-gray-500 text-sm">오늘 급여량을 입력하지 않으셨어요!</p>
                )}
              </div>
            </div>
            <div className="py-4 flex flex-col gap-2">
              <h5 className="text-primary-dark">산책</h5>
              {todayDaily?.data.walkDistance && (
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
                    <span>{todayDaily.data.walkDistance}km</span>
                    <span>{todayDaily.data.walkTime}min</span>
                  </div>
                </div>
              )}
              {!todayDaily?.data.walkDistance && (
                <p className="text-gray-500 text-sm">오늘 산책을 하지 않으셨어요!</p>
              )}
            </div>
            {calendarOpen && currentDate && (
              <DailyCalendar
                currentDate={currentDate}
                closeCalendar={closeDateSelector}
                dailyList={dailyList?.idAndDates ?? []}
              />
            )}
          </div>
        </div>
        <div className="flex gap-4 items-center w-full justify-center ">
          <button
            className="rounded-[10px] shadow-md w-12 h-12 flex items-center justify-center bg-primary-dark"
            onClick={() => openModal('note')}
          >
            <PencilIcon />
          </button>
          <button
            className="rounded-[10px] shadow-md w-12 h-12 flex items-center justify-center bg-primary-dark"
            onClick={() => openModal('bodyWeight')}
          >
            <WeightIcon style={{ fill: '#ffffff', width: 31, height: 31 }} />
          </button>
          <button
            className="rounded-[10px] shadow-md w-12 h-12 flex items-center justify-center bg-primary-dark"
            onClick={() => openModal('feed')}
          >
            <FoodIcon style={{ width: 31, height: 31, fill: '#ffffff' }} />
          </button>
          <button
            className="rounded-[10px] shadow-md w-12 h-12 flex items-center justify-center bg-primary-dark"
            onClick={() => openModal('walk')}
          >
            <DogIcon />
          </button>
        </div>
      </div>
      {modalOpen === 'note' && currentDate && (
        <DailyAddNoteModal
          closeModal={closeModal}
          todayDaily={todayDaily}
          date={currentDate}
          petId={currentPetId}
        />
      )}
      {modalOpen === 'walk' && currentDate && (
        <DailyAddWalkModal
          closeModal={closeModal}
          todayDaily={todayDaily}
          date={currentDate}
          petId={currentPetId}
        />
      )}
      {modalOpen === 'feed' && currentDate && (
        <DailyAddFeed
          closeModal={closeModal}
          todayDaily={todayDaily}
          date={currentDate}
          petId={currentPetId}
        />
      )}
      {modalOpen === 'bodyWeight' && currentDate && (
        <DailyBodyWeight
          closeModal={closeModal}
          todayDaily={todayDaily}
          date={currentDate}
          petId={currentPetId}
        />
      )}
    </Layout>
  );
}
