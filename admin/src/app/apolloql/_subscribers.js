import gql from 'graphql-tag';

import { GET_SUBSCRIBERS } from './queries';

export const DELETE_SUBSCRIBER = gql(`
mutation deleteSubscriber (
  $id: ID!
) {
  deleteSubscriber (
    id: $id
  ) {
    id
  }
}
`);

const getCurrentSubscribers = (store) => {
  const data = store.readQuery({
    variables: { department: null },
    query: GET_SUBSCRIBERS,
  });
  return data.subscribers;
};

export const UPDATE_SUBSCRIBERS = (store, { data }) => {
  let subscribers = [];
  if (data.deleteSubscriber) {
    const { id } = data.deleteSubscriber;
    const current = getCurrentSubscribers(store);
    subscribers = current.filter(obj => obj.id !== id);
  }
  store.writeQuery({
    variables: { department: null },
    query: GET_SUBSCRIBERS,
    data: { subscribers },
  });
};
