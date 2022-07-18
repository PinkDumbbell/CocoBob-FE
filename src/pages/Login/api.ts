import axios from '@/utils/api';

export async function checkEmailDuplicated(email: string) {
  try {
    console.log(email);
    await axios.get(`/users/email?email=${email}`);
    return true;
  } catch (error: any) {
    if (error.response.data.code === 'EMAIL_DUPLICATED') return false;

    console.log(error);
    return false;
  }
}
