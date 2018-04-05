export const loadingStart = () => ({
  type: 'onLoadingStart',
});

export const loadingComplete = () => ({
  type: 'onLoadingComplete',
});

export const loadingError = error => ({
  error,
  type: 'onLoadingError',
});
