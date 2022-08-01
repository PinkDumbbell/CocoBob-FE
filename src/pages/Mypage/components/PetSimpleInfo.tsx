import PetDefaultImage from '@/assets/image/pet_default.png';
import { ReactComponent as EditIcon } from '@/assets/icon/edit_icon.svg';
import { ReactComponent as MaleIcon } from '@/assets/icon/male_icon.svg';
import { ReactComponent as FemaleIcon } from '@/assets/icon/female_icon.svg';
import { IBreeds, PetSexType } from '@/@type/pet';

interface PetSimpleCardProps {
  profilePath?: string;
  name: string;
  age: number;
  sex: PetSexType;
  breed: IBreeds;
  bodyWeight: number;
}
export default function PetSimpleCard({
  profilePath,
  name,
  age,
  sex,
  breed,
  bodyWeight,
}: PetSimpleCardProps) {
  const years = age % 12;
  const months = Math.floor(age / 12);

  return (
    <>
      <div className="relative h-16">
        <img
          src={profilePath ?? PetDefaultImage}
          alt=""
          className="h-16 w-16 bg-gray-300 rounded-full overflow-hidden"
        />
        <button className="absolute right-0 bottom-0 w-5 h-5 bg-white border border-secondary-main rounded-md">
          <EditIcon />
        </button>
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-primary-light p-[3px]">
            {sex === 'MALE' ? <MaleIcon stroke="#1A70D2" /> : <FemaleIcon stroke="#1A70D2" />}
          </div>
          <h4>{name}</h4>
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-sm">{breed.name}</p>
          <p className="text-sm">
            {years}년 {months}개월, {bodyWeight}kg
          </p>
        </div>
      </div>
    </>
  );
}
