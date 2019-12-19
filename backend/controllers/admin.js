const models = require('../models/index');

exports.createTeam = async (req, res) => {
    try {
        const { name, creator } = req.body;
        if (name === '') {
            throw new Error('Team name is requied');
        } 
        let userId;
        let fetched_creator;
        if (creator) {
            fetched_creator = await models.User.findByPk(creator);
            if (fetched_creator.role === 'admin') {
                userId = fetched_creator.id;
            } else {
                throw new Error('Selected user does not grant admin role');
            }
            
        } else {
            userId = req.userData.userId;
            fetched_creator = await models.User.findByPk(userId);
        }
        
        let team;
        await models.sequelize.transaction( async (transaction) => {
                team = await models.Team.create({name: name}, {transaction});
                await models.Channel.create({ name, public: true, teamId: team.id}, {transaction});
                await models.UserTeamMember.create( {teamId: team.id, userId, teamAdmin: true}, {transaction});
        });
        
        res.status(201).json({
            team: {
                id: team.id,
                teamAdmin: {
                    id: userId,
                    username: fetched_creator.username
                }
            },
            message: 'Team created successfully'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({message: err.message});
    }
    
}

exports.deleteTeam = async (req, res) => {
    const { teamId } = req.params;
    let transaction;
    try {
        transaction = await models.Team.findOne({where: {id: teamId}}, {transaction});
        if (transaction) {
            await models.Team.destroy({where: {id: teamId}}, {transaction});
            await models.Channel.destroy({where: { teamId: teamId}}, {transaction});
            await models.UserTeamMember.destroy({where: {teamId: teamId}}, {transaction});
            transaction.commit();

            res.status(200).json({
                message: 'Team deleted successfully'
            });
        } 

    } catch (err) {
        console.log(err);
        transaction.rollback();
        res.status(500).json({message: err.message});
    }
}

exports.addCrewToTeam = async (req, res) => {
    const currentUserId = req.userData.userId;
    const { teamId } = req.params;
    const errors = [];
    try {  
        const team = await models.UserTeamMember.findOne({where: models.Sequelize.and(
            {teamId: teamId}, 
            {userId: currentUserId}, 
            {teamAdmin: true}
            )});
        if (!team) {
            throw new Error('Logged user does not hold admin role for this team')
        }

        const users = JSON.parse(req.body.users);
       
        const addedUsers = [];
        users.forEach( async user => {
            const fetchedUser = await models.User.findByPk(user);
            if (!fetchedUser) {
                errors.push(user);
            } else {
                await models.UserTeamMember.create({teamId, userId: user, teamAdmin: false});
                addedUsers.push({username: fetchedUser.username, role: fetchedUser.role, id: user});
            }
        });
        res.status(200).json({
            users: addedUsers,
            message: 'Users are added successfully'
        });
        
    } catch (err) {
        console.log(err);
        if (errors.length > 0) {
            res.status(500).json({
                notfoundUsers: JSON.stringify(errors),
                message: err.message});
        } else {
            res.status(500).json({message: err.message});
        } 
    }
}

exports.udpateAdminRoleOfTeam = async (req, res) => {
    try {
        const currentUserId = req.userData.userId;
        const { teamId, userId } = req.params;
        const userTeam = await models.UserTeamMember.findOne({where: models.Sequelize.and(
            {teamId: teamId}, 
            {userId: currentUserId}, 
            {teamAdmin: true}
            )});
        if (!userTeam) {
            throw new Error('This user has not found');
        }

        if (currentUserId === userId) {
            throw new Error('This user is alrady admin of team');
        }

        const fetchedUser = await models.User.findByPk(userId);
        if (!fetchedUser) {
            throw new Error('No record of this user exists');
        }

        if (fetchedUser.role !== 'admin') {
            throw new Error('This user does not grant admin role');
        }

        await models.UserTeamMember.update({userId: userId}, {where: {teamId: teamId}});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: err.message});
    }
}

exports.addAdminRole = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await models.User.findByPk(userId);
        if (!user) {
            throw new Error('No user record found');
        }
        await models.User.update({ role: 'admin'}, {where: {id: userId}});
        res.status(200).json({
            message: 'Role is successfully chaneged'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        });
    }
}

exports.removeAdminRole = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await models.User.findByPk(userId);
        if (!user) {
            throw new Error('No user record found');
        }
        await models.User.update({ role: 'regular'}, { where: {id: userId}});
        res.status(200).json({
            message: 'Role is updated successfully'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        });
    } 
}

exports.getTeams = async (req, res) => {
    try {
       const teams = await models.sequelize.query(
           `select t.id, t.name, m.teamAdmin, u.role, u.username, u.id from teams t 
           inner join user_team_members m on t.id = m.team_id
           inner join users u on u.id = m.user_id`,
           {
               model: models.Team,
               raw: true
           }
       ); 
       res.status(500).json({
           teams,
           message: 'Query was successful'
       });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        });
    }
}

exports.getTeam = async (req, res) => {
    const { teamId } = req.params;
    try {
        const team = await models.sequelize.query(
            `select t.id, t.name, m.teamAdmin, u.id, u.username, u.role from teams t 
            inner join user_team_members m on m.team_id = t.id 
             inner join users u on u.id = m.user_id
             where t.id = ?`,
            {
                replacements: [teamId],
                model: models.Team,
                raw: true
            }
        );
        res.status(500).json({
            team,
            message: 'Query was successful'
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        });
    }
}