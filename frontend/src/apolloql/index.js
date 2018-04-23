import gql from 'graphql-tag';

export const FIND_RESTRICTION_BY_CRITERIAS = gql(`
query findRestictionByCriteria (
  $dpt: ID!
  $zones: ID!
  $usages: ID!
  $origines: ID!
) {
  findRestictionByCriteria (
    dpt: $dpt
    zones: $zones
    usages: $usages
    origines: $origines
  ) {
    id
    title
    description
  }
}
`);

export const HYDRATE_DEPARTMENT = gql(`
query hydrateDepartment (
  $dpt: ID!
) {
  hydrateDepartment (
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
    zones {
      id
      name
      help
      order
      geojson
    }
    restrictions {
      id
      title
      usages
      origines
      situations
      description
    }
  }
}
`);
