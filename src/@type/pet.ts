type sizeType = '초소형' | '소형' | '중형' | '대형' | '초대형';
export type ActivityLevelType = 1 | 2 | 3 | 4 | 5;

export interface IBreeds {
  id: number;
  name: string;
  size: sizeType;
}

export type PetSexType = 'FEMALE' | 'MALE' | '';
export interface ISimplePet {
  name: string;
  petId: number;
  thumbnailPath: string;
}
export interface IPet {
  id: number;
  name: string;
  sex: PetSexType;
  breedName: string;
  age: number;
  birthday: string;
  bodyWeight: number;
  thumbnailPath?: string;
}
export interface IPetInformation {
  id: number;
  name: string;
  thumbnailPath: string;
  sex: PetSexType;
  isSpayed: boolean; // 중성화
  isPregnant: boolean;
  birthday?: string;
  age: number; // months
  bodyWeight: number;
  activityLevel: ActivityLevelType; // 1~5
  fatLevel?: number;
  breedInfo: IBreeds;
}
