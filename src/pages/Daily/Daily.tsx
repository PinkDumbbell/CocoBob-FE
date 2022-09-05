import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';

import Layout from '@/components/layout/Layout';
import { useAppSelector } from '@/store/config';
import { getCurrentPet } from '@/store/slices/userSlice';
import {
  DailyItemType,
  useLazyGetDailyListQuery,
  useLazyGetDailyQuery,
} from '@/store/api/dailyApi';
import { getDateString } from '@/utils/libs/date';
import useSelectModal from '@/utils/hooks/useSelectModal';
import { ReactComponent as PencilIcon } from '@/assets/icon/pencil_icon.svg';
import { ReactComponent as DogIcon } from '@/assets/icon/dog_icon.svg';

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

  const [activeStartDate, setActiveStartDate] = useState<Date | undefined>(currentDate);
  const [todayDaily, setTodayDaily] = useState<DailyItemType | undefined>();
  const [modalOpen, setModalOpen] = useState<'' | 'note' | 'walk' | 'feed' | 'bodyWeight'>('');
  const [openSelectMenu] = useSelectModal();

  const openModal = (content: 'note' | 'walk' | 'feed' | 'bodyWeight') => setModalOpen(content);
  const closeModal = () => setModalOpen('');

  const handleRecordWalk = async () => {
    const selectedMenu = await openSelectMenu(['산책하기', '간편기록']);
    if (!selectedMenu) return;

    if (selectedMenu === '산책하기') {
      navigate('/daily/walk');
    }
    if (selectedMenu === '간편기록') {
      openModal('walk');
    }
  };
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
    if (!currentPetId) return;
    if (listDate !== activeStartDate) {
      console.log('fetch!!');
      setListDate(activeStartDate);
      getDailyList({ petId: currentPetId, date: dayjs(activeStartDate).format('YYYY-MM') });
    }
  }, [activeStartDate]);

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
      <div className="p-4 bg-white flex flex-col items-center gap-4 w-full h-full overflow-y-auto">
        <div className="flex flex-col border w-full bg-white shadow-sm rounded-[10px]">
          {currentDate && (
            <DailyCalendar
              currentDate={currentDate}
              dailyList={dailyList?.idAndDates ?? []}
              setActiveStartDate={setActiveStartDate}
            />
          )}
        </div>
        <div className="flex w-full items-center gap-5">
          <button
            type="button"
            className="flex-1 rounded-[10px] bg-gray-200 h-20 p-4 shadow-md flex gap-4 items-center"
            onClick={handleRecordWalk}
          >
            <div className="bg-primary-dark w-12 h-12 flex items-center justify-center rounded-[10px]">
              <DogIcon />
            </div>
            <span className="text-black text-xl">산책기록</span>
          </button>
          <button
            type="button"
            className="flex-1 rounded-[10px] bg-gray-200 h-20 p-4 shadow-md flex gap-4 items-center"
            onClick={() => setModalOpen('note')}
          >
            <div className="bg-primary-dark w-12 h-12 flex items-center justify-center rounded-[10px]">
              <PencilIcon />
            </div>
            <span className="text-black text-xl">건강기록</span>
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
