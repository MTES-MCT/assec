import { combineReducers } from 'redux';

const subscriptionStatus = (state = null, action) => {
  switch (action.type) {
  case 'onToasterClear':
    return null;
  case 'onSubscriptionStatus':
    return {
      type: action.status,
      message: action.message,
    };
  default:
    return state;
  }
};

const popin = (state = false, action) => {
  switch (action.type) {
  case 'onOpenPopin':
    return true;
  case 'onClosePopin':
    return false;
  default:
    return state;
  }
};

export const reducers = combineReducers({
  popin,
  subscriptionStatus,
});

export default reducers;
