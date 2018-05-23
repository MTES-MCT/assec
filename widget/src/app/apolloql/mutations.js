import gql from 'graphql-tag';

export const CREATE_SUBSCRIBER = gql(`
mutation createSubscriber(
  $email: String!
  $department: ID!
  $preferences: PreferencesInput!
) {
  createSubscriber(
    email: $email
    department: $department
    preferences: $preferences
  ) {
    id
  }
}
`);

export default CREATE_SUBSCRIBER;
