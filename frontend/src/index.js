import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

// application
import './styles.css';
import Page from './page';
import { configure } from './store';
import { usedebug } from './core/utils';

if (usedebug()) {
  /* eslint-disable */
  console.log('**** Frontend Application Debug ****');
  console.log('NODE_ENV', process.env.NODE_ENV);
  console.log('REACT_APP_VERSION', process.env.REACT_APP_VERSION);
  console.log('REACT_APP_GRAPHQL_URI', process.env.REACT_APP_GRAPHQL_URI);
  /* eslint-disable */
}

// application
const history = createHistory();
const store = configure(history);
const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Page />
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
