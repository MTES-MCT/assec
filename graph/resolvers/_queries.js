import { Departement } from './../drivers/mongodb';
// import { Person, Restriction } from './../drivers/sqlite';

export const Query = {
  // allPersons: () => Person.findAll(),
  // suos: (_, { id }) => {
  // const dpt = Departement.findById(id);
  // },
  departements: () => Departement.find(),
  // allRestrictions: () => Restriction.findAll(),
  // getDepartementSUO: (_, { id }) => Departement.findById(id),
  // allDepartmentRestrictions: (_, { id }) => {
  //   const q = { where: { department: `${id}` } };
  //   return Restriction.findAll(q);
  // },
};

export default Query;
