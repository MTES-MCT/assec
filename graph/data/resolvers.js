import { Departement } from './connectors';

const resolvers = {
  Query: {
    allDepartements: () => Departement.findAll(),
  },
};

export default resolvers;
