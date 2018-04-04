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

export default ALL_PERSONS;
