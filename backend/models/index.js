
const Sequelize = require('sequelize');

const sequelize = new Sequelize('project_management', 'Mohammad', 'Mohammad', 
                                {host: '127.0.0.1',
                                dialect: 'mysql'});

const models = {
    User: sequelize.import('./User'),
    Team: sequelize.import('./Team'),
    UserTeamMember: sequelize.import('./UserTeamMember'),
    Task: sequelize.import('./Task'),
    Project: sequelize.import('./Project'),
    UserProjectMember: sequelize.import('./UserProjectMember'),
    UserTaskMember: sequelize.import('./UserTaskMember'),
    Comment: sequelize.import('./Comment'),
    Channel: sequelize.import('./Channel'),
    Message: sequelize.import('./Message'),
};

Object.keys(models).forEach(modelName => {
    if ('associate' in models[modelName]) {
        models[modelName].associate(models);
    }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;