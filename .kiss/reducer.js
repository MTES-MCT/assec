import { combineReducers } from 'redux';

export const myreducer = (state = {}, action) => {
  switch (action.type) {
    case 'my.action.type':
      return state;
    default:
      return state;
  }
};

export default combineReducers({
  myreducer,
});
