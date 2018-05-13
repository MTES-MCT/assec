import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';

export const createClient = (uri) => {
  const httpLink = new HttpLink({
    uri,
    credentials: 'same-origin',
  });

  const client = new ApolloClient({
    link: ApolloLink.from([httpLink]),
    cache: new InMemoryCache({
      dataIdFromObject: (object) => {
        // eslint-disable-next-line
        switch (object.__typename) {
        case 'SituationExtendedType':
          return object.zoneid;
        default:
          return defaultDataIdFromObject(object);
        }
      },
    }),
  });
  return client;
};

export default createClient;
