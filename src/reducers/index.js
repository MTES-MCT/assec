import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

const defaultfields = (state = [], action) => {
  switch (action.type) {
  case 'onFormLoaded':
    // FIXME -> performance
    // doit on utiliser un deepclone ou JSON.stringify
    return JSON.stringify(action.fields);
  default:
    return state;
  }
};

const fields = (state = [], action) => {
  switch (action.type) {
  case 'onFormLoaded':
    return action.fields;
  case 'onFormReset':
    return action.fields;
  case 'onRemoveField':
    return state.filter(obj => obj.id !== action.id);
  default:
    return state;
  }
};

const activestep = (state = 0, action) => {
  switch (action.type) {
  case 'onFormReset':
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
  defaultfields,
  form: formReducer,
  router: routerReducer,
});
