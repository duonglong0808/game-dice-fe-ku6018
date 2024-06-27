import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { getHistoryDiceGame, getPointGameKuAndMain, getUserInfo } from './api';
import { setDataUserLogin } from '@/lib/redux/app/userCurrent.slice';
import { setDataDiceInitiated, updateListDataDiceDetail } from '@/lib/redux/app/diceDetail.slice';

export const handleLoginGame = async (access_token: string, dispatch: any) => {
  sessionStorage.setItem('access_token', access_token);

  // localStorage.setItem('access_token', access_token);

  const userInfo = await getUserInfo();
  if (userInfo) {
    const dataPoint = await getPointGameKuAndMain();
    dispatch(setDataUserLogin({ ...userInfo?.data, ...dataPoint.data }));
    return true;
  } else {
    return false;
  }
};
