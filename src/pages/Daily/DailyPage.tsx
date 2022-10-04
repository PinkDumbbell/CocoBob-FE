import { useEffect, ReactNode } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper';

import Layout from '@/components/layout/Layout';
import { useAppSelector } from '@/store/config';
import { getCurrentPet } from '@/store/slices/userSlice';

import { getDateString } from '@/utils/libs/date';
import { ReactComponent as PencilIcon } from '@/assets/icon/pencil_icon.svg';
import { ReactComponent as DogIcon } from '@/assets/icon/dog_icon.svg';

import DailyCalendar from './components/DailyCalendar';
import DailyMenuButton from './components/DailyMenuButton';
import OverviewItem from './components/DailyOverviewItem';

import useDailyRecordsOfMonth from './hooks/useDailyRecordsOfMonth';
import useDailyRecordOverview from './hooks/useDailyRecordOverview';
import useRecordMenus from './hooks/useRecordMenus';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

function OverviewContent({ icon, content }: { icon?: ReactNode; content?: string | ReactNode }) {
  return (
    <>
      <div className="p-1">{icon}</div>
      {content}
    </>
  );
}

const overviewSwiperDefaultOptions: SwiperProps = {
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
  centeredSlides: true,
  loop: true,
  pagination: { clickable: true },
};

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

  useEffect(() => {
    if (currentDateString) {
      return;
    }
    navigate(`/daily?date=${getDateString(new Date())}`, { replace: true });
  }, [currentDateString]);

  const isInvalidDate =
    currentDateString && new Date(currentDateString).toString() === 'Invalid Date';
  if (isInvalidDate) {
    return <Navigate to="/404" replace />;
  }

  const dateString = currentDateString ?? getDateString(new Date());
  const { currentDate, recordIdList, setActiveStartDate } = useDailyRecordsOfMonth(
    currentPetId,
    dateString,
  );
  const { numberOfOverviewItmes, recordOverview } = useDailyRecordOverview(
    currentPetId,
    dateString,
  );
  const { goHealthPage, selectWalkOrNote } = useRecordMenus(dateString);

  const swiperOption: SwiperProps = {
    slidesPerView: numberOfOverviewItmes > 2 ? 1.7 : 1,
    autoplay:
      numberOfOverviewItmes >= 2
        ? {
            delay: 4000,
          }
        : false,
  };

  return (
    <Layout header footer title="데일리 기록">
      <div className="p-4 flex flex-col items-center gap-4 w-full h-full overflow-y-auto space-y-4">
        <div className="flex flex-col border w-full bg-white shadow-sm rounded-[10px]">
          {currentDate && (
            <DailyCalendar
              currentDate={currentDate}
              recordIds={recordIdList}
              setActiveStartDate={setActiveStartDate}
            />
          )}
        </div>
        <div className="flex w-full items-center gap-5">
          <DailyMenuButton label="건강일지" onClick={goHealthPage} icon={<DogIcon />} />
          <DailyMenuButton label="일지기록" onClick={selectWalkOrNote} icon={<PencilIcon />} />
        </div>
        <div className="w-full flex items-center">
          {recordOverview && (
            <Swiper {...swiperOption} {...overviewSwiperDefaultOptions} className="pt-4 pb-12 px-1">
              {recordOverview.walkTotalTime > 0 && (
                <SwiperSlide className="flex justify-center items-center h-48">
                  <OverviewItem
                    title="산책기록"
                    onClick={() => navigate(`/daily/walk?date=${currentDateString}`)}
                  >
                    <OverviewContent
                      content={
                        <div className="flex flex-col items-center">
                          <p className="text-primary-bright font-medium text-md">
                            {recordOverview.walkTotalDistance} km
                          </p>
                          <p className="text-primary-main font-semibold">
                            {recordOverview.walkTotalTime >= 60 && (
                              <>
                                <span className="text-2xl">
                                  {Math.floor(recordOverview.walkTotalTime / 60)}
                                </span>
                                <span className="text-xl">시간</span>
                              </>
                            )}
                            <span className="text-2xl">{recordOverview.walkTotalTime % 60}</span>
                            <span className="text-xl">분</span>
                          </p>
                          <p className="font-semibold">달렸어요</p>
                        </div>
                      }
                    />
                  </OverviewItem>
                </SwiperSlide>
              )}
              {recordOverview.mealCount > 0 && (
                <SwiperSlide className="flex justify-center items-center h-48">
                  <OverviewItem title="급여기록">
                    <OverviewContent
                      content={
                        <div className="flex flex-col items-center">
                          <p className="text-primary-main font-semibold">
                            <span className="text-2xl">{recordOverview.mealCount}</span>
                            <span className="text-xl">회</span>
                          </p>
                          <p className="font-semibold">급여했어요</p>
                        </div>
                      }
                    />
                  </OverviewItem>
                </SwiperSlide>
              )}
              {recordOverview?.dailyId && (
                <SwiperSlide className="flex justify-center items-center h-48">
                  <OverviewItem
                    title={recordOverview.dailyTitle}
                    onClick={() => navigate(`/daily/note/${recordOverview.dailyId}`)}
                  >
                    <OverviewContent
                      content={<p className="text-gray-400">내용을 확인해보세요</p>}
                    ></OverviewContent>
                  </OverviewItem>
                </SwiperSlide>
              )}
            </Swiper>
          )}
        </div>
      </div>
    </Layout>
  );
}
