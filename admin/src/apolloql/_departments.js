import gql from 'graphql-tag';

import { ALL_DEPARTMENTS } from './queries';

export const CREATE_DEPARTMENT = gql(`
mutation createDepartement(
  $code: String!
  $label: String!
  $usages: [SUOInput]!
  $origines: [SUOInput]!
  $situations: [SUOInput]!
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
    suos {
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
}
`);

export const UPDATE_DEPARTMENTS = (store, { data }) => {
  let dpts = [];
  const { departments: current } = store.readQuery({
    query: ALL_DEPARTMENTS,
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
    query: ALL_DEPARTMENTS,
    data: { departments: dpts },
  });
};
