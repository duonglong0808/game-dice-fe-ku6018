import { BaseAxios } from '@/lib';

export const betDiceAndBaccarat = (data: any) => {
  const axios = new BaseAxios();

  return axios.post('/history-play', data);
};

export const getAllGameBaccarat = async () => {
  const axios = new BaseAxios();

  let url = `/baccarat?limit=10&page=1&sort=id&typeSort=ASC`;

  return axios.get(url);
};

export const getAllGameDice = async () => {
  const axios = new BaseAxios();
  return axios.get('/dice?sort=type&typeSort=ASC');
};

export const getHistoryBaccaratGame = () => {
  const axios = new BaseAxios();
  return axios.get(`/baccarat-detail`);
};
