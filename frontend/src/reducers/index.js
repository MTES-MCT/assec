import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

// application
import stepper from './stepper';
import { form as steppedform } from './form';

const selected = (state = null, action) => {
  switch (action.type) {
  case 'onAreaSelected':
    return action.id;
  default:
    return state;
  }
};

export default combineReducers({
  stepper,
  selected,
  steppedform,
  form: formReducer,
  router: routerReducer,
});
