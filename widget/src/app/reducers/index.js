import { combineReducers } from 'redux';

// application
const step = (state = 0, action) => {
  switch (action.type) {
  case 'onResetForm':
    return 0;
  case 'onSubmitForm':
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

// application
const choices = (state = null, action) => {
  switch (action.type) {
  case 'onResetForm':
    return null;
  case 'onSubmitForm':
    return action.values;
  default:
    return state;
  }
};

// application
const welcome = (state = true, action) => {
  switch (action.type) {
  case 'onCloseWelcome':
    return false;
  default:
    return state;
  }
};

export default combineReducers({
  step,
  popin,
  choices,
  welcome,
});
