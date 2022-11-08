import { useState } from 'react';
import DailyAddFeed from '@/pages/Daily/components/DailyAddFeed';

export default function useFeedModal(petId: number | null, date: Date | null) {
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };
  const openModal = () => {
    setModalOpen(true);
  };
  const Modal = () =>
    date ? <DailyAddFeed closeModal={closeModal} date={date} petId={petId} /> : null;

  return {
    modalOpen,
    openModal,
    closeModal,
    FeedModal: Modal,
  };
}
