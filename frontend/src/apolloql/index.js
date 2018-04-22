import gql from 'graphql-tag';

export const DPT_RESTRICTIONS = gql(`
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

export const GET_RESTRICTION = gql(`
query restriction (
  $id: ID!
) {
  restriction (
    id: $id
  ) {
    id
    dpt
    title
    usages
    origines
    situations
    description
    information
  }
}
`);
