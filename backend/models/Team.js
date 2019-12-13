// const Sequelize = require('sequelize');
// const sequelize = require('../database');

module.exports = (sequelize, Sequelize) => {
    const Team = sequelize.define('team', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING(30),
            unique: true,
            allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    });

    Team.associate = (models) => {
        Team.belongsToMany(models.User, {
            through: 'user_team_member',
            foreignKey: {name: 'teamId', field: 'team_id'}
        });
        Team.belongsTo(models.User, {
            foreignKey: 'owner'
        });
    };

    return Team;
}