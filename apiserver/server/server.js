const express = require('express');
const api = require('./api/index');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const config = require('./enviroment/configuration');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', api);
mongoose.set('useCreateIndex', true)
mongoose.connect(config.db.url,{ useNewUrlParser: true });


module.exports = app;