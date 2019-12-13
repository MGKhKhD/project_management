const models = require('../models/index');
const User = models.User;
const Team = models.Team;

exports.createTeam = async (req, res) => {
    try {
        const { name, owner } = req.body;
        if (name === '') {
            throw new Error('Team name is requied');
        }
        let userId;
        if (owner) {
            userId = await User.findbyPk(owner);
        } else {
            userId = req.userData.id;
        }
        const team = await Team.create({ name, owner: userId });
        if (team) {
            res.status(201).json({
                team: {
                    id: team.id,
                    owner: team.owner
                },
                message: 'Team created successfully'
            });
        } else {
            throw new Error('Unable to create team');
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({message: err.message});
    }
    
}