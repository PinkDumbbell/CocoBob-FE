import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '@/@type/user';
import { userApiSlice } from '../api/userApi';
import { RootState } from '../config';

export type UserState = {
  user: IUser | null;
  currentPet: number | null;
};

const initialState: UserState = {
  user: {
    userId: null,
    email: null,
    name: null,
    representativeAnimalId: null,
    pets: [],
  },
  currentPet: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserAction(state: UserState, action: PayloadAction<IUser>) {
      const { payload } = action;
      state.user = payload;
      state.currentPet = payload.representativeAnimalId;
    },
    setRepresentativePet(state: UserState, action: PayloadAction<{ petId: number }>) {
      if (state.user) {
        state.user.representativeAnimalId = action.payload.petId;
      }
    },
    logoutAction() {
      return initialState;
    },
    setCurrentPet(state: UserState, action: PayloadAction<{ petId: number }>) {
      const {
        payload: { petId },
      } = action;
      state.currentPet = petId;
    },
  },
  extraReducers(builder) {
    builder.addMatcher(userApiSlice.endpoints.getUser.matchFulfilled, (state, response) => {
      userSlice.caseReducers.setUserAction(state, response);
    });
  },
});

const { reducer, actions } = userSlice;
export const getCurrentPet = (state: RootState) => state.user.user?.representativeAnimalId ?? null;
export const { setUserAction, logoutAction, setRepresentativePet, setCurrentPet } = actions;
export default reducer;
