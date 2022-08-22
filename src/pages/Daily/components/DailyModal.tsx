import { ReactNode } from 'react';

export type DailyModalProps = {
  closeModal: () => void;
  onSubmit: () => void;
};
type DailyModalWrapperProps = DailyModalProps & { children: ReactNode };
export default function DailyModal({ closeModal, onSubmit, children }: DailyModalWrapperProps) {
  return (
    <div className="z-[9000] flex flex-col items-center justify-center w-full h-full fixed top-0 bg-[#00000029] p-2">
      <div className="w-full bg-white flex flex-col items-center justify-between rounded-[10px]">
        <div className="flex-1">{children}</div>
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
