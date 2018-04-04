import { ALL_PERSONS } from './queries';

/**
 * [UPDATE_PERSONS description]
 * @param {[type]} store Current ApolloGraphQL Store
 * @param {[type]} data GraphQL Request Result
 */
export const UPDATE_PERSONS = (store, { data: { createPerson } }) => {
  const { persons } = store.readQuery({ query: ALL_PERSONS });
  store.writeQuery({
    query: ALL_PERSONS,
    data: { persons: persons.concat([createPerson]) },
  });
};

export default UPDATE_PERSONS;
