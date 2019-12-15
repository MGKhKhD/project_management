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
            allowNull: false,
            validate: {
                isAlphanumeric: {
                    args: true,
                    msg: 'channel can only contain letters and numbers'
                },
                len: {
                    args: [5, 30],
                    msg: 'channel must be between 3 and 30 characters long'
                }
            }
        },
        public: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
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