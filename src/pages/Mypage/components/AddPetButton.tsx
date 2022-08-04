import { useNavigate } from 'react-router-dom';

export default function AddPetBUtton() {
  const navigate = useNavigate();
  const addPet = () => {
    navigate('/register');
  };
  return (
    <div
      className="flex w-full p-6 rounded-lg border items-center gap-2 shadow-gray-300 shadow-md cursor-pointer bg-white"
      onClick={addPet}
    >
      <div className="flex  rounded-full h-16 w-16 bg-gray-100 flex justify-center items-center">
        +
      </div>
      <div className="flex flex-1 flex-wrap items-center justify-center gap-1">
        <span>새로운 가족을 </span>
        <span>소개해 주세요!</span>
      </div>
    </div>
  );
}
