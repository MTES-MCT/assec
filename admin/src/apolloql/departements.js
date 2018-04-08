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
  )
}
`);

export const UPDATE_DEPARTEMENT = gql(`
mutation updateDepartement(
  $id: ID!
  $name: String
  $code: String
  $suos: SUOSInput
) {
  updateDepartement (
    id: $id
    name: $name
    code: $code
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
  const { departements } = store.readQuery({
    query: ALL_DEPARTEMENTS,
  });
  let dpts = [];
  if (data.createDepartement) {
    dpts = departements.concat([data.createDepartement]);
  }
  if (data.updateDepartement) {
    dpts = departements.map(dpt =>
      (dpt.id === data.updateDepartement.id ? data.updateDepartement.id : dpt));
  }
  if (data.deleteDepartement) {
    dpts = departements.filter(({ id }) => id !== data.deleteDepartment);
  }
  store.writeQuery({
    query: ALL_DEPARTEMENTS,
    data: { departements: dpts },
  });
};
