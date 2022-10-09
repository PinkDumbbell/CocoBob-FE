import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import FormInput from '@/components/Form/FormInput';
import dayjs from 'dayjs';
import DailyModal, { DailyModalProps } from './DailyModal';
import useHealthRecordyMutation from '../HealthRecords/hooks/useHealthRecordMutation';

type BodyWeightFormType = {
  bodyWeight: number;
};
export default function DailyBodyWeight({
  closeModal,
  healthRecord,
  date,
  petId,
}: DailyModalProps) {
  const { register, getValues, setValue } = useForm<BodyWeightFormType>();
  const createOrUpdateHealthRecord = useHealthRecordyMutation();

  const saveHealthRecord = () => {
    if (!petId) return;
    const bodyWeight = getValues('bodyWeight');
    createOrUpdateHealthRecord({
      ...healthRecord,
      bodyWeight,
      petId,
      date: dayjs(date).format('YYYY-MM-DD'),
    });
    closeModal();
  };

  useEffect(() => {
    if (!healthRecord) return;

    setValue('bodyWeight', healthRecord.bodyWeight ?? 0);
  }, []);

  return (
    <DailyModal closeModal={closeModal} onSubmit={saveHealthRecord}>
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
