const ip = require('ip');
const path = require('path');
const express = require('express');

// Constants
const app = express();
const port = process.env.port || 3000;
const www = path.join(__dirname, 'public');
const usedebug = process.env.NODE_ENV !== 'production';

// server static files
app.use(express.static(www));

// serve main HTML file
app.get('/', (req, res) => {
  const indexfile = path.join(www, 'index.html');
  res.sendFile(indexfile);
});

// run application
app.listen(port, () => {
  if (!usedebug) return;
  process.stdout.write(`
    Running on http://${ip.address()}:${port}
  `);
});
