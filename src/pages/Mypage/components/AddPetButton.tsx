import { useNavigate } from 'react-router-dom';

import addIcon from '@/assets/icon/add_icon_small.png';

export default function AddPetBUtton() {
  const navigate = useNavigate();
  const addPet = () => {
    navigate('/register');
  };
  return (
    <div className="flex items-center justify-center">
      <button type="button" onClick={addPet}>
        <img src={addIcon} alt="add-pet-icon" />
      </button>
    </div>
  );
}
