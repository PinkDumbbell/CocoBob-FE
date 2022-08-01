type sizeType = '초소형' | '소형' | '중형' | '대형' | '초대형';
export type ActivityLevelType = 1 | 2 | 3 | 4 | 5;

export interface IBreeds {
  id: number;
  name: string;
  size: sizeType;
}

export type PetSexType = 'FEMALE' | 'MALE' | '';
export interface IPet {
  petId: number;
  petName: string;
  petSex: PetSexType;
  petAge: number;
  petBirthday: string;
  petAllergy: string[];
  petBreed: IBreeds | null;
  isSpayed: boolean;
  isPregnant: boolean;
  bodyWeight: number;
  activityLevel: ActivityLevelType;
}
