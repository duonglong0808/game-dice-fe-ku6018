import classNames from 'classnames/bind';
import styles from './diceSlide.module.scss';

const cx = classNames.bind(styles);

export function SliderHome(): JSX.Element {
  return (
    <div className={cx('slider-wrapper')}>
      <div className={cx('slider__item')}></div>
    </div>
  );
}
