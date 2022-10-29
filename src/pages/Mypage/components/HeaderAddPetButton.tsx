import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import addIcon from '@/assets/icon/add_icon_small.png';

export default function HeaderAddPetButton({ children }: { children?: ReactNode }) {
  const navigate = useNavigate();
  const addPet = () => {
    navigate('/register');
  };
  return (
    <button
      type="button"
      onClick={addPet}
      className="flex flex-col gap-1 justify-center items-center w-full h-full"
    >
      <img src={addIcon} alt="add-pet-icon" />
      {children}
    </button>
  );
}
