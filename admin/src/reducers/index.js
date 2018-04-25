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

const openednav = (state = false, action) => {
  switch (action.type) {
  case 'onToggleNavigation':
    return !state;
  default:
    return state;
  }
};

const popin = (state = null, action) => {
  switch (action.type) {
  case 'onOpenPopin':
    return { ...action.popin };
  case 'onClosePopin':
    return null;
  default:
    return state;
  }
};

export default combineReducers({
  popin,
  toasts,
  openednav,
  router: routerReducer,
});
