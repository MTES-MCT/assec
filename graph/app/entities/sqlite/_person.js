/* eslint
  import/no-extraneous-dependencies: 0
*/
import times from 'lodash.times';
import Sequelize from 'sequelize';

const casual = require('casual').fr_FR;

export const personModel = {
  init: (db) => {
    const model = db.define('person', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
      },
      email: { type: Sequelize.STRING },
      lastname: { type: Sequelize.STRING },
      firstname: { type: Sequelize.STRING },
    });

    // generate fake database entries
    casual.seed(123);
    // create mock data with a seed, so we always get the same
    db.sync({ force: true }).then(() => {
      times(20, () =>
        model.create({
          email: casual.email,
          lastname: casual.last_name,
          firstname: casual.first_name,
        }));
    });
  },
};

export default personModel;
