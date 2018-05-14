import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

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

export default combineReducers({
  step,
  form: formReducer,
});
