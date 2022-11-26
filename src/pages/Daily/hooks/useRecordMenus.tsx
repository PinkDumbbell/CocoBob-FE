import { useNavigate } from 'react-router-dom';

import { useSelectModal } from '@/utils/hooks';
import { useGetDailyRecordOverviewQuery } from '@/store/api/dailyApi';
import { useAppSelector } from '@/store/config';
import { getCurrentPet } from '@/store/slices/userSlice';

const useRecordMenus = (currentDateString: string) => {
  const navigate = useNavigate();
  const [openSelectMenu] = useSelectModal();
  const currentPetId = useAppSelector(getCurrentPet);
  const { data: dailyOverview } = useGetDailyRecordOverviewQuery(
    { date: currentDateString, petId: Number(currentPetId) },
    {
      skip: !currentPetId,
    },
  );

  const goHealthPage = () => navigate(`/daily/health?date=${currentDateString}`);
  const goRecordPage = (recordPageType: string) => {
    if (recordPageType === '산책일지') {
      navigate(`/daily/walk?date=${currentDateString}`);
    } else if (recordPageType === '반려일지') {
      if (dailyOverview?.dailyId) {
        navigate(`/daily/note/${dailyOverview.dailyId}`);
      } else {
        navigate(`/daily/note/new`, {
          state: {
            date: currentDateString,
          },
        });
      }
    }
  };
  const selectWalkOrNote = async () => {
    const selectedMenu = await openSelectMenu(['산책일지', '반려일지']);
    if (!selectedMenu) {
      return;
    }
    goRecordPage(String(selectedMenu));
  };

  return {
    goHealthPage,
    selectWalkOrNote,
  };
};
export default useRecordMenus;
