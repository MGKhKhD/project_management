// const Sequelize = require('sequelize');
// const sequelize = require('../database');

module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define('message', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        text: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    });

    Message.associate = (models) => {
        Message.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                field: 'user_id',
            }
        });
        Message.belongsTo(models.Channel, {
            foreignKey: {
                name: 'channelId',
                field: 'channel_id',
            }
        });
        Message.belongsTo(models.Task, {
            foreignKey: {name: 'taskId', field: 'task_id'}
        });
        Message.belongsTo(models.Project, {
            foreignKey: {name: 'projectId', field: 'project_id'}
        });
    };


    return Message;
}