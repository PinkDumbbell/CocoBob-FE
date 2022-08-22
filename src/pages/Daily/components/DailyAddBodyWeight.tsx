import FormInput from '@/components/Form/FormInput';
import DailyModal, { DailyModalProps } from './DailyModal';

export default function DailyBodyWeight({ onSubmit, closeModal }: DailyModalProps) {
  return (
    <DailyModal closeModal={closeModal} onSubmit={onSubmit}>
      <div className="p-2 flex flex-col w-full items-center gap-2">
        <h3>몸무게기록</h3>
        <div className="flex flex-col">
          <FormInput name="walktime" label="몸무게를 입력하세요" />
        </div>
      </div>
    </DailyModal>
  );
}
