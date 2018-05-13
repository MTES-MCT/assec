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
  $code: String!
) {
  hydrateDepartment (
    code: $code
  ) {
    questions {
      id
      type
      title
      order
      description
      values {
        id
        label
      }
      zones {
        id
        label
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
}
`);

export default LOAD_DEPARTMENT_WIDGET;
