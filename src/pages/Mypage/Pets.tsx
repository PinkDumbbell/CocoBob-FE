import { useGetPetsQuery } from '@/store/api/petApi';
import AddPetBUtton from './components/AddPetButton';
import PetSimpleCard from './components/PetSimpleInfo';

export default function PetsPage() {
  const { data: pets, isSuccess } = useGetPetsQuery();

  return (
    <div className="w-full h-full p-4 bg-gray-100 space-y-4">
      <div className="flex">
        <AddPetBUtton />
      </div>
      <div className="flex flex-col gap-4">
        {isSuccess &&
          pets.map((pet) => (
            <div
              key={pet.id}
              className="w-full flex flex-col px-4 bg-white rounded-lg shadow-md shadow-gray-300"
            >
              <div className="flex py-4 gap-5 border-b border-gray-200">
                <PetSimpleCard
                  id={pet.id}
                  birthday={pet.birthday}
                  name={pet.name}
                  age={pet.age}
                  bodyWeight={pet.bodyWeight}
                  breedName={pet.breedName}
                  sex={pet.sex}
                  thumbnailPath={pet.thumbnailPath}
                />
              </div>
              <div className="py-4 ">세부정보</div>
            </div>
          ))}
      </div>
    </div>
  );
}
