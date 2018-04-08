import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

const toasts = (state = [], action) => {
  switch (action.type) {
  case 'onAddToast':
    return state.concat([action.item]);
  case 'onRemoveToast':
    return state.filter(obj => obj.id !== action.id);
  default:
    return state;
  }
};

export default combineReducers({
  toasts,
  router: routerReducer,
});
