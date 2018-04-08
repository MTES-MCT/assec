import gql from 'graphql-tag';

export const DELETE_DEPARTEMENT = gql(`
mutation deleteDepartement (
  $id: ID!
) {
  deleteDepartement (
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

export const ALL_DEPARTEMENTS = gql(`
  query departements {
    departements {
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

export const GET_DEPARTEMENT_SUOS = gql(`
query departementSUOS (
  $id: ID!
) {
  departementSUOS (
    id: $id
  ) {
    usages {
      id
      name
    }
    origines {
      name
    }
    situations {
      name
    }
  }
}
`);

export const GET_DEPARTEMENT = gql(`
query departement (
  $id: ID!
) {
  departement (
    id: $id
  ) {
    id
    name
  }
}
`);

export const UPDATE_DEPARTEMENTS = (
  store,
  { data: { createDepartement: next } },
) => {
  const { departements: previous } = store.readQuery({
    query: ALL_DEPARTEMENTS,
  });
  store.writeQuery({
    query: ALL_DEPARTEMENTS,
    data: { departements: previous.concat([next]) },
  });
};
