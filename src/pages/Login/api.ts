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
    if (response.data.code === 'EMAIL_DUPLICATED')
      return { isAvailable: false, message: response.data.message };

    return null;
  }
}
