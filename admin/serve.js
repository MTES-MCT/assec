const path = require('path');
const express = require('express');
const usedebug = require('./server/usedebug');

const app = express();
const www = path.join(__dirname, 'public');

// serve main HTML file
app.use(express.static(www));
app.get('/*', (req, res) => {
  const indexfile = path.join(www, 'index.html');
  res.sendFile(indexfile);
});

// Do graceful shutdown
process.on('SIGINT', () => {
  // FIXME -> close DB connections
  app.close(() => process.stdout.write('Closing Admin server'));
});

// run application
const port = process.env.PORT;
app.listen(port, () => {
  if (!usedebug) return;
  process.stdout.write(`Admin server running on http://0.0.0.0:${port}`);
});
