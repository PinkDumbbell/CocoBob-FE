import { createAsyncThunk } from '@reduxjs/toolkit';

const UserService = {
  /**
   * Get User
   */
  // eslint-disable-next-line no-unused-vars
  getUser: createAsyncThunk('user/getUser', async (userId: string, thunkApi) => {
    const data = {
      id: userId,
      name: 'user',
    };
    return data;
  }),
};
export default UserService;
