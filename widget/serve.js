const path = require('path');
// const semver = require('semver');
const morgan = require('morgan');
const express = require('express');
const winston = require('winston');
const useragent = require('express-useragent');

const app = express();
const www = path.join(__dirname, 'public');
const usedebug = process.env.NODE_ENV !== 'production';
winston.level = (usedebug && 'debug') || 'error';

// const browsers = {
//   firefox: '>=51.0.0',
//   opera: '>=36.0.0',
//   chrome: '>=80.0.0',
//   safari: '>=11.1.0',
// };

app.use(morgan('tiny'));
app.use(useragent.express());
app.use(express.static(www, { index: '_' }));
app.get('/*', (req, res) => {
  const page = 'index.html';
  // const { browser, version } = req.useragent;
  // const cleaned = semver.coerce(version);
  // const required = browsers[browser.toLocaleLowerCase()] || null;
  // if (required && !semver.satisfies(cleaned, required)) {
  //   // si il s'agit d'une version de navigateur referencee
  //   // mais que la version n'est pas la bonne
  //   page = 'noscript.html';
  // }
  res.sendFile(path.join(www, page));
});

// Do graceful shutdown
process.on('SIGINT', () => {
  // FIXME -> close DB connections
  app.close(() => winston.info('Closing Frontend server\n'));
});

// run application
const port = parseInt(process.env.PORT || '3100', 10);
app.listen(port, () => {
  if (!usedebug) return;
  winston.info(`Frontend server running on http://0.0.0.0:${port}\n`);
});
