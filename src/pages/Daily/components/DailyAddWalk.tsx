import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import FormInput from '@/components/Form/FormInput';
import DailyModal, { useDailyMutation, DailyModalProps } from './DailyModal';
import { WalkHistoryItemType } from '../Walk/components/WalkHistoryList';

type WalkRecordType = {
  walkTime: number;
  walkDistance: number;
};

type DailyAddWalkModalProps = DailyModalProps & {
  // eslint-disable-next-line no-unused-vars
  onSave: (walkRecord: WalkHistoryItemType) => void;
};
export default function DailyAddWalkModal({
  closeModal,
  todayDaily,
  date,
  petId,
  onSave,
}: DailyAddWalkModalProps) {
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
    onSave({
      id: Number((Math.random() * 100).toFixed(0)),
      date: new Date(),
      endTime: '13:32',
      startTime: '13:49',
      walkDistance,
      walkTime,
    });
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
