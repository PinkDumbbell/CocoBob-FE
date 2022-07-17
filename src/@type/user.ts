import { IGenericResponse } from '@/store/api/types';
import { IPet } from './pet';

export interface IUser {
  userId: number;
  name: string;
  email: string;
  representativeAnimal: IPet;
}
export interface IUserLoginResponse extends IGenericResponse {
  userId: number;
  accessToken: string;
  refreshToken: string;
}
