import { Departement } from './../drivers/mongodb';
import { Person, Restriction } from './../drivers/sqlite';

export const Mutation = {
  createPerson: (_, { firstname, lastname, email }) =>
    Person.create({ firstname, lastname, email }),
  createDepartement: (_, args) => {
    const { code, name, suos } = args;
    console.log('suos', suos);
    return Departement.create({
      code,
      name,
      slug: name,
    });
  },
  createRestriction: (_, { description, informations, departement }) =>
    Restriction.create({ description, informations, departement }),
};

export default Mutation;
