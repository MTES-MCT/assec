import { Department } from './../drivers/mongodb';
// import { Person, Restriction } from './../drivers/sqlite';

export const Query = {
  // allPersons: () => Person.findAll(),
  allDepartments: () => Department.find(),
  // allRestrictions: () => Restriction.findAll(),
  getDepartmentSUO: (_, { id }) => Department.findById(id),
  // allDepartmentRestrictions: (_, { id }) => {
  //   const q = { where: { department: `${id}` } };
  //   return Restriction.findAll(q);
  // },
};

export default Query;
