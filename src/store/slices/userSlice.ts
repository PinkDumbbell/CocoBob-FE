import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '@/@type/user';
import { userApiSlice } from '../api/userApi';

export type UserState = {
  user: IUser | null;
};

const initialState: UserState = {
  user: {
    userId: null,
    email: null,
    name: null,
    representativeAnimalId: null,
    pets: [],
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserAction(state: UserState, action: PayloadAction<IUser>) {
      const { payload } = action;
      state.user = payload;
    },
    setRepresentativePet(state: UserState, action: PayloadAction<{ petId: number }>) {
      if (state.user) {
        state.user.representativeAnimalId = action.payload.petId;
      }
    },
    logoutAction() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder.addMatcher(userApiSlice.endpoints.getUser.matchFulfilled, (state, response) => {
      userSlice.caseReducers.setUserAction(state, response);
    });
  },
});

const { reducer, actions } = userSlice;
export const { setUserAction, logoutAction, setRepresentativePet } = actions;
export default reducer;
