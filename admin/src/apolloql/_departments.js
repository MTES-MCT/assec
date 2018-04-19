import gql from 'graphql-tag';

import { ALL_DEPARTMENTS } from './queries';

export const CREATE_DEPARTMENT = gql(`
mutation createDepartement(
  $code: String!
  $name: String!
  $suos: SUOSInput!
) {
  createDepartement(
    code: $code
    name: $name
    suos: $suos
  ) {
    id
    code
    name
    suos {
      usages {
        id
        name
      }
      origines {
        id
        name
      }
      situations {
        id
        name
      }
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
    name
    suos {
      usages {
        id
        name
      }
      origines {
        id
        name
      }
      situations {
        id
        name
      }
    }
  }
}
`);

export const UPDATE_DEPARTMENTS = (store, { data }) => {
  let dpts = [];
  const { departments } = store.readQuery({
    query: ALL_DEPARTMENTS,
  });
  if (data.createDepartement) {
    dpts = departments.concat([data.createDepartement]);
  }
  if (data.updateDepartement) {
    dpts = departments.map(dpt =>
      (dpt.id === data.updateDepartement.id ? data.updateDepartement.id : dpt));
  }
  if (data.deleteDepartment) {
    dpts = departments.filter(({ id }) => id !== data.deleteDepartment.id);
  }
  store.writeQuery({
    query: ALL_DEPARTMENTS,
    data: { departments: dpts },
  });
};
