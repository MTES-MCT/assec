import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React, { Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import { Scrollbars } from 'react-custom-scrollbars';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

// application
import './styles.css';
import Page from './app/page';
import { Logger } from './app/core/logger';
import { configure } from './app/core/store';
import { createClient } from './app/core/apollo';
import AppPopin from './app/components/AppPopin';
import AppHeader from './app/components/AppHeader';
import { usedebug } from './app/core/utils/usedebug';
import AppToaster from './app/components/AppToaster';
import GraphQLError from './app/components/ui/GraphQLError';
import LinearProgress from './app/components/ui/LinearProgress';

Logger.debug(`
  **** Admin Application Debug ****
  NODE_ENV => ${process.env.NODE_ENV}
  REACT_APP_VERSION => ${process.env.REACT_APP_VERSION}
  REACT_APP_GRAPHQL_URI => ${process.env.REACT_APP_GRAPHQL_URI}
`);

const history = createHistory();
const store = configure(history);

const appversion = process.env.REACT_APP_VERSION;
const graphqluri = process.env.REACT_APP_GRAPHQL_URI;
const { client, NetworkStatusNotifier } = createClient(graphqluri, store);

const renderGraphToaster = args => <AppToaster error={args.error} />;

const renderLinearProgress = args => <LinearProgress loading={args.loading} />;

const renderGraphError = args =>
  usedebug() && args.error && <GraphQLError error={args.error} />;

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ApolloProvider client={client}>
        <Fragment>
          <Scrollbars autoHide id="body-scroller">
            <div id="body-scroller-content">
              <NetworkStatusNotifier render={renderLinearProgress} />
              <AppHeader title="ASSEC" version={appversion} />
              <Page version={appversion} />
              <NetworkStatusNotifier render={renderGraphError} />
            </div>
          </Scrollbars>
          <AppPopin />
          <NetworkStatusNotifier render={renderGraphToaster} />
        </Fragment>
      </ApolloProvider>
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
