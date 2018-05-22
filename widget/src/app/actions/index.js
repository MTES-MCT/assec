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

export const stepForward = () => ({
  type: 'onStepForward',
});

export const stepBackward = () => ({
  type: 'onStepBackward',
});

export const resetForm = () => ({
  type: 'onResetForm',
});

export const submitForm = values => ({
  values,
  type: 'onSubmitForm',
});
