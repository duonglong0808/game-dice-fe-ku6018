'use client';

import { useAppSelector } from '@/lib';
import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { ControllerBaccarat } from '../ControllerBaccarat/insex';

const cx = classNames.bind({});
export function LiveStreamBaccarat(): JSX.Element {
  const { baccaratGame, gameBaccaratId } = useAppSelector((state) => state.baccaratGame);
  const gameBaccaratById = baccaratGame.find((baccarat) => baccarat.id === gameBaccaratId);

  return (
    <div className="bg-black relative h-full">
      <iframe
        _ngcontent-qpb-c33=""
        width="100%"
        height="855"
        src={gameBaccaratById?.idLive}
        // src="https://www.youtube.com/embed/xhjQVKQYMQE?si=cwD-ICooa9nlUB5q"
        className={cx('iframe_container')}></iframe>

      <div className="absolute top-0 left-0 right-0 bottom-0"></div>
      <ControllerBaccarat />
    </div>
  );
}
