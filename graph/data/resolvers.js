import { Departement } from './connectors/mongodb';
import { Person, Restriction } from './connectors/sqlite';

const Query = {
  allPersons: () => Person.findAll(),
  allDepartements: () => Departement.find(),
  allRestrictions: () => Restriction.findAll(),
  getDepartementSUO: (_, { departement }) => Departement.findById(departement),
  allDepartementRestrictions: (_, { departement }) => {
    const q = { where: { departement: `${departement}` } };
    return Restriction.findAll(q);
  },
};

const Mutation = {
  createPerson: (_, { firstname, lastname, email }) =>
    Person.create({ firstname, lastname, email }),
  createDepartement: (_, args) => {
    const { code, name, suos } = args;
    return Departement.create({
      code,
      name,
      suos,
      slug: name,
    });
  },
  createRestriction: (_, { description, informations, departement }) =>
    Restriction.create({ description, informations, departement }),
};

export default { Query, Mutation };
