import React, { forwardRef, HTMLAttributes } from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames/bind';
import type { SVGProps } from 'react';
import { IPosition } from '@/constants';

const cx = classNames.bind(styles);

interface TableItemProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement;
  position?: IPosition;
}

const ToolTipGame = forwardRef<HTMLDivElement, TableItemProps>(
  ({ children, className, position, ...otherProps }, ref) => {
    return (
      <div className={`${className} ${cx('tool_tip_game')}`} ref={ref} {...otherProps}>
        <div
          className={cx('tool_tip_game__box')}
          style={{
            position: 'absolute',
            bottom: 150,
            left: (position?.x || 800) - window.innerWidth * 0.2,
          }}>
          {children}
        </div>
      </div>
    );
  }
);

export default ToolTipGame;
