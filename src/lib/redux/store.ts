import { configureStore } from '@reduxjs/toolkit';
import settingAppReduce from './system/settingSys';
import userCurrentReduce from './app/userCurrent.slice';
import diceGameReduce from './app/diceGame.slice';
import diceDetailReduce from './app/diceDetail.slice';
import baccaratGameReduce from './app/baccaratGame.slice';
import baccaratDetailReduce from './app/baccaratDetail.slice';
export const makeStore = () => {
  return configureStore({
    reducer: {
      settingApp: settingAppReduce,
      userCurrent: userCurrentReduce,
      diceGame: diceGameReduce,
      diceDetail: diceDetailReduce,
      baccaratGame: baccaratGameReduce,
      baccaratDetail: baccaratDetailReduce,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
