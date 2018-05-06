import getConfig from 'next/config';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';

const { publicRuntimeConfig: envconfig } = getConfig();
const bindMiddleware = (middleware = []) => {
  if (envconfig.usedebug) {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const subscriptionStatus = (state = null, action) => {
  switch (action.type) {
  case 'onToasterClear':
    return null;
  case 'onSubscriptionStatus':
    return {
      type: action.status,
      message: action.message,
    };
  default:
    return state;
  }
};

const reducers = combineReducers({
  subscriptionStatus,
});

const configure = (initialState = {}) =>
  // les arguments sont auto hydrated via next-redux-wrapper
  // @see ./../pages/index.js
  createStore(reducers, initialState, bindMiddleware());

export default configure;
