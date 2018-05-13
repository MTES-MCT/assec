import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';

// application
import './styles.css';
import Page from './app/page';
import { configure } from './app/store';
import { Logger } from './app/core/logger';
import { createClient } from './app/apollo';

Logger.debug(`
  **** Widget Application Debug ****
  NODE_ENV => ${process.env.NODE_ENV}
  REACT_APP_VERSION => ${process.env.REACT_APP_VERSION}
  REACT_APP_GRAPHQL_URI => ${process.env.REACT_APP_GRAPHQL_URI}
`);

// application
const store = configure();
const client = createClient(process.env.REACT_APP_GRAPHQL_URI);
const Root = () => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <Page />
    </ApolloProvider>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));
