import times from 'lodash.times';
import { Departement } from './connectors';

const casual = require('casual');

casual.seed(123);
const resolvers = {
  Query: {
    allPersons: () =>
      times(20, () => ({
        id: casual.uuid,
        email: casual.email,
        lastname: casual.last_name,
        firstname: casual.first_name,
      })),
    allDepartements: () => Departement.findAll(),
  },
};

export default resolvers;
