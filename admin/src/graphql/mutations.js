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
  $suos: String
) {
  createDepartement(
    code: $code
    name: $name
    suos: $suos
  ) {
    id
    code
    name
    slug
  }
}
`);

export const CREATE_RESTRICTION = gql(`
mutation createRestriction(
  $description: String
  $departement: String
  $informations: String
) {
  createRestriction(
    description: $description
    departement: $departement
    informations: $informations
  ) {
    id
    description
    departement
    informations
  }
}
`);

export default { CREATE_PERSON, CREATE_DEPARTEMENT };
