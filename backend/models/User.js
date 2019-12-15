
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
            allowNull: false,
            validate: {
                isAlphanumeric: {
                    args: true,
                    msg: 'The username can only contain letters and numbers'
                },
                len: {
                    args: [3, 30],
                    msg: 'The username must be between 3 and 30 characters long'
                }
            }
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: {
                    args: true,
                    msg: 'Invalid email'
                }
            },
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: true,
            validate: {
                len: {
                    args: [5, 100],
                    msg: 'Password must be between 5 and 100 characters long'
                }
            }
        },
        confirmedPassword: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        role: {
            type: Sequelize.ENUM('admin', 'regular'),
            allowNull: false,
            defaultValue: 'regular',
        },
        confirmedUser: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    });

    User.associate = (models) => {
        User.belongsToMany(models.Team, {
            through: models.UserTeamMember,
            foreignKey: {
                name: 'userId',
                field: 'user_id',
            }
        });
        User.belongsToMany(models.Project, {
            through: models.UserProjectMember,
            foreignKey: {
                name: 'userId',
                field: 'user_id',
            }
        });
        User.belongsToMany(models.Task, {
            through: models.UserTaskMember,
            foreignKey: {
                name: 'userId',
                field: 'user_id',
            }
        });
        User.belongsToMany(models.Channel, {
            through: 'user_channel_member',
            foreignKey: {
                name: 'userId',
                field: 'user_id',
            }
        });
    };

    return User;
}
