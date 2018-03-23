import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

const fields = (state = [], action) => {
  switch (action.type) {
  case 'onFormLoaded':
    return action.fields;
  default:
    return state;
  }
};

const activestep = (state = 0, action) => {
  switch (action.type) {
  case 'onStepReset':
    return 0;
  case 'onStepForward':
    return state + 1;
  case 'onStepBackward':
    return state - 1;
  default:
    return state;
  }
};

export default combineReducers({
  fields,
  activestep,
  form: formReducer,
  router: routerReducer,
});
