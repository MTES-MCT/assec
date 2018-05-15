import { combineReducers } from 'redux';

// application
const step = (state = 0, action) => {
  switch (action.type) {
  case 'onStepForward':
    return state + 1;
  case 'onStepBackward':
    return state - 1;
  default:
    return state;
  }
};

// application
const popin = (state = false, action) => {
  switch (action.type) {
  case 'onOpenPopin':
    return action.value;
  case 'onClosePopin':
    return false;
  default:
    return state;
  }
};

export default combineReducers({
  step,
  popin,
});
