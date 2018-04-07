import { ALL_PERSONS, ALL_DEPARTEMENTS, ALL_RESTRICTIONS } from './queries';

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
    query: ALL_DEPARTEMENTS,
    data: { allDepartements: allDepartements.concat([createDepartement]) },
  });
};

export const UPDATE_RESTRICTIONS = (store, { data: { createRestriction } }) => {
  const { allRestrictions } = store.readQuery({ query: ALL_RESTRICTIONS });
  store.writeQuery({
    query: ALL_RESTRICTIONS,
    data: { allRestrictions: allRestrictions.concat([createRestriction]) },
  });
};

export default UPDATE_PERSONS;
