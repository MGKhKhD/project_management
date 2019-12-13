// const Sequelize = require('sequelize');
// const sequelize = require('../database');

module.exports = (sequelize, Sequelize) => {
        const User = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING(30),
            unique: true,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            },
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: true
        },
        confirmed: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    });

    User.associate = (models) => {
        User.belongsToMany(models.Team, {
            through: 'user_team_member',
            foreignKey: {
                name: 'userId',
                field: 'user_id',
            }
        });
        User.belongsToMany(models.Project, {
            through: 'user_project_lead_member',
            foreignKey: {name: 'projectId', field: 'project_id'}
        });
        User.belongsToMany(models.Project, {
            through: 'user_project_dev_member',
            foreignKey: {name: 'projectId', field: 'project_id'}
        });
        User.belongsToMany(models.Task, {
            through: 'user_task_creator_member',
            foreignKey: {name: 'taskId', field: 'task_id'}
        });
        User.belongsToMany(models.Task, {
            through: 'user_task_dev_member',
            foreignKey: {name: 'taskId', field: 'task_id'}
        });
    };

    return User;
}
