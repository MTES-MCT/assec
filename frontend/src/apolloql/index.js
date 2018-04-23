import gql from 'graphql-tag';

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

export default HYDRATE_DEPARTMENT;
