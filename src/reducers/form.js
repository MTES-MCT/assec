import produce from 'immer';
import { combineReducers } from 'redux';

// application
import { FORM_RESET, FORM_SUBMIT, FIELDS_LOADED } from './../constants';

const results = (state = {}, action) => {
  switch (action.type) {
  case FORM_RESET:
    return {};
  case FORM_SUBMIT:
    return { ...action.values };
  default:
    return state;
  }
};

const fields = produce((draft, action) => {
  switch (action.type) {
  case FIELDS_LOADED:
    action.fields.forEach((obj, index) => {
      const field = Object.assign({}, obj, { index });
      draft.push(field);
    });
    return draft;
  default:
    return draft;
  }
}, []);

export const form = combineReducers({
  fields,
  results,
});

export default form;
