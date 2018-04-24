import gql from 'graphql-tag';

import { GET_DEPARTMENT_RESTRICTIONS } from './queries';

export const CREATE_RESTRICTION = gql(`
mutation createRestriction(
  $dpt: ID!
  $label: String!
  $usages: [String]!
  $origines: [String]!
  $information: String
  $description: String!
  $situations: [String]!
) {
  createRestriction(
    dpt: $dpt
    label: $label
    usages: $usages
    origines: $origines
    situations: $situations
    description: $description
    information: $information
  ) {
    id
    dpt
    slug
    label
    usages
    origines
    situations
    description
    information
  }
}
`);

export const DELETE_RESTRICTION = gql(`
mutation deleteRestriction (
  $id: ID!
) {
  deleteRestriction (
    id: $id
  ) {
    id
    dpt
  }
}
`);

const getCurrentRestrictions = (store, dpt) => {
  const data = store.readQuery({
    variables: { dpt },
    query: GET_DEPARTMENT_RESTRICTIONS,
  });
  return data.restrictions;
};

export const UPDATE_DPT_RESTRICTIONS = (store, { data }) => {
  let entries = [];
  let variables = {};
  if (data.createRestriction) {
    const { dpt } = data.createRestriction;
    const restrictions = getCurrentRestrictions(store, dpt);
    entries = restrictions.concat([data.createRestriction]);
    variables = { dpt };
  }
  // if (data.updateRestriction) {
  //   entries = restrictions.map(dpt =>
  //     (dpt.id === data.updateRestriction.id ? data.updateRestriction.id : dpt));
  // }
  if (data.deleteRestriction) {
    const { dpt, id } = data.deleteRestriction;
    const restrictions = getCurrentRestrictions(store, dpt);
    entries = restrictions.filter(obj => obj.id !== id);
    variables = { dpt };
  }
  store.writeQuery({
    variables,
    query: GET_DEPARTMENT_RESTRICTIONS,
    data: { restrictions: entries },
  });
};
