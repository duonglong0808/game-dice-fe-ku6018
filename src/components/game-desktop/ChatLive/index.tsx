'use client';

import classNames from 'classnames/bind';
import styles from './chatLive.module.scss';
import Image from 'next/image';
import { useAppSelector } from '@/lib';
import { useEffect, useState } from 'react';
import WebSocketSingleton from '@/lib/ws/wskInstance';
import { EventSocket } from '@/constants';

const cx = classNames.bind(styles);

export function ChatLive({ group }: { group: string }): JSX.Element {
  const { chatGame } = useAppSelector((state) => state.chatGame);
  const [chat, setChat] = useState('');
  const [wsk, setWsk] = useState<WebSocketSingleton>();
  const { userName } = useAppSelector((state) => state.userCurrent);

  useEffect(() => {
    const wskIns = WebSocketSingleton.getInstance();
    setWsk(wskIns);
  }, []);

  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const chatWrapper = document.querySelector(`.${cx('chat-wrapper')}`);
      const totalChat = document.querySelectorAll('li');
      if (chatWrapper && totalChat.length > 30) {
        setShowArrow(chatWrapper.scrollTop / chatWrapper.scrollHeight < 0.8);
      }
    };

    const chatWrapper = document.querySelector(`.${cx('chat-wrapper')}`);
    chatWrapper?.addEventListener('scroll', handleScroll);

    return () => {
      chatWrapper?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const chatWrapper = document.querySelector(`.${cx('chat-wrapper')}`);
    if (chatWrapper && !showArrow) {
      chatWrapper.scrollTop = chatWrapper.scrollHeight;
    }
  }, [chatGame]);

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
    <div className={cx('wrapper', 'overflow-hidden')}>
      <div className={cx('chatroomBox')}>
        <div className={cx('chat-wrapper', 'w-full h-full overflow-y-scroll')}>
          <ul className={cx('speakArea', 'w-full h-full ')}>
            {chatGame
              .filter((i) => i.group == group)
              .map((item, index) => (
                <li
                  key={index}
                  // id={index == chatGame.length - 1 ? `message_bottom` : `message_${index}`}
                  className={cx('chat-item', 'flex items-center justify-start mb-2')}>
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
                  <p className="py-1 px-2 bg-[#f3f3f3] text-black rounded-lg mx-2">
                    {item.content}
                  </p>
                  <span className="text-xs text-[#888]">{item.timeSend}</span>
                </li>
              ))}
          </ul>
          {showArrow && chatGame.length > 20 && (
            <span
              onClick={() => {
                const chatWrapper = document.querySelector(`.${cx('chat-wrapper')}`);
                if (chatWrapper) {
                  chatWrapper.scrollTop = chatWrapper.scrollHeight;
                }
                setShowArrow(false);
              }}
              className={cx('scrollToBottom')}></span>
          )}
        </div>

        <div id="bottom" className={cx('sendArea', 'hideVoice')}>
          <div className={cx('giftBtn')}>
            <Image alt="Gift" src={'/Content/images/chat/gift.svg'} width={23} height={23} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (chat && wsk) {
                const date = new Date();
                wsk.emit(EventSocket.SendMessage, {
                  group: group,
                  content: chat,
                  timeSend: `${date.getHours()}:${date.getMinutes()}`,
                  // username: `Tao_${date.getTime()}`,
                  username: userName,
                });
                setChat('');
              }
            }}
            className={cx('quickMsgBtn', 'disabled', 'ng-scope')}>
            <div className={cx('quickMsgBtn_icon')}></div>
            <div className={cx('prohibit_talk', 'js-sendInputNoCash')}>
              <input
                value={chat}
                maxLength={100}
                onChange={(e) => setChat(e.target.value)}
                className={cx('sendInputNo_T')}
                placeholder="Enter ..."
              />
            </div>
            <div className={cx('sendBtn')}>
              <div id="send_fast" className={cx('sendBtn_Prompt')} style={{ display: 'none' }}>
                Bình luận quá nhanh!
              </div>
              <button
                type="submit"
                id="btn_send"
                className={cx('btn_sendChat', 'no-text', {
                  'opacity-30': !chat,
                })}></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
