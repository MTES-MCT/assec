import gql from 'graphql-tag';

import { GET_DEPARTMENT_RESTRICTIONS } from './queries';

export const CREATE_RESTRICTION = gql(`
mutation createRestriction(
  $usages: [ID]!
  $label: String!
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
    department
  }
}
`);

export const UPDATE_RESTRICTION = gql(`
mutation updateRestriction (
  $id: ID!
  $usages: [ID]!
  $label: String!
  $origines: [ID]!
  $department: ID!
  $situations: [ID]!
  $information: String
  $description: String!
) {
  updateRestriction (
    id: $id
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
    mtime
    ctime
    usages
    origines
    department
    situations
    description
    information
  }
}
`);

const getCurrentRestrictions = (store, department) => {
  const data = store.readQuery({
    variables: { department },
    query: GET_DEPARTMENT_RESTRICTIONS,
  });
  return data.departmentRestrictions;
};

export const UPDATE_DEPARTMENT_RESTRICTIONS = (store, { data }) => {
  let entries = [];
  let variables = {};
  if (data.createRestriction) {
    const { department } = data.createRestriction;
    const current = getCurrentRestrictions(store, department);
    entries = current.concat([data.createRestriction]);
    variables = { department };
  }
  if (data.deleteRestriction) {
    const { department, id } = data.deleteRestriction;
    const current = getCurrentRestrictions(store, department);
    entries = current.filter(obj => obj.id !== id);
    variables = { department };
  }
  store.writeQuery({
    variables,
    query: GET_DEPARTMENT_RESTRICTIONS,
    data: { departmentRestrictions: entries },
  });
};
