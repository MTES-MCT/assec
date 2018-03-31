const path = require('path');
const morgan = require('morgan');
const express = require('express');

// Constants
const app = express();
const port = process.env.PORT || 3000;
const www = path.join(__dirname, 'public');
const usedebug = process.env.NODE_ENV !== 'production';

app.use(morgan('combined')); // morgan logger
app.use(express.static(www)); // serve static files

// serve main HTML file
app.get('/', (req, res) => {
  const indexfile = path.join(www, 'index.html');
  res.sendFile(indexfile);
});

// run application
app.listen(port, () => {
  if (!usedebug) return;
  process.stdout.write(`
    Running on http://0.0.0.0:${port}
  `);
});
