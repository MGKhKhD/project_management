const express = require('express');
const route = express.Router();

const { createTeam,
        deleteTeam,
        addAdminRole,
        removeAdminRole, 
        udpateAdminRoleOfTeam,
        addCrewToTeam,
        getTeams,
        getTeam } = require('../controllers/admin');

route.patch('/confirm-user/:userId');
route.patch('/unconfrim-user/:userId');
route.patch('/add-admin/:userId', addAdminRole);
route.patch('/remove-admin/:userId', removeAdminRole);
route.post('/team', createTeam);
route.delete('/team/:teamId', deleteTeam);
//route.patch('/team/:teamId/update-admin/:userId', udpateAdminRoleOfTeam);
route.patch('/team/:teamId/add-crew', addCrewToTeam);

route.get('/teams', getTeams);
route.get('/channels');
route.get('/users');

route.get('/teams/:teamId', getTeam);
route.get('/channels/:channelId');
route.get('/users/:userId');

module.exports = route;