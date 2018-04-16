// at the top with imports:
import Mongoose from 'mongoose';

import { logger } from './../utils/logger';

// somewhere in the middle:
Mongoose.Promise = global.Promise;

// FIXME
// -> PORT should be configured in .env config file
// -> DB_NAME should be configured in .env config file
// -> DB_DOMAIN should be configured in .env config file
const DB_PORT = process.env.MONGO_DB_PORT;
const DB_NAME = process.env.MONGO_DB_NAME;
const DB_DOMAIN = process.env.MONGO_DB_DOMAIN;
const DB_BASE = `mongodb://${DB_DOMAIN}:${DB_PORT}/${DB_NAME}`;

const options = {
  // auto generate IDs
  autoIndex: false,
  // Reconnect every 500ms
  // reconnectInterval: 500,
  // Never stop trying to reconnect
  // reconnectTries: Number.MAX_VALUE,
  // Maintain up to 10 socket connections
  // poolSize: 10,
  // If not connected
  // return errors immediately rather than waiting for reconnect
  // bufferMaxEntries: 0,
};
Mongoose.connect(DB_BASE, options).then(
  () => logger.ok('MongoDB connection success'),
  err => logger.error(`MongoDB connection error ${err}`),
);

export * from './../connectors/mongodb';
