const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParse.json());
app.use(cors());
require('./database');

const usersRoutes = require('./routes/users');
app.use('/api/users', usersRoutes);

module.exports = app;