import getConfig from 'next/config';
import { reducer as formReducer } from 'redux-form';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';

const { publicRuntimeConfig: envconfig } = getConfig();
const bindMiddleware = (middleware = []) => {
  if (envconfig.usedebug) {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const reducers = combineReducers({
  form: formReducer,
});

const configure = (initialState = {}) =>
  // les arguments sont auto hydrated via next-redux-wrapper
  // @see ./../pages/index.js
  createStore(reducers, initialState, bindMiddleware());

export default configure;
