import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { popin } from './popin';
import { toasts } from './toaster';

const openednav = (state = false, action) => {
  switch (action.type) {
  case 'onToggleNavigation':
    return !state;
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
