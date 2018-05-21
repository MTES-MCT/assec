export const stepForward = () => ({
  type: 'onStepForward',
});

export const stepBackward = () => ({
  type: 'onStepBackward',
});

export const submitForm = values => ({
  values,
  type: 'onSubmitForm',
});
