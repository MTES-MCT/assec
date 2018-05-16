import gql from 'graphql-tag';

export const LOAD_DEPARTMENT_RESTRICTION = gql(`
query findRestriction (
  $usages: String!
  $origines: String!
  $situations: [Float]!
) {
  findRestriction (
    usages: $usages
    origines: $origines
    situations: $situations
  ) {
    id
    label
    description
  }
}`);

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
