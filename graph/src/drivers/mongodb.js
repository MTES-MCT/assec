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
  autoReconnect: true,
  // Reconnect every 500ms
  // reconnectInterval: 500,
  // Never stop trying to reconnect
  reconnectTries: Number.MAX_VALUE,
  // Maintain up to 10 socket connections
  // poolSize: 10,
  // If not connected
  // return errors immediately rather than waiting for reconnect
  // bufferMaxEntries: 0,
};
// http://mongoosejs.com/docs/connections.html

let timer = null;
let retriescount = 0;
const maxretries = 10;
const retrytimeout = 1500; // ms
const tryConnect = (success, fail) =>
  Mongoose.connect(DB_BASE, options).then(success, fail);

const onConnectionSuccess = () => {
  if (timer) clearTimeout(timer);
  logger.ok(`MongoDB connection success on: ${DB_BASE}`);
};

const onConnectionFailed = (err) => {
  if (timer) clearTimeout(timer);
  let msg = `MongoDB connection error: ${DB_BASE} => ${err}`;
  logger.warn(msg);
  if (retriescount >= maxretries) {
    msg = `MongoDB connection max retries reached: ${DB_BASE} => ${err}`;
    logger.error(msg);
    process.exit(1);
    return;
  }
  retriescount += 1;
  msg = `MongoDB connection retry #${retriescount}`;
  logger.info(msg);
  timer = setTimeout(
    () => tryConnect(onConnectionSuccess, onConnectionFailed),
    retrytimeout,
  );
};

tryConnect(onConnectionSuccess, onConnectionFailed);
export * from './../entities/mongodb';
