import gql from 'graphql-tag';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';

export const LOAD_DEPARTMENT_RESTRICTION = gql(`
query findRestriction (
  $usages: String!
  $origines: String!
  $situations: [Float]!
) {
  findRestriction (
    usages: $usages
    origines: $origines
    situations: $situations
  ) {
    id
    label
    description
  }
}`);

export const LOAD_DEPARTMENT_WIDGET = gql(`
query widget (
  $code: String
) {
  widget (
    code: $code
  ) {
    map {
      zone
      center
      maxbounds
    }
    questions {
      id
      type
      title
      order
      display
      description
      values {
        id
        label
      }
      zones {
        id
        name
        label
        order
        zoneid
        geojson
        shortname
        description
      }
    }
  }
}
`);

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
