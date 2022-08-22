import FormInput from '@/components/Form/FormInput';
import DailyModal, { DailyModalProps } from './DailyModal';

export default function DailyAddFeed({ closeModal, onSubmit }: DailyModalProps) {
  return (
    <DailyModal closeModal={closeModal} onSubmit={onSubmit}>
      <div className="p-2 flex flex-col w-full items-center gap-2">
        <h3>급여량 기록</h3>
        <div className="flex flex-col">
          <FormInput name="walktime" label="급여량을 입력하세요" />
        </div>
      </div>
    </DailyModal>
  );
}
