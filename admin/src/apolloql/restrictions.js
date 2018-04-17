import gql from 'graphql-tag';

import { ALL_RESTRICTIONS } from './queries';

export const CREATE_RESTRICTION = gql(`
mutation createRestriction(
  $dpt: ID!
  $title: String!
  $usages: [String]!
  $origines: [String]!
  $information: String
  $description: String!
  $situations: [String]!
) {
  createRestriction(
    dpt: $dpt
    title: $title
    usages: $usages
    origines: $origines
    situations: $situations
    description: $description
    information: $information
  ) {
    id
    dpt
    slug
    title
    usages
    origines
    situations
    description
    information
  }
}
`);

export const UPDATE_RESTRICTIONS = (store, { data }) => {
  const { restrictions } = store.readQuery({
    variables: { dpt: data.createRestriction.dpt },
    query: ALL_RESTRICTIONS,
  });
  let entries = [];
  if (data.createRestriction) {
    entries = restrictions.concat([data.createRestriction]);
  }
  // if (data.updateRestriction) {
  //   entries = restrictions.map(dpt =>
  //     (dpt.id === data.updateRestriction.id ? data.updateRestriction.id : dpt));
  // }
  // if (data.deleteRestriction) {
  //   entries = restrictions.filter(({ id }) => id !== data.deleteRestriction);
  // }
  store.writeQuery({
    query: ALL_RESTRICTIONS,
    data: { restrictions: entries },
    variables: { dpt: data.createRestriction.dpt },
  });
};
