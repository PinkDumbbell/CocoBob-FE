import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import FormInput from '@/components/Form/FormInput';
import DailyModal, { useDailyMutation, DailyModalProps } from './DailyModal';

type BodyWeightFormType = {
  bodyWeight: number;
};
export default function DailyBodyWeight({ closeModal, todayDaily, date, petId }: DailyModalProps) {
  const { register, getValues, setValue } = useForm<BodyWeightFormType>();
  const createOrUpdateDaily = useDailyMutation();

  const saveDaily = () => {
    const bodyWeight = getValues('bodyWeight');
    const newDaily = {
      ...todayDaily?.data,
      bodyWeight,
    };
    createOrUpdateDaily(newDaily, petId, date, todayDaily?.dailyId);
    closeModal();
  };

  useEffect(() => {
    if (!todayDaily || !todayDaily?.data) return;

    setValue('bodyWeight', todayDaily.data.bodyWeight ?? 0);
  }, []);

  return (
    <DailyModal closeModal={closeModal} onSubmit={saveDaily}>
      <div className="p-2 flex flex-col w-full items-center gap-2">
        <h3>몸무게기록</h3>
        <div className="flex gap-1 items-center">
          <FormInput
            label="몸무게"
            unit="kg"
            name="bodyWeight"
            rules={register('bodyWeight', {
              required: '몸무게를 입력하세요',
              onChange: (event) => {
                const { target: value } = event;
                const onlyNumberRegex = /\d/;
                if (!onlyNumberRegex.test(value)) return '';
                return value;
              },
            })}
          />
        </div>
      </div>
    </DailyModal>
  );
}
