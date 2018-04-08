import { Departement } from './../drivers/mongodb';

export const Query = {
  departements: () => Departement.find(),
  departement: (_, { id }) => Departement.findById(id),
};

export default Query;
