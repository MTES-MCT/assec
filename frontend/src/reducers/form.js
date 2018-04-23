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

// les defaults sont utilises dans le cas d'un formulaire decisionnel
// si l'utilisateur n'a pas rempli une question du formulaire
// on prend la valeur par defaut
// cette valeur correspond à la premiere valeurs d'un SUO
const defaults = (state = {}, action) => {
  switch (action.type) {
  case FIELDS_LOADED:
    return action.fields.reduce(
      // take first value from field as default value
      (acc, obj) => {
        const value =
            (obj &&
              obj.id &&
              obj.values &&
              obj.values[0] && { [obj.id]: obj.values[0].id }) ||
            {};
        return Object.assign({}, acc, value);
      },
      {},
    );
  default:
    return state;
  }
};

// les fields sont les champs du formulaire
// { question, description, valeurs }
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
