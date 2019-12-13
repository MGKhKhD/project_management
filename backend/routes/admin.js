const express = require('express');
const route = express.Router();

const { createTeam } = require('../controllers/admin');

route.patch('/confirm-user/:userId');
route.patch('/unconfrim-user/:userId');
route.patch('/add-admin/:userId');
route.patch('/remove-admin/:userId');
route.post('/team', createTeam);
route.post('/channel');
route.delete('/team/:teamId');
route.delete('/channel/:channelId');
route.patch('/team/:teamId');
route.patch('/channel/:channelId');

module.exports = route;