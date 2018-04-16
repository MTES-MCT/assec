import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// application
import reducers from './reducers';
import { usedebug } from './core/utils';

const bindMiddleware = (middleware = []) => {
  if (usedebug()) {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export const configure = (history, initialState = {}) =>
  createStore(
    reducers,
    initialState,
    bindMiddleware([thunk, routerMiddleware(history)]),
  );

export default configure;
