// const Sequelize = require('sequelize');
// const sequelize = require('../database');

module.exports = (sequelize, Sequelize) => {
    const TaskComment = sequelize.define('taskComment', {
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

    TaskComment.associate = (models) => {
        TaskComment.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                field: 'user_id',
            }
        });
        TaskComment.belongsTo(models.Task, {
            foreignKey: {name: 'taskId', field: 'task_id'}
        });
    };


    return TaskComment;
}