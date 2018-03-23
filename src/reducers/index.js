import produce from 'immer';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

// application
import stepper from './stepper';
import { FORM_LOADED } from './../constants';

const formfields = produce((draft, action) => {
  switch (action.type) {
  case FORM_LOADED:
    return draft.concat(action.fields);
  default:
    return draft;
  }
}, []);

export default combineReducers({
  stepper,
  formfields,
  form: formReducer,
  router: routerReducer,
});
