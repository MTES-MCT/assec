import getConfig from 'next/config';
import { withData } from 'next-apollo';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const { publicRuntimeConfig: envconfig } = getConfig();
const serveruri = envconfig.graphqluri;

const httpLink = new HttpLink({
  // Server URL (must be absolute)
  uri: serveruri,
  // Additional fetch() options like `credentials` or `headers`
  opts: { credentials: 'same-origin' },
});

const config = {
  ssrMode: true,
  cache: new InMemoryCache(),
  link: ApolloLink.from([httpLink]),
};

export default withData(config);
