import { GET_ALL_SUBSCRIBERS } from './queries';

export const UPDATE_ALL_SUBSCRIBERS = (store) => {
  const { subscribers } = store.readQuery({
    query: GET_ALL_SUBSCRIBERS,
  });
  store.writeQuery({
    query: GET_ALL_SUBSCRIBERS,
    data: { subscribers },
  });
};

export default UPDATE_ALL_SUBSCRIBERS;
