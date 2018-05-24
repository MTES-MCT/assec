import gql from 'graphql-tag';

export const CREATE_SUBSCRIBER = gql(`
mutation createSubscriber(
  $email: String!
  $preferences: PreferencesInput!
) {
  createSubscriber(
    email: $email
    preferences: $preferences
  ) {
    id
  }
}
`);

export default CREATE_SUBSCRIBER;
