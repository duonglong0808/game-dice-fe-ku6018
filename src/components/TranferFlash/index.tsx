'use client';

import { useAppDispatch, useAppSelector } from '@/lib';
import { ClickNumberBox } from '../ClickNumber';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { transferPoint } from './ultils/api';
import { updatePointUser } from '@/lib/redux/app/userCurrent.slice';

export function TransferFlash({ closePopup }: { closePopup: () => void }): JSX.Element {
  const { gamePoint, mainPoint, userName } = useAppSelector((state) => state.userCurrent);
  const [isMobile, setIsMobile] = useState(false);
  const [point, setPoint] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (window.innerWidth < 768) {
      // Chuyển hướng sang path khác khi thiết bị là mobile
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-[#00000080]">
      <div className="absolute left-0 right-0 top-0 bottom-0 flex justify-center items-center">
        <div
          className={classNames('bg-white shadow-[0_0_0_5px_#ffffff80] rounded w-[90%]', {
            'w-[90%]': isMobile,
            'w-[500px]': !isMobile,
          })}>
          <div className="relative p-2 font-semibold mx-3 border-b-[1px] border-[#3783c1] text-[#3783c1] text-center">
            <span>Chuyển khoản nhanh</span>
            <span
              onClick={closePopup}
              className="w-[40px] absolute top-0 bottom-0 right-0 bg-[url(/Areas/Mobile/Images/btn_close.svg)] bg-no-repeat bg-center bg-[length:38%_auto] opacity-[0.47]"></span>
          </div>
          {isMobile ? (
            <div className="p-4">
              <div className="flex items-center">
                <div className="flex-1">
                  <div>
                    <p className="font-semibold text-xl text-black">TK Chính</p>
                    <span className="block text-[#00ae08] text-xl font-semibold">{mainPoint}</span>
                  </div>
                  <div className="my-2">
                    <p className="font-semibold text-xl text-[#3783c1]">KU Casino</p>
                    <span className="block text-[#00ae08] text-xl font-semibold">{gamePoint}</span>
                  </div>
                </div>
                <button
                  disabled={!mainPoint}
                  onClick={async () => {
                    if (mainPoint) {
                      const res = await transferPoint(false, userName, 'ku-casino', mainPoint);
                      if (res?.data) {
                        closePopup();
                        dispatch(
                          updatePointUser({ gamePoint: mainPoint, mainPoint: Number(-mainPoint) })
                        );
                      }
                    }
                  }}
                  className="h-[60px] relative -top-2 text-white lg:h-[40px] disabled:bg-[#bbb]  bg-[#45b5d9] rounded w-[38%]">
                  Chuyển hết
                </button>
              </div>
              <div className="flex h-[50px]">
                <span
                  className={classNames(
                    'flex items-center px-2 py-2 flex-1 border-[1px] border-[#ddd] mr-3',
                    {
                      'bg-[#c7c7c7] text-white': !point,
                      'bg-[#fff] font-semibold text-black': point,
                    }
                  )}>
                  {point ? point : 'Nhập số điểm'}
                </span>
                <button
                  disabled={!point}
                  onClick={async () => {
                    if (Number(point) > 0) {
                      const res = await transferPoint(false, userName, 'ku-casino', Number(point));
                      if (res?.data) {
                        closePopup();
                        dispatch(
                          updatePointUser({ gamePoint: Number(point), mainPoint: Number(-point) })
                        );
                      }
                    }
                  }}
                  className="py-2 px-4 text-white rounded-sm bg-[#45b5d9] disabled:bg-[#bbb]">
                  Xác nhận
                </button>
              </div>
              <div className="my-3 flex border-t-[1px] border-b-[1px] border-r-[1px] text-black border-[#dfdfdf]">
                <button
                  onClick={() =>
                    setPoint(
                      Number(point) + 100 < mainPoint
                        ? String(Number(point) + 100)
                        : String(mainPoint)
                    )
                  }
                  className="flex-1 py-2 bg-[#f3f3f3] border-l-[1px] border-[#dfdfdf]">
                  +100
                </button>
                <button
                  onClick={() =>
                    setPoint(
                      Number(point) + 500 < mainPoint
                        ? String(Number(point) + 500)
                        : String(mainPoint)
                    )
                  }
                  className="flex-1 py-2 bg-[#f3f3f3] border-l-[1px] border-[#dfdfdf]">
                  +500
                </button>
                <button
                  onClick={() =>
                    setPoint(
                      Number(point) + 1000 < mainPoint
                        ? String(Number(point) + 1000)
                        : String(mainPoint)
                    )
                  }
                  className="flex-1 py-2 bg-[#f3f3f3] border-l-[1px] border-[#dfdfdf]">
                  +1000
                </button>
                <button
                  onClick={() =>
                    setPoint(
                      Number(point) + 2000 < mainPoint
                        ? String(Number(point) + 2000)
                        : String(mainPoint)
                    )
                  }
                  className="flex-1 py-2 bg-[#f3f3f3] border-l-[1px] border-[#dfdfdf]">
                  +2000
                </button>
              </div>
              <ClickNumberBox onChangeValue={setPoint} value={point} />
              <div className="my-3 rounded-3xl p-1 text-center text-[#f54b6f] relative w-full border-[1px] border-[#f54b6f]">
                <span>Quà tặng miễn phí : 0</span>
                <span className="absolute right-1 top-1 bottom-0 bg-[url(/Areas/Mobile/Images/icon_question_pink.svg)] w-[23px] h-[23px] bg-no-repeat bg-center bg-[length:100%_auto]"></span>
              </div>
              <button
                disabled={!gamePoint}
                onClick={async () => {
                  if (gamePoint) {
                    const res = await transferPoint(true, userName, 'ku-casino', gamePoint);
                    if (res?.data) {
                      closePopup();
                      dispatch(
                        updatePointUser({
                          gamePoint: Number(-gamePoint),
                          mainPoint: Number(gamePoint),
                        })
                      );
                    }
                  }
                }}
                className="w-full p-2 text-white bg-[#00b2b9] disabled:text-[#a1a1a1] disabled:bg-[#eee]">
                Chuyển hết về tài khoản chính
              </button>
            </div>
          ) : (
            <div className="p-[20px] pb-[5px]">
              <div className="border-b-2 border-b-[#e5e5e5]">
                <div className="flex h-[35px] mb-[25px]">
                  <span className="w-[115px] ">Tk Chính</span>
                  <span className="text-[#1ba200] font-bold flex items-center flex-1 pl-[10px] border-[1px] border-[#dadada]">
                    {mainPoint}
                  </span>
                </div>

                <div className="flex h-[35px] mb-[25px]">
                  <span className="w-[115px] text-[#ffa800]">KU Casino</span>
                  <span className="text-[#1ba200] font-bold flex items-center flex-1 pl-[10px] border-[1px] border-[#dadada] ">
                    {gamePoint || 0}
                  </span>
                </div>

                <div className="flex h-[35px] mb-[25px] items-center">
                  <span className="w-[115px] text-[15px] block">Điểm chuyển</span>
                  <input
                    value={point}
                    onChange={(e) => {
                      if (Number(e.target.value) > 0) {
                        const val = Number(e.target.value) < mainPoint ? e.target.value : gamePoint;
                        setPoint(String(val));
                      } else {
                        setPoint('');
                      }
                    }}
                    placeholder="Nhập điểm chuyển"
                    className="flex-1 bg-[#f3f3f3] font-semibold  h-[35px]  w-[156px] px-2 outline-0"
                  />

                  <button
                    disabled={!mainPoint}
                    onClick={async () => {
                      if (mainPoint) {
                        const res = await transferPoint(false, userName, 'ku-casino', mainPoint);
                        if (res?.data) {
                          closePopup();
                          dispatch(
                            updatePointUser({
                              gamePoint: +mainPoint,
                              mainPoint: Number(-mainPoint),
                            })
                          );
                        }
                      }
                    }}
                    className=" bg-[#35b0c0] cursor-pointer rounded-[3px] w-[85px] text-[14px] h-[35px] text-white ml-4">
                    Chuyển hết
                  </button>
                </div>
              </div>
              <div className="flex justify-between mt-4 mx-2">
                <button
                  disabled={!gamePoint}
                  onClick={async () => {
                    if (gamePoint) {
                      const res = await transferPoint(true, userName, 'ku-casino', gamePoint);
                      if (res?.data) {
                        closePopup();
                        dispatch(updatePointUser({ gamePoint: -gamePoint, mainPoint: +gamePoint }));
                      }
                    }
                  }}
                  className="bg-[#ffa800] w-[48%] rounded-sm h-[45px] text-white">
                  Chuyển hết về tài khoản chính
                </button>
                <button
                  disabled={!point}
                  onClick={async () => {
                    if (Number(point) > 0) {
                      const res = await transferPoint(false, userName, 'ku-casino', Number(point));
                      if (res?.data) {
                        closePopup();
                        dispatch(updatePointUser({ gamePoint: Number(point), mainPoint: -point }));
                      }
                    }
                  }}
                  className="bg-[#32abff] w-[48%] rounded-sm h-[45px] text-white disabled:bg-[#aaa]">
                  Xác nhận
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
