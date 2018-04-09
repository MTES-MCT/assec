import gql from 'graphql-tag';

import { GET_DEPARTEMENT_RESTRICTIONS } from './queries';

export const CREATE_RESTRICTION = gql(`
mutation createRestriction(
  $id: String!
  $description: String!
) {
  createRestriction(
    id: $id
    description: $description
  ) {
    id
  }
}
`);

export const UPDATE_RESTRICTIONS = (store, { data: { createRestriction } }) => {
  const { restrictions } = store.readQuery({
    query: GET_DEPARTEMENT_RESTRICTIONS,
  });
  store.writeQuery({
    query: GET_DEPARTEMENT_RESTRICTIONS,
    data: { restrictions: restrictions.concat([createRestriction]) },
  });
};
