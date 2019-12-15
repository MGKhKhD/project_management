module.exports = (sequelize, Sequelize) => {
    const UserTeamMember = sequelize.define('user_team_member', {
        teamAdmin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });

    return UserTeamMember;
}