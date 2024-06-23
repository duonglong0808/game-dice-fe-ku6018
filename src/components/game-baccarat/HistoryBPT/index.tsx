'use client';

import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '@/lib';

const cx = classNames.bind(styles);

export function HistoryBPT({
  baccaratId,
  initType,
  showOption,
  col,
  row,
  isLive,
}: {
  row: number;
  col: number;
  baccaratId: number;
  initType: string;
  showOption?: boolean;
  isLive?: boolean;
}): JSX.Element {
  const [type, setType] = useState(initType);
  const dataRaw = useAppSelector((state) => state.baccaratDetail.dataBaccaratDetail);
  const lengthDataRowOld = useRef(0);
  const dataSort = [...dataRaw.filter((i) => i.gameBaccaratId == baccaratId && i.pokerBanker)]
    .sort((a, b) => a.baccaratDetailId - b.baccaratDetailId)
    .slice(0, row * (col - 1));

  const [dataPosition, setDataPosition] = useState<any>({});

  useEffect(() => {
    if (lengthDataRowOld.current != dataSort.length) {
      const dataPositionCalc: any = {};

      let indexCurrent = 0;
      let colCalc = 1;
      let rowCalc = 1;
      dataSort.forEach((item, index, arrThis) => {
        if (colCalc < col) {
          const position = `${colCalc}${rowCalc}`;
          if (item.pointBanker > item.pointPlayer) {
            dataPositionCalc[position] = {
              value: 'B',
              point: item.pointBanker,
            };
          } else if (item.pointBanker < item.pointPlayer) {
            dataPositionCalc[position] = {
              value: 'P',
              point: item.pointPlayer,
            };
          } else {
            dataPositionCalc[position] = {
              value: 'T',
              point: item.pointPlayer,
            };
          }
          if (rowCalc < row) {
            rowCalc++;
          } else {
            colCalc++;
            rowCalc = 1;
          }
        }
      });

      lengthDataRowOld.current = dataSort.length;
      setDataPosition(dataPositionCalc);
    }
  }, [dataSort]);

  return (
    <div className={cx('border-r-2 border-[#979797] bg-white', 'wrapper')}>
      <table className={cx('CD_dataInput')} cellSpacing={0} cellPadding={0}>
        <tbody className={cx('table__body')}>
          {Array.from({ length: row }, (v, k) => k + 1).map((rowIndex) => (
            <tr key={rowIndex} className={cx('table__tr')}>
              {Array.from({ length: col }, (v, k) => k + 1).map((colIndex) => (
                <td
                  key={`${rowIndex}${colIndex}`}
                  className={cx(
                    'relative bg-white w-[17px] h-[17px] border-b-[1px] border-r-[1px] border-[#e6e6e6]',
                    'table__td',
                    'dark:table__td--dark',
                    { 'table__td--live': isLive }
                  )}>
                  {showOption && rowIndex == row && colIndex == col ? (
                    <div
                      onClick={() => setType((pre) => (pre == 'string' ? 'number' : 'string'))}
                      className={cx('cursor-pointer bg-no-repeat bg-contain w-full h-full', {
                        'bg-[url(/Content/images/btn_latticeSwitch.svg)]': type == 'string',
                        'bg-[url(/Content/images/btn_latticeSwitch_02.svg)]': type == 'number',
                      })}></div>
                  ) : (
                    <div
                      className={cx('w-full h-full cursor-pointer', 'ba_AT_box', {
                        'hover:bg-[#888]': isLive && dataPosition[`${colIndex}${rowIndex}`]?.value,
                      })}>
                      <div
                        className={cx(
                          'text-xs w-full h-full flex items-center justify-center rounded-full text-center',
                          {
                            'ba_AT_box--live': isLive,
                            'bg-[#0036ff] text-white':
                              dataPosition[`${colIndex}${rowIndex}`]?.value == 'P' &&
                              (type == 'string' ||
                                (type == 'number' &&
                                  dataPosition[`${colIndex}${rowIndex}`]?.point > 7)),
                            'text-[#0036ff] border-[2px] border-[#0036ff]':
                              dataPosition[`${colIndex}${rowIndex}`]?.value == 'P' &&
                              type == 'number' &&
                              dataPosition[`${colIndex}${rowIndex}`]?.point < 8,
                            'bg-[#dc0000] text-white':
                              dataPosition[`${colIndex}${rowIndex}`]?.value == 'B' &&
                              (type == 'string' ||
                                (type == 'number' &&
                                  dataPosition[`${colIndex}${rowIndex}`]?.point > 7)),
                            'text-[#dc0000] border-[2px] border-[#dc0000]':
                              dataPosition[`${colIndex}${rowIndex}`]?.value == 'B' &&
                              type == 'number' &&
                              dataPosition[`${colIndex}${rowIndex}`]?.point < 8,
                            'bg-[#3aaf00] text-white':
                              dataPosition[`${colIndex}${rowIndex}`]?.value == 'T' &&
                              (type == 'string' ||
                                (type == 'number' &&
                                  dataPosition[`${colIndex}${rowIndex}`]?.point > 7)),
                            'text-[#3aaf00] border-[2px] border-[#3aaf00]':
                              dataPosition[`${colIndex}${rowIndex}`]?.value == 'T' &&
                              type == 'number' &&
                              dataPosition[`${colIndex}${rowIndex}`]?.point < 8,
                          }
                        )}>
                        {type == 'string'
                          ? dataPosition[`${colIndex}${rowIndex}`]?.value
                          : dataPosition[`${colIndex}${rowIndex}`]?.point}
                      </div>
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
