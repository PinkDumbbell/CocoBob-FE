import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { FormInput } from '@/components/Form';
import DailyModal from '@/pages/Daily/components/DailyModal';
import { useAppSelector } from '@/store/config';
import { getCurrentPet } from '@/store/slices/userSlice';
import {
  useCreateHealthRecordMutation,
  useGetDailyRecordOverviewQuery,
  useGetHealthRecordQuery,
  useUpdateHealthRecordMutation,
} from '@/store/api/dailyApi';
import useDate from './useDate';

export function BodyWeightModal({
  save,
  close,
  initBodyWeight,
}: {
  // eslint-disable-next-line
  save: (bodyWeight: number) => void;
  close: () => void;
  initBodyWeight?: number;
}) {
  const {
    register,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<{ bodyWeight: number }>();

  const onSubmit = async () => {
    const isValid = await trigger('bodyWeight');
    if (!isValid) {
      return;
    }
    save(getValues('bodyWeight'));
  };

  useEffect(() => {
    if (!initBodyWeight) {
      return;
    }
    setValue('bodyWeight', initBodyWeight);
  }, [initBodyWeight]);

  return (
    <DailyModal onSubmit={onSubmit} closeModal={close} title="몸무게 기록">
      <div className="p-4 flex flex-col gap-1">
        <FormInput
          unit="KG"
          name="bodyWeight"
          label="몸무게"
          placeholder="현재 반려견의 몸무게를 입력해주세요"
          rules={register('bodyWeight', {
            required: '몸무게를 입력해주세요',
          })}
          errorMessage={errors.bodyWeight?.message}
          isError={!!errors.bodyWeight}
        />
      </div>
    </DailyModal>
  );
}

export function useBodyWeightModal() {
  const currentPetId = useAppSelector(getCurrentPet);
  const { currentDate } = useDate();
  const [bodyWeightModal, setBodyWeightModal] = useState(false);
  const { data: overview } = useGetDailyRecordOverviewQuery(
    { date: String(currentDate), petId: currentPetId! },
    { skip: !currentDate || !currentPetId },
  );
  const healthRecordId = overview?.healthRecordId;
  const { data: healthRecord } = useGetHealthRecordQuery(Number(healthRecordId), {
    skip: !healthRecordId,
  });
  const [updateRecord, { isSuccess: updateSuccess }] = useUpdateHealthRecordMutation();
  const [createRecord, { isSuccess: createSuccess }] = useCreateHealthRecordMutation();

  const saveBodyWeight = (bodyWeight: number) => {
    if (!currentDate || !currentPetId) {
      return;
    }
    if (healthRecordId && healthRecord) {
      updateRecord({
        date: currentDate,
        bodyWeight,
        note: healthRecord.note,
        abnormalIds: healthRecord.abnormals.length > 0 ? healthRecord.abnormals : null,
        healthRecordId: healthRecord.healthRecordId,
      });
    } else {
      createRecord({
        date: currentDate,
        petId: currentPetId,
        bodyWeight,
      });
    }
  };

  const openModal = () => setBodyWeightModal(true);
  const closeModal = () => setBodyWeightModal(false);

  useEffect(() => {
    if (!updateSuccess) {
      return;
    }
    closeModal();
  }, [updateSuccess]);
  useEffect(() => {
    if (!createSuccess) {
      return;
    }
    closeModal();
  }, [createSuccess]);

  const Modal = () =>
    bodyWeightModal ? (
      <BodyWeightModal
        save={saveBodyWeight}
        close={closeModal}
        initBodyWeight={healthRecord?.bodyWeight}
      />
    ) : null;

  return {
    Modal,
    openModal,
    closeModal,
  };
}
