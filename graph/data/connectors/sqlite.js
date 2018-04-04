/* eslint
  import/no-extraneous-dependencies: 0
*/
import times from 'lodash.times';
import Sequelize from 'sequelize';

// generate fake database entries
const casual = require('casual').fr_FR;
// create mock data with a seed, so we always get the same
casual.seed(123);

const db = new Sequelize('mydashboard', null, null, {
  dialect: 'sqlite',
  storage: './mydashboard.sqlite',
});

const PersonModel = db.define('person', {
  email: { type: Sequelize.STRING },
  lastname: { type: Sequelize.STRING },
  firstname: { type: Sequelize.STRING },
});

db.sync({ force: true }).then(() => {
  times(20, () =>
    PersonModel.create({
      email: casual.email,
      lastname: casual.last_name,
      firstname: casual.first_name,
    }));
});

export const Person = db.models.person;

export default Person;
