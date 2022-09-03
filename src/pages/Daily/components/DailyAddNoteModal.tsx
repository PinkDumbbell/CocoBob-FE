import { useState } from 'react';
import DailyModal, { useDailyMutation, DailyModalProps } from './DailyModal';

export default function DailyAddNoteModal({
  closeModal,
  todayDaily,
  date,
  petId,
}: DailyModalProps) {
  const [note, setNote] = useState('');
  const createOrUpdateDaily = useDailyMutation();

  const saveDaily = () => {
    const newDaily = {
      ...todayDaily?.data,
    };
    newDaily.note = note;

    createOrUpdateDaily(newDaily, petId, date, todayDaily?.dailyId);
    closeModal();
  };
  return (
    <DailyModal closeModal={closeModal} onSubmit={saveDaily}>
      <div className="p-2 flex flex-col w-full items-center gap-2">
        <h3>일기 작성</h3>
        <div className="w-full flex gap-1 items-center">
          <textarea
            className="w-full h-36 border border-gray-300 rounded-[10px] p-2 resize-none"
            draggable={false}
            value={note}
            onChange={(e) => setNote(e.currentTarget.value)}
          />
        </div>
      </div>
    </DailyModal>
  );
}
