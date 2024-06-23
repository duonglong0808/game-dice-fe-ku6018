import { BaseAxios } from '@/lib';

export const transferPoint = async (
  isToMain: boolean,
  username: string,
  game: string,
  points: number
) => {
  const axios = new BaseAxios();
  return axios.patch('/user-point', {
    isToMain,
    username,
    game,
    points,
  });
};
