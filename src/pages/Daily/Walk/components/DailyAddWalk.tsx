import { useState } from 'react';
import { useForm } from 'react-hook-form';

import DailyModal, { DailyModalProps } from '@/pages/Daily/components/DailyModal';
import FormInput from '@/components/Form/FormInput';
import { getTimeDiff } from '@/utils/libs/time';
import { concatClasses } from '@/utils/libs/concatClasses';

export type WalkRecordType = {
  distance: number;
  totalTime: number;
  startedAt?: string;
  finishedAt?: string;
};

type DailyAddWalkModalProps = DailyModalProps & {
  // eslint-disable-next-line no-unused-vars
  onSave: (walkRecord: WalkRecordType) => void;
};
export default function DailyAddWalkModal({ closeModal, onSave }: DailyAddWalkModalProps) {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<WalkRecordType>();
  const distanceError = errors.distance;

  const [optionalInput, setOptionalInput] = useState(1);

  const saveWalk = () => {
    const startedAt = `${getValues('startedAt')}:00`;
    const finishedAt = `${getValues('finishedAt')}:00`;

    const newWalk = new Map();
    newWalk.set('distance', getValues('distance'));

    if (optionalInput === 1) {
      newWalk.set('startedAt', startedAt);
      newWalk.set('finishedAt', finishedAt);
      newWalk.set('totalTime', getTimeDiff(startedAt, finishedAt));
    } else if (optionalInput === 2) {
      newWalk.set('totalTime', getValues('totalTime'));
    }

    onSave(Object.fromEntries(newWalk));
  };

  return (
    <DailyModal closeModal={closeModal} onSubmit={handleSubmit(saveWalk)}>
      <div className="p-2 flex flex-col w-full items-center gap-2">
        <h3>산책기록</h3>
        <div className="flex flex-col space-y-4">
          <FormInput
            name="distance"
            label="산책거리"
            unit="KM"
            type="number"
            rules={register('distance', {
              required: '산책 거리를 입력해주세요.',
              valueAsNumber: true,
              pattern: /^(0|[1-9]\d*)(\.\d+)?$/,
              validate: (value) => (value > 0 ? true : '거리는 0보다 커야합니다.'),
            })}
            errorMessage={distanceError?.message}
          />
          <div className="border-t border-t-secondary-brightest w-full flex">
            <div
              className={concatClasses(
                'flex-1 flex items-center border-b-2 justify-center border-r-1 py-2 cursor-pointer',
                optionalInput === 1
                  ? 'text-primary-bright border-b-primary-bright'
                  : 'text-secondary-brightest border-b-secondary-brightest',
              )}
              onClick={() => setOptionalInput(1)}
            >
              시작/끝
            </div>
            <div
              className={concatClasses(
                'flex-1 flex items-center border-b-2 justify-center py-2 cursor-pointer',
                optionalInput === 2
                  ? 'text-primary-bright border-b-primary-bright'
                  : 'text-secondary-brightest border-b-secondary-brightest',
              )}
              onClick={() => setOptionalInput(2)}
            >
              총 시간
            </div>
          </div>
          {optionalInput === 1 && (
            <>
              <div className="flex">
                <FormInput
                  name="startedAt"
                  label="시작시간"
                  type="time"
                  rules={register('startedAt', { required: optionalInput === 1 })}
                />
                <FormInput
                  name="finishedAt"
                  label="끝난시간"
                  type="time"
                  rules={register('finishedAt', { required: optionalInput === 1 })}
                />
              </div>
            </>
          )}
          {optionalInput === 2 && (
            <div className="flex">
              <FormInput
                name="totalTime"
                label="총 산책 시간"
                type="number"
                unit="min"
                rules={register('totalTime', {
                  required: optionalInput === 2,
                  valueAsNumber: true,
                  pattern: /^(0|[1-9]\d*)(\.\d+)?$/,
                  validate: (value) => (value && value > 0 ? true : '시간은 0보다 커야합니다.'),
                })}
              />
            </div>
          )}
        </div>
      </div>
    </DailyModal>
  );
}
