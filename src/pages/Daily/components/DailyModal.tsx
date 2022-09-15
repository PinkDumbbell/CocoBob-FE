import { ReactNode } from 'react';
import dayjs from 'dayjs';
import {
  DailyDataType,
  DailyItemType,
  useCreateDailyMutation,
  useUpdateDailyMutation,
} from '@/store/api/dailyApi';
import useKeyHandler from '@/utils/hooks/useKeyHandler';

export type DailyModalProps = {
  closeModal: () => void;
  todayDaily?: DailyItemType;
  date: Date;
  petId: number | null;
};
type DailyModalWrapperProps = {
  closeModal: () => void;
  onSubmit: () => void;
  children: ReactNode;
};

export function useDailyMutation() {
  const [create] = useCreateDailyMutation();
  const [update] = useUpdateDailyMutation();

  const createDaily = (newDaily: DailyDataType, date: Date, petId: number) => {
    console.log('create', newDaily, date, petId);
    create({
      petId,
      body: { data: JSON.stringify(newDaily), date: dayjs(date).format('YYYY-MM-DD') },
    });
  };
  const updateDaily = (newDaily: DailyDataType, date: Date, dailyId: number) => {
    console.log('update');
    update({
      dailyId,
      body: {
        data: JSON.stringify(newDaily),
        date: dayjs(date).format('YYYY-MM-DD'),
      },
    });
  };
  const createOrUpdateDaily = (
    newDaily: DailyDataType,
    petId: number | null,
    date: Date,
    dailyId?: number,
  ) => {
    if (!dailyId && date && petId) createDaily(newDaily, date, petId);
    else if (dailyId) updateDaily(newDaily, date, dailyId);
  };
  return createOrUpdateDaily;
}
export default function DailyModal({ closeModal, onSubmit, children }: DailyModalWrapperProps) {
  useKeyHandler('Escape', closeModal);

  return (
    <div className="z-[9000] max-w-[425px] flex flex-col items-center justify-center w-full h-screen fixed top-0  left-1/2 -translate-x-1/2 bg-[#00000029] p-4">
      <div className="w-full bg-white flex flex-col items-center justify-between rounded-[10px]">
        <div className="flex-1 w-full">{children}</div>
        <div className="pt-2 w-full flex items-center justify-evenly rounded-b-[10px]">
          <button
            className="py-1 border-t border-gray-200 flex-1 rounded-bl-[10px] bg-gray-700 text-white"
            onClick={closeModal}
          >
            취소
          </button>
          <button
            className="py-1 border-t border-gray-200 flex-1 rounded-br-[10px] text-primary-bright"
            onClick={onSubmit}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
