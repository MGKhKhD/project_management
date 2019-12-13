
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const models = require('../models/index');
const User = models.User;

const Op = models.Sequelize.Op;

exports.signupUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({where: {
            [Op.or]: [{username: username}, {email: email}]
        }});

        if (existingUser) {
            throw new Error('The username/email is already taken');
        }
        const hashedPass = await bcrypt.hash(password, 12);
        const createdUser = await User.create({
            username, email, password: hashedPass
        });

        const token = await jwt.sign({
            id: createdUser.id,
            username: createdUser.username,
            role: createdUser.role,
            expirationTime: '2h'
        }, 'secret_of_jwt', {expiresIn: '2h'});
        if (!token) {
            throw new Error('Something went wrong. Try again!');
        }
        res.status(200).json({
            credentials: {
                token,
                username: createdUser.username,
                id: createdUser.id,
                role: createdUser.role,
                expiresIn: 2*3600
            },
            message: 'User is signed up'
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: err.message
        });
    }
}

exports.loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const existingUser = await User.findOne({where: {email: email}});
        if (!existingUser) {
            throw new Error('Unable to verify credentials');
        }
        
        const confirmed = await bcrypt.compare(password, existingUser.password);
        if (!confirmed) {
            throw new Error('Unable to verify credentials');
        }
        const token = await jwt.sign({
            id: existingUser.id,
            username: existingUser.username,
            role: existingUser.role,
            expirationTime: '2h'
        }, 'secret_of_jwt', {expiresIn: '2h'});
        if (!token) {
            throw new Error('Something went wrong. Try again!');
        }
        res.status(200).json({
            credentials: {
                token,
                username: existingUser.username,
                id: existingUser.id,
                role: existingUser.role,
                expiresIn: 2*3600
            },
            message: 'Logged in successfully'
        });
    } catch(err) {
        console.log(err);
        res.status(401).json({
            message: err.message
        });
    }
}