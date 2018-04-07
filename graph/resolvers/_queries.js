import { Departement } from './../drivers/mongodb';
import { Person, Restriction } from './../drivers/sqlite';

export const Query = {
  allPersons: () => Person.findAll(),
  allDepartements: () => Departement.find(),
  allRestrictions: () => Restriction.findAll(),
  getDepartementSUO: (_, { departement }) => Departement.findById(departement),
  allDepartementRestrictions: (_, { departement }) => {
    const q = { where: { departement: `${departement}` } };
    return Restriction.findAll(q);
  },
};

export default Query;
