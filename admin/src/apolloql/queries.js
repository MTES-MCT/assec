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

export const ALL_RESTRICTIONS = gql(`
query restrictions (
  $dpt: ID
) {
  restrictions (
    dpt: $dpt
  ) {
    id
    dpt
    slug
    title
    usages
    origines
    situations
    description
    information
  }
}
`);

export const SUOS = gql(`
query suos (
  $dpt: ID
) {
  suos (
    dpt: $dpt
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
