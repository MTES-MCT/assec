import gql from 'graphql-tag';

// export const FIND_RESTRICTION_BY_CRITERIAS = gql(`
// query findRestictionByCriteria (
//   $zones: ID!
//   $usages: ID!
//   $origines: ID!
//   $department: ID!
// ) {
//   findRestictionByCriteria (
//     zones: $zones
//     usages: $usages
//     origines: $origines
//     department: $department
//   ) {
//     id
//     label
//     description
//   }
// }
// `);

export const LOAD_DEPARTMENT_WIDGET = gql(`
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
    questions {
      id
      type
      title
      description
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
  }
}
`);

export default LOAD_DEPARTMENT_WIDGET;
