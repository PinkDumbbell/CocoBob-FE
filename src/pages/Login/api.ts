import axios from '@/utils/api';

export async function checkEmailDuplicated(email: string) {
  try {
    const { data } = await axios.get('/users/email', {
      params: {
        email,
      },
    });
    if (!data.isAvailable) return false;

    return true;
  } catch (error: any) {
    if (error.response.data.code === 'EMAIL_DUPLICATED') return false;

    console.log(error);
    return false;
  }
}
