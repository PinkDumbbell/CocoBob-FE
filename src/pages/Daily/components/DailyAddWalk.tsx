import FormInput from '@/components/Form/FormInput';
import { useForm } from 'react-hook-form';
import DailyModal, { useDailyMutation, DailyModalProps } from './DailyModal';

export default function DailyAddWalkModal({
  closeModal,
  todayDaily,
  date,
  petId,
}: DailyModalProps) {
  const { register, getValues } = useForm();
  const createOrUpdateDaily = useDailyMutation();

  const saveDaily = () => {
    const walkTime = getValues('walkTime');
    const walkDistance = getValues('walkDistance');
    console.log(todayDaily);
    console.log(walkTime, walkDistance);
    const newDaily = {
      ...todayDaily?.data,
    };
    newDaily.walkTime = walkTime;
    newDaily.walkDistance = walkDistance;
    createOrUpdateDaily(newDaily, petId, date, todayDaily?.dailyId);
    closeModal();
  };
  return (
    <DailyModal closeModal={closeModal} onSubmit={saveDaily}>
      <div className="p-2 flex flex-col w-full items-center gap-2">
        <h3>산책기록</h3>
        <div className="flex flex-col">
          <FormInput
            name="walkTime"
            label="산책시간"
            unit="min"
            rules={register('walkTime', { required: '산책 시간을 입력해주세요.' })}
          />
          <FormInput
            name="walkDistance"
            label="산책거리"
            unit="KM"
            rules={register('walkDistance', { required: '산책 거리를 입력해주세요.' })}
          />
        </div>
      </div>
    </DailyModal>
  );
}
