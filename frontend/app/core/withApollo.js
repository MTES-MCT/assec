import getConfig from 'next/config';
import { withData } from 'next-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const { publicRuntimeConfig: envconfig } = getConfig();
const serveruri = envconfig.graphqluri;

const config = {
  ssrMode: true,
  cache: new InMemoryCache(),
  link: new HttpLink({
    // Server URL (must be absolute)
    uri: serveruri,
    // Additional fetch() options like `credentials` or `headers`
    opts: { credentials: 'same-origin' },
  }),
};

export default withData(config);
