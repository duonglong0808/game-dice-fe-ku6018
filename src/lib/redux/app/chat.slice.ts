import { createSlice } from '@reduxjs/toolkit';

const mockNames = [
  'Alice',
  'Bob',
  'Charlie',
  'David',
  'Eve',
  'Frank',
  'Grace',
  'Heidi',
  'Ivan',
  'Judy',
];
const mockMessages = [
  'Hello!',
  'How are you?',
  'Good luck!',
  "What's up?",
  'Nice move!',
  "Let's play!",
  "I'm in.",
  'Great!',
  'Interesting!',
  'Wow!',
];

const mockData: DataSendMessage[] = [];

// for (let i = 0; i < 100; i++) {
//   const mockMessage: DataSendMessage = {
//     group: Math.random() > 0.5 ? 'dice' : 'baccarat',
//     content: mockMessages[Math.floor(Math.random() * mockMessages.length)],
//     sender: mockNames[Math.floor(Math.random() * mockNames.length)],
//     timeSend: '11:11',
//   };

//   mockData.push(mockMessage);
// }

export interface DataSendMessage {
  group: string;
  content: string;
  // typeMessage: string;
  sender: string;
  timeSend: string;
}

interface ChatGameSliceDto {
  chatGame: DataSendMessage[];
}

const chatGameSlice = createSlice({
  name: 'chatGame',
  initialState: {
    chatGame: mockData,
  } as ChatGameSliceDto,
  reducers: {
    addMessageGame: (
      state,
      actions: {
        payload: DataSendMessage;
      }
    ) => {
      const date = new Date();
      state.chatGame = [
        ...state.chatGame,
        {
          ...actions.payload,
          timeSend: `${date.getHours()}:${date.getMinutes()}`,
        },
      ];
    },
  },
});

export const { addMessageGame } = chatGameSlice.actions;

export default chatGameSlice.reducer;
