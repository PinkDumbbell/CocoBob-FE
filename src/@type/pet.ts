type BreedSizeType = '초소형' | '소형' | '중형' | '대형' | '초대형';
export type ActivityLevelType = 1 | 2 | 3 | 4 | 5;

export interface IBreeds {
  breedId: number;
  breedName: string;
  breedSize: BreedSizeType;
}

export interface IPet {
  petId: number;
  petName: string;
  petSex: 'male' | 'female' | '';
  petAge: number;
  petBirthday: string;
  petAllergy: string[];
  petBreed: IBreeds | null;
  isSpayed: boolean;
  isPregnant: boolean;
  bodyWeight: number;
  activityLevel: ActivityLevelType;
}
