import { combineReducers } from 'redux';
import { STEP_INSERT, STEP_REMOVE } from './../constants';

const disabledsteps = (state = [], action) => {
  switch (action.type) {
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
  default:
    return state;
  }
};

export default combineReducers({
  activestep,
  disabledsteps,
});
