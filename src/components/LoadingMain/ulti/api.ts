import { BaseAxios } from '@/lib';

export const getUserInfo = async () => {
  const axios = new BaseAxios();
  return axios.get('auth/userInfo');
};

export const getPointGameKuAndMain = async () => {
  const axios = new BaseAxios();
  return axios.get(`/user-point/game/ku-casino`);
};

export const getHistoryDiceGame = () => {
  const axios = new BaseAxios();
  return axios.get(`/dice-detail`);
};
