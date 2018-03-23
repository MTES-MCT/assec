import produce from 'immer';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

// application
import stepper from './stepper';
import { FORM_LOADED } from './../constants';

const formfields = (state = [], action) =>
  produce(state, () => {
    switch (action.type) {
    case FORM_LOADED:
      return action.fields;
    default:
      return state;
    }
  });

// const fields = (state = [], action) => {
//   switch (action.type) {
//   case 'onFormLoaded':
//     return action.fields;
//   case 'onFormReset':
//     return action.fields;
//   default:
//     return state;
//   }
// };
//
// const activestep = (state = 0, action) => {
//   switch (action.type) {
//   case 'onFormReset':
//     return 0;
//   case 'onStepForwardTo':
//     return action.index;
//   default:
//     return state;
//   }
// };
//
// const disabledfields = (state = [], action) => {
//   switch (action.type) {
//   case 'onFormReset':
//     return [];
//   case 'onRemoveField':
//     return state.concat([action.index]).sort();
//   case 'onInsertField':
//     return state.filter(num => num !== action.index).sort();
//   default:
//     return state;
//   }
// };

export default combineReducers({
  stepper,
  formfields,
  form: formReducer,
  router: routerReducer,
});
