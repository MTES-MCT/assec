import Sequelize from 'sequelize';
import { personModel, restrictionModel } from './../connectors/sqlite';

const DB_NAME = process.env.SQLITE_DB_NAME;
const DB_FILEPATH = process.env.SQLITE_DB_FILEPATH;

const db = new Sequelize(DB_NAME, null, null, {
  dialect: 'sqlite',
  storage: DB_FILEPATH,
  // FIX depraction warning
  // @see https://github.com/sequelize/sequelize/issues/8427
  // @see http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false,
});

personModel.init(db);
restrictionModel.init(db);

export const Person = db.models.person;
export const Restriction = db.models.restriction;
