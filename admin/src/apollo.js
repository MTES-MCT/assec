import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createNetworkStatusNotifier } from 'react-apollo-network-status';

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
    link: ApolloLink.from([networkStatusNotifierLink.concat(httpLink)]),
  });
  return { client, NetworkStatusNotifier };
};

export default createClient;
