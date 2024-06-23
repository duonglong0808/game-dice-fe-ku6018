import { getHistoryDiceGame } from '@/components/LoadingMain/ulti/api';
import { useAppDispatch } from '@/lib';
import { setDataDiceInitiated } from '@/lib/redux/app/diceDetail.slice';
import { useEffect } from 'react';

export const useInitDataDice = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      const dataDice = await getHistoryDiceGame();
      // console.log('🚀 ~ dataDice?.data?.dataHistory:', dataDice?.data?.dataHistory);

      const dataDiceDetail = dataDice?.data?.dataHistory?.map((item: any) => {
        return {
          ...item,
          diceDetailId: item?.id,
        };
      });
      dispatch(setDataDiceInitiated({ dataDiceDetail: dataDiceDetail || [] }));
    }

    fetchData();
  }, []);

  return true;
};
