import { useState } from 'react';
import DailyAddFeed from '@/pages/Daily/components/DailyAddFeed';

export default function useFeedModal(petId: number, date: Date) {
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };
  const openModal = () => {
    setModalOpen(true);
  };
  const Modal = () => <DailyAddFeed closeModal={closeModal} date={date} petId={petId} />;

  return {
    modalOpen,
    openModal,
    closeModal,
    FeedModal: Modal,
  };
}
