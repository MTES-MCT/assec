import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createNetworkStatusNotifier } from 'react-apollo-network-status';

const {
  NetworkStatusNotifier,
  link: networkStatusNotifierLink,
} = createNetworkStatusNotifier();

export const createClient = (uri) => {
  const httplink = new HttpLink({
    uri,
    credentials: 'same-origin',
  });

  const errorlink = ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        // eslint-disable-next-line
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
      });
    }
    if (networkError) {
      // eslint-disable-next-line
      console.log(`[Network error]: ${networkError}`);
    }
  };

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([
      onError(errorlink),
      networkStatusNotifierLink.concat(httplink),
    ]),
  });
  return { client, NetworkStatusNotifier };
};

export default createClient;
