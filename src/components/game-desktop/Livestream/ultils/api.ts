import { BaseAxios } from '@/lib';

export const betGameDice = async (data: any) => {
  const axios = new BaseAxios();
  return await axios.post('/history-play', data);
};
