import { slugify } from './../lib/slugify';
import { Person, Departement, Restriction } from './connectors/sqlite';

const Query = {
  allPersons: () => Person.findAll(),
  allDepartements: () => Departement.findAll(),
  allRestrictions: () => Restriction.findAll(),
  allDepartementRestrictions: (_, { departement }) => {
    const q = { where: { departement: `${departement}` } };
    return Restriction.findAll(q);
  },
};

const Mutation = {
  createPerson: (_, { firstname, lastname, email }) =>
    Person.create({ firstname, lastname, email }),
  createDepartement: (_, { code, name }) => {
    const slug = slugify(name);
    return Departement.create({ code, name, slug });
  },
  createRestriction: (_, { description, informations, departement }) =>
    Restriction.create({ description, informations, departement }),
};

export default { Query, Mutation };
