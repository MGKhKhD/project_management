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
            allowNull: false,
            validate: {
                len: {
                    args: [3, 30],
                    msg: 'The username must be between 3 and 30 characters long'
                }
            }
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    });

    Team.associate = (models) => {
        Team.belongsToMany(models.User, {
            through: models.UserTeamMember,
            foreignKey: {name: 'teamId', field: 'team_id'}
        });
    };

    return Team;
}