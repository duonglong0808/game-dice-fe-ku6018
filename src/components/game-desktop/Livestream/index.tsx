'use client';

import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import styles from './styles.module.scss';
import classNames from 'classnames/bind';
import { ICheckHover, StatusDiceDetail } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/lib';
import TableItem from '../TableItem';
import ToolTipGame from '../ToolTip';
import { resetDataBetDice, updateDataBetDice } from '@/lib/redux/app/diceDetail.slice';
import { resetPointBetMain, updatePointUser } from '@/lib/redux/app/userCurrent.slice';
import { ShowResultDice } from '@/components/game/ShowResultDice';
import CountDownBet from '@/components/game/CountDown';
import { SelectChipsAndChosesChip } from '../SelectChipsAndChosesChip';
// import ToolTipGame from '../tool-tip-game';
// import { ChipsList } from '../chips-list';

const cx = classNames.bind(styles);

export default function LiveStream({ src, gameDiceId }: { src: string; gameDiceId: number }) {
  const { gamePoint, pointBetMain } = useAppSelector((state) => state.userCurrent);
  const gamePointRef = useRef(gamePoint);
  const dispatch = useAppDispatch();
  const [dataBetConfirmOld, setDataBetConfirmOld] = useState<{ point: number; answer: number }[]>(
    []
  );
  console.log('🚀 ~ LiveStream ~ dataBetConfirmOld:', dataBetConfirmOld);

  // Ref
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  //
  const [hoverData, setHoverData] = useState<ICheckHover>({
    isHover: false,
    position: { x: 0, y: 0 },
  });
  const [curChip, setCurChip] = useState<number>(0);
  const { dataDiceDetailCurrent, dataBetCurrent } = useAppSelector((state) => state.diceDetail);
  const { diceGame } = useAppSelector((state) => state.diceGame);
  const diceGameById = diceGame.find((d) => d.id === gameDiceId);
  let dataDiceDetailById = dataDiceDetailCurrent.find((d) => d.gameDiceId == gameDiceId);
  const dataStatusDice =
    typeof dataDiceDetailById?.status == 'string'
      ? dataDiceDetailById?.status?.split(':')
      : [dataDiceDetailById?.status];
  const statsDiceDetail = Number(dataStatusDice[0]);
  const statsDiceDetailRef = useRef(statsDiceDetail);
  const timeStartBet = Number(dataStatusDice[1]);
  const timeStamp = new Date().getTime();
  let countDown = timeStartBet > timeStamp && Math.ceil((timeStartBet - timeStamp) / 1000);
  if (typeof countDown == 'number' && countDown > 14) countDown = 14;
  const arrBetActive = dataDiceDetailById?.arrBetActive;
  const totalRed = dataDiceDetailById?.totalRed;

  // Bet
  const onBetPosition = (positionAns: number) => {
    if (curChip) {
      const sumBet = dataBetCurrent.reduce((pre, item) => pre + item.point, 0);
      if (sumBet < gamePoint)
        dispatch(
          updateDataBetDice({
            answer: positionAns,
            point: Number(sumBet + curChip < gamePoint ? curChip : gamePoint - sumBet),
          })
        );
    }
  };

  // Handle Message
  const [message, setMessage] = useState('');
  const [totalPointBet, setTotalBet] = useState(0);
  useEffect(() => {
    if (statsDiceDetail != statsDiceDetailRef.current) {
      statsDiceDetailRef.current = statsDiceDetail;
      switch (statsDiceDetail) {
        case StatusDiceDetail.bet:
          setMessage('Đã bắt đầu vui lòng đặt cược');
          break;
        case StatusDiceDetail.waitOpen:
          setDataBetConfirmOld([]);
          dispatch(resetDataBetDice());
          setMessage('Chờ mở thưởng');
          break;
        case StatusDiceDetail.end:
          console.log(
            '🚀 ~ LiveStream ~ gamePoint - gamePointRef.current:',
            gamePoint,
            gamePointRef.current
          );
          if (totalPointBet != 0) {
            // console.log('🚀 ~ useEffect ~ gamePoint - gamePointRef.current:');
            if (gamePoint > gamePointRef.current)
              setMessage(String(`+${Math.ceil(gamePoint - gamePointRef.current + pointBetMain)}`));
            else setMessage(String(gamePoint - gamePointRef.current));
            gamePointRef.current = gamePoint;
            setTotalBet(0);
            dispatch(resetPointBetMain());
          }
          break;
        default:
          break;
      }
    }
  }, [statsDiceDetail]);

  useEffect(() => {
    if (
      [StatusDiceDetail.bet, StatusDiceDetail.waitOpen, StatusDiceDetail.end].includes(
        statsDiceDetail
      )
    ) {
      messageRef.current?.classList.add(cx('message__box--jump'));

      setTimeout(() => {
        messageRef.current?.classList.remove(cx('message__box--jump'));
      }, 3000);
    }
  }, [message]);

  // useEffect(() => {
  //   const video = videoRef.current;
  //   if (!video) return;

  //   if (video.canPlayType('application/vnd.apple.mpegurl')) {
  //     // PlaybackRateController
  //     // This will run in safari, where HLS is supported natively
  //     video.src = src;
  //     video.controls = true;
  //   } else if (Hls.isSupported()) {
  //     // This will run in all other modern browsers
  //     const hls = new Hls({ maxLiveSyncPlaybackRate: 0 });
  //     hls.loadSource(src);
  //     // const player = new Plyr(video, defaultOptions);
  //     hls.attachMedia(video);

  //     // Bắt đầu phát video ngay khi có tín hiệu
  //     hls.on(Hls.Events.MANIFEST_PARSED, () => {
  //       video.play().catch((error) => {
  //         console.error('Error starting playback:', error);
  //       });
  //     });
  //   } else {
  //     console.error(
  //       'This is an old browser that does not support MSE https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API'
  //     );
  //   }
  // }, [videoRef]);

  return (
    <div className={cx('live_wrapper')}>
      <iframe
        _ngcontent-qpb-c33=""
        width="100%"
        height="855"
        // src={'https://tkuwebxdl101.vnskuvideo.com/kugame/web/index.html?id=71101'}
        src={diceGameById?.idLive}
        className={cx('iframe_container')}
        ref={iframeRef}></iframe>
      {/* <video className={cx('live_container')} id="video" ref={videoRef} autoFocus></video> */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}></div>
      {totalRed && <ShowResultDice totalRed={totalRed} />}
      <CountDownBet
        setTotalPointBet={setTotalBet}
        setDataBetConfirmOld={setDataBetConfirmOld}
        dataBetConfirmOld={dataBetConfirmOld}
      />
      {/* {countDown && <CountDownBet initCount={countDown} />} */}
      {message ? (
        <div className={cx('message__box')} ref={messageRef}>
          <div className={cx('message__box--body')}>
            <span className={cx('message__box--text')}>{message}</span>
          </div>
        </div>
      ) : (
        <></>
      )}

      {/* <ShowMessageLive message={message} /> */}
      <div className={cx('live_action')}>
        <div className={cx('d3')}>
          <div className={cx('d3__col')}>
            <TableItem
              className={cx('d3__col__row--1')}
              onBetPosition={onBetPosition}
              betConfirmOld={dataBetConfirmOld.find((i) => i.answer == 1)?.point || 0}
              points={0}
              positionAnswer={1}
              curChip={curChip}
              ratio={14}
              onBetSuccess={() => {
                setTotalBet((pre) => pre + curChip);
              }}
              isHighlight={Boolean(arrBetActive?.includes('p_0'))}></TableItem>
            <TableItem
              className={cx('d3__col__row--1')}
              onBetPosition={onBetPosition}
              betConfirmOld={dataBetConfirmOld.find((i) => i.answer == 2)?.point || 0}
              points={1}
              positionAnswer={2}
              curChip={curChip}
              ratio={2.8}
              onBetSuccess={() => {
                setTotalBet((pre) => pre + curChip);
              }}
              isHighlight={Boolean(arrBetActive?.includes('p_1'))}></TableItem>
            <TableItem
              className={cx('d3__col__row--1')}
              onBetPosition={onBetPosition}
              betConfirmOld={dataBetConfirmOld.find((i) => i.answer == 3)?.point || 0}
              points={2}
              positionAnswer={3}
              curChip={curChip}
              ratio={1.5}
              onBetSuccess={() => {
                setTotalBet((pre) => pre + curChip);
              }}
              isHighlight={Boolean(arrBetActive?.includes('p_2'))}></TableItem>
          </div>
          <div className={cx('d3__col')}>
            <TableItem
              positionAnswer={4}
              onBetPosition={onBetPosition}
              betConfirmOld={dataBetConfirmOld.find((i) => i.answer == 4)?.point || 0}
              className={cx('d3__col__row--2')}
              points={0}
              curChip={curChip}
              ratio={0.96}
              name={'Chẵn'}
              onBetSuccess={() => {
                setTotalBet((pre) => pre + curChip);
              }}
              isHighlight={Boolean(arrBetActive?.includes('p_chan'))}></TableItem>
            <TableItem
              className={cx('d3__col__row--2')}
              onBetPosition={onBetPosition}
              betConfirmOld={dataBetConfirmOld.find((i) => i.answer == 5)?.point || 0}
              points={0}
              curChip={curChip}
              positionAnswer={5}
              ratio={0.96}
              name={'Xỉu'}
              onHover={setHoverData}
              onBetSuccess={() => {
                setTotalBet((pre) => pre + curChip);
              }}
              isHighlight={Boolean(arrBetActive?.includes('p_xiu'))}></TableItem>
          </div>
          <div className={cx('d3__col')}>
            <TableItem
              className={cx('d3__col__row--2')}
              onBetPosition={onBetPosition}
              betConfirmOld={dataBetConfirmOld.find((i) => i.answer == 6)?.point || 0}
              points={0}
              curChip={curChip}
              positionAnswer={6}
              ratio={0.96}
              name={'Lẻ'}
              onBetSuccess={() => {
                setTotalBet((pre) => pre + curChip);
              }}
              isHighlight={Boolean(arrBetActive?.includes('p_le'))}></TableItem>
            <TableItem
              className={cx('d3__col__row--2')}
              onBetPosition={onBetPosition}
              betConfirmOld={dataBetConfirmOld.find((i) => i.answer == 7)?.point || 0}
              points={0}
              curChip={curChip}
              positionAnswer={7}
              ratio={0.96}
              name={'Tài'}
              isLeft={true}
              onHover={setHoverData}
              onBetSuccess={() => {
                setTotalBet((pre) => pre + curChip);
              }}
              isHighlight={Boolean(arrBetActive?.includes('p_tai'))}></TableItem>
          </div>
          <div className={cx('d3__col')}>
            <TableItem
              className={cx('d3__col__row--1')}
              onBetPosition={onBetPosition}
              betConfirmOld={dataBetConfirmOld.find((i) => i.answer == 8)?.point || 0}
              points={4}
              curChip={curChip}
              positionAnswer={8}
              ratio={14}
              onBetSuccess={() => {
                setTotalBet((pre) => pre + curChip);
              }}
              isHighlight={Boolean(arrBetActive?.includes('p_4'))}></TableItem>
            <TableItem
              className={cx('d3__col__row--1')}
              onBetPosition={onBetPosition}
              betConfirmOld={dataBetConfirmOld.find((i) => i.answer == 9)?.point || 0}
              points={3}
              curChip={curChip}
              positionAnswer={9}
              ratio={2.8}
              onBetSuccess={() => {
                setTotalBet((pre) => pre + curChip);
              }}
              isHighlight={Boolean(arrBetActive?.includes('p_3'))}></TableItem>
            <TableItem
              className={cx('d3__col__row--1')}
              onBetPosition={onBetPosition}
              betConfirmOld={dataBetConfirmOld.find((i) => i.answer == 10)?.point || 0}
              points={-1}
              positionAnswer={10}
              ratio={6.5}
              curChip={curChip}
              onBetSuccess={() => {
                setTotalBet((pre) => pre + curChip);
              }}
              isHighlight={Boolean(arrBetActive?.includes('p_-1'))}></TableItem>
          </div>
        </div>
        <div className={cx('live_action__control')}>
          <div className={cx('live_action__control--left')}>
            <button className={cx('btn-primary', 'active')}>Chuẩn</button>
            <button className={cx('btn-primary')}>Cao</button>
            <p className={cx('live_action__control--left__cuoc')}> Cược: </p>
            <p className={cx('live_action__control--left__value')}> 0 </p>
          </div>

          <SelectChipsAndChosesChip curChip={curChip} setCurChip={setCurChip} />
        </div>
      </div>
    </div>
  );
}
