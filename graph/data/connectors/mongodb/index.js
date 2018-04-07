// at the top with imports:
import Mongoose from 'mongoose';
import { slugify } from './../../../lib/slugify';

// somewhere in the middle:
Mongoose.Promise = global.Promise;

const PORT = 27018;
// const PORT = process.env.MONGO_DB_PORT;
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
Mongoose.connect(`mongodb://localhost:${PORT}/assec`, options).then(
  () =>
    process.stdout.write(`
    MongoDB connection success
  `),
  err =>
    process.stderr.write(`
    MongoDB connection error ${err}
  `),
);

const DepartementSchema = Mongoose.Schema({
  code: String,
  name: String,
  suos: {
    type: Object,
    set: v => JSON.parse(v),
  },
  slug: {
    set: slugify,
    type: String,
  },
});

export const Departement = Mongoose.model('departements', DepartementSchema);

export default { Departement };
