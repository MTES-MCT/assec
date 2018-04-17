import gql from 'graphql-tag';

import { GET_DEPARTEMENT_RESTRICTIONS } from './queries';

export const CREATE_RESTRICTION = gql(`
mutation createRestriction(
  $dpt: ID!
  $title: String!
  $usages: [String]!
  $origines: [String]!
  $description: String!
  $situations: [String]!
  $information: String
) {
  createRestriction(
    dpt: $dpt
    title: $title
    usages: $usages
    origines: $origines
    description: $description
    situations: $situations
    information: $information
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
