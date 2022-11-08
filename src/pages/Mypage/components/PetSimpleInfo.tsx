import PetDefaultImage from '@/assets/image/pet_default.png';
import { ReactComponent as MaleIcon } from '@/assets/icon/male_icon.svg';
import { ReactComponent as FemaleIcon } from '@/assets/icon/female_icon.svg';
import { IPet } from '@/@type/pet';

export default function PetSimpleCard({
  name,
  age,
  bodyWeight,
  breedName,
  sex,
  thumbnailPath,
}: IPet) {
  const years = Math.floor(age / 12);
  const months = age % 12;
  const ageInformation = `${years > 0 ? `${years}년` : ''} ${months}개월`;
  return (
    <>
      <div className="relative h-full w-24 flex items-center">
        <img
          src={thumbnailPath ?? PetDefaultImage}
          alt="반려동물 프로필 사진"
          className="w-16 aspect-square bg-gray-300 rounded-full overflow-hidden"
        />
      </div>
      <div className="w-full flex flex-col gap-1.5 overflow-hidden">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-primary-light p-[3px]">
            {sex === 'MALE' ? <MaleIcon stroke="#1A70D2" /> : <FemaleIcon stroke="#1A70D2" />}
          </div>
          <h4>{name}</h4>
        </div>
        <div className="block">
          <div className="text-sm whitespace-nowrap text-ellipsis overflow-hidden">{breedName}</div>
          <p className="text-sm">
            {ageInformation}, {bodyWeight}kg
          </p>
        </div>
      </div>
    </>
  );
}
