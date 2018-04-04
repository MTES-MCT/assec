import { ALL_PERSONS } from './queries';

/**
 * [UPDATE_PERSONS description]
 * @param {[type]} store Current ApolloGraphQL Store
 * @param {[type]} data GraphQL Request Result
 */
export const UPDATE_PERSONS = (store, { data: { createPerson } }) => {
  const { allPersons } = store.readQuery({ query: ALL_PERSONS });
  console.log('allPersons', allPersons);
  store.writeQuery({
    query: ALL_PERSONS,
    data: { allPersons: allPersons.concat([createPerson]) },
  });
};

export default UPDATE_PERSONS;
