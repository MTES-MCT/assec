import gql from 'graphql-tag';

import { ALL_DEPARTEMENTS } from './queries';

export const CREATE_DEPARTEMENT = gql(`
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

export const DELETE_DEPARTEMENT = gql(`
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

export const UPDATE_DEPARTEMENTS = (store, { data }) => {
  let dpts = [];
  const { departements } = store.readQuery({
    query: ALL_DEPARTEMENTS,
  });
  if (data.createDepartement) {
    dpts = departements.concat([data.createDepartement]);
  }
  if (data.updateDepartement) {
    dpts = departements.map(dpt =>
      (dpt.id === data.updateDepartement.id ? data.updateDepartement.id : dpt));
  }
  if (data.deleteDepartment) {
    dpts = departements.filter(({ id }) => id !== data.deleteDepartment.id);
  }
  store.writeQuery({
    query: ALL_DEPARTEMENTS,
    data: { departements: dpts },
  });
};
