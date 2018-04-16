import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React, { Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import { Scrollbars } from 'react-custom-scrollbars';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

// application
import './styles.css';
import { configure } from './store';
import { createClient } from './apollo';
import { usedebug } from './core/utils/usedebug';
import Page from './page';
import AppPopin from './components/AppPopin';
import AppHeader from './components/AppHeader';
import AppToaster from './components/AppToaster';
import LinearProgress from './components/ui/LinearProgress';

if (usedebug()) {
  /* eslint-disable */
  console.log('**** Admin Application Debug ****');
  console.log('NODE_ENV', process.env.NODE_ENV);
  console.log('REACT_APP_VERSION', process.env.REACT_APP_VERSION);
  console.log('REACT_APP_GRAPHQL_URI', process.env.REACT_APP_GRAPHQL_URI);
  /* eslint-disable */
}

const appversion = process.env.REACT_APP_VERSION;
const graphqluri = process.env.REACT_APP_GRAPHQL_URI;
const { client, NetworkStatusNotifier } = createClient(graphqluri);

const renderNetworkStatus = args => (
  <Fragment>
    <LinearProgress loading={args.loading} />
    {args.error && <p>Error: {JSON.stringify(args.error)}</p>}
  </Fragment>
);

// application
const history = createHistory();
const store = configure(history);
const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ApolloProvider client={client}>
        <Fragment>
          <Scrollbars autoHide id="body-scroller">
            <div id="body-scroller-content">
              <NetworkStatusNotifier render={renderNetworkStatus} />
              <AppHeader title="ASSEC" version={appversion} />
              <Page />
            </div>
          </Scrollbars>
          <AppPopin />
          <AppToaster />
        </Fragment>
      </ApolloProvider>
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
