export default function AddPetBUtton() {
  return (
    <div className="flex p-6 rounded-lg border items-center gap-2 shadow-gray-300 shadow-md cursor-pointer">
      <div className="flex flex-1 rounded-full h-16 w-16 bg-gray-200 flex justify-center items-center">
        +
      </div>
      <div className="flex flex-2 flex-col">
        <span>새로운 가족을 </span>
        <span>소개해 주세요!</span>
      </div>
    </div>
  );
}
