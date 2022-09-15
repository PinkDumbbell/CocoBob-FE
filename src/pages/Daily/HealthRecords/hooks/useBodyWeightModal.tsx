import { useState } from 'react';
import DailyBodyWeight from '@/pages/Daily/components/DailyAddBodyWeight';
import { DailyItemType } from '@/store/api/dailyApi';

export default function useBodyWeight(petId: number, date: Date, healthData: DailyItemType) {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);
  const Modal = () => (
    <DailyBodyWeight closeModal={closeModal} date={date} petId={petId} todayDaily={healthData} />
  );
  return { modalOpen, openModal, Modal };
}
