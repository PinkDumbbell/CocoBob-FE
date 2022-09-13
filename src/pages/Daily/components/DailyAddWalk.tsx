import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import FormInput from '@/components/Form/FormInput';
import DailyModal, { useDailyMutation, DailyModalProps } from './DailyModal';

type WalkRecordType = {
  walkTime: number;
  walkDistance: number;
};
export default function DailyAddWalkModal({
  closeModal,
  todayDaily,
  date,
  petId,
}: DailyModalProps) {
  const { register, getValues, setValue } = useForm<WalkRecordType>();
  const createOrUpdateDaily = useDailyMutation();

  const saveDaily = () => {
    const walkTime = getValues('walkTime');
    const walkDistance = getValues('walkDistance');
    const newDaily = {
      ...todayDaily?.data,
      walkTime,
      walkDistance,
    };
    createOrUpdateDaily(newDaily, petId, date, todayDaily?.dailyId);
    closeModal();
  };

  useEffect(() => {
    if (!todayDaily || !todayDaily?.data) return;

    setValue('walkTime', todayDaily.data.walkTime ?? 0);
    setValue('walkTime', todayDaily.data.walkDistance ?? 0);
  }, []);
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
