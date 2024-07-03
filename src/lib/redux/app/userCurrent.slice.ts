import { createSlice } from '@reduxjs/toolkit';

interface UserCurrentSliceDto {
  userName: string;
  userId: string;
  name: string;
  mainPoint: number;
  gamePoint: number;
}

const userCurrentSlice = createSlice({
  name: 'user',
  initialState: {
    userName: '',
    userId: '',
    name: '',
    gamePoint: 0,
    mainPoint: 0,
  } as UserCurrentSliceDto,
  reducers: {
    setDataUserLogin(state, action) {
      state.name = action.payload.name;
      state.userId = action.payload.id;
      state.userName = action.payload.username;
      state.gamePoint = action.payload.gamePoint;
      state.mainPoint = action.payload.mainPoint;
    },
    updatePointUser(state, action: { payload: { gamePoint?: number; mainPoint?: number } }) {
      if (action.payload.gamePoint) {
        state.gamePoint = state.gamePoint + action.payload.gamePoint;
      }
      if (action.payload.mainPoint) {
        state.mainPoint = state.mainPoint + action.payload.mainPoint;
      }
    },
    logOutUser(state) {
      state.userName = '';
      state.name = '';
      state.userId = '';
    },
  },
});

export const { setDataUserLogin, logOutUser, updatePointUser } = userCurrentSlice.actions;

export default userCurrentSlice.reducer;
