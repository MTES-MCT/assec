import gql from 'graphql-tag';

import { GET_ALL_DEPARTMENTS } from './queries';

export const CREATE_DEPARTMENT = gql(`
mutation createDepartement(
  $code: String!
  $label: String!
  $usages: [String]!
  $origines: [String]!
  $situations: [String]!
) {
  createDepartement(
    code: $code
    label: $label
    usages: $usages
    origines: $origines
    situations: $situations
  ) {
    id
    code
    label
    usages {
      id
      label
    }
    origines {
      id
      label
    }
    situations {
      id
      label
    }
  }
}
`);

export const DELETE_DEPARTMENT = gql(`
mutation deleteDepartment (
  $id: ID!
) {
  deleteDepartment (
    id: $id
  ) {
    id
  }
}
`);

export const UPDATE_DEPARTMENT = gql(`
mutation updateDepartement(
  $id: ID!
  $suos: SUOSInput!
) {
  updateDepartement (
    id: $id
    suos: $suos
  ) {
    id
    code
    label
    usages {
      id
      label
    }
    origines {
      id
      label
    }
    situations {
      id
      label
    }
  }
}
`);

export const UPDATE_ALL_DEPARTMENTS = (store, { data }) => {
  let dpts = [];
  const { departments: current } = store.readQuery({
    query: GET_ALL_DEPARTMENTS,
  });
  if (data.createDepartement) {
    dpts = current.concat([data.createDepartement]);
  }
  if (data.updateDepartement) {
    dpts = current.map(dpt =>
      (dpt.id === data.updateDepartement.id ? data.updateDepartement.id : dpt));
  }
  if (data.deleteDepartment) {
    dpts = current.filter(({ id }) => id !== data.deleteDepartment.id);
  }
  store.writeQuery({
    query: GET_ALL_DEPARTMENTS,
    data: { departments: dpts },
  });
};
