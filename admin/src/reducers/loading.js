import { combineReducers } from 'redux';
import {
  APOLLO_QUERY_INIT,
  APOLLO_QUERY_RESULT,
  APOLLO_MUTATION_INIT,
  APOLLO_MUTATION_RESULT,
} from 'apollo-link-redux';

export const error = (state = null, action) => {
  switch (action.type) {
  case 'onLoadingStart':
  case 'onLoadingComplete':
    return null;
  case 'onLoadingError':
    return action.error;
  default:
    return state;
  }
};

export const isloading = (state = false, action) => {
  switch (action.type) {
  case 'onLoadingStart':
  case APOLLO_QUERY_INIT:
  case APOLLO_MUTATION_INIT:
    return true;
  case 'onLoadingError':
  case 'onLoadingComplete':
  case APOLLO_QUERY_RESULT:
  case APOLLO_MUTATION_RESULT:
    return false;
  default:
    return state;
  }
};

export default combineReducers({
  error,
  isloading,
});
