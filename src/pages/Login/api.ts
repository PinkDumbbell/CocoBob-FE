import axios from '@/utils/api';

export async function checkEmailDuplicated(email: string) {
  try {
    const { data } = await axios.get(`/v1/users/email?email=${email}`);
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
