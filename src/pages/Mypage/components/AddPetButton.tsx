import { useNavigate } from 'react-router-dom';

import addIcon from '@/assets/icon/add_icon_small.png';

export default function AddPetBUtton() {
  const navigate = useNavigate();
  const addPet = () => {
    navigate('/register');
  };
  return (
    <div className="min-w-[15rem] h-full rounded-lg border items-center gap-3 shadow-gray-300 shadow-md overflow-hidden">
      <button
        type="button"
        onClick={addPet}
        className="flex flex-col gap-2 justify-center items-center w-full h-full"
      >
        <img src={addIcon} alt="add-pet-icon" />
        <p className="text-primary-dark">새 가족을 소개해주세요</p>
      </button>
    </div>
  );
}
