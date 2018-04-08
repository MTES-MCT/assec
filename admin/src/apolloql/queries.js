import gql from 'graphql-tag';

export const ALL_DEPARTEMENT_RESTRICTIONS = gql(`
query estrictions {
  estrictions {
    id
    department
    description
    informations
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
