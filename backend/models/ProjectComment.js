// const Sequelize = require('sequelize');
// const sequelize = require('../database');

module.exports = (sequelize, Sequelize) => {
    const ProjectComment = sequelize.define('projectComment', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        text: {
            type: Sequelize.TEXT,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    });

    ProjectComment.associate = (models) => {
        ProjectComment.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                field: 'user_id',
            }
        });
        ProjectComment.belongsTo(models.Project, {
            foreignKey: {name: 'projectId', field: 'project_id'}
        });
    };


    return ProjectComment;
}