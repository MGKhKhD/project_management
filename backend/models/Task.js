// const Sequelize = require('sequelize');
// const sequelize = require('../database');

module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define('task', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Sequelize.STRING(30),
            unique: true,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM('done', 'active', 'pending', 'archived', 'overdue'),
            allowNull: false,
            defaultValue: 'active'
        },
        deadline: {
            type: Sequelize.DATE,
            allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    });

    Task.associate = (models) => {
        Task.belongsToMany(models.User, {
            through: models.UserTaskMember,
            foreignKey: {name: 'taskId', field: 'task_id'}
        });
        Task.belongsTo(models.Project, {
            foreignKey: {name: 'projectId', field: 'project_id'}
        });
    };

    return Task;
}