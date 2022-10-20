import dayjs from 'dayjs';
import { HealthRecordRequestType, useCreateHealthRecordMutation } from '@/store/api/dailyApi';

export default function useHealthRecordyMutation() {
  const [create] = useCreateHealthRecordMutation();

  const createHealthRecord = (healthRecord: HealthRecordRequestType) => {
    const { date, petId, abnormalIds, bodyWeight, images, note } = healthRecord;
    create({
      date: dayjs(date).format('YYYY-MM-DD'),
      petId,
      abnormalIds,
      bodyWeight,
      images,
      note,
    });
  };
  const updateHealthRecord = (healthRecordId: number, healthRecord: HealthRecordRequestType) => {
    // TODO: update mutation
    // update({
    //   dailyId,
    //   body: {
    //     data: JSON.stringify(newDaily),
    //     date: dayjs(date).format('YYYY-MM-DD'),
    //   },
    // });
  };
  const createOrUpdateDaily = (healthRecord: HealthRecordRequestType, healthRecordId?: number) => {
    if (!healthRecordId) createHealthRecord(healthRecord);
    else if (healthRecordId) updateHealthRecord(healthRecordId, healthRecord);
  };
  return createOrUpdateDaily;
}
