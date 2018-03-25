import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

// application
import stepper from './stepper';
import { form as steppedform } from './form';

export default combineReducers({
  stepper,
  steppedform,
  form: formReducer,
  router: routerReducer,
});
