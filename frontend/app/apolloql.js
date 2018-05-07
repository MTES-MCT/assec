import gql from 'graphql-tag';

export const CREATE_SUBSCRIBER = gql(`
mutation createSubscriber(
  $email: String!
  $department: ID!
) {
  createSubscriber(
    email: $email
    department: $department
  ) {
    id
  }
}
`);

export default CREATE_SUBSCRIBER;
