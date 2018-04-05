import { Departement } from './connectors/mongodb';
import { Person, Restriction } from './connectors/sqlite';

const Query = {
  allPersons: () => Person.findAll(),
  allDepartements: () => Departement.find(),
  allRestrictions: () => Restriction.findAll(),
  getDepartementSUO: (_, { departement }) => {
    const q = { where: { code: `${departement}` } };
    return Departement.findOne(q);
  },
  allDepartementRestrictions: (_, { departement }) => {
    const q = { where: { departement: `${departement}` } };
    return Restriction.findAll(q);
  },
};

const Mutation = {
  createPerson: (_, { firstname, lastname, email }) =>
    Person.create({ firstname, lastname, email }),
  createDepartement: (_, { code, name }) =>
    Departement.create({ code, name, slug: name }),
  createRestriction: (_, { description, informations, departement }) =>
    Restriction.create({ description, informations, departement }),
};

export default { Query, Mutation };
