'use client';

import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { useAppSelector } from '@/lib';
import { BaccaratDetailDto } from '@/lib/redux/app/baccaratDetail.slice';

const cx = classNames.bind(styles);

export function HistoryOX({
  baccaratId,
  col,
  row,
  isLive,
}: {
  row: number;
  col: number;
  baccaratId: number;
  isLive?: boolean;
}): JSX.Element {
  const dataRaw = useAppSelector((state) => state.baccaratDetail.dataBaccaratDetail);
  const lengthDataRowOld = useRef(0);
  const diceByBaccaratId = dataRaw.filter((i) => i.gameBaccaratId == baccaratId);
  // Bước 1: Tìm dateId mới nhất
  const latestDateId = diceByBaccaratId.reduce(
    (max, item) => (item.dateId > max ? item.dateId : max),
    0
  );
  // Lấy phiên mới nhất
  const maxTransaction = Math.max(
    ...diceByBaccaratId.map((item) =>
      item.dateId == latestDateId ? parseInt(item.mainTransaction.split('-')[0]) : 0
    )
  );
  const dataSort = [
    ...diceByBaccaratId.filter(
      (i) => i.pokerBanker && +i.mainTransaction.split('-')[0] == maxTransaction
    ),
  ]
    .sort((a, b) => a.baccaratDetailId - b.baccaratDetailId)
    .slice(0, row * (col - 1));

  const [dataPosition, setDataPosition] = useState<any>({
    // 11: {
    //   value: 1, // Xanh rỗng
    // },
    // 12: {
    //   value: 2, // Xanh full
    // },
    // 13: {
    //   value: 3, // Đỏ rỗng
    // },
    // 21: {
    //   value: 4, // đỏ full
    // },
    // 22: {
    //   value: 5, // X
    // },
    // 23: {
    //   value: 6, // 6
    // },
  });

  useEffect(() => {
    if (lengthDataRowOld.current != dataSort.length) {
      const dataPositionCalc: any = {};

      let indexCurrent = 0;
      let colCalc = 1;
      let rowCalc = 1;
      dataSort.forEach((item, index, arrThis) => {
        if (colCalc < col) {
          if (index == indexCurrent) {
            const isPlayerWin = item.pointPlayer > item.pointBanker;

            const lisTypeEquals: BaccaratDetailDto[] = [];

            const subArr = arrThis.slice(indexCurrent);
            for (let index = 0; index < subArr.length; index++) {
              const item2 = subArr[index];
              const isBankerLost = item2.pointPlayer >= item2.pointBanker;
              if (isPlayerWin == isBankerLost) {
                lisTypeEquals.push(item2);
              } else {
                break;
              }
            }
            // baccaratId == 1 &&
            //   lisTypeEquals.length == 5 &&
            //   console.log('🚀 ~ dataSort.forEach ~ lisTypeEquals:', lisTypeEquals);
            if (lisTypeEquals.length >= 2) {
              if (lisTypeEquals.length > row) {
                let colTg =
                  colCalc + (lisTypeEquals.length - row) > col
                    ? col
                    : colCalc + (lisTypeEquals.length - row);
                // baccaratId == 1 &&
                //   console.log(
                //     '🚀 ~ dataSort.forEach ~ colTg:',
                //     colCalc + (lisTypeEquals.length - row),
                //     '====',
                //     colTg
                //   );
                for (let i = 0; i < lisTypeEquals.length; i++) {
                  const element = lisTypeEquals[i];
                  indexCurrent++;
                  let value = 0;
                  if (element.pointPlayer > element.pointBanker) {
                    value = element.pointPlayer > 7 ? 2 : 1;
                  } else if (element.pointPlayer < element.pointBanker) {
                    value = element.pointBanker > 7 ? 4 : 3;
                  } else {
                    value = element.pointBanker == 6 ? 5 : 5;
                  }
                  if (lisTypeEquals.length - i > row) {
                    const position = `${colTg}${row}`;
                    dataPositionCalc[position] = { value };
                    colTg = colTg - 1;
                  } else {
                    const position = `${colTg}${lisTypeEquals.length - i}`;
                    dataPositionCalc[position] = { value };
                  }
                }
                // col = col - 1;
                colCalc = colTg + 1;
              } else {
                for (let i = 0; i < lisTypeEquals.length; i++) {
                  const element = lisTypeEquals[i];
                  let value = 0;
                  if (element.pointPlayer > element.pointBanker) {
                    value = element.pointPlayer > 7 ? 2 : 1;
                  } else if (element.pointPlayer < element.pointBanker) {
                    value = element.pointBanker > 7 ? 4 : 3;
                  } else {
                    value = element.pointBanker == 6 ? 5 : 5;
                  }
                  indexCurrent++;
                  const position = `${colCalc}${lisTypeEquals.length - i}`;
                  dataPositionCalc[position] = { ...element, value };
                }
                colCalc = colCalc + 1;
              }
            } else {
              const position = `${colCalc}1`;
              let value = 0;
              if (item.pointPlayer > item.pointBanker) {
                value = item.pointPlayer > 7 ? 2 : 1;
              } else if (item.pointPlayer < item.pointBanker) {
                value = item.pointBanker > 7 ? 4 : 3;
              } else {
                value = item.pointBanker == 6 ? 5 : 5;
              }
              dataPositionCalc[position] = { value };
              colCalc = colCalc + 1;
              rowCalc = 1;
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
    <div className={cx('bg-white flex-1 border-[#979797] border-b-[1px] lg:border-b-0', 'wrapper')}>
      <table className={cx('w-full h-full')} cellSpacing={0} cellPadding={0}>
        <tbody className={cx('table__body')}>
          {Array.from({ length: row }, (v, k) => k + 1).map((rowIndex) => (
            <tr key={rowIndex} className={cx('table__tr')}>
              {Array.from({ length: col }, (v, k) => k + 1).map((colIndex) => (
                <td
                  key={`${rowIndex}${colIndex}`}
                  className={cx(
                    'relative bg-white border-b-[1px] border-r-[1px] border-[#e6e6e6]',
                    'table__td',
                    'dark:table__td--dark',
                    { 'table__td--live': isLive }
                  )}>
                  <div className="static w-full h-full block">
                    <div
                      className={cx(
                        'text-white rounded-full text-xs text-center relative flex items-center justify-center',
                        {
                          'border-[1px] border-[#0036ff!important]':
                            dataPosition[`${colIndex}${rowIndex}`]?.value == 1 ||
                            dataPosition[`${colIndex}${rowIndex}`]?.value == 2,
                          'border-[1px] border-[#dc0000!important]':
                            dataPosition[`${colIndex}${rowIndex}`]?.value == 3 ||
                            dataPosition[`${colIndex}${rowIndex}`]?.value == 4,
                          'bg-[url(/Content/images/icon_s6.svg)] bg-no-repeat bg-center bg-contain':
                            dataPosition[`${colIndex}${rowIndex}`]?.value == 6,
                          'h-3 w-3': !isLive,
                          'table__td--box-live': isLive,
                        }
                      )}>
                      {dataPosition[`${colIndex}${rowIndex}`]?.value != 6 ? (
                        <div
                          className={cx(
                            'absolute top-[1px] left-[1px] right-[1px] bottom-[1px] rounded-full bg-white',
                            {
                              'table__td--box': isLive,
                              'bg-[#7c98ff!important]':
                                dataPosition[`${colIndex}${rowIndex}`]?.value == '2',
                              'bg-[#fea2a2!important]':
                                dataPosition[`${colIndex}${rowIndex}`]?.value == '4',
                            }
                          )}></div>
                      ) : (
                        <></>
                      )}
                      {dataPosition[`${colIndex}${rowIndex}`]?.value == 5 ? (
                        <div
                          className={cx(
                            'absolute top-[0] left-[0] right-[0] bottom-[0] font-semibold text-[#3aaf00] flex items-center justify-center',
                            {
                              'text-[10px] lg:text-base': isLive,
                            }
                          )}>
                          X
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
