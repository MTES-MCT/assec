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
    action.fields.forEach((obj, index) => {
      const field = Object.assign({}, obj, { index });
      draft.push(field);
    });
    return draft;
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
