import { combineReducers } from 'redux';
import {
  FORM_RESET,
  STEP_INSERT,
  STEP_REMOVE,
  STEP_FORWARD,
  STEP_BACKWARD,
} from './../constants';

const disabledsteps = (state = [], action) => {
  switch (action.type) {
  case FORM_RESET:
    return [];
  case STEP_REMOVE:
    return state.concat([action.index]);
  case STEP_INSERT:
    return state.filter(index => index !== action.index);
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
