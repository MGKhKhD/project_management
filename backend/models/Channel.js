// const Sequelize = require('sequelize');
// const sequelize = require('../database');

module.exports = (sequelize, Sequelize) => {
    const Channel = sequelize.define('channel', {
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
        public: {
            type: Sequelize.BOOLEAN,
            defaultValue: 1
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    });

    Channel.associate = (models) => {
        Channel.belongsTo(models.Team, {
            foreignKey: {name: 'teamId', field: 'team_id'}
        });
    };

    return Channel;
}