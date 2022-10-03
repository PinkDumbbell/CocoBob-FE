import { useEffect, useState, ReactNode, useRef } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { Swiper, SwiperProps, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper';

import Layout from '@/components/layout/Layout';
import { useAppSelector } from '@/store/config';
import { getCurrentPet } from '@/store/slices/userSlice';
import {
  useGetDailyRecordIdListOfMonthQuery,
  useGetDailyRecordOverviewQuery,
} from '@/store/api/dailyApi';

import { getDateString } from '@/utils/libs/date';
import { useToastMessage, useSelectModal } from '@/utils/hooks';
import { ReactComponent as PencilIcon } from '@/assets/icon/pencil_icon.svg';
import { ReactComponent as DogIcon } from '@/assets/icon/dog_icon.svg';

import DailyCalendar from './components/DailyCalendar';
import DailyMenuButton from './components/DailyMenuButton';
import OverviewItem from './components/DailyOverviewItem';

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

  const timestampRef = useRef(Date.now()).current;
  const currentDate = new Date(currentDateString ?? getDateString(new Date()));
  const [activeStartDate, setActiveStartDate] = useState<Date>(currentDate);
  const activeStartDateString = dayjs(activeStartDate).format('YYYY-MM');
  const { data: recordIdList, isError: recordIdListError } = useGetDailyRecordIdListOfMonthQuery({
    date: activeStartDateString,
    petId: currentPetId,
    sessionId: timestampRef,
  });
  const { data: recordIds, isError: dailyError } = useGetDailyRecordOverviewQuery({
    date: dayjs(currentDate).format('YYYY-MM-DD'),
    petId: currentPetId,
    sessionId: timestampRef,
  });

  const openToast = useToastMessage();
  const [openSelectMenu] = useSelectModal();

  const [idCount, setIdCount] = useState(0);

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
    slidesPerView: idCount > 2 ? 1.7 : 1,
    centeredSlides: true,
    loop: true,
    pagination: { clickable: true },
    autoplay:
      idCount >= 2
        ? {
            delay: 4000,
          }
        : false,
  };

  const goHealthPage = () => navigate(`/daily/health?date=${currentDateString}`);
  const goRecordPage = (recordPageType: string) => {
    if (recordPageType === '산책일지') {
      navigate(`/daily/walk?date=${currentDateString}`);
    } else if (recordPageType === '반려일지') {
      navigate(`/daily/note/new`, {
        state: {
          date: currentDateString,
        },
      });
    }
  };
  const openSelectRecordMenu = async () => {
    const selectedMenu = await openSelectMenu(['산책일지', '반려일지']);
    if (!selectedMenu) {
      return;
    }
    goRecordPage(String(selectedMenu));
  };

  useEffect(() => {
    if (currentDateString) {
      return;
    }
    navigate(`/daily?date=${getDateString(new Date())}`, { replace: true });
  }, [currentDateString]);

  useEffect(() => {
    const _activeStartDateString = getDateString(new Date(activeStartDate));
    if (currentDateString === _activeStartDateString) {
      return;
    }
    navigate(`/daily?date=${_activeStartDateString}`, { replace: true });
  }, [activeStartDate]);

  useEffect(() => {
    if (!dailyError && !recordIdListError) {
      return;
    }
    openToast('기록을 불러오지 못했습니다.');
  }, [dailyError, recordIdListError]);

  useEffect(() => {
    setIdCount(0);
    if (!recordIds) {
      return;
    }
    if (recordIds.dailyId) setIdCount((prev) => prev + 1);
    if (recordIds.mealCount) setIdCount((prev) => prev + 1);
    if (recordIds.walkTotalDistance > 0) setIdCount((prev) => prev + 1);
  }, [recordIds]);

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
          <DailyMenuButton label="일지기록" onClick={openSelectRecordMenu} icon={<PencilIcon />} />
        </div>
        <div className="w-full flex items-center">
          {recordIds && (
            <Swiper {...swiperOption} className="pt-4 pb-12 px-1">
              {recordIds.walkTotalTime > 0 && (
                <SwiperSlide className="flex justify-center items-center h-48">
                  <OverviewItem
                    title="산책기록"
                    onClick={() => navigate(`/daily/walk?date=${currentDateString}`)}
                  >
                    <OverviewContent
                      content={
                        <div className="flex flex-col items-center">
                          <p className="text-primary-bright font-medium text-md">
                            {recordIds.walkTotalDistance} km
                          </p>
                          <p className="text-primary-main font-semibold">
                            {recordIds.walkTotalTime >= 60 && (
                              <>
                                <span className="text-2xl">
                                  {Math.floor(recordIds.walkTotalTime / 60)}
                                </span>
                                <span className="text-xl">시간</span>
                              </>
                            )}
                            <span className="text-2xl">{recordIds.walkTotalTime % 60}</span>
                            <span className="text-xl">분</span>
                          </p>
                          <p className="font-semibold">달렸어요</p>
                        </div>
                      }
                    />
                  </OverviewItem>
                </SwiperSlide>
              )}
              {recordIds.mealCount > 0 && (
                <SwiperSlide className="flex justify-center items-center h-48">
                  <OverviewItem title="급여기록">
                    <OverviewContent
                      content={
                        <div className="flex flex-col items-center">
                          <p className="text-primary-main font-semibold">
                            <span className="text-2xl">{recordIds.mealCount}</span>
                            <span className="text-xl">회</span>
                          </p>
                          <p className="font-semibold">급여했어요</p>
                        </div>
                      }
                    />
                  </OverviewItem>
                </SwiperSlide>
              )}
              {recordIds?.dailyId && (
                <SwiperSlide className="flex justify-center items-center h-48">
                  <OverviewItem
                    title={recordIds.dailyTitle}
                    onClick={() => navigate(`/daily/note/${recordIds.dailyId}`)}
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
