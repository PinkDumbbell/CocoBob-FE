import { IGenericResponse } from '@/store/api/types';
import { IPet } from './pet';

export interface IUser {
  userId: number;
  name: string;
  email: string;
  representativePet: IPet;
}
export interface IAuthenticatedUser {
  accessToken: string | null;
  refreshToken: string | undefined | null;
  email: string;
  role: 'USER' | 'ADMIN' | 'NONE';
  userId: number | null;
  username: string;
}
export interface IUserLoginResponse extends IGenericResponse, IAuthenticatedUser {}
