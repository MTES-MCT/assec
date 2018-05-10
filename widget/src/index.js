import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

// application
import './styles.css';
import Page from './app/page';
import { configure } from './app/store';
import { usedebug } from './app/core/utils/usedebug';

if (usedebug()) {
  /* eslint-disable */
  console.log('**** Widget Application Debug ****');
  console.log('NODE_ENV', process.env.NODE_ENV);
  console.log('REACT_APP_VERSION', process.env.REACT_APP_VERSION);
  console.log('REACT_APP_GRAPHQL_URI', process.env.REACT_APP_GRAPHQL_URI);
  /* eslint-disable */
}

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_URI,
});

// application
const history = createHistory();
const store = configure(history);
const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ApolloProvider client={client}>
        <Page client={client} />
      </ApolloProvider>
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
