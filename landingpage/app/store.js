import { reducer as formReducer } from 'redux-form';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, combineReducers, applyMiddleware } from 'redux';

// application
import usedebug from './core/usedebug';

const bindMiddleware = (middleware = []) => {
  if (usedebug()) {
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const reducers = combineReducers({
  form: formReducer,
});

const configure = (initialState = {}) =>
  createStore(reducers, initialState, bindMiddleware());

export default configure;
