export * from './positions';

export const EventSocket = {
  JoinRoom: 'join-room',
  LeaveRoom: 'leave-room',
  Disconnect: 'disconnect',
  Connection: 'connection',
  Data: 'data',
};

export const ACCESS_TOKEN = 'access_token';
export const REFRESH_TOKEN = 'refresh_token';

export const StatusPaymentTranSaction = {
  processing: 0,
  success: 1,
  cancel: 2,
};

export const TypePaymentTranSaction = {
  deposit: 0,
  withdrawMoney: 1,
};

export const TypeGamePoint = {
  main: 0,
  sub: 1,
};

export const typeNotification = {
  System: 'system',
  User: 'individual',
};

export const TypeSort = {
  DESC: 'DESC',
  ASC: 'ASC',
};

export const TypeGameDice = {
  XocDia: '0',
  ChanLe: '1',
  Blockchain: '2',
};

export const TypeGameBaccarat = {
  normal: '0',
  flash: '1',
  mi: '2',
};

export const StatusDiceDetail = {
  prepare: 0,
  shake: 1,
  bet: 2,
  waitOpen: 3,
  check: 4,
  end: 5,
};

export const StatusBaccarat = {
  prepare: 0,
  bet: 1,
  waitOpen: 2,
  showPoker: 3,
  check: 4,
  end: 5,
};

export const TypeAnswerDice = {
  p1: 1,
  p2: 2,
  p3: 3,
  p4: 4,
  p5: 5,
  p6: 6,
  p7: 7,
  p8: 8,
  p9: 9,
  p10: 10,
};

export const StatusHistoryPlayDice = {
  wait: 0,
  success: 1,
};

export const TypeUpdatePointUser = {
  up: 0,
  down: 1,
};

export const TypeEmitMessage = {
  join: 0,
  updateStatusDice: 1,
  updatePoint: 2,
  updateStatusBaccarat: 3,
};

export const pointPoker: any = {
  A: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 0,
  J: 0,
  Q: 0,
  K: 10,
};

export const dataListChipsStatistics: {
  type: string;
  on: string;
  off: string;
  select: string;
  value?: number | string;
}[] = [
  {
    type: 'custom',
    on: '/Content/images/blingChip/icon_chip_selectEdit_off.png',
    off: '/Content/images/blingChip/icon_chip_selectEdit_off.png',
    select: '/Content/images/blingChip/icon_chip_selectEdit_off.png',
    value: undefined,
  },
  {
    type: 'custom',
    on: '/Content/images/blingChip/icon_chip_selectEdit.png',
    off: '/Content/images/blingChip/icon_chip_selectEdit.png',
    select: '/Content/images/blingChip/icon_chip_selectEdit_off.png',
    value: undefined,
  },
  {
    type: 'static',
    off: '/Content/images/blingChip/vn/icon_chip_selectT2_off.png',
    on: '/Content/images/blingChip/vn/icon_chip_selectT2.png',
    select: '/Content/images/blingChip/icon_blingChip_T2.png.png',
    value: undefined,
  },
  {
    type: 'static',
    off: '/Content/images/blingChip/vn/icon_chip_selectT3_off.png',
    on: '/Content/images/blingChip/vn/icon_chip_selectT3.png',
    select: '/Content/images/blingChip/icon_blingChip_T3.png.png',
    value: undefined,
  },
  {
    type: 'static',
    on: '/Content/images/blingChip/vn/icon_chip_selectS.png',
    off: '/Content/images/blingChip/vn/icon_chip_selectS_off.png',
    select: '/Content/images/blingChip/icon_blingChip_S.png',
    value: 'min',
  },
  {
    type: 'static',
    on: '/Content/images/blingChip/icon_chip_select10.png',
    off: '/Content/images/blingChip/icon_chip_select10_off.png',
    select: '/Content/images/blingChip/icon_blingChip_10.png',

    value: 10,
  },
  {
    type: 'static',
    on: '/Content/images/blingChip/icon_chip_select50.png',
    off: '/Content/images/blingChip/icon_chip_select50_off.png',
    select: '/Content/images/blingChip/icon_blingChip_50.png',
    value: 50,
  },
  {
    type: 'static',
    on: '/Content/images/blingChip/icon_chip_select100.png',
    off: '/Content/images/blingChip/icon_chip_select100_off.png',
    select: '/Content/images/blingChip/icon_blingChip_100.png',
    value: 100,
  },
  {
    type: 'static',
    on: '/Content/images/blingChip/icon_chip_select200.png',
    off: '/Content/images/blingChip/icon_chip_select200_off.png',
    select: '/Content/images/blingChip/icon_blingChip_200.png',
    value: 200,
  },

  {
    type: 'static',
    on: '/Content/images/blingChip/icon_chip_select500.png',
    off: '/Content/images/blingChip/icon_chip_select500_off.png',
    select: '/Content/images/blingChip/icon_blingChip_500.png',
    value: 500,
  },
  {
    type: 'static',
    on: '/Content/images/blingChip/icon_chip_select1K.png',
    off: '/Content/images/blingChip/icon_chip_select1K_off.png',
    select: '/Content/images/blingChip/icon_blingChip_1K.png',
    value: 1000,
  },
  {
    type: 'static',
    on: '/Content/images/blingChip/icon_chip_select5K.png',
    off: '/Content/images/blingChip/icon_chip_select5K_off.png',
    select: '/Content/images/blingChip/icon_blingChip_5K.png',
    value: 5000,
  },
  {
    type: 'static',
    on: '/Content/images/blingChip/icon_chip_select10k.png',
    off: '/Content/images/blingChip/icon_chip_select10k_off.png',
    select: '/Content/images/blingChip/icon_blingChip_10k.png',
    value: 10000,
  },
  {
    type: 'static',
    on: '/Content/images/blingChip/icon_chip_select50k.png',
    off: '/Content/images/blingChip/icon_chip_select50k_off.png',
    select: '/Content/images/blingChip/icon_blingChip_50k.png',
    value: 50000,
  },
  {
    type: 'static',
    on: '/Content/images/blingChip/icon_chip_select100k.png',
    off: '/Content/images/blingChip/icon_chip_select100k_off.png',
    select: '/Content/images/blingChip/icon_blingChip_100k.png',
    value: 100000,
  },
  {
    type: 'static',
    on: '/Content/images/blingChip/vn/icon_chip_selectB.png',
    off: '/Content/images/blingChip/vn/icon_chip_selectB_off.png',
    select: '/Content/images/blingChip/icon_blingChip_B.png',
    value: 'max',
  },
];
