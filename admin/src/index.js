import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React, { Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

// application
import './styles.css';
import { configure } from './store';
import { createClient } from './apollo';
import Page from './page';
import AppPopin from './components/AppPopin';
import AppHeader from './components/AppHeader';
import AppToaster from './components/AppToaster';
import LinearProgress from './components/ui/LinearProgress';

const graphqluri = process.env.REACT_APP_GRAPHQL_URI;
const { client, NetworkStatusNotifier } = createClient(graphqluri);

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
          <AppHeader title="ASSEC" />
          <Page />
          <AppPopin />
          <AppToaster />
        </Fragment>
      </ApolloProvider>
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
