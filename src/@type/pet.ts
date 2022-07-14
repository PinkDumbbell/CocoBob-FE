export type ActivityLevelType = 1 | 2 | 3 | 4 | 5;
export interface IPet {
  petId: number;
  petName: string;
  petAge: number;
  petAllergy: string[];
  petBreed: string;
  spayed: boolean;
  pregnant: boolean;
  bodyWeight: number;
  activityLevel: ActivityLevelType;
}
