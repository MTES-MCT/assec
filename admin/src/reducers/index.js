import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import loadingReducer from './loading';

export default combineReducers({
  loading: loadingReducer,
  router: routerReducer,
});
