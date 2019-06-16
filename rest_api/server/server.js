const express = require('express');
const app = express();
const api = require('./api/api');
const config = require('./config/config');
// db.url is different depending on NODE_ENV
const mongoose = require('mongoose');
mongoose.connect(config.db.url, { useMongoClient: true });
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

if (config.seed) {
    require('./util/seed');
}

// setup the app middlware
require('./middleware/appMiddlware')(app);

// setup the api
app.use('/api', api);

// set up global error handling
app.use((err, req, res, next) => {
  // if error thrown from jwt validation check
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Invalid token');
    return;
  }

  console.log(err.stack);
  res.status(500).send(err.message);
});

module.exports = app;