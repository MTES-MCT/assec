import gql from 'graphql-tag';

export const FIND_RESTRICTION_BY_CRITERIAS = gql(`
query findRestictionByCriteria (
  $zones: ID!
  $usages: ID!
  $origines: ID!
  $department: ID!
) {
  findRestictionByCriteria (
    zones: $zones
    usages: $usages
    origines: $origines
    department: $department
  ) {
    id
    label
    description
  }
}
`);

export const HYDRATE_DEPARTMENT = gql(`
query hydrateDepartment (
  $department: ID!
) {
  hydrateDepartment (
    department: $department
  ) {
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
    zones {
      id
      help
      name
      label
      order
      geojson
      shortname
      alerte {
        end_date
        start_date
        situation {
          id
          label
        }
      }
    }
    restrictions {
      id
      label
      usages
      origines
      situations
      description
    }
  }
}
`);
