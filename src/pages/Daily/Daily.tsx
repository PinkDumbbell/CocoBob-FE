import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';

import Layout from '@/components/layout/Layout';
import { useAppSelector } from '@/store/config';
import { getCurrentPet } from '@/store/slices/userSlice';
import { useLazyGetDailyListQuery, useLazyGetDailyQuery } from '@/store/api/dailyApi';
import { getDateString } from '@/utils/libs/date';
import { useToastMessage, useSelectModal } from '@/utils/hooks';
import { ReactComponent as PencilIcon } from '@/assets/icon/pencil_icon.svg';
import { ReactComponent as DogIcon } from '@/assets/icon/dog_icon.svg';

import DailyCalendar from './components/DailyCalendar';
import DailyAddWalkModal from './components/DailyAddWalk';
import DailyAddFeed from './components/DailyAddFeed';
import DailyBodyWeight from './components/DailyAddBodyWeight';
import DailyAddNoteModal from './components/DailyAddNoteModal';

export default function DailyMain() {
  const currentPetId = useAppSelector(getCurrentPet);

  if (!currentPetId)
    return (
      <Layout header title="데일리 기록" footer>
        <div className="w-full h-full flex flex-col items-center justify-center">
          <h3>반려동물을 등록 후 이용가능합니다</h3>
        </div>
      </Layout>
    );

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentDateString = searchParams.get('date');

  const isInvalidDate =
    currentDateString && new Date(currentDateString).toString() === 'Invalid Date';
  if (isInvalidDate) {
    return <Navigate to="/404" replace />;
  }

  const currentDate = new Date(currentDateString ?? getDateString(new Date()));
  const [getDailyList, { data: dailyList, isError: dailyListError }] = useLazyGetDailyListQuery();
  const [getDaily, { data: todayDaily, isError: dailyError }] = useLazyGetDailyQuery();

  const [activeStartDate, setActiveStartDate] = useState<Date>(currentDate);
  const [modalOpen, setModalOpen] = useState<'' | 'note' | 'walk' | 'feed' | 'bodyWeight'>('');

  const openToast = useToastMessage();
  const [openSelectMenu] = useSelectModal();

  const openModal = (content: 'note' | 'walk' | 'feed' | 'bodyWeight') => setModalOpen(content);
  const closeModal = () => setModalOpen('');

  const navigateToWalkPage = () =>
    navigate(`/daily/walk/record?date=${getDateString(currentDate)}`);

  const handleRecordWalk = async () => {
    const selectedMenu = await openSelectMenu(['산책하기', '간편기록']);
    if (!selectedMenu) return;

    if (selectedMenu === '산책하기') {
      navigateToWalkPage();
    } else if (selectedMenu === '간편기록') {
      openModal('walk');
    }
  };
  const handleRecordHealth = async () => {
    const selectedMenu = await openSelectMenu([
      '오늘의 급여',
      '오늘의 몸무게',
      '오늘의 일기 작성',
      '오늘의 일기 확인',
    ]);
    if (!selectedMenu) return;

    if (selectedMenu === '오늘의 급여') {
      openModal('feed');
    } else if (selectedMenu === '오늘의 몸무게') {
      openModal('bodyWeight');
    } else if (selectedMenu === '오늘의 일기 작성') {
      navigate('/daily/note/new', { state: { date: currentDate } });
    } else if (selectedMenu === '오늘의 일기 확인') {
      navigate(`/daily/note?date=${dayjs(currentDate).format('YYYY-MM-DD')}`);
    }
  };

  useEffect(() => {
    if (currentDateString) return;
    navigate(`/daily?date=${getDateString(new Date())}`, { replace: true });
  }, [currentDateString]);

  useEffect(() => {
    navigate(`/daily?date=${getDateString(new Date(activeStartDate))}`, { replace: true });
    getDailyList({ petId: currentPetId, date: dayjs(activeStartDate).format('YYYY-MM') });
  }, [activeStartDate]);

  useEffect(() => {
    if (!dailyList || !Array.isArray(dailyList?.idAndDates)) return;

    const todayDailyItem = dailyList.idAndDates.find((daily) => daily.date === currentDateString);
    if (!todayDailyItem) return;

    getDaily(todayDailyItem.id);
  }, [currentDate, dailyList]);

  useEffect(() => {
    if (!dailyError && !dailyListError) return;
    openToast('기록을 불러오지 못했습니다.');
  }, [dailyError, dailyListError]);
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
            className="flex-1 rounded-[10px] bg-[#fbfdff] h-16 p-2 shadow-md flex gap-4 items-center"
            onClick={handleRecordWalk}
          >
            <div className="bg-primary-dark w-12 h-12 flex items-center justify-center rounded-[10px]">
              <DogIcon />
            </div>
            <span className="text-black text-md">산책기록</span>
          </button>
          <button
            type="button"
            className="flex-1 rounded-[10px] bg-[#fbfdff] h-16 p-2 shadow-md flex gap-4 items-center"
            onClick={handleRecordHealth}
          >
            <div className="bg-primary-dark w-12 h-12 flex items-center justify-center rounded-[10px]">
              <PencilIcon />
            </div>
            <span className="text-black text-md">건강기록</span>
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
