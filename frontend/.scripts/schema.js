const fs = require('fs');
const path = require('path');

// application
const dest = path.join(__dirname, '..', 'src', 'datas');
const input = path.join(dest, 'form-83.json');
const output = path.join(dest, 'schemas-83.json');
const fields = require(input);

function getRandAlert() {
  // renvoi un chiffre entre 0 et 3;
  const max = 4;
  return Math.floor(Math.random() * Math.floor(max));
}

function compose(...fns) {
  return fns
    .reverse()
    .reduce((prev, next) => value => next(prev(value)), value => value);
}

function toFlattenedArray(arr) {
  return arr.reduce((acc, { id, values }) => {
    const vals = values.map(ob => ({ [id]: ob.id }));
    return acc.concat([vals]);
  }, []);
}

function combineFlattened(array, prefix = {}) {
  if (!array.length) return prefix;
  const [cases, ...others] = array;
  return cases.reduce((acc, value) => {
    const next = Object.assign({}, prefix, value, { alerte: getRandAlert() });
    const perm = combineFlattened(others, next);
    return acc.concat(perm);
  }, []);
}

function writeSchema(entries) {
  const json = JSON.stringify(entries, null, 2);
  fs.writeFile(output, json, err => {
    if (err) {
      process.stderr.write(`${err}\n`);
      process.exit(1);
    } else {
      process.stdout.write('Schema exported with success!\n');
      process.stdout.write(`${output}\n`);
      process.exit(0);
    }
  });
}

compose(writeSchema, combineFlattened, toFlattenedArray)(fields);
