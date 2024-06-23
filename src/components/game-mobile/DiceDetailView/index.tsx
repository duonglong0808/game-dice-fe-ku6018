'use client';

import { useAppDispatch, useAppSelector } from '@/lib';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ChipsList from '@/components/game/ChipList/index.';
import Image from 'next/image';
import { StatusDiceDetail, dataListChipsStatistics } from '@/constants';
import { resetDataBetDice, updateDataBetDice } from '@/lib/redux/app/diceDetail.slice';
import classNames from 'classnames';
import { HistoryDiceGameDetail } from '@/components/game/HistoryDiceGameDetail';
import { EvenOddResultLive } from '@/components/game/EvenOddResultLive';
import { DiceResultTXLive } from '@/components/game/DiceResultTXLive';
import { ShowMessageLive } from '@/components/game/ShowMessageLive';
import CountDownBet from '@/components/game/CountDown';
import { ShowResultDice } from '@/components/game/ShowResultDice';
import { updatePointUser } from '@/lib/redux/app/userCurrent.slice';
import { setIndexChipsRedux } from '@/lib/redux/system/settingSys';
import { useHandleMessageDiceWsk } from '@/ultils/handleDetail';
import { betDiceAndBaccarat } from '@/ultils/api';
import { ChatLiveMobile } from '@/components/game-mobile/ChatLiveMobile';
import { TableItemMobile } from '../TableItemMobile';

export function DetailDiceDetailMobile(): JSX.Element {
  // Initialize
  const wsk = useHandleMessageDiceWsk();

  // Point user
  const { gamePoint } = useAppSelector((state) => state.userCurrent);
  const gamePointRef = useRef(gamePoint);

  // Bet
  const [totalPointBet, setTotalPointBet] = useState(0);
  const dataBetConfirmOld = useRef<{ point: number; answer: number }[]>([]);
  const [currentChip, setCurrentChip] = useState<number>();

  const { id: gameDiceId } = useParams();
  const { diceGame } = useAppSelector((state) => state.diceGame);
  const gameDiceById = diceGame.find((i) => i.id == +gameDiceId);
  const router = useRouter();
  const [openChipList, setOpenChipList] = useState(false);
  const indexChipsRedux = useAppSelector((state) => state.diceDetail.indexChips);
  const [indexChips, setIndexChips] = useState<number[]>(indexChipsRedux);
  const dispatch = useAppDispatch();

  const { dataDiceDetailCurrent, dataBetCurrent } = useAppSelector((state) => state.diceDetail);
  let dataDiceDetailById = dataDiceDetailCurrent.find((d) => d.gameDiceId == Number(gameDiceId));
  const dataStatusDice =
    typeof dataDiceDetailById?.status == 'string'
      ? dataDiceDetailById?.status?.split(':')
      : [dataDiceDetailById?.status];
  const statsDiceDetail = Number(dataStatusDice[0]);
  const statsDiceDetailRef = useRef(statsDiceDetail);
  const arrBetActive = dataDiceDetailById?.arrBetActive;
  const totalRed = dataDiceDetailById?.totalRed;

  const handleConfirmBet = async () => {
    const transaction = dataDiceDetailById?.transaction || 1;
    const gameDiceId = dataDiceDetailById?.gameDiceId || 1;
    const diceDetailId = dataDiceDetailById?.diceDetailId || 1;
    const dataBetTg = [...dataBetCurrent];
    if (
      dataBetTg.length &&
      transaction &&
      gameDiceId &&
      Number(statsDiceDetail) == StatusDiceDetail.bet
    ) {
      dispatch(resetDataBetDice());
      const reqBets = await Promise.all(
        dataBetTg.map(async (bet) => {
          const data = {
            transaction,
            gameDiceId,
            diceDetailId,
            point: bet.point,
            answer: bet.answer,
            game: 'dice',
          };
          const req = await betDiceAndBaccarat(data);

          return {
            answer: bet.answer,
            point: req?.data ? bet.point : 0,
          };
        })
      );

      // const newDataBetConfirm = [...dataBetConfirmOld.current];
      let totalBetSuc = 0;
      reqBets.map((item) => {
        totalBetSuc += item.point;
        const checkExits = dataBetConfirmOld.current.find((i) => i.answer == item.answer);
        if (checkExits) checkExits.point = item.point + checkExits.point;
        dataBetConfirmOld.current.push(item);
      });
      setTotalPointBet((pre) => pre + totalBetSuc);
      dispatch(updatePointUser({ gamePoint: -totalBetSuc }));
    }
  };

  useEffect(() => {
    if (!gameDiceById) {
      // TODO: rederic to error if not data game
      // router.replace('/mobile/game');
      router.replace('/error');
    }
  }, []);

  // Handle Message
  const [message, setMessage] = useState('');
  useEffect(() => {
    if (statsDiceDetail != statsDiceDetailRef.current) {
      statsDiceDetailRef.current = statsDiceDetail;
      switch (statsDiceDetail) {
        case StatusDiceDetail.bet:
          setMessage('Đã bắt đầu vui lòng đặt cược');
          break;
        case StatusDiceDetail.waitOpen:
          setMessage('Chờ mở thưởng');
          break;
        case StatusDiceDetail.end:
          if (totalPointBet != 0) {
            // console.log(
            //   '🚀 ~ useEffect ~ gamePoint - gamePointRef.current:',
            //   gamePoint,
            //   gamePointRef.current
            // );
            if (gamePoint > gamePointRef.current)
              setMessage(String(`+${Math.ceil(gamePoint - gamePointRef.current + totalPointBet)}`));
            else setMessage(String(gamePoint - gamePointRef.current));
            gamePointRef.current = gamePoint;
            dataBetConfirmOld.current = [];
            setTotalPointBet(0);
            dispatch(resetDataBetDice());
          }
          break;
        default:
          setMessage('');
          break;
      }
    }
  }, [statsDiceDetail]);

  const onBetPosition = (positionAns: number) => {
    if (currentChip) {
      const sumBet = dataBetCurrent.reduce((pre, item) => pre + item.point, 0);
      if (sumBet < gamePoint)
        dispatch(
          updateDataBetDice({
            answer: positionAns,
            point: Number(sumBet + currentChip < gamePoint ? currentChip : gamePoint - sumBet),
          })
        );
    }
  };

  return (
    <div>
      {message ? <ShowMessageLive message={message} statsGameDetail={statsDiceDetail} /> : <></>}
      <div className="fixed top-0 left-0 right-0 bottom-0 overflow-hidden bg-[#111]">
        {totalRed && <ShowResultDice totalRed={totalRed} />}
        <CountDownBet />
        <iframe
          allow="autoplay; encrypted-media"
          // allowFullScreen
          className="w-svw h-svh scale-[1.04]"
          // className="w-full h-[35svh] "
          src={gameDiceById?.idLiveMobile}
          // src={'https://gat6.vnskuvideo.com/ios.html?id=71101'}
        ></iframe>
        <div className="absolute top-0 left-0 right-0 h-[calc(100svw*0.49)]"></div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-[6] bg-black top-[calc(100svw*0.49)]">
        {/* <div className=" bg-black top-[200px]"> */}
        <div
          className="flex flex-col h-full"
          //  style={{ height: 'calc(100svw*0.49)' }}
        >
          <div className="flex h-[30px] items-center justify-between">
            <div className="flex items-center">
              <span className="text-white">Cược :</span>
              <span className="ml-1 text-[#ffd100] text-xl">{Math.floor(totalPointBet)}</span>
            </div>
            <div className="flex h-full">
              <button className='w-10 h-full bg-[url(/Areas/Mobile/Images/VN/btn_Traditionl.svg)] bg-[length:auto_65%] bg-no-repeat bg-center relative after:content-[""] after:absolute after:top-2 after:bottom-2 after:w-[1px] after:right-0 after:bg-[#333]'></button>
              <button className='w-10 h-full bg-[url(/Areas/Mobile/Images/VN/icon_verifyLive.png)] bg-[length:auto_65%] bg-no-repeat bg-center relative after:content-[""] after:absolute after:top-2 after:bottom-2 after:w-[1px] after:right-0 after:bg-[#333]'></button>
              <button className='w-10 h-full bg-[url(/Areas/Mobile/Images/VN/btn_gamePrompt.svg)] bg-[length:auto_65%] bg-no-repeat bg-center relative after:content-[""] after:absolute after:top-2 after:bottom-2 after:w-[1px] after:right-0 after:bg-[#333]'></button>
              <button className='w-10 h-full bg-[url(/Areas/Mobile/Images/VN/MT_chip_single_off.png)] bg-[length:auto_65%] bg-no-repeat bg-center relative after:content-[""] after:absolute after:top-2 after:bottom-2 after:w-[1px] after:right-0 after:bg-[#333]'></button>
              <button className='w-10 h-full bg-[url(/Areas/Mobile/Images/VN/btn_webLineGrey.svg)] bg-[length:auto_65%] bg-no-repeat bg-center relative after:content-[""] after:absolute after:top-2 after:bottom-2 after:w-[1px] after:right-0 after:bg-[#333]'></button>
            </div>
          </div>
          <div
            className="flex-1 flex flex-col"
            style={{ height: 'calc(100svh - 100svw*0.49 - 30px)' }}>
            <div
              className=" bg-white w-full flex justify-center p-[3px]"
              style={{ height: 'calc(100% - 10.45svh - 188px)' }}>
              <div className="flex flex-col bg-[#f3f3f3] flex-wrap w-full h-full border-t-[1px] border-l-[1px] border-[#bcbcbc] rounded-sm">
                <div className="basis-1/3 w-[28%]">
                  <TableItemMobile
                    // curChip={1}
                    // onBetSuccess={() => {}}
                    statusDice={statsDiceDetail}
                    isHighlight={Boolean(arrBetActive?.includes('p_0'))}
                    positionAnswer={1}
                    betConfirmOld={dataBetConfirmOld.current.find((i) => i.answer == 1)?.point || 0}
                    onBetPosition={onBetPosition}
                    ratio={'1:14'}
                    image="/Areas/Mobile/Images/report/CD/img_roadZero.png"
                  />
                </div>
                <div className="basis-1/3 w-[28%]">
                  <TableItemMobile
                    // curChip={1}
                    // onBetSuccess={() => {}}
                    statusDice={statsDiceDetail}
                    isHighlight={Boolean(arrBetActive?.includes('p_1'))}
                    positionAnswer={2}
                    betConfirmOld={dataBetConfirmOld.current.find((i) => i.answer == 2)?.point || 0}
                    onBetPosition={onBetPosition}
                    ratio={'1:2.8'}
                    image="/Areas/Mobile/Images/report/CD/img_roadOne.png"
                  />
                </div>
                <div className="basis-1/3 w-[28%]">
                  <TableItemMobile
                    // curChip={1}
                    // onBetSuccess={() => {}}
                    statusDice={statsDiceDetail}
                    isHighlight={Boolean(arrBetActive?.includes('p_2'))}
                    positionAnswer={3}
                    betConfirmOld={dataBetConfirmOld.current.find((i) => i.answer == 3)?.point || 0}
                    onBetPosition={onBetPosition}
                    ratio={'1:1.5'}
                    image="/Areas/Mobile/Images/report/CD/img_roadTwo.png"
                  />
                </div>
                <div className="basis-1/2 w-[21%]">
                  <TableItemMobile
                    // curChip={1}
                    // onBetSuccess={() => {}}
                    statusDice={statsDiceDetail}
                    isHighlight={Boolean(arrBetActive?.includes('p_chan'))}
                    positionAnswer={4}
                    betConfirmOld={dataBetConfirmOld.current.find((i) => i.answer == 4)?.point || 0}
                    onBetPosition={onBetPosition}
                    ratio={'1:0.96'}
                    name="Chẵn"
                    textColor="text-[#0055fe]"
                  />
                </div>
                <div className="basis-1/2 w-[21%]">
                  <TableItemMobile
                    // curChip={1}
                    // onBetSuccess={() => {}}
                    statusDice={statsDiceDetail}
                    isHighlight={Boolean(arrBetActive?.includes('p_xiu'))}
                    positionAnswer={5}
                    betConfirmOld={dataBetConfirmOld.current.find((i) => i.answer == 5)?.point || 0}
                    onBetPosition={onBetPosition}
                    ratio={'1:0.96'}
                    name="Xỉu"
                    textColor="text-[#0055fe]"
                  />
                </div>
                <div className="basis-1/2 w-[21%]">
                  <TableItemMobile
                    // curChip={1}
                    // onBetSuccess={() => {}}
                    statusDice={statsDiceDetail}
                    isHighlight={Boolean(arrBetActive?.includes('p_le'))}
                    positionAnswer={6}
                    betConfirmOld={dataBetConfirmOld.current.find((i) => i.answer == 6)?.point || 0}
                    onBetPosition={onBetPosition}
                    ratio={'1:0.96'}
                    name="Lẻ"
                    textColor="text-[#fe0000]"
                  />
                </div>
                <div className="basis-1/2 w-[21%]">
                  <TableItemMobile
                    // curChip={1}
                    // onBetSuccess={() => {}}
                    statusDice={statsDiceDetail}
                    isHighlight={Boolean(arrBetActive?.includes('p_tai'))}
                    positionAnswer={7}
                    betConfirmOld={dataBetConfirmOld.current.find((i) => i.answer == 7)?.point || 0}
                    onBetPosition={onBetPosition}
                    ratio={'1:0.96'}
                    name="Tài"
                    textColor="text-[#fe0000]"
                  />
                </div>
                <div className="basis-1/3 w-[28%]">
                  <TableItemMobile
                    // curChip={1}
                    // onBetSuccess={() => {}}
                    statusDice={statsDiceDetail}
                    isHighlight={Boolean(arrBetActive?.includes('p_4'))}
                    positionAnswer={8}
                    betConfirmOld={dataBetConfirmOld.current.find((i) => i.answer == 8)?.point || 0}
                    onBetPosition={onBetPosition}
                    ratio={'1:14'}
                    image="/Areas/Mobile/Images/report/CD/img_roadFour.png"
                  />
                </div>
                <div className="basis-1/3 w-[28%]">
                  <TableItemMobile
                    // curChip={1}
                    // onBetSuccess={() => {}}
                    statusDice={statsDiceDetail}
                    isHighlight={Boolean(arrBetActive?.includes('p_3'))}
                    positionAnswer={9}
                    betConfirmOld={dataBetConfirmOld.current.find((i) => i.answer == 9)?.point || 0}
                    onBetPosition={onBetPosition}
                    ratio={'1:2.8'}
                    image="/Areas/Mobile/Images/report/CD/img_roadThree.png"
                  />
                </div>
                <div className="basis-1/3 w-[28%]">
                  <TableItemMobile
                    // curChip={1}
                    // onBetSuccess={() => {}}
                    statusDice={statsDiceDetail}
                    isHighlight={Boolean(arrBetActive?.includes('p_-1'))}
                    positionAnswer={10}
                    betConfirmOld={
                      dataBetConfirmOld.current.find((i) => i.answer == 10)?.point || 0
                    }
                    onBetPosition={onBetPosition}
                    ratio={'1:6.5'}
                    image="/Areas/Mobile/Images/report/CD/img_roadEight.png"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white flex items-center relative h-[5.9svh]">
              <div className="flex-1 w-[calc(100%_-_56px)] h-full">
                <ChipsList
                  alwayActive={true}
                  curChip={Number(currentChip)}
                  setChips={(chip) => setCurrentChip(chip)}
                />
              </div>
              <div className=" w-14 h-full">
                <Image
                  onClick={() => setOpenChipList(true)}
                  alt="bing"
                  src={'/Areas/Mobile/Images/blingChip/icon_blingChip_Set.png'}
                  width={57}
                  height={57}
                  className="h-full object-contain"
                />
                {openChipList ? (
                  <div className="absolute left-0 right-0 bottom-full m-auto h-fit z-10 bg-[#141414]">
                    <div className="text-center relative m-2 border-b-[1px] border-[#356492]">
                      <span className="text-white flex justify-center mb-1">
                        Cài đặt phỉnh
                        <span className=" bg-[url(/Areas/Mobile/Images/img_chipHint.svg)] block bg-no-repeat w-5 h-5 bg-center ml-2"></span>
                      </span>
                      <span
                        onClick={() => setOpenChipList(false)}
                        className="text-white w-[40px] text-xl absolute -top-[2px] bottom-0 right-0 ">
                        X
                      </span>
                    </div>
                    <div className="border-b-[1px] border-[#356492] mx-2">
                      <div className="grid grid-cols-4">
                        {dataListChipsStatistics.map((chip, index) => (
                          <div className="flex justify-center">
                            <Image
                              alt="chip phinh"
                              src={indexChips.includes(index) ? chip.on : chip.off}
                              key={index}
                              width={68}
                              height={68}
                              className="w-[56px] h-[56px] text-center"
                              onClick={() => {
                                if (indexChips.includes(index)) {
                                  setIndexChips((pre) => pre.filter((c) => c !== index));
                                } else if (indexChips.length < 8) {
                                  setIndexChips((pre) => [...pre, index]);
                                }
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="m-2 flex justify-between items-center">
                      <span className=" text-[#ffc800]">Chọn tối đa 8 phỉnh</span>
                      <button
                        onClick={() => {
                          dispatch(setIndexChipsRedux({ indexChips }));
                          setOpenChipList(false);
                        }}
                        className="px-2 py-1 bg-[#3678b7] text-white rounded-sm">
                        Xác nhận
                      </button>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="flex border-t-[1px] items-center justify-around h-[5svh] min- border-b-[1px] border-[#ccc] bg-[#f3f3f3] w-full mx-auto">
              <button
                onClick={() => {
                  if (statsDiceDetail == StatusDiceDetail.bet) {
                    dispatch(resetDataBetDice());
                  }
                }}
                className={classNames(
                  'w-[24%] h-[67%] text-sm text-white rounded-sm border-[1px] border-[#fff] bg-[url(/Areas/Mobile/Images/btn_cancel.svg)] bg-no-repeat ml-2 pl-2 bg-[length:auto_65%]',
                  {
                    'bg-[#929292] shadow-[0_0_0_4px_#929292]':
                      statsDiceDetail != StatusDiceDetail.bet,
                  },
                  {
                    'bg-[#ff9401] shadow-[0_0_0_4px_#ff9401]':
                      statsDiceDetail == StatusDiceDetail.bet,
                  }
                )}
                style={{ backgroundPositionX: '13%', backgroundPositionY: 'center' }}>
                Hủy
              </button>
              <button
                className={classNames(
                  'w-[24%] h-[67%] text-sm text-white rounded-sm border-[1px] border-[#fff] bg-[url(/Areas/Mobile/Images/btn_repeat.svg)] bg-no-repeat bg-[#1e8dde] shadow-[0_0_0_4px_#1e8dde] ml-3 pl-5 bg-[length:auto_65%]',
                  {
                    'bg-[#929292] shadow-[0_0_0_4px_#929292]':
                      statsDiceDetail != StatusDiceDetail.bet,
                  }
                )}
                style={{ backgroundPositionX: '13%', backgroundPositionY: 'center' }}>
                Lặp lại
              </button>
              <button
                onClick={handleConfirmBet}
                className={classNames(
                  'w-[24%] h-[67%] text-sm text-white rounded-sm border-[1px] border-[#fff] bg-[url(/Areas/Mobile/Images/btn_confirm.svg)] bg-no-repeat bg-[#0f9e4f] shadow-[0_0_0_4px_#0f9e4f] ml-3 pl-2 bg-[length:auto_65%]',
                  {
                    'bg-[#929292] shadow-[0_0_0_4px_#929292]':
                      statsDiceDetail != StatusDiceDetail.bet,
                  }
                )}
                style={{ backgroundPositionX: '13%', backgroundPositionY: 'center' }}>
                OK
              </button>
              <button className="w-[23%] h-[88%] flex justify-start items-center text-white text-center bg-contain rounded-sm bg-[url(/Areas/Mobile/Images/icon_change.svg)] bg-no-repeat ml-3">
                <span className="block ml-2 text-sm">Đổi bàn</span>
              </button>
            </div>

            <div className="w-full">
              <div className="flex bg-[#e5e5e5] h-7">
                <span className="block w-2 mx-2 bg-[url(/Areas/Mobile/Images/btn_MT_gameArrow.svg)] bg-no-repeat bg-center "></span>
                <div className="flex-1 flex items-center overflow-auto">
                  <div className="flex mr-4 items-baseline">
                    <span className="text-[#f00] mr-3 text-sm font-semibold">L</span>
                    <span className="text-black text-sm font-semibold">552</span>
                  </div>
                  <div className="flex mr-4 items-baseline">
                    <span className="text-[#0036ff] mr-3 text-sm font-semibold">C</span>
                    <span className="text-black text-sm font-semibold">522</span>
                  </div>
                  <div className="flex mr-4 items-baseline">
                    <span className="text-[#f00] mr-3 text-sm font-semibold">T</span>
                    <span className="text-black text-sm font-semibold">422</span>
                  </div>
                  <div className="flex mr-4 items-baseline">
                    <span className="text-[#0036ff] mr-3 text-sm font-semibold">X</span>
                    <span className="text-black text-sm font-semibold">398</span>
                  </div>

                  <div className="flex mr-4 items-end">
                    <span className="relative bottom-[1px] w-[15px] h-[15px] mr-2 bg-contain bg-[url(/Areas/Mobile/Images/report/CD/img_CDs0.svg)] bg-no-repeat bg-center"></span>
                    <span className="text-black text-sm font-semibold">62</span>
                  </div>
                  <div className="flex mr-4 items-end">
                    <span className="relative bottom-[1px] w-[15px] h-[15px] mr-2 bg-contain bg-[url(/Areas/Mobile/Images/report/CD/img_CDs1.svg)] bg-no-repeat bg-center"></span>
                    <span className="text-black text-sm font-semibold">280</span>
                  </div>
                  <div className="flex mr-4 items-end">
                    <span className="relative bottom-[1px] w-[15px] h-[15px] mr-2 bg-contain bg-[url(/Areas/Mobile/Images/report/CD/img_CDs2.svg)] bg-no-repeat bg-center"></span>
                    <span className="text-black text-sm font-semibold">445</span>
                  </div>
                  <div className="flex mr-4 items-end">
                    <span className="relative bottom-[1px] w-[15px] h-[15px] mr-2 bg-contain bg-[url(/Areas/Mobile/Images/report/CD/img_CDs3.svg)] bg-no-repeat bg-center"></span>
                    <span className="text-black text-sm font-semibold">293</span>
                  </div>
                  <div className="flex mr-4 items-end">
                    <span className="relative bottom-[1px] w-[15px] h-[15px] mr-2 bg-contain bg-[url(/Areas/Mobile/Images/report/CD/img_CDs4.svg)] bg-no-repeat bg-center"></span>
                    <span className="text-black text-sm font-semibold">60</span>
                  </div>
                </div>
                <span className="block px-5  bg-[url(/Areas/Mobile/Images/icon_fingerblack.svg)] bg-no-repeat  border-l-[1px] border-[#ccc] bg-[length:20px]"></span>
              </div>
            </div>

            <div className="flex">
              <div className="basis-1/2">
                <div className="border-b-[1px] border-[#e6e6e6]">
                  <HistoryDiceGameDetail gameDiceId={Number(gameDiceId)} initCol={10} />
                </div>
              </div>
              <div className="basis-1/2 ">
                <EvenOddResultLive
                  gameDiceId={Number(gameDiceId)}
                  showBottom={false}
                  initCol={19}
                />
                <div className="w-full border-t-[1px]  border-[#e6e6e6]">
                  <DiceResultTXLive
                    gameDiceId={Number(gameDiceId)}
                    showBottom={false}
                    initCol={19}
                  />
                </div>
              </div>
            </div>

            <ChatLiveMobile />
          </div>
        </div>
      </div>
    </div>
  );
}
