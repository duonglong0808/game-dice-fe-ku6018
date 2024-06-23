import { createSlice } from '@reduxjs/toolkit';

interface SettingAppSlice {
  mood: string;
  titleMessage: string;
  descMessage: string;
  showIconClosed: boolean;
  textConfirm: string;
  textClose: string;
  indexChips: number[];
}

const settingAppSlice = createSlice({
  name: 'settingApp',
  initialState: {
    mood: 'dark',
    titleMessage: '',
    descMessage: '',
    textConfirm: '',
    textClose: '',
    // mood: 'light',
    showIconClosed: false,
    indexChips: [4, 5, 6, 7, 8],
  } as SettingAppSlice,
  reducers: {
    setIndexChipsRedux: (state, action) => {
      state.indexChips = action.payload.indexChips;
    },
    setMoodApp: (state, action) => {
      state.mood = action.payload;
    },
    setMessageApp: (
      state,
      action: {
        payload: {
          titleMessage: string;
          descMessage: string;
          textConfirm: string;
          textClose: string;
          showIconClosed?: boolean;
        };
      }
    ) => {
      state.titleMessage = action.payload?.titleMessage;
      state.descMessage = action.payload?.descMessage;
      state.textConfirm = action.payload?.textConfirm;
      state.textClose = action.payload?.textClose;

      if (action.payload?.showIconClosed != undefined)
        state.showIconClosed = action.payload?.showIconClosed;
    },
    cleanDataMessage: (state, action) => {
      state.titleMessage = '';
      state.descMessage = '';
      state.textConfirm = '';
      state.textClose = '';
    },
  },
});

export const { setIndexChipsRedux, setMoodApp, setMessageApp, cleanDataMessage } =
  settingAppSlice.actions;

export default settingAppSlice.reducer;
