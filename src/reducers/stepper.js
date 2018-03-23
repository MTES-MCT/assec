import produce from 'immer';
import { combineReducers } from 'redux';
import { FORM_LOADED } from './../constants';

const steps = (state = [], action) =>
  produce(state, () => {
    switch (action.type) {
    case FORM_LOADED:
      return action.fields;
    default:
      return state;
    }
  });

// export const disabled = (state = {}, action) => {
//   switch (action.type) {
//   default:
//     return state;
//   }
// };

// export const fields = (state = {}, action) => {
//   switch (action.type) {
//   default:
//     return state;
//   }
// };

const active = (state = 0, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

export default combineReducers({
  steps,
  active,
});
