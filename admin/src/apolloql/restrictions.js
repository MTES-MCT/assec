import gql from 'graphql-tag';

import { ALL_DEPARTEMENT_RESTRICTIONS } from './queries';

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
    query: ALL_DEPARTEMENT_RESTRICTIONS,
  });
  store.writeQuery({
    query: ALL_DEPARTEMENT_RESTRICTIONS,
    data: { restrictions: restrictions.concat([createRestriction]) },
  });
};
