import { combineReducers } from 'redux';

// application
import { FORM_RESET, FORM_SUBMIT, FIELDS_LOADED } from './../constants';

const alertlevel = (state = false, action) => {
  switch (action.type) {
  case FORM_RESET:
    return false;
  case FORM_SUBMIT:
    return action.submitted;
  default:
    return state;
  }
};

const defaults = (state = {}, action) => {
  switch (action.type) {
  case FIELDS_LOADED:
    return action.fields.reduce(
      // take first value from field as default value
      (acc, { id, values }) => Object.assign({}, acc, { [id]: values[0].id }),
      {},
    );
  default:
    return state;
  }
};

const fields = (state = [], action) => {
  switch (action.type) {
  case FIELDS_LOADED:
    return action.fields.map((obj, index) =>
      Object.assign({}, obj, { index }));
  default:
    return state;
  }
};

const alerts = (state = [], action) => {
  switch (action.type) {
  case FIELDS_LOADED:
    return state.concat(action.alerts);
  default:
    return state;
  }
};

export const form = combineReducers({
  fields,
  alerts,
  defaults,
  alertlevel,
});

export default form;
