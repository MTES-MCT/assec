import thunk from 'redux-thunk';
import { debug } from 'assec-utils';
import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// application
import reducers from './reducers';

const bindMiddleware = (middleware = []) => {
  if (debug()) {
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
