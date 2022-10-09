import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import FormInput from '@/components/Form/FormInput';
import DailyModal, { useDailyMutation, DailyModalProps } from './DailyModal';

export default function DailyAddFeed({ closeModal, todayDaily, date, petId }: DailyModalProps) {
  const { register, getValues, setValue } = useForm();
  const createOrUpdateDaily = useDailyMutation();

  const saveDaily = () => {
    const feed = getValues('feed');
    const newDaily = {
      ...todayDaily?.data,
      feed,
    };
    createOrUpdateDaily(newDaily, petId, date, todayDaily?.dailyId);
    closeModal();
  };

  useEffect(() => {
    if (!todayDaily || !todayDaily?.data) return;

    setValue('feed', todayDaily.data.feed ?? 0);
  }, []);

  return (
    <DailyModal closeModal={closeModal} onSubmit={saveDaily}>
      <div className="p-2 flex flex-col w-full items-center gap-2">
        <h3>급여량 기록</h3>
        <div className="flex flex-col">
          <FormInput
            name="feed"
            label="급여량"
            placeholder="급여량을 입력하세요"
            unit="g"
            rules={register('feed', {
              required: '급여량을 입력해주세요.',
            })}
          />
        </div>
      </div>
    </DailyModal>
  );
}
