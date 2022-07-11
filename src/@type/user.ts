import { IGenericResponse } from '@/utils/api/types';
import { IPet } from './pet';

export interface IUser extends IGenericResponse {
  code: number;
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
