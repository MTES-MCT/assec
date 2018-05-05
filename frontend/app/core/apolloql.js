import gql from 'graphql-tag';

export const CREATE_SUBSCRIBER = gql(`
  mutation createSubscriber($email: String!) {
    createSubscriber(email: $email) {
      email
    }
  }
`);

export default CREATE_SUBSCRIBER;
