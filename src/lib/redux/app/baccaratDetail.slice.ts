// import { StatusBaccaratDetail } from '@/constants';
import { StatusBaccarat } from '@/constants';
import { createSlice } from '@reduxjs/toolkit';

export interface BaccaratDetailDto {
  gameBaccaratId: number;
  baccaratDetailId: number;
  transaction: number;
  mainTransaction: string;
  status: number | string;
  pointPlayer: number;
  pointBanker: number;
  dateId: number;
  pokerBanker?: string[];
  pokerPlayer?: string[];
  arrBetActive: string[];
}

interface BaccaratDetailSlice {
  dataBaccaratDetail: BaccaratDetailDto[];
  dataBaccaratDetailCurrent: BaccaratDetailDto[];
  dataBetCurrent: { point: number; answer: number }[];
}

const BaccaratDetailSlice = createSlice({
  name: 'baccaratDetail',
  initialState: {
    dataBaccaratDetail: [],
    refreshDataBaccaratDetail: true,
    dataBaccaratDetailCurrent: [],
    dataBetCurrent: [],
  } as BaccaratDetailSlice,
  reducers: {
    setDataBaccaratInitiated: (state, action) => {
      if (!state.dataBaccaratDetail.length) {
        state.dataBaccaratDetail = action.payload.dataBaccaratDetail;
      }
    },
    updateListDataBaccaratDetail: (state, action) => {
      // console.log('🚀 ~ action.payload.dataBaccaratDetail:', action.payload.dataBaccaratDetail);
      state.dataBaccaratDetail = [
        ...action.payload.dataBaccaratDetail.filter(
          (i: BaccaratDetailDto) => i.status == StatusBaccarat.end
        ),
        ...state.dataBaccaratDetail,
      ];
    },

    updateListDataBaccaratCurrent: (state, action) => {
      // console.log('🚀 ~ action.payload.dataBaccaratDetail:', action.payload.dataBaccaratDetail);
      state.dataBaccaratDetailCurrent = action.payload.dataBaccaratDetail;
    },
    updateOrAddDataBaccaratDetail: (state, action: { payload: BaccaratDetailDto }) => {
      // console.log('🚀 ~ action.payload:', action.payload);
      if (action.payload.status == StatusBaccarat.end) {
        const checkExit = state.dataBaccaratDetail.findIndex(
          (d) => d.gameBaccaratId === +action.payload.gameBaccaratId
        );
        if (checkExit) {
          state.dataBaccaratDetail = state.dataBaccaratDetail.map((item) => {
            if (item.baccaratDetailId == action.payload.baccaratDetailId)
              return { ...item, ...action.payload };
            else return item;
          });
        } else {
          state.dataBaccaratDetail = [...state.dataBaccaratDetail, action.payload];
        }
      }
    },
    updateOrAddDataBaccaratDetailCurrent: (state, action: { payload: BaccaratDetailDto }) => {
      const checkExit = state.dataBaccaratDetailCurrent.find(
        (d) => d.gameBaccaratId == action.payload.gameBaccaratId
      );
      if (checkExit) {
        state.dataBaccaratDetailCurrent = state.dataBaccaratDetailCurrent.map((item) => {
          if (item.gameBaccaratId == action.payload.gameBaccaratId)
            return { ...item, ...action.payload };
          else return item;
        });
      } else {
        state.dataBaccaratDetailCurrent = [...state.dataBaccaratDetailCurrent, action.payload];
      }
    },

    updateDataBetBaccarat: (state, action: { payload: { point: number; answer: number } }) => {
      const { point, answer } = action.payload;
      if (point) {
        const existingBet = state.dataBetCurrent.find((bet) => bet.answer === answer);

        if (existingBet) {
          state.dataBetCurrent = state.dataBetCurrent.map((bet) => {
            if (bet.answer === answer) {
              return { ...bet, point: bet.point + point };
            }
            return bet;
          });
        } else {
          state.dataBetCurrent = [...state.dataBetCurrent, { point: point, answer }];
        }
      }
    },

    resetDataBetBaccarat: (state) => {
      if (state.dataBetCurrent) {
        state.dataBetCurrent = [];
      }
    },
  },
});

export const {
  updateOrAddDataBaccaratDetail,
  updateListDataBaccaratDetail,
  setDataBaccaratInitiated,
  updateOrAddDataBaccaratDetailCurrent,
  updateListDataBaccaratCurrent,
  updateDataBetBaccarat,
  resetDataBetBaccarat,
} = BaccaratDetailSlice.actions;

export default BaccaratDetailSlice.reducer;
