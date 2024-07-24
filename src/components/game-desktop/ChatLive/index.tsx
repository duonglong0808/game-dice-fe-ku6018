'use client';

import classNames from 'classnames/bind';
import styles from './chatLive.module.scss';
import Image from 'next/image';
import { useAppSelector } from '@/lib';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

export function ChatLive(): JSX.Element {
  const { chatGame } = useAppSelector((state) => state.chatGame);
  const [chat, setChat] = useState('');

  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.querySelector(`.${cx('speakArea')}`)?.scrollWidth || 0;

      console.log('🚀 ~ handleScroll ~ scrollTop:', scrollTop);
      // setShowArrow(scrollTop < -200);
    };

    const chatWrapper = document.querySelector(`.${cx('speakArea')}`);
    chatWrapper?.addEventListener('scroll', handleScroll);

    return () => {
      chatWrapper?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getSenderImage = (sender: string) => {
    const firstChar = sender[0].toLowerCase();
    if (firstChar >= 'a' && firstChar <= 'g') {
      return { img: '/Content/images/chat/user/v1.png', color: '#836634' };
    } else if (firstChar >= 'h' && firstChar <= 'n') {
      return { img: '/Content/images/chat/user/v2.png', color: '#e5ac48' };
    } else if (firstChar >= 'o' && firstChar <= 'u') {
      return { img: '/Content/images/chat/user/v3.png', color: '#777' };
    } else {
      return { img: '/Content/images/chat/user/v4.png', color: '#8c56d0' };
    }
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('chatroomBox')}>
        <div className={cx('chat-wrapper', 'w-full h-full overflow-hidden')}>
          <ul className={cx('speakArea', 'w-full h-full overflow-y-scroll')}>
            {chatGame.map((item, index) => (
              <li key={index} className="flex items-center justify-start mb-2">
                <Image
                  alt="avatar"
                  src={getSenderImage(item.sender).img}
                  width={34}
                  height={34}
                  className="w-[25px] h-[25px] mr-1"
                />
                <span
                  className="text-base font-thin"
                  style={{ color: getSenderImage(item.sender).color }}>
                  {item.sender}
                </span>
                <p className="py-1 px-2 bg-[#f3f3f3] text-black rounded-lg mx-2">{item.content}</p>
                <span className="text-xs text-[#888]">{item.timeSend}</span>
              </li>
            ))}

            {showArrow && <a href="#bottom" className={cx('scrollToBottom')}></a>}
          </ul>
        </div>

        <div className={cx('sendArea', 'hideVoice')}>
          <div className={cx('giftBtn')}>
            <Image alt="Gift" src={'/Content/images/chat/gift.svg'} width={23} height={23} />
          </div>

          <div className={cx('quickMsgBtn', 'disabled', 'ng-scope')}>
            <div className={cx('quickMsgBtn_icon')}></div>
            <div className={cx('prohibit_talk', 'js-sendInputNoCash')}>
              <input
                value={chat}
                onChange={(e) => setChat(e.target.value)}
                className={cx('sendInputNo_T')}
                placeholder="Enter ..."
              />
            </div>
            <div className={cx('sendBtn')}>
              <div id="send_fast" className={cx('sendBtn_Prompt')} style={{ display: 'none' }}>
                Bình luận quá nhanh!
              </div>
              <div
                id="btn_send"
                className={cx('btn_sendChat', 'no-text', {
                  'opacity-30': !chat,
                })}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
