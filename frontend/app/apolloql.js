import gql from 'graphql-tag';

export const RETRIEVE_BLOCKS = gql(`
query blocks {
  blocks {
    id
    slug
    label
    content
  }
}
`);

export const CREATE_SUBSCRIBER = gql(`
mutation createSubscriber(
  $email: String!
) {
  createSubscriber(
    email: $email
  ) {
    id
  }
}
`);

export default CREATE_SUBSCRIBER;
