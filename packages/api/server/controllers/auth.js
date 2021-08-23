const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {User} = require('../models');

exports.login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        let user = await User.findOne({
            where: {
                email
            }
        });
        if (!user) {
            return res.status(401).json({
                code: 401,
                message: 'Cannot find the user'
            })
        }

        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            return res.status(401).json({
                code: 401,
                message: 'Authentication error'
            })
        }
        delete user.dataValues.password;

        if (user.status === 'VE') {
            const token = generateToken(user.id);
            return res.status(200).json({
                code: 200,
                message: 'Logged in successfully',
                user,
                token
            });
        } else {
            return res.status(200).json({
                code: 200,
                message: 'User email is not verified',
                user
            })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            code: 500,
            message: 'Server error'
        });
    }
}

generateToken = (userId) => {
    return jwt.sign({
        id: userId
    }, process.env.JWT_SECRET, {
        expiresIn: '30m',
        issuer: 'workly'
    });
}
