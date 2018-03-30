/* eslint
  import/no-extraneous-dependencies: 0
*/
import Sequelize from 'sequelize';

import departements from './mock.db/departements.json';

const db = new Sequelize('assec', null, null, {
  dialect: 'sqlite',
  storage: './assec.sqlite',
});

const DepartementModel = db.define('departement', {
  code: { type: Sequelize.STRING },
  name: { type: Sequelize.STRING },
  slug: { type: Sequelize.STRING },
});

// create mock data with a seed, so we always get the same
db.sync({ force: true }).then(() => {
  departements.map(({ code, name, slug }) =>
    DepartementModel.create({ code, name, slug }));
});

export const Departement = db.models.departement;

export default Departement;
