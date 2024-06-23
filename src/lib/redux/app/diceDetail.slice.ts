import { StatusDiceDetail } from '@/constants';
import { createSlice } from '@reduxjs/toolkit';

export interface DiceDetailDto {
  gameDiceId: number;
  status: string | number;
  totalRed: number;
  transaction: number;
  mainTransaction: number;
  diceDetailId: number;
  arrBetActive: string[];
}

interface DiceDetailSlice {
  indexChips: number[];
  dataDiceDetail: DiceDetailDto[];
  dataDiceDetailCurrent: DiceDetailDto[];
  dataBetCurrent: { point: number; answer: number }[];
}

const DiceDetailSlice = createSlice({
  name: 'diceDetail',
  initialState: {
    indexChips: [4, 5, 6, 7, 8],
    dataDiceDetail: [],
    // dataDiceDetailHistory: [],
    refreshDataDiceDetail: true,
    dataDiceDetailCurrent: [],
    dataBetCurrent: [],
  } as DiceDetailSlice,
  reducers: {
    setDataDiceInitiated: (state, action) => {
      if (!state.dataDiceDetail.length) {
        state.dataDiceDetail = action.payload.dataDiceDetail;
      }
    },
    updateListDataDiceDetail: (state, action) => {
      // console.log('🚀 ~ action.payload.dataDiceDetail:', action.payload.dataDiceDetail);
      state.dataDiceDetail = [
        ...action.payload.dataDiceDetail.filter(
          (i: DiceDetailDto) => i.status == StatusDiceDetail.end
        ),
        ...state.dataDiceDetail,
      ];
    },

    updateListDataDiceCurrent: (state, action) => {
      // console.log('🚀 ~ action.payload.dataDiceDetail:', action.payload.dataDiceDetail);
      state.dataDiceDetailCurrent = action.payload.dataDiceDetail;
    },
    updateOrAddDataDiceDetail: (state, action: { payload: DiceDetailDto }) => {
      // console.log('🚀 ~ action.payload:', action.payload);
      if (action.payload.status == StatusDiceDetail.end) {
        const checkExit = state.dataDiceDetail.findIndex(
          (d) => d.gameDiceId === +action.payload.gameDiceId
        );
        if (checkExit) {
          state.dataDiceDetail = state.dataDiceDetail.map((item) => {
            if (item.diceDetailId == action.payload.diceDetailId)
              return { ...item, ...action.payload };
            else return item;
          });
        } else {
          state.dataDiceDetail = [...state.dataDiceDetail, action.payload];
        }
      }
    },
    updateOrAddDataDiceDetailCurrent: (state, action: { payload: DiceDetailDto }) => {
      const checkExit = state.dataDiceDetailCurrent.find(
        (d) => d.gameDiceId == action.payload.gameDiceId
      );
      if (checkExit) {
        state.dataDiceDetailCurrent = state.dataDiceDetailCurrent.map((item) => {
          if (item.gameDiceId == action.payload.gameDiceId) return { ...item, ...action.payload };
          else return item;
        });
      } else {
        state.dataDiceDetailCurrent = [...state.dataDiceDetailCurrent, action.payload];
      }
    },

    updateDataBetDice: (state, action: { payload: { point: number; answer: number } }) => {
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

    resetDataBetDice: (state) => {
      if (state.dataBetCurrent) {
        state.dataBetCurrent = [];
      }
    },
  },
});

export const {
  updateOrAddDataDiceDetail,
  updateListDataDiceDetail,
  setDataDiceInitiated,
  updateOrAddDataDiceDetailCurrent,
  updateListDataDiceCurrent,
  updateDataBetDice,
  resetDataBetDice,
} = DiceDetailSlice.actions;

export default DiceDetailSlice.reducer;
