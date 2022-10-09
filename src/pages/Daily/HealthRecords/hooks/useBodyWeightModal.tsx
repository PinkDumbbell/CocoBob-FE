import { useState } from 'react';
import DailyBodyWeight from '@/pages/Daily/components/DailyAddBodyWeight';

export default function useBodyWeight(petId: number, date: Date, healthData: any) {
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);
  const Modal = () => (
    <DailyBodyWeight closeModal={closeModal} date={date} petId={petId} healthRecord={healthData} />
  );
  return { modalOpen, openModal, Modal };
}
