import Sequelize from 'sequelize';

// application
import person from './_person';
import departement from './_departement';
import restriction from './_restrictions';

const db = new Sequelize('assec', null, null, {
  dialect: 'sqlite',
  storage: './assec.sqlite',
});

person.initModel(db);
departement.initModel(db);
restriction.initModel(db);

export const Person = db.models.person;
export const Departement = db.models.departement;
export const Restriction = db.models.restriction;
