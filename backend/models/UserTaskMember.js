module.exports = (sequelize, Sequelize) => {
    const UserTaskMember = sequelize.define('user_task_member', {
        developer: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        }
    });

    return UserTaskMember;
}