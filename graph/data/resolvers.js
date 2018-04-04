import { Person } from './connectors';

const Query = {
  persons: () => Person.findAll(),
};

const Mutation = {
  createPerson: (_, { firstname, lastname, email }) =>
    Person.create({ firstname, lastname, email }),
};

export default { Query, Mutation };
