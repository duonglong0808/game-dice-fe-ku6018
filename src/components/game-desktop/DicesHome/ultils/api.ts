import { BaseAxios } from '@/lib';

export const getAllGameDice = async () => {
  const axios = new BaseAxios();
  return axios.get('/dice?sort=type&typeSort=ASC');
};
