import gql from 'graphql-tag';

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

export const GET_DEPARTEMENT_RESTRICTIONS = gql(`
query restrictions (
  $id: ID!
) {
  restrictions (
    id: $id
  ) {
    id
    department
    description
    informations
  }
}
`);

export const GET_DEPARTEMENT_SUOS = gql(`
query departmentSUOS (
  $id: ID
) {
  departmentSUOS (
    id: $id
  ) {
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
`);

export const GET_DEPARTEMENT = gql(`
query departement (
  $id: ID!
) {
  departement (
    id: $id
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
