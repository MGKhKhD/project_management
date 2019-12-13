const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParse.json());
app.use(cors());

const usersRoutes = require('./routes/users');
app.use('/api/users', usersRoutes);

const models = require('./models/index');
models.sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
  models.sequelize.sync().then(() => {
    console.log('models created correctly');
  });
})
.catch(err => {
  console.error(err);
});

module.exports = app;