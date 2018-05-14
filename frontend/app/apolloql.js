import gql from 'graphql-tag';

export const RETRIEVE_BLOCKS = gql(`
query retrieveBlocks {
  retrieveBlocks {
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
