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

export const CREATE_DEPARTEMENT = gql(`
mutation createDepartement(
  $code: String
  $name: String
) {
  createDepartement(
    code: $code
    name: $name
  ) {
    id
    code
    name
    slug
  }
}
`);

export default { CREATE_PERSON, CREATE_DEPARTEMENT };
