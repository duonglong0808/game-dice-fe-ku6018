'use client';

import classNames from 'classnames/bind';
import styles from './evenOddLive.module.scss';
import { useAppSelector } from '@/lib';
import { useEffect, useRef, useState } from 'react';
import { DiceDetailDto } from '@/lib/redux/app/diceDetail.slice';

const cx = classNames.bind(styles);

export function EvenOddResultLive({
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
      const dataPositionCalc: any = {};

      let indexCurrent = 0;
      let col = initCol - 1;
      let row = initRow;
      dataSort.forEach((item, index, arrThis) => {
        if (col > 0) {
          // console.log('🚀 ~ dataSort.forEach ~ col:', col);
          if (index == indexCurrent) {
            const type = item.totalRed % 2 === 0 ? 'C' : 'L';

            const lisTypeEquals: DiceDetailDto[] = [];
            const subArr = arrThis.slice(indexCurrent);
            for (let index = 0; index < subArr.length; index++) {
              const item2 = subArr[index];
              const type2 = item2.totalRed % 2 == 0 ? 'C' : 'L';
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
                    : col + (lisTypeEquals.length - 6);
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
                <td
                  key={`${rowIndex}${colIndex}`}
                  className={cx('table__td', 'dark:table__td--dark')}>
                  <div className={cx('ba_AT_box')}>
                    <div
                      className={
                        dataPosition[`${colIndex}${rowIndex}`]?.totalRed % 2 == 1
                          ? cx('CD_red_T')
                          : cx('CD_blue_T')
                      }>
                      {dataPosition[`${colIndex}${rowIndex}`]?.value || ''}
                    </div>
                    {dataPosition[`${colIndex}${rowIndex}`]?.value ? (
                      <div className={cx('CD_linkBox')}></div>
                    ) : (
                      <></>
                    )}
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
                  <span className={cx('red_t')}>Lẻ</span>
                  <span className={cx('gray_t2')}>{` / `}</span>
                  <span className={cx('blue_t3')}>Chẵn</span>
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
