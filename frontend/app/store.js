import getConfig from 'next/config';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';

// application
import { reducers } from './reducers';

const { publicRuntimeConfig: envconfig } = getConfig();

const bindMiddleware = (middleware = []) => {
  if (envconfig.usedebug) {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const configure = (initialState = {}) =>
  // les arguments sont auto hydrated via next-redux-wrapper
  // @see ./../pages/index.js
  createStore(reducers, initialState, bindMiddleware());

export default configure;
