import { ALL_PERSONS, ALL_DEPARTEMENTS } from './queries';

/**
 * [UPDATE_PERSONS description]
 * @param {[type]} store Current ApolloGraphQL Store
 * @param {[type]} data GraphQL Request Result
 */
export const UPDATE_PERSONS = (store, { data: { createPerson } }) => {
  const { allPersons } = store.readQuery({ query: ALL_PERSONS });
  store.writeQuery({
    query: ALL_PERSONS,
    data: { allPersons: allPersons.concat([createPerson]) },
  });
};

export const UPDATE_DEPARTEMENTS = (store, { data: { createDepartement } }) => {
  const { allDepartements } = store.readQuery({ query: ALL_DEPARTEMENTS });
  store.writeQuery({
    query: ALL_PERSONS,
    data: { allPersons: allDepartements.concat([createDepartement]) },
  });
};

export default UPDATE_PERSONS;
