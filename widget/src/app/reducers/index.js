import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// application
const active = (state = 0, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

export default combineReducers({
  active,
  form: formReducer,
});
