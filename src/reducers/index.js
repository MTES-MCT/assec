import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

const fields = (state = [], action) => {
  switch (action.type) {
  case 'onFormLoaded':
    return action.fields;
  default:
    return state;
  }
};

export default combineReducers({
  fields,
  form: formReducer,
  router: routerReducer,
});
