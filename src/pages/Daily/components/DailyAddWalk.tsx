import FormInput from '@/components/Form/FormInput';
import DailyModal, { DailyModalProps } from './DailyModal';

export default function DailyAddWalkModal({ closeModal, onSubmit }: DailyModalProps) {
  return (
    <DailyModal closeModal={closeModal} onSubmit={onSubmit}>
      <div className="p-2 flex flex-col w-full items-center gap-2">
        <h3>산책기록</h3>
        <div className="flex flex-col">
          <FormInput name="walktime" label="산책시간" unit="min" />
          <FormInput name="walkdistance" label="산책거리" unit="KM" />
        </div>
      </div>
    </DailyModal>
  );
}
