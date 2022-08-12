import { IAuthenticatedUser } from '@/@type/user';
import axios from '@/utils/api';

export async function checkEmailDuplicated(email: string) {
  try {
    const { data } = await axios.get(`/users/email?email=${email}`);
    return {
      isAvailable: true,
      message: data.message,
    };
  } catch (error: any) {
    const { response } = error;
    if (response.data.status === 409) return { isAvailable: false, message: response.data.message };

    return { isAvailable: false, message: '알 수 없는 에러가 발생하였습니다.' };
  }
}
export async function googleLogin(): Promise<IAuthenticatedUser> {
  const { data } = await axios.get('/users/google', { headers: { mode: 'no-cors' } });
  return data;
}
export async function kakaoLogin(): Promise<IAuthenticatedUser> {
  const { data } = await axios.get('/users/kakao');
  return data;
}
