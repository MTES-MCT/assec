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
query widget (
  $code: String
) {
  widget (
    code: $code
  ) {
    map {
      zone
      center
      maxbounds
    }
    questions {
      id
      type
      title
      order
      display
      description
      values {
        id
        label
      }
      zones {
        id
        name
        label
        order
        zoneid
        geojson
        shortname
        description
      }
    }
  }
}
`);

export default LOAD_DEPARTMENT_WIDGET;
