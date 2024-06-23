import { useAppDispatch, useAppSelector } from '@/lib';
import { useEffect } from 'react';
import { TypeGameBaccarat } from '@/constants';
import { getAllGameBaccarat, getHistoryBaccaratGame } from './api';
import { setDataBaccarat } from '@/lib/redux/app/baccaratGame.slice';
import { setDataBaccaratInitiated } from '@/lib/redux/app/baccaratDetail.slice';

const generateBaccarat = () => {
  let number = 0;
  while (number < 200) {
    number += Math.floor(Math.random() * 100);
  }
  return number;
};

export const useBaccaratGame = () => {
  const { isInitData, baccaratGame } = useAppSelector((state) => state.baccaratGame);
  console.log('🚀 ~ useBaccaratGame ~ isInitData:', isInitData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      if (!isInitData) {
        console.log('aaaa');
        const res = await getAllGameBaccarat();
        const { data } = res.data;
        if (data) {
          dispatch(
            setDataBaccarat({
              data,
            })
          );
        }
      }
    }

    fetchData();
  }, [isInitData]);

  return {
    data: baccaratGame.map((baccarat) => {
      let typeGameText = 'MC Baccarat';
      switch (baccarat.type) {
        case TypeGameBaccarat.flash:
          typeGameText = 'Baccarat tốc độ';
          break;
        case TypeGameBaccarat.mi:
          typeGameText = 'Mi Baccarat';
          break;
        default:
          break;
      }

      return {
        id: baccarat.id,
        name: baccarat.name,
        typeText: typeGameText,
        type: baccarat.type,
        nameAuthor: baccarat.nameAuthor,
        national: baccarat.nationalAuthor,
        image: baccarat.avtAuthor,
        valueB: generateBaccarat(),
        valueP: generateBaccarat(),
        valueT: generateBaccarat(),
      };
    }),
  };
};

export const useInitDataBaccarat = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      const dataDice = await getHistoryBaccaratGame();
      // console.log('🚀 ~ dataDice?.data?.dataHistory:', dataDice?.data?.dataHistory);

      const dataBaccaratDetail = dataDice?.data?.dataHistory?.map((item: any) => {
        return {
          ...item,
          baccaratDetailId: item?.id,
        };
      });
      dispatch(setDataBaccaratInitiated({ dataBaccaratDetail: dataBaccaratDetail || [] }));
    }

    fetchData();
  }, []);

  return true;
};
