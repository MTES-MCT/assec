import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createNetworkStatusNotifier } from 'react-apollo-network-status';

// FIXME ->
// prevents __typename to be send to server
// github.com/apollographql/apollo-client/issues/1564#issuecomment-357492659
const createOmitTypenameLink = () => {
  const omitTypename = (key, value) =>
    (key === '__typename' ? undefined : value);

  return new ApolloLink((operation, forward) => {
    if (operation.variables) {
      // eslint-disable-next-line
      operation.variables = JSON.parse(
        JSON.stringify(operation.variables),
        omitTypename,
      );
    }
    return forward(operation);
  });
};

const {
  NetworkStatusNotifier,
  link: networkStatusNotifierLink,
} = createNetworkStatusNotifier();

export const createClient = (uri) => {
  const httpLink = new HttpLink({
    uri,
    credentials: 'same-origin',
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    connectToDevTools: process.env.NODE_ENV !== 'production',
    link: ApolloLink.from([
      createOmitTypenameLink(),
      networkStatusNotifierLink.concat(httpLink),
    ]),
  });
  return { client, NetworkStatusNotifier };
};

export default createClient;
