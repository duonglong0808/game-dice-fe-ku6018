import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import Image from 'next/image';

const cx = classNames.bind(styles);

export function AccountError(): JSX.Element {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container-bg')}>
        <div className={cx('error__container')}>
          <div className={cx('error__box--left')}>
            <Image
              alt="error box"
              src={'/Content/images/icon_error.svg'}
              width={264}
              height={245}
            />
          </div>
          <div className={cx('error__box--right')}>
            <span className={cx('error__title')}>Xác nhận thất bại, vui lòng đăng nhập lại！</span>
            <div className="error__desc text-white">Phân tích thông tin đăng nhập thất bại</div>
          </div>
        </div>
      </div>
    </div>
  );
}
