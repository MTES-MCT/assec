import gql from 'graphql-tag';

export const createPerson = gql(`
mutation createPerson(
  $email: String
  $lastname: String
  $firstname: String
) {
  createPerson(
    email: $email
    lastname: $lastname
    firstname: $firstname
  ) {
    id
    email
    lastname
    firstname
  }
}
`);

export const getAllPersons = gql(`
query getAllPersons{
  persons{
    id
    email
    lastname
    firstname
  }
}
`);
