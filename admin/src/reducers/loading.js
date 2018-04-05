import { combineReducers } from 'redux';

export const error = (state = null, action) => {
  switch (action.type) {
  case 'onLoadingStart':
  case 'onLoadingComplete':
    return null;
  case 'onLoadingError':
    return action.error;
  default:
    return state;
  }
};

export const isloading = (state = false, action) => {
  switch (action.type) {
  case 'onLoadingStart':
    return true;
  case 'onLoadingError':
  case 'onLoadingComplete':
    return false;
  default:
    return state;
  }
};

export default combineReducers({
  error,
  isloading,
});
