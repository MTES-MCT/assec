import { createStore, applyMiddleware } from 'redux';

// application
import reducers from './reducers';

const bindMiddleware = (middleware = []) => applyMiddleware(...middleware);

export const configure = (initialState = {}) =>
  createStore(reducers, initialState, bindMiddleware());

export default configure;
