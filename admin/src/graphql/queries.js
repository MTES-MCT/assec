import gql from 'graphql-tag';

export const ALL_PERSONS = gql(`
query allPersons {
  allPersons {
    id
    email
    lastname
    firstname
  }
}
`);

export const ALL_DEPARTEMENTS = gql(`
query allDepartements {
  allDepartements {
    id
    code
    name
    slug
  }
}
`);

export const ALL_RESTRICTIONS = gql(`
query allRestrictions {
  allRestrictions {
    id
    code
    name
    slug
  }
}
`);

export default { ALL_PERSONS, ALL_DEPARTEMENTS, ALL_RESTRICTIONS };
