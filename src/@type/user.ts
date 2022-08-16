import { ISimplePet } from './pet';

export interface IUser {
  userId: number | null;
  name: string | null;
  email: string | null;
  representativeAnimalId: number | null;
  pets: ISimplePet[];
}

export interface IAuthenticatedUser {
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | undefined | null;
  email: string;
  role: 'USER' | 'ADMIN' | 'NONE';
  userId: number | null;
  username: string;
}
export type AppleUserNameType = {
  firstName: string;
  lastName: string;
};
export type AppleAuthorizationType = {
  code: string;
  id_token: string;
};
export type AppleUserType = {
  email: string;
  name: AppleUserNameType;
};
export interface AppleSignInResponse {
  authorization: AppleAuthorizationType;
  user?: AppleUserType;
}
