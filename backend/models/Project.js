// const Sequelize = require('sequelize');
// const sequelize = require('../database');

module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define('project', {
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
        },
        deadline: {
            type: Sequelize.DATE,
            allowNull: false
        },
        public: {
            type: Sequelize.BOOLEAN,
            defaultValue: 1
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    });

    Project.associate = (models) => {
        Project.belongsTo(models.Team, {
            foreignKey: {name: 'teamId', field: 'team_id'}
        });
        Project.belongsToMany(models.User, {
            through: models.UserProjectMember,
            foreignKey: {name: 'projectId', field: 'project_id'}
        });
    };

    return Project;
}
