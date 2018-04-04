import gql from 'graphql-tag';

export const CREATE_PERSON = gql(`
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

export default CREATE_PERSON;
