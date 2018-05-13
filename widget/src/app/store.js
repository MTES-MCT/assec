import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// application
import reducers from './reducers';
import { usedebug } from './core/utils/usedebug';

const bindMiddleware = (middleware = []) => {
  if (usedebug()) {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export const configure = (history, initialState = {}) =>
  createStore(reducers, initialState, bindMiddleware());

export default configure;
