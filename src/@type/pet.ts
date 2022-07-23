export type ActivityLevelType = 1 | 2 | 3 | 4 | 5;
export interface IPet {
  petId: number;
  petName: string;
  petSex: 'male' | 'female' | '';
  petAge: number;
  petBirthday: string;
  petAllergy: string[];
  petBreed: string;
  isSpayed: boolean;
  isPregnant: boolean;
  bodyWeight: number;
  activityLevel: ActivityLevelType;
}
