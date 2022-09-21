import { useEffect, useState, ReactNode } from 'react';
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

import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper';
import DailyCalendar from './components/DailyCalendar';
import DailyMenuButton from './components/DailyMenuButton';
import OverviewItem from './components/DailyOverviewItem';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

const swiperOption: SwiperProps = {
  effect: 'coverflow',
  coverflowEffect: {
    rotate: 0,
    stretch: 24,
    modifier: 1,
    slideShadows: false,
    scale: 0.8,
  },
  grabCursor: true,
  modules: [EffectCoverflow, Pagination, Autoplay],
  slidesPerGroup: 1,
  slidesPerView: 1.7,
  centeredSlides: true,
  loop: true,
  pagination: { clickable: true },
  autoplay: {
    delay: 4000,
  },
};

function OverviewContent({ icon, content }: { icon?: ReactNode; content?: string | ReactNode }) {
  return (
    <>
      <div className="p-1">{icon}</div>
      {content}
    </>
  );
}
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
  const [getDaily, { isError: dailyError }] = useLazyGetDailyQuery();

  const [activeStartDate, setActiveStartDate] = useState<Date>(currentDate);

  const openToast = useToastMessage();
  const [openSelectMenu] = useSelectModal();

  const goHealthPage = () => navigate(`/daily/health?date=${currentDateString}`);
  const handleAddRecord = async () => {
    const selectedMenu = await openSelectMenu(['산책일지', '반려일지']);
    if (!selectedMenu) {
      return;
    }

    if (selectedMenu === '산책일지') {
      navigate(`/daily/walk?date=${currentDateString}`);
    } else if (selectedMenu === '반려일지') {
      navigate(`/daily/note/new`, {
        state: {
          date: currentDateString,
        },
      });
    }
  };

  useEffect(() => {
    if (currentDateString) {
      return;
    }
    navigate(`/daily?date=${getDateString(new Date())}`, { replace: true });
  }, [currentDateString]);

  useEffect(() => {
    navigate(`/daily?date=${getDateString(new Date(activeStartDate))}`, { replace: true });
    getDailyList({ petId: currentPetId, date: dayjs(activeStartDate).format('YYYY-MM') });
  }, [activeStartDate]);

  useEffect(() => {
    if (!dailyList || !Array.isArray(dailyList?.idAndDates)) {
      return;
    }

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
      <div className="p-4 flex flex-col items-center gap-4 w-full h-full overflow-y-auto space-y-4">
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
          <DailyMenuButton label="건강일지" onClick={goHealthPage} icon={<DogIcon />} />
          <DailyMenuButton label="일지기록" onClick={handleAddRecord} icon={<PencilIcon />} />
        </div>
        <div className="w-full flex items-center">
          <Swiper {...swiperOption} className="pt-4 pb-12">
            <SwiperSlide className="flex justify-center items-center h-48">
              <OverviewItem title="산책기록">
                <OverviewContent
                  content={
                    <div className="flex flex-col items-center">
                      <p className="text-primary-main font-semibold">
                        <span className="text-2xl">2</span>
                        <span className="text-xl">시간</span>
                      </p>
                      <p className="font-semibold">달렸어요</p>
                    </div>
                  }
                />
              </OverviewItem>
            </SwiperSlide>
            <SwiperSlide className="flex justify-center items-center h-48">
              <OverviewItem title="급여기록">
                <OverviewContent
                  content={
                    <div className="flex flex-col items-center">
                      <p className="text-primary-main font-semibold">
                        <span className="text-2xl">1</span>
                        <span className="text-xl">회</span>
                      </p>
                      <p className="font-semibold">급여했어요</p>
                    </div>
                  }
                />
              </OverviewItem>
            </SwiperSlide>
            <SwiperSlide className="flex justify-center items-center h-48">
              <OverviewItem title="오늘의 일기">
                <OverviewContent
                  content={<p className="text-gray-400">오늘도 즐거운 하루였어요</p>}
                ></OverviewContent>
              </OverviewItem>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </Layout>
  );
}
