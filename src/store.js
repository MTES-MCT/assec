import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// application
import reducers from './reducers';

const bindMiddleware = (middleware = []) => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware(...middleware);
  }
  return composeWithDevTools(applyMiddleware(...middleware));
};

export const configure = (history, initialState = {}) =>
  createStore(
    reducers,
    initialState,
    bindMiddleware([routerMiddleware(history)]),
  );

export default configure;
