import { Department } from './../drivers/mongodb';
// import { Person, Restriction } from './../drivers/sqlite';

export const Mutation = {
  // createPerson: (_, { firstname, lastname, email }) =>
  //   Person.create({ firstname, lastname, email }),
  createDepartment: (_, args) => {
    const { code, name, suos } = args;
    console.log('suos', suos);
    return Department.create({
      code,
      name,
      slug: name,
    });
  },
  // createRestriction: (_, { description, informations, departement }) =>
  //   Restriction.create({ description, informations, departement }),
};

export default Mutation;
