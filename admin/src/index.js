import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// application
import './styles.css';
import Page from './page';
import { configure } from './store';

const client = new ApolloClient({
  uri: 'http://localhost:3200/graphql',
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
