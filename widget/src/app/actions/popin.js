export const openPopin = value => ({
  value,
  type: 'onOpenPopin',
});

export const closePopin = () => ({
  type: 'onClosePopin',
});

export const closeWelcome = () => ({
  type: 'onCloseWelcome',
});
