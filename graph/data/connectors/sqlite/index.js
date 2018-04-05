import Sequelize from 'sequelize';

// application
import person from './_person';
import restriction from './_restrictions';

const db = new Sequelize('assec', null, null, {
  dialect: 'sqlite',
  storage: './assec.sqlite',
});

person.initModel(db);
restriction.initModel(db);

export const Person = db.models.person;
export const Restriction = db.models.restriction;
