import { combineReducers } from 'redux';

export const person = (state = [], action) => {
  switch (action.type) {
  default:
    return state;
  }
};

export const persons = (state = [], action) => {
  switch (action.type) {
  default:
    return state;
  }
};

export default combineReducers({
  person,
  persons,
});
