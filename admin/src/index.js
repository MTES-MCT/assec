import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React, { Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

// application
import './styles.css';
import Page from './page';
import { configure } from './store';
import { createClient } from './client';
import LinearProgress from './components/ui/LinearProgress';

const { client, NetworkStatusNotifier } = createClient('http://localhost:3200/graphql');

// application
const history = createHistory();
const store = configure(history);
const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ApolloProvider client={client}>
        <Fragment>
          <NetworkStatusNotifier render={({ loading, error }) => (
            <div className="relative">
              <LinearProgress loading={loading} />
              {error && <p>Error: {JSON.stringify(error)}</p>}
            </div>
          )} />
          <Page />
        </Fragment>
      </ApolloProvider>
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
