import { combineReducers } from 'redux';

// application
import {
  FORM_RESET,
  STEP_DISABLED,
  STEP_FORWARD,
  STEP_BACKWARD,
} from './../constants';

const disabledsteps = (state = [], action) => {
  switch (action.type) {
  case FORM_RESET:
    return [];
  case STEP_DISABLED:
    return action.disabled;
  default:
    return state;
  }
};

const activestep = (state = 0, action) => {
  switch (action.type) {
  case FORM_RESET:
    return 0;
  case STEP_FORWARD:
    return state + 1;
  case STEP_BACKWARD:
    return state - 1;
  default:
    return state;
  }
};

export default combineReducers({
  activestep,
  disabledsteps,
});
