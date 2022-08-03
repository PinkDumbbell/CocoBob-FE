import AddPetBUtton from './components/AddPetButton';
import PetSimpleCard from './components/PetSimpleInfo';
import { mockPets } from './Main';

export default function PetsPage() {
  return (
    <div className="w-full h-full p-4 bg-gray-100 space-y-4">
      <div className="flex">
        <AddPetBUtton />
      </div>
      <div className="flex flex-col gap-4">
        {[...mockPets].map((pet) => (
          <div
            key={pet.id}
            className="w-full flex flex-col px-4 bg-white rounded-lg shadow-md shadow-gray-300"
          >
            <div className="flex py-4 gap-5 border-b border-gray-200">
              <PetSimpleCard
                name={pet.name}
                age={pet.age}
                bodyWeight={pet.bodyWeight}
                breed={pet.breed}
                sex={pet.sex}
                profilePath={pet.profilePath}
              />
            </div>
            <div className="py-4 ">세부정보</div>
          </div>
        ))}
      </div>
    </div>
  );
}
