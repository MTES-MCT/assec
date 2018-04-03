import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

// application
import personReducer from './persons';

export default combineReducers({
  form: formReducer,
  router: routerReducer,
  persons: personReducer,
});
