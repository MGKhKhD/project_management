module.exports = (sequelize, Sequelize) => {
    const UserProjectMember = sequelize.define('user_project_member', {
        lead: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });

    return UserProjectMember;
}