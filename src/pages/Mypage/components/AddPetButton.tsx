import HeaderAddPetButton from './HeaderAddPetButton';

export default function AddPetBUtton() {
  return (
    <div>
      <div className="flex flex-col h-28 w-60 rounded border border-secondary-brightest justify-center items-center shadow-gray-300 shadow-md ">
        <HeaderAddPetButton>
          <p className="text-primary-dark">새 가족을 소개해주세요</p>
        </HeaderAddPetButton>
      </div>
    </div>
  );
}
