import gql from 'graphql-tag';

export const LOAD_RESTRICTION_CASE = gql(`
query findRestriction (
  $usages: ID!
  $origines: ID!
  $department: ID!
  $situations: [Float]!
) {
  findRestriction (
    usages: $usages
    origines: $origines
    department: $department
    situations: $situations
  ) {
    situation {
      label
    }
    restrictions {
      id
      label
      description
    }
  }
}`);

export const LOAD_DEPARTMENT_WIDGET = gql(`
query widget (
  $code: String
) {
  widget (
    code: $code
  ) {
    department
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
      map {
        zone
        center
        maxbounds
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
