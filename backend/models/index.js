
const Sequelize = require('sequelize');

const sequelize = new Sequelize('project_management', 'Mohammad', 'Mohammad', 
                                {host: '127.0.0.1',
                                dialect: 'mysql'});

const models = {
    User: sequelize.import('./User'),
    Team: sequelize.import('./Team'),
    Task: sequelize.import('./Task'),
    Project: sequelize.import('./Project'),
    TaskComment: sequelize.import('./TaskComment'),
    ProjectComment: sequelize.import('./ProjectComment'),
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