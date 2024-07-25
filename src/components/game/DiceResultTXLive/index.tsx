'use client';

import classNames from 'classnames/bind';
import styles from './diceResultTX.module.scss';
import { useAppSelector } from '@/lib';
import { useEffect, useRef, useState } from 'react';
import { DiceDetailDto } from '@/lib/redux/app/diceDetail.slice';

const cx = classNames.bind(styles);

// const dataDemo: DiceDetailDto[] = [
//   {
//     transaction: 0,
//     diceDetailId: 0,
//     gameDiceId: 1,
//     arrBetActive: [],
//     mainTransaction: 1,
//     status: 5,
//     totalRed: 3,
//   },
//   {
//     transaction: 1,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     arrBetActive: [],
//     mainTransaction: 1,
//     status: 5,
//     totalRed: 2,
//   },
//   {
//     transaction: 2,
//     arrBetActive: [],
//     mainTransaction: 2,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 2,
//   },
//   {
//     transaction: 3,
//     arrBetActive: [],
//     mainTransaction: 3,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 2,
//   },
//   {
//     transaction: 4,
//     arrBetActive: [],
//     mainTransaction: 4,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 2,
//   },
//   {
//     transaction: 5,
//     arrBetActive: [],
//     mainTransaction: 5,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 2,
//   },
//   {
//     transaction: 6,
//     arrBetActive: [],
//     mainTransaction: 6,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 3,
//   },
//   {
//     transaction: 7,
//     arrBetActive: [],
//     mainTransaction: 7,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 2,
//   },
//   {
//     transaction: 8,
//     arrBetActive: [],
//     mainTransaction: 8,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 3,
//   },
//   {
//     transaction: 9,
//     arrBetActive: [],
//     mainTransaction: 9,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 3,
//   },
//   {
//     transaction: 10,
//     arrBetActive: [],
//     mainTransaction: 10,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 3,
//   },
//   {
//     transaction: 11,
//     arrBetActive: [],
//     mainTransaction: 11,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 3,
//   },
//   {
//     transaction: 12,
//     arrBetActive: [],
//     mainTransaction: 12,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 3,
//   },
//   {
//     transaction: 13,
//     arrBetActive: [],
//     mainTransaction: 13,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 3,
//   },
//   {
//     transaction: 14,
//     arrBetActive: [],
//     mainTransaction: 14,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 3,
//   },
//   {
//     transaction: 15,
//     arrBetActive: [],
//     mainTransaction: 15,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 3,
//   },
//   {
//     transaction: 16,
//     arrBetActive: [],
//     mainTransaction: 16,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 2,
//   },
//   {
//     transaction: 17,
//     arrBetActive: [],
//     mainTransaction: 17,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 2,
//   },
//   {
//     transaction: 18,
//     arrBetActive: [],
//     mainTransaction: 18,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 2,
//   },
//   {
//     transaction: 19,
//     arrBetActive: [],
//     mainTransaction: 19,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 3,
//   },
//   {
//     transaction: 20,
//     arrBetActive: [],
//     mainTransaction: 20,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 2,
//   },
//   {
//     transaction: 21,
//     arrBetActive: [],
//     mainTransaction: 21,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 3,
//   },
//   {
//     transaction: 22,
//     arrBetActive: [],
//     mainTransaction: 22,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 3,
//   },
//   {
//     transaction: 23,
//     arrBetActive: [],
//     mainTransaction: 23,
//     diceDetailId: 1,
//     gameDiceId: 1,
//     status: 5,
//     totalRed: 3,
//   },
// ];

export function DiceResultTXLive({
  gameDiceId,
  showBottom = true,
  initCol = 13,
  initRow = 6,
}: {
  gameDiceId: number;
  showBottom?: boolean;
  initCol?: number;
  initRow?: number;
}): JSX.Element {
  const dataRaw = useAppSelector((state) => state.diceDetail.dataDiceDetail);
  const lengthDataRowOld = useRef(0);
  const dataSort = [
    ...dataRaw.filter((i) => i.gameDiceId == gameDiceId && typeof i.totalRed === 'number'),
  ].sort((a, b) => b.diceDetailId - a.diceDetailId);

  // const dataPosition = useRef<any>({});
  const [dataPosition, setDataPosition] = useState<any>({});

  useEffect(() => {
    if (lengthDataRowOld.current != dataSort.length) {
      // console.log('🚀 ~ useEffect ~ dataSort:', dataSort);
      const dataPositionCalc: any = {};

      let indexCurrent = 0;
      let col = initCol - 1;
      let row = initCol;
      dataSort.forEach((item, index, arrThis) => {
        if (col > 0) {
          // console.log('🚀 ~ dataSort.forEach ~ col:', col);
          if (index == indexCurrent) {
            let type = '2';
            if (item.totalRed > 2) type = 'T';
            else if (item.totalRed < 2) type = 'X';

            const lisTypeEquals: DiceDetailDto[] = [];
            const subArr = arrThis.slice(indexCurrent);
            for (let index = 0; index < subArr.length; index++) {
              const item2 = subArr[index];
              let type2 = '2';
              if (item2.totalRed > 2) type2 = 'T';
              else if (item2.totalRed < 2) type2 = 'X';

              if (type2 == type) {
                lisTypeEquals.push(item2);
              } else {
                break;
              }
            }
            // console.log('🚀 ~ dataSort.forEach ~ lisTypeEquals:', lisTypeEquals);
            if (lisTypeEquals.length >= 2) {
              if (lisTypeEquals.length > 6) {
                let colTg =
                  col + (lisTypeEquals.length - 6) > initCol - 1
                    ? initCol - 1
                    : col + (lisTypeEquals.length - 12);
                for (let i = 0; i < lisTypeEquals.length; i++) {
                  const element = lisTypeEquals[i];
                  indexCurrent++;
                  if (lisTypeEquals.length - i > 6) {
                    const position = `${colTg}6`;
                    dataPositionCalc[position] = { ...element, value: type };
                    colTg = colTg - 1;
                  } else {
                    const position = `${colTg}${lisTypeEquals.length - i}`;
                    dataPositionCalc[position] = { ...element, value: type };
                  }
                }
                // col = col - 1;
                col = colTg - 1;
              } else {
                for (let i = 0; i < lisTypeEquals.length; i++) {
                  const element = lisTypeEquals[i];
                  indexCurrent++;
                  const position = `${col}${lisTypeEquals.length - i}`;
                  dataPositionCalc[position] = { ...element, value: type };
                }
                col = col - 1;
              }
            } else {
              const position = `${col}1`;
              dataPositionCalc[position] = { ...item, value: type };
              col = col - 1;
              row = 1;
              indexCurrent++;
            }
          }
        }
      });

      lengthDataRowOld.current = dataSort.length;
      setDataPosition(dataPositionCalc);
    }
  }, [dataSort]);

  return (
    <div className={cx('wrapper')}>
      <table className={cx('CD_dataInput')}>
        <tbody className={cx('table__body')}>
          {Array.from({ length: initRow }, (v, k) => k + 1).map((rowIndex) => (
            <tr key={rowIndex} className={cx('table__tr')}>
              {Array.from({ length: initCol }, (v, k) => k + 1).map((colIndex) => (
                <td key={`${rowIndex}${colIndex}`} className={cx('table__td')}>
                  <div
                    className={
                      dataPosition[`${colIndex}${rowIndex}`]?.value == '2'
                        ? cx('CD_green_ball')
                        : dataPosition[`${colIndex}${rowIndex}`]?.value == 'T'
                        ? cx('CD_red_T')
                        : cx('CD_blue_T')
                    }>
                    {dataPosition[`${colIndex}${rowIndex}`]?.value || ''}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {showBottom ? (
        <table className={cx('CD_dataInput_CT')}>
          <tbody>
            <tr>
              <td>
                <div className={cx('CD_dataInput_CT--box')}>
                  <span className={cx('red_t')}>Tài</span>
                  <span className={cx('gray_t2')}>{` / `}</span>
                  <span className={cx('blue_t3')}>Xỉu</span>
                  <span className={cx('gray_t2')}>{` / `}</span>
                  <span className={cx('green_t')}>2 Trắng 2 Đỏ</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <></>
      )}
    </div>
  );
}
