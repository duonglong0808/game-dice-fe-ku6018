import classNames from 'classnames/bind';
import styles from './chatLive.module.scss';
import Image from 'next/image';

const cx = classNames.bind(styles);

export function ChatLive(): JSX.Element {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('chatroomBox')}>
        <div className={cx('chat-wrapper')}>
          <div>
            <ul className={cx('speakArea')}></ul>
          </div>
        </div>

        <div className={cx('sendArea', 'hideVoice')}>
          <div className={cx('giftBtn')}>
            <Image alt="Gift" src={'/Content/images/chat/gift.svg'} width={23} height={23} />
          </div>

          <div className={cx('quickMsgBtn', 'disabled', 'ng-scope')}>
            <div className={cx('quickMsgBtn_icon')}></div>
            <div className={cx('prohibit_talk', 'js-sendInputNoCash')}>
              <div className={cx('sendInputNo_T')}>Không có quyền chat！</div>
            </div>
            <div className={cx('sendBtn')}>
              <div id="send_fast" className={cx('sendBtn_Prompt')} style={{ display: 'none' }}>
                Bình luận quá nhanh!
              </div>
              <div id="btn_send" className={cx('btn_sendChat', 'no-text', 'no-saving')}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
