import { ReactNode } from 'react';
import { HealthRecordRequestType } from '@/store/api/dailyApi';
import useKeyHandler from '@/utils/hooks/useKeyHandler';

export type DailyModalProps = {
  closeModal: () => void;
  healthRecord?: HealthRecordRequestType;
  date: Date;
  petId: number | null;
};
type DailyModalWrapperProps = {
  closeModal: () => void;
  onSubmit: () => void;
  children: ReactNode;
};

export default function DailyModal({ closeModal, onSubmit, children }: DailyModalWrapperProps) {
  useKeyHandler('Escape', closeModal);

  return (
    <div className="z-[1000] max-w-[425px] flex flex-col items-center justify-center w-full h-screen fixed top-0  left-1/2 -translate-x-1/2 bg-[#00000029] p-4">
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
