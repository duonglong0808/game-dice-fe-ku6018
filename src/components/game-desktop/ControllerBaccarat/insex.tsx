'use client';
import { useEffect, useRef, useState } from 'react';
import { TableItemBaccarat } from '../TableItemBacarat';
import styles from './styles.module.scss';
import classNames from 'classnames/bind';
import { SelectChipsAndChosesChip } from '../SelectChipsAndChosesChip';
import { useAppDispatch, useAppSelector } from '@/lib';
import CountDownBetBaccarat from '@/components/game/CountDownBaccarat';
import { StatusBaccarat } from '@/constants';
import { ResultGameBaccarat } from '@/components/game-baccarat/ResultGameBaccarat';
import { resetDataBetBaccarat, updateDataBetBaccarat } from '@/lib/redux/app/baccaratDetail.slice';

const cx = classNames.bind(styles);

export function ControllerBaccarat(): JSX.Element {
  const [typePlay, setTypePlay] = useState('old');
  const [totalBet, setTotalBet] = useState(0);
  const [curChip, setCurrChip] = useState(0);
  const { dataBaccaratDetailCurrent, dataBetCurrent } = useAppSelector(
    (state) => state.baccaratDetail
  );
  const { gameBaccaratId } = useAppSelector((state) => state.baccaratGame);
  const dataBaccaratDetailById = dataBaccaratDetailCurrent.find(
    (d) => d.gameBaccaratId == gameBaccaratId
  );
  const dataStatusBaccarat =
    typeof dataBaccaratDetailById?.status == 'string'
      ? dataBaccaratDetailById?.status?.split(':')
      : [dataBaccaratDetailById?.status];
  const statsBaccaratDetail = Number(dataStatusBaccarat[0]);
  const statsBaccaratDetailRef = useRef(statsBaccaratDetail);
  const timeStartBet = Number(dataStatusBaccarat[1]);
  const timeStamp = new Date().getTime();
  let countDown = timeStartBet > timeStamp && Math.ceil((timeStartBet - timeStamp) / 1000);
  if (typeof countDown == 'number' && countDown > 14) countDown = 19;

  // Bet
  const [dataBetConfirmOld, setDataBetConfirmOld] = useState<{ point: number; answer: number }[]>(
    []
  );
  const onBetPosition = (positionAns: number) => {
    if (curChip) {
      const sumBet = dataBetCurrent.reduce((pre, item) => pre + item.point, 0);
      if (sumBet < gamePoint)
        dispatch(
          updateDataBetBaccarat({
            answer: positionAns,
            point: Number(sumBet + curChip < gamePoint ? curChip : gamePoint - sumBet),
          })
        );
    }
  };

  // Handle Message
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState('');
  const messageRef = useRef<HTMLDivElement>(null);
  const { gamePoint } = useAppSelector((state) => state.userCurrent);
  const gamePointRef = useRef(gamePoint);
  useEffect(() => {
    if (statsBaccaratDetail != statsBaccaratDetailRef.current) {
      statsBaccaratDetailRef.current = statsBaccaratDetail;
      switch (statsBaccaratDetail) {
        case StatusBaccarat.bet:
          setMessage('Đã bắt đầu, vui lòng cược!');
          break;
        case StatusBaccarat.waitOpen:
          setDataBetConfirmOld([]);
          dispatch(resetDataBetBaccarat());
          setMessage('Đã kết thúc đặt cược, vui lòng chờ mở bài');
          break;
        case StatusBaccarat.end:
          console.log(
            '🚀 ~ LiveStream ~ gamePoint - gamePointRef.current:',
            gamePoint,
            gamePointRef.current
          );
          if (totalBet != 0) {
            if (gamePoint > gamePointRef.current)
              setMessage(String(`+${Math.ceil(gamePoint - gamePointRef.current)}`));
            else setMessage(String(gamePoint - gamePointRef.current));
            gamePointRef.current = gamePoint;
            setTotalBet(0);
          }
          break;
        default:
          break;
      }
    }
  }, [statsBaccaratDetail]);

  useEffect(() => {
    if (
      [StatusBaccarat.bet, StatusBaccarat.waitOpen, StatusBaccarat.end].includes(
        statsBaccaratDetail
      )
    ) {
      messageRef.current?.classList.add(cx('message__box--jump'));

      setTimeout(() => {
        messageRef.current?.classList.remove(cx('message__box--jump'));
      }, 3000);
    }
  }, [message]);

  return (
    <div className="">
      {message ? (
        <div className={cx('message__box')} ref={messageRef}>
          <div className={cx('message__box--body')}>
            <span className={cx('message__box--text')}>{message}</span>
          </div>
        </div>
      ) : (
        <></>
      )}
      <CountDownBetBaccarat
        typePlay={typePlay}
        setTotalPointBet={setTotalBet}
        setDataBetConfirmOld={setDataBetConfirmOld}
        dataBetConfirmOld={dataBetConfirmOld}
      />
      <ResultGameBaccarat />
      <div
        className={cx(
          'bg-[url(/Content/images/vn/json/desktopBJ.png)] absolute left-0 right-0 bottom-[130px] bg-no-repeat z-[1] overflow-hidden ',
          {
            'bg-[49px_0px] bg-[length:94%] h-[22%]': typePlay == 'old',
            'bg-[49px_-181px] bg-[length:94%] h-[22%]': typePlay == 'all',
          }
        )}>
        <div className={cx('live_action')}>
          <div className={cx('absolute left-0 right-0 top-0 bottom-0 [&>div]:h-[34.3%]', 'd3')}>
            <TableItemBaccarat
              onBetPosition={onBetPosition}
              betConfirmOld={dataBetConfirmOld.find((i) => i.answer == 1)?.point || 0}
              positionAnswer={1}
              curChip={curChip}
              className="basis-[24%]"
              statusBaccarat={statsBaccaratDetail}
              isHighlight={dataBaccaratDetailById?.arrBetActive?.includes('p_1') || false}
            />
            <TableItemBaccarat
              onBetPosition={onBetPosition}
              betConfirmOld={dataBetConfirmOld.find((i) => i.answer == 3)?.point || 0}
              positionAnswer={3}
              curChip={curChip}
              className="basis-[26%]"
              statusBaccarat={statsBaccaratDetail}
              isHighlight={dataBaccaratDetailById?.arrBetActive?.includes('p_3') || false}
            />
            <TableItemBaccarat
              onBetPosition={onBetPosition}
              betConfirmOld={dataBetConfirmOld.find((i) => i.answer == 6)?.point || 0}
              positionAnswer={6}
              curChip={curChip}
              className="basis-[26%]"
              statusBaccarat={statsBaccaratDetail}
              isHighlight={dataBaccaratDetailById?.arrBetActive?.includes('p_6') || false}
            />
            <TableItemBaccarat
              onBetPosition={onBetPosition}
              betConfirmOld={dataBetConfirmOld.find((i) => i.answer == 7)?.point || 0}
              positionAnswer={7}
              curChip={curChip}
              className="basis-[24%]"
              statusBaccarat={statsBaccaratDetail}
              isHighlight={dataBaccaratDetailById?.arrBetActive?.includes('p_7') || false}
            />
            <TableItemBaccarat
              onBetPosition={onBetPosition}
              betConfirmOld={dataBetConfirmOld.find((i) => i.answer == 2)?.point || 0}
              positionAnswer={2}
              curChip={curChip}
              className="basis-[24%]"
              statusBaccarat={statsBaccaratDetail}
              isHighlight={dataBaccaratDetailById?.arrBetActive?.includes('p_2') || false}
            />
            <TableItemBaccarat
              onBetPosition={onBetPosition}
              betConfirmOld={dataBetConfirmOld.find((i) => i.answer == 4)?.point || 0}
              positionAnswer={4}
              curChip={curChip}
              className="basis-[52%]"
              statusBaccarat={statsBaccaratDetail}
              isHighlight={dataBaccaratDetailById?.arrBetActive?.includes('p_4') || false}
            />
            <TableItemBaccarat
              onBetPosition={onBetPosition}
              betConfirmOld={dataBetConfirmOld.find((i) => i.answer == 8)?.point || 0}
              positionAnswer={8}
              curChip={curChip}
              className="basis-[24%]"
              statusBaccarat={statsBaccaratDetail}
              isHighlight={dataBaccaratDetailById?.arrBetActive?.includes('p_8') || false}
            />
            <TableItemBaccarat
              onBetPosition={onBetPosition}
              betConfirmOld={dataBetConfirmOld.find((i) => i.answer == 5)?.point || 0}
              positionAnswer={5}
              curChip={curChip}
              isPlayer
              className="basis-[52%]"
              statusBaccarat={statsBaccaratDetail}
              isHighlight={dataBaccaratDetailById?.arrBetActive?.includes('p_5') || false}
            />
          </div>
        </div>
      </div>
      <div
        className={cx(
          'absolute left-2 right-2 bottom-[110px] z-[6] flex justify-between items-center'
        )}>
        <div className="flex">
          <button
            onClick={() => setTypePlay('all')}
            className={cx('mr-1 px-4 py-[2px] text-sm rounded-sm', {
              'bg-[#434343] text-[#848484]': typePlay != 'all',
              'bg-[#199600] text-white': typePlay == 'all',
            })}>
            Ăn đủ
          </button>
          <button
            onClick={() => setTypePlay('old')}
            className={cx('mr-1 px-4 py-[2px] text-sm rounded-sm', {
              'bg-[#434343] text-[#848484]': typePlay != 'old',
              'bg-[#199600] text-white': typePlay == 'old',
            })}>
            Cổ điển
          </button>
          <div className="w-6 h-[26px] mr-2 p-[3px] bg-[#ff9c00] rounded-sm">
            <button className="w-full h-full bg-[url(/Content/images/vn/json/default.png)] bg-no-repeat bg-[-28px_-337px] bg-[length:270%]"></button>
          </div>
          <div className="w-6 h-[26px] mr-2 p-[3px] bg-[#434343] rounded-sm">
            <button className="w-full h-full bg-[url(/Content/images/vn/json/default.png)] bg-no-repeat bg-[-28px_-377px] bg-[length:270%]"></button>
          </div>
          <div className="flex">
            <span className="text-[#848484] block mr-1 text-base">Cược :</span>
            <span className="text-[#f9d901] font-semibold">{totalBet}</span>
          </div>
        </div>
        <SelectChipsAndChosesChip curChip={curChip} setCurChip={setCurrChip} game="mc-baccarat" />
      </div>
    </div>
  );
}
