import { IGenericResponse } from '@/utils/api/types';

export interface IPet extends IGenericResponse {
  petId: number;
  petName: string;
  petAge: number;
  petAllergy: string[];
}
