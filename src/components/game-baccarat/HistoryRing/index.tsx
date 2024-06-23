'use client';

import classNames from 'classnames/bind';
import { useState } from 'react';

const cx = classNames.bind({});

export function HistoryRingBaccarat({
  baccaratId,
  col,
  row,
}: {
  baccaratId: number;
  row: number;
  col: number;
}): JSX.Element {
  const [dataPosition, setDataPosition] = useState<any>({
    11: {
      value: ['red', 'red', 'blue'],
    },
    12: {
      value: ['red', 'blue'],
    },

    21: {
      value: ['blue', 'blue'],
    },
    22: {
      value: ['blue', 'blue'],
    },
    31: {
      value: ['red'],
    },
  });

  return (
    <div className={cx('bg-white lg:border-r-[1px] border-[#979797]')}>
      <table className={cx('CD_dataInput w-full')} cellSpacing={0} cellPadding={0}>
        <tbody className={cx('table__body')}>
          {Array.from({ length: row }, (v, k) => k + 1).map((rowIndex) => (
            <tr key={rowIndex} className={cx('table__tr')}>
              {Array.from({ length: col }, (v, k) => k + 1).map((colIndex) => (
                <td
                  key={`${rowIndex}${colIndex}${new Date().getTime()}`}
                  className={cx(
                    'relative bg-white border-b-[1px] border-r-[1px] border-[#e6e6e6] ',
                    'table__td'
                  )}>
                  <div className="flex flex-col flex-wrap w-[13.6px] h-[12px] lg:w-[16.5px] lg:h-[18px]">
                    {dataPosition[`${colIndex}${rowIndex}`]?.value?.map((item: any) => (
                      <span
                        className={cx(
                          'w-[6px] h-[6px] lg:w-[8px] lg:h-[8px] border-[2px] rounded-full',
                          {
                            'border-[#db1002]': item == 'red',
                            'border-[#0403cb]': item == 'blue',
                          }
                        )}></span>
                    ))}
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
