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
  default:
    return state;
  }
};

const activestep = (state = 0, action) => {
  switch (action.type) {
  case 'onFormReset':
    return 0;
  case 'onStepForwardTo':
    return action.index;
  default:
    return state;
  }
};

const disabledfields = (state = [], action) => {
  switch (action.type) {
  case 'onFormReset':
    return [];
  case 'onRemoveField':
    return state.concat([action.index]).sort();
  case 'onInsertField':
    return state.filter(num => num !== action.index).sort();
  default:
    return state;
  }
};

export default combineReducers({
  fields,
  activestep,
  defaultfields,
  disabledfields,
  form: formReducer,
  router: routerReducer,
});
