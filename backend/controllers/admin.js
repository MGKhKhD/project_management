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
            userId = fetched_creator.id;
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