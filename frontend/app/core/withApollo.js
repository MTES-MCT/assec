import getConfig from 'next/config';
import { withData } from 'next-apollo';
import { HttpLink } from 'apollo-link-http';

const { publicRuntimeConfig: envconfig } = getConfig();
const serveruri = envconfig.graphqluri;

const config = {
  link: new HttpLink({
    // Server URL (must be absolute)
    uri: serveruri,
    opts: {
      // Additional fetch() options like `credentials` or `headers`
      credentials: 'same-origin',
    },
  }),
};

export default withData(config);
