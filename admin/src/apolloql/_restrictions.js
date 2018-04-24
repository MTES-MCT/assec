import gql from 'graphql-tag';

import { GET_DEPARTMENT_RESTRICTIONS } from './queries';

export const CREATE_RESTRICTION = gql(`
mutation createRestriction(
  $label: String!
  $usages: [ID]!
  $origines: [ID]!
  $department: ID!
  $situations: [ID]!
  $information: String
  $description: String!
) {
  createRestriction(
    label: $label
    usages: $usages
    origines: $origines
    department: $department
    situations: $situations
    description: $description
    information: $information
  ) {
    id
    label
    usages
    origines
    department
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
  }
}
`);

const getCurrentRestrictions = (store, department) => {
  const data = store.readQuery({
    variables: { id: department },
    query: GET_DEPARTMENT_RESTRICTIONS,
  });
  return data.restrictions;
};

export const UPDATE_DEPARTMENT_RESTRICTIONS = (store, { data }) => {
  let entries = [];
  let variables = {};
  if (data.createRestriction) {
    const { department } = data.createRestriction;
    const restrictions = getCurrentRestrictions(store, department);
    entries = restrictions.concat([data.createRestriction]);
    variables = { id: department };
  }
  // if (data.updateRestriction) {
  //   entries = restrictions.map(dpt =>
  //     (dpt.id === data.updateRestriction.id ? data.updateRestriction.id : dpt));
  // }
  if (data.deleteRestriction) {
    const { department, id } = data.deleteRestriction;
    const restrictions = getCurrentRestrictions(store, department);
    entries = restrictions.filter(obj => obj.id !== id);
    variables = { id: department };
  }
  store.writeQuery({
    variables,
    query: GET_DEPARTMENT_RESTRICTIONS,
    data: { restrictions: entries },
  });
};
