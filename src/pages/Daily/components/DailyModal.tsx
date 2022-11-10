import { ReactNode } from 'react';
import { HealthRecordRequestType } from '@/store/api/dailyApi';
import useKeyHandler from '@/utils/hooks/useKeyHandler';

export type DailyModalProps = {
  closeModal: () => void;
  healthRecord?: HealthRecordRequestType;
  healthRecordId?: number;
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
        <div className="h-14 bg-primary-dark rounded-t-[10px] w-full flex items-center justify-center">
          <h3 className="text-white">건강기록</h3>
        </div>
        <div className="flex-1 w-full">{children}</div>
        <div className="h-12 w-full flex items-center rounded-b-[10px] overflow-hidden border-t border-primary-brightest">
          <button className="h-full flex-1 rounded-bl text-primary-bright" onClick={closeModal}>
            취소
          </button>
          <button
            className="h-full flex-1 rounded-br bg-primary-dark text-white"
            onClick={onSubmit}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
