const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const override = require('method-override');
// setup global middleware here

module.exports = (app) => {
  app.use(morgan('dev'));
  app.use('/public', express.static('server/public'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(override());
};
