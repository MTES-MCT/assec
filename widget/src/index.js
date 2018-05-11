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
import { Logger } from './app/core/logger';

Logger.debug(`
  **** Widget Application Debug ****
  NODE_ENV => ${process.env.NODE_ENV}
  REACT_APP_VERSION => ${process.env.REACT_APP_VERSION}
  REACT_APP_GRAPHQL_URI => ${process.env.REACT_APP_GRAPHQL_URI}
`);

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
        <Page />
      </ApolloProvider>
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
